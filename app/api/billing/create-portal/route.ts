import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/utils/db';
import { userSubscriptions } from '@/utils/schema';
import { eq } from 'drizzle-orm';

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-02-24.acacia',
});
export async function POST(request: Request) {
  try {
    console.log("Customer portal request received");
    
    // Get authenticated user
    const { userId } = auth();
    
    if (!userId) {
      console.log("No user ID found");
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    console.log("Looking up subscription for user:", userId);
    
    // Get user's Stripe customer ID from database
    const subscriptions = await db
      .select()
      .from(userSubscriptions)
      .where(eq(userSubscriptions.userId, userId))
      .limit(1);
    
    console.log("Found subscription records:", subscriptions.length);
    
    if (!subscriptions || subscriptions.length === 0 || !subscriptions[0].stripeCustomerId) {
      console.log("No subscription or customer ID found");
      return NextResponse.json({ error: 'No subscription found' }, { status: 404 });
    }
    
    const customerId = subscriptions[0].stripeCustomerId;
    console.log("Creating portal session for customer:", customerId);
    
    // Create billing portal session with explicit return URL
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing`,
      // You can also set flow_data to direct users to a specific section
      // flow_data: {
      //   type: 'subscription_cancel',
      //   subscription_cancel: {
      //     subscription: subscriptions[0].stripeSubscriptionId
      //   }
      // }
    });
    
    console.log("Portal session created, URL:", session.url);
    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Error creating portal session:', error);
    if (error instanceof Stripe.errors.StripeError) {
      console.error('Stripe error details:', error.message);
      
      // Check for specific customer portal configuration error
      if (error.message.includes("No configuration provided")) {
        return NextResponse.json(
          { 
            error: 'Customer Portal not configured', 
            details: 'Please configure the Customer Portal in your Stripe Dashboard.',
            redirectUrl: 'https://dashboard.stripe.com/test/settings/billing/portal'
          }, 
          { status: 500 }
        );
      }
    }
    
    return NextResponse.json(
      { error: 'Failed to create customer portal session', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}