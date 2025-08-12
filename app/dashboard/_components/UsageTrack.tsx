"use client";

import React, { useContext, useEffect, useState } from "react";
import { db } from "@/utils/db";
import { eq } from "drizzle-orm";
import { AIOutput, userSubscriptions } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { TotalUsageContext } from "@/app/context/TotalUsageContext";
import { UpdateCreditUsageContext } from "@/app/context/UpdateCreditUsageContext";
import { Sparkles } from "lucide-react";
import Link from "next/link";

function UsageTrack() {
  const { user } = useUser();
  const { totalUsage, setTotalUsage } = useContext(TotalUsageContext);
  const { updateCreditUsage } = useContext(UpdateCreditUsageContext);
  const [creditLimit, setCreditLimit] = useState<number>(10000);
  const [plan, setPlan] = useState<string>('free');
  const [loading, setLoading] = useState<boolean>(true);
  
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
      setLoading(true);
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
      setLoading(false);
    } catch (error) {
      console.error("Error fetching subscription data:", error);
      setLoading(false);
    }
  };
  
  const getUsageData = async () => {
    try {
      setLoading(true);
      const result = await db
        .select()
        .from(AIOutput)
        .where(eq(AIOutput.createdBy, user?.primaryEmailAddress?.emailAddress || ''));
      
      // Calculate total usage based on response lengths
      let total = 0;
      result.forEach((item) => {
        total += Number(item.aiResponse?.length || 0);
      });
      
      setTotalUsage(total);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching usage data:", error);
      setLoading(false);
    }
  };
  
  // Calculate percentage of usage
  const usagePercentage = Math.min((totalUsage / creditLimit) * 100, 100);
  
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
          plan === 'free' ? 'bg-muted text-muted-foreground' : 
          plan === 'pro' ? 'bg-primary/20 text-primary' : 
          'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200'
        }`}>
          {plan.charAt(0).toUpperCase() + plan.slice(1)} Plan
        </span>
        
        <span className="text-xs text-muted-foreground">
          {Math.round(usagePercentage)}%
        </span>
      </div>
      
      {/* Progress bar */}
      <div className="h-1.5 w-full bg-muted rounded-full mb-2">
        <div 
          className={`h-full rounded-full ${
            usagePercentage > 90 ? 'bg-destructive' :
            usagePercentage > 75 ? 'bg-yellow-500' : 'bg-primary'
          }`} 
          style={{ width: `${usagePercentage}%` }}
        ></div>
      </div>
      
      <div className="flex justify-between text-xs text-muted-foreground mb-3">
        <span>{totalUsage.toLocaleString()}</span>
        <span>{creditLimit.toLocaleString()} credits</span>
      </div>
      
      <Link href="/dashboard/billing">
        <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-1.5 px-3 rounded text-sm flex items-center justify-center gap-1.5 transition-colors">
          <Sparkles className="h-3.5 w-3.5" />
          {plan === 'free' ? 'Upgrade Plan' : 'Manage Plan'}
        </button>
      </Link>
    </div>
  );
}

export default UsageTrack;