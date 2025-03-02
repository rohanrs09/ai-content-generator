// app/dashboard/_components/UsageTrack.tsx
"use client";
import { useEffect, useState, useContext } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { db } from "@/utils/db";
import { AIOutput, userSubscriptions } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { TotalUsageContext, UpdateCreditUsageContext } from "@/app/context/UsageContext";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "react-hot-toast";

// Updated interface to match database schema
export interface HISTORY {
  id: number;
  formData: string | null;  // Now nullable
  aiResponse: string | null;
  templateSlug: string | null;  // Now nullable
  createdBy: string | null;
  createdAt: Date | null;  // Changed from string to Date
}

function UsageTrack() {
  const { user } = useUser();
  const router = useRouter();
  const { totalUsage, setTotalUsage } = useContext(TotalUsageContext);
  const { updateCreditUsage, setUpdateCreditUsage } = useContext(UpdateCreditUsageContext);
  const [creditLimit, setCreditLimit] = useState<number>(10000);
  const [plan, setPlan] = useState<string>('free');
  
  useEffect(() => {
    if (user) {
      getUserSubscription();
      getUsageData();
    }
  }, [user]);
  
  useEffect(() => {
    if (user && updateCreditUsage) {
      getUsageData();
    }
  }, [updateCreditUsage, user]);
  
  const getUserSubscription = async () => {
    try {
      // Get user's subscription info
      const userSubscriptionData = await db
        .select()
        .from(userSubscriptions)
        .where(eq(userSubscriptions.userId, user?.id || ''))
        .limit(1);
      
      if (userSubscriptionData && userSubscriptionData.length > 0) {
        setCreditLimit(userSubscriptionData[0].creditLimit ?? 10000);
        setPlan(userSubscriptionData[0].plan || 'free');
      } else {
        // Create a free subscription if none exists
        await fetch("/api/billing/activate-free", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            userId: user?.id,
            email: user?.primaryEmailAddress?.emailAddress
          }),
        });
      }
    } catch (error) {
      console.error("Error fetching subscription data:", error);
    }
  };
  
  const getUsageData = async () => {
    try {
      // Get user's AI output data
      const result = await db
        .select()
        .from(AIOutput)
        .where(eq(AIOutput.createdBy, user?.primaryEmailAddress?.emailAddress || ''));
      
      calculateTotalUsage(result);
    } catch (error) {
      console.error("Error fetching usage data:", error);
    }
  };
  
  const calculateTotalUsage = (result: HISTORY[]) => {
    let total = 0;
    result.forEach((item) => {
      total = total + Number(item.aiResponse?.length || 0);
    });
    
    setTotalUsage(total);
    
    // Check if user has exceeded credit limit
    if (total >= creditLimit) {
      toast.error(`You've reached your ${creditLimit} word limit. Please upgrade your plan to continue.`);
      router.push("/dashboard/billing");
    }
  };
  
  return (
    <div className="m-5">
      <div className="bg-primary text-white p-3 rounded-lg">
        <h2 className="font-medium">Credits ({plan.toUpperCase()})</h2>
        <div className="h-2 bg-[#9981f9] w-full rounded-full mt-3">
          <div
            className="h-2 bg-white rounded-full"
            style={{
              width: `${Math.min((totalUsage / creditLimit) * 100, 100)}%`,
            }}
          ></div>
        </div>
        <h2 className="text-sm my-2">{totalUsage}/{creditLimit} Credits Used</h2>
      </div>
      <Link href="/dashboard/billing">
        <Button variant="secondary" className="w-full my-3 text-primary">
          {plan === 'free' ? 'Upgrade' : 'Manage Subscription'}
        </Button>
      </Link>
    </div>
  );
}

export default UsageTrack;