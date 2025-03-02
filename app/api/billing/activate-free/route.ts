import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/utils/db';
import { userSubscriptions } from '@/utils/schema';
import { eq } from 'drizzle-orm';

export async function POST(request: Request) {
  try {
    const { userId } = auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const { email } = await request.json();
    
    // Calculate next billing date (30 days from now)
    const nextBillingDate = new Date();
    nextBillingDate.setDate(nextBillingDate.getDate() + 30);
    
    // Check if user already has subscription record
    const existingSubscription = await db
      .select()
      .from(userSubscriptions)
      .where(eq(userSubscriptions.userId, userId))
      .limit(1);
    
    if (existingSubscription && existingSubscription.length > 0) {
      // Update existing subscription
      await db.update(userSubscriptions)
        .set({
          plan: 'free',
          creditLimit: 10000,
          nextBillingDate,
          updatedAt: new Date()
        })
        .where(eq(userSubscriptions.userId, userId));
    } else {
      // Create new subscription
      await db.insert(userSubscriptions)
        .values({
          userId,
          email,
          plan: 'free',
          creditLimit: 10000,
          nextBillingDate,
          createdAt: new Date(),
          updatedAt: new Date()
        });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error activating free plan:', error);
    return NextResponse.json(
      { error: 'Error activating free plan' },
      { status: 500 }
    );
  }
}