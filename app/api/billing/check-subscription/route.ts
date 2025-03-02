import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/utils/db';
import { userSubscriptions } from '@/utils/schema';
import { eq } from 'drizzle-orm';

export async function GET() {
  try {
    const { userId } = auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Get user subscription from database
    const subscription = await db
      .select()
      .from(userSubscriptions)
      .where(eq(userSubscriptions.userId, userId))
      .limit(1);
    
    if (subscription && subscription.length > 0) {
      return NextResponse.json({
        subscription: subscription[0]
      });
    }
    
    // Return default free plan if no subscription found
    return NextResponse.json({
      subscription: {
        plan: 'free',
        creditLimit: 10000
      }
    });
  } catch (error) {
    console.error('Error checking subscription:', error);
    return NextResponse.json(
      { error: 'Failed to check subscription' },
      { status: 500 }
    );
  }
}