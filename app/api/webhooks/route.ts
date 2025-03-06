import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { headers } from 'next/headers';
import { db } from '@/utils/db';
import { userSubscriptions } from '@/utils/schema';
import { eq } from 'drizzle-orm';

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-02-24.acacia',
});

// Get webhook secret from environment variables
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';


export async function POST(request: Request) {
  try {
    const body = await request.text();
    const signature = headers().get('stripe-signature') || '';
    
    // Match with your actual price IDs from billing/page.tsx
    const proMonthlyPriceId = "price_1Qy8YYRpySNP4jZ4Gfyeo4n5";
    const proYearlyPriceId = "price_1Qy8aXRpySNP4jZ4EcXnbWvu";
    const businessMonthlyPriceId = "price_1Qy8bSRpySNP4jZ4i89sTV4Z";
    const businessYearlyPriceId = "price_1Qy8c7RpySNP4jZ4qfL23Y6c";
    
    console.log("Received webhook with signature:", signature.substring(0, 10) + "...");
    
    let event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
      console.log("Webhook event type:", event.type);
    } catch (err: any) {
      console.error(`Webhook signature verification failed: ${err.message}`);
      return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
    }
    
    // Handle different events
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log("Checkout completed for session:", session.id);
        
        if (!session?.metadata?.userId) {
          console.error('No userId in session metadata');
          return NextResponse.json({ received: true });
        }
        
        // Get subscription details
        const subscription = await stripe.subscriptions.retrieve(
          session.subscription as string
        );
        
        // Get price details
        const priceId = subscription.items.data[0].price.id;
        console.log("Price ID from subscription:", priceId);
        
        // Determine plan and credit limit
        let plan = 'free';
        let creditLimit = 10000;
        
        if (priceId === proMonthlyPriceId || priceId === proYearlyPriceId) {
          plan = 'pro';
          creditLimit = 100000;
        } else if (priceId === businessMonthlyPriceId || priceId === businessYearlyPriceId) {
          plan = 'business';
          creditLimit = 300000;
        }
        
        // Calculate next billing date
        const nextBillingDate = new Date(subscription.current_period_end * 1000);
        
        // Update or create subscription in database
        const existingSubscription = await db
          .select()
          .from(userSubscriptions)
          .where(eq(userSubscriptions.userId, session.metadata.userId))
          .limit(1);
        
        if (existingSubscription && existingSubscription.length > 0) {
          await db.update(userSubscriptions)
            .set({
              plan,
              creditLimit,
              stripeCustomerId: subscription.customer as string,
              stripeSubscriptionId: subscription.id,
              stripePriceId: priceId,
              nextBillingDate,
              updatedAt: new Date()
            })
            .where(eq(userSubscriptions.userId, session.metadata.userId));
        } else {
          await db.insert(userSubscriptions)
            .values({
              userId: session.metadata.userId,
              plan,
              creditLimit,
              stripeCustomerId: subscription.customer as string,
              stripeSubscriptionId: subscription.id,
              stripePriceId: priceId,
              nextBillingDate,
              createdAt: new Date(),
              updatedAt: new Date()
            });
        }
        break;
      }
      
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        const userId = subscription.metadata.userId;
        
        if (!userId) {
          console.error('No userId in subscription metadata');
          return NextResponse.json({ received: true });
        }
        
        // Get price details
        const priceId = subscription.items.data[0].price.id;
        
        // Determine plan and credit limit
        let plan = 'free';
        let creditLimit = 10000;
        
        if (priceId === proMonthlyPriceId || priceId === proYearlyPriceId) {
          plan = 'pro';
          creditLimit = 100000;
        } else if (priceId === businessMonthlyPriceId || priceId === businessYearlyPriceId) {
          plan = 'business';
          creditLimit = 300000;
        }
        
        // Calculate next billing date
        const nextBillingDate = new Date(subscription.current_period_end * 1000);
        
        // Update subscription in database
        await db.update(userSubscriptions)
          .set({
            plan,
            creditLimit,
            stripePriceId: priceId,
            nextBillingDate,
            updatedAt: new Date()
          })
          .where(eq(userSubscriptions.userId, userId));
        break;
      }
      
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        const userId = subscription.metadata.userId;
        
        if (!userId) {
          console.error('No userId in subscription metadata');
          return NextResponse.json({ received: true });
        }
        
        // Update subscription to free plan
        await db.update(userSubscriptions)
          .set({
            plan: 'free',
            creditLimit: 10000,
            stripeSubscriptionId: null,
            stripePriceId: null,
            updatedAt: new Date()
          })
          .where(eq(userSubscriptions.userId, userId));
        break;
      }
    }
    
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}