import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/utils/db';
import { userSubscriptions } from '@/utils/schema';
import { eq } from 'drizzle-orm';

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
});

export async function POST(request: Request) {
  try {
    const { userId } = auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const body = await request.json();
    const { priceId, interval, email } = body;

    console.log("Creating checkout session with price ID:", priceId);
    
    if (!priceId) {
      return NextResponse.json({ error: 'Price ID is required' }, { status: 400 });
    }
    
    // Get user info
    const userData = await db
      .select()
      .from(userSubscriptions)
      .where(eq(userSubscriptions.userId, userId))
      .limit(1);
    
    let customerId = userData[0]?.stripeCustomerId;
    
    // If no customer exists, create one
    if (!customerId) {
      console.log("Creating new Stripe customer");
      const customerData: Stripe.CustomerCreateParams = {
        metadata: {
          userId: userId
        }
      };
      
      // Add email if available
      if (email) {
        customerData.email = email;
      }
      
      const customer = await stripe.customers.create(customerData);
      customerId = customer.id;
      console.log("Created customer with ID:", customerId);
      
      // Save customer ID in database
      if (!userData || userData.length === 0) {
        await db.insert(userSubscriptions).values({
          userId,
          email,
          stripeCustomerId: customerId,
          plan: 'free',
          creditLimit: 10000,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      } else {
        await db.update(userSubscriptions)
          .set({ stripeCustomerId: customerId })
          .where(eq(userSubscriptions.userId, userId));
      }
    }
    
    // Create checkout session
    console.log("Creating checkout session for customer:", customerId);
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      billing_address_collection: 'auto',
      line_items: [
        {
          price: priceId,
          quantity: 1
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing?canceled=true`,
      metadata: {
        userId,
        interval
      },
      subscription_data: {
        metadata: {
          userId
        }
      }
    });
    
    console.log("Created checkout session:", session.id);
    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: 'Error creating checkout session: ' + (error instanceof Error ? error.message : String(error)) },
      { status: 500 }
    );
  }
}