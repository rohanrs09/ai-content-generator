"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Sparkles, CreditCard, Calendar, Shield, Zap, Award } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import { motion } from "framer-motion";
import Link from "next/link";
import { toast } from "react-hot-toast";

// Initialize Stripe with your publishable key
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");

export default function BillingPage() {
  const [billingInterval, setBillingInterval] = useState<'monthly' | 'yearly'>('monthly');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPlan, setCurrentPlan] = useState<string>('free');
  const [isSubscriber, setIsSubscriber] = useState(false);
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    // Check user's current subscription status
    const checkSubscription = async () => {
      if (!user) return;
      
      try {
        const response = await fetch('/api/billing/check-subscription');
        const data = await response.json();
        
        if (data.subscription) {
          setCurrentPlan(data.subscription.plan);
          setIsSubscriber(data.subscription.plan !== 'free');
        }
      } catch (error) {
        console.error('Error checking subscription:', error);
      }
    };
    
    checkSubscription();
  }, [user]);

  // Pricing plans with monthly and yearly options
  const plans = {
    free: {
      name: "Free",
      description: "Perfect for trying out our service",
      price: { monthly: 0, yearly: 0 },
      credits: 10000,
      features: [
        "10,000 Words/Month",
        "25+ Content Templates",
        "Unlimited Downloads & Copy",
        "1 Month History Retention"
      ],
      priceId: { monthly: null, yearly: null }  // No price ID for free plan
    },
    pro: {
      name: "Pro",
      description: "Ideal for professionals and small teams",
      price: { monthly: 9.99, yearly: 99.99 },
      credits: 100000,
      features: [
        "100,000 Words/Month",
        "All Content Templates",
        "Priority Processing",
        "1 Year History Retention",
        "API Access",
        "Priority Support"
      ],
      priceId: { 
        monthly: "price_1Qy8YYRpySNP4jZ4Gfyeo4n5", // Replace with actual Stripe price IDs
        yearly: "price_1Qy8aXRpySNP4jZ4EcXnbWvu"
      }
    },
    business: {
      name: "Business",
      description: "For teams that need more power",
      price: { monthly: 29.99, yearly: 299.99 },
      credits: 300000,
      features: [
        "300,000 Words/Month",
        "All Pro Features",
        "Custom Templates",
        "Team Collaboration",
        "Advanced Analytics",
        "Dedicated Account Manager"
      ],
      priceId: { 
        monthly: "price_1Qy8bSRpySNP4jZ4i89sTV4Z", // Replace with actual Stripe price IDs
        yearly: "price_1Qy8c7RpySNP4jZ4qfL23Y6c"
      }
    }
  };


// Open the customer portal for existing subscribers
// For the customer portal button handler:
const handleOpenCustomerPortal = async () => {
  setIsLoading(true);
  console.log("Opening customer portal...");
  
  try {
    const response = await fetch('/api/billing/create-portal', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    
    const data = await response.json();
    console.log("Portal response:", data);
    
    if (data.url) {
      console.log("Redirecting to portal URL:", data.url);
      window.location.href = data.url;
    } else if (data.redirectUrl && data.error === 'Customer Portal not configured') {
      // If it's a configuration error, provide a helpful message
      toast.error('Stripe Customer Portal needs to be configured');
      console.error("Stripe Customer Portal not configured. Please set it up in your Stripe Dashboard.");
      
      // Option: Open Stripe Dashboard in a new tab to configure
      if (confirm("Would you like to open Stripe Dashboard to configure the Customer Portal?")) {
        window.open(data.redirectUrl, '_blank');
      }
    } else {
      console.error("No URL in portal response:", data);
      toast.error(data.error || 'Could not open customer portal');
    }
  } catch (error) {
    console.error('Error opening customer portal:', error);
    toast.error('Failed to open customer portal');
  } finally {
    setIsLoading(false);
  }
};

  // Handle subscription checkout
  const handleCheckout = async (plan: 'free' | 'pro' | 'business') => {
    try {
      setIsLoading(true);
      
      if (!user) {
        toast.error("You need to be logged in to purchase a plan");
        return;
      }
      
      if (plan === 'free') {
        // Handle free plan activation
        await fetch("/api/billing/activate-free", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            userId: user.id,
            email: user.primaryEmailAddress?.emailAddress
          }),
        });
        
        toast.success("Free plan activated!");
        router.push("/dashboard");
        return;
      }
      
      // For paid plans, redirect to Stripe checkout
      const response = await fetch("/api/billing/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceId: plans[plan].priceId[billingInterval],
          userId: user.id,
          interval: billingInterval
        }),
      });
      
      const { sessionId, error } = await response.json();
      
      if (error) {
        toast.error(error);
        return;
      }
      
      // Redirect to Stripe checkout
      const stripe = await stripePromise;
      if (stripe) {
        const { error } = await stripe.redirectToCheckout({ sessionId });
        if (error) {
          console.error("Stripe checkout error:", error);
          toast.error("Payment failed. Please try again.");
        }
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("There was a problem processing your request. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full py-12 lg:py-24 min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container px-4 md:px-6 mx-auto">
        {/* Header */}
        <div className="text-center space-y-4 mb-10">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-700"
          >
            Upgrade Your AI Experience
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-500 max-w-2xl mx-auto text-base md:text-lg"
          >
            Choose the perfect plan to unleash your creativity and productivity with our advanced AI tools.
          </motion.p>
          
          {currentPlan !== 'free' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-4"
            >
              <div className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-800 rounded-full">
                <span className="text-sm font-medium">Current Plan: {currentPlan.charAt(0).toUpperCase() + currentPlan.slice(1)}</span>
              </div>
            </motion.div>
          )}
        </div>
        
        {/* Billing toggle */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center mb-10"
        >
          <div className="inline-flex items-center bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setBillingInterval('monthly')}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                billingInterval === 'monthly'
                  ? 'bg-white shadow-sm text-primary'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingInterval('yearly')}
              className={`px-4 py-2 text-sm font-medium rounded-md flex items-center ${
                billingInterval === 'yearly'
                  ? 'bg-white shadow-sm text-primary'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Yearly
              <span className="ml-1.5 bg-green-100 text-green-800 text-xs font-semibold px-2 py-0.5 rounded-full">
                Save 16%
              </span>
            </button>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Free Plan */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className={`border-2 transition-all h-full flex flex-col ${
              currentPlan === 'free' 
                ? 'border-primary bg-primary/5' 
                : 'hover:border-gray-300'
            }`}>
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-bold">{plans.free.name}</CardTitle>
                <CardDescription>{plans.free.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">$0</span>
                  <span className="text-gray-500 ml-2">/month</span>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3 text-sm">
                  {plans.free.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className={`w-full ${
                    currentPlan === 'free'
                      ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                  }`}
                  onClick={() => handleCheckout('free')}
                  disabled={isLoading || currentPlan === 'free'}
                >
                  {isLoading ? "Processing..." : currentPlan === 'free' ? "Current Plan" : "Get Started"}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>

          {/* Pro Plan */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card className={`border-2 relative shadow-lg h-full flex flex-col ${
              currentPlan === 'pro' 
                ? 'border-primary bg-primary/5' 
                : 'border-primary/70 shadow-primary/10'
            }`}>
              <div className="absolute top-0 right-0 bg-primary text-white px-3 py-1 text-xs font-medium rounded-bl-lg">
                MOST POPULAR
              </div>
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-bold flex items-center">
                  {plans.pro.name}
                  <Sparkles className="h-5 w-5 text-yellow-500 ml-2" />
                </CardTitle>
                <CardDescription>{plans.pro.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">
                    ${billingInterval === 'monthly' ? plans.pro.price.monthly : plans.pro.price.yearly}
                  </span>
                  <span className="text-gray-500 ml-2">/{billingInterval === 'monthly' ? 'month' : 'year'}</span>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3 text-sm">
                  {plans.pro.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <Check className="h-4 w-4 text-primary mr-3 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className={`w-full ${
                    currentPlan === 'pro'
                      ? 'bg-primary/70 hover:bg-primary/80'
                      : 'bg-primary hover:bg-primary/90'
                  }`}
                  onClick={currentPlan === 'pro' ? handleOpenCustomerPortal : () => handleCheckout('pro')}
                  disabled={isLoading}
                >
                  {isLoading
                    ? "Processing..."
                    : currentPlan === 'pro'
                    ? "Manage Subscription"
                    : "Upgrade Now"}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>

          {/* Business Plan */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card className={`border-2 transition-all h-full flex flex-col ${
              currentPlan === 'business' 
                ? 'border-purple-500 bg-purple-50' 
                : 'hover:border-gray-300'
            }`}>
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-bold flex items-center">
                  {plans.business.name}
                  <Award className="h-5 w-5 text-purple-500 ml-2" />
                </CardTitle>
                <CardDescription>{plans.business.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">
                    ${billingInterval === 'monthly' ? plans.business.price.monthly : plans.business.price.yearly}
                  </span>
                  <span className="text-gray-500 ml-2">/{billingInterval === 'monthly' ? 'month' : 'year'}</span>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3 text-sm">
                  {plans.business.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <Check className="h-4 w-4 text-purple-500 mr-3 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className={`w-full ${
                    currentPlan === 'business'
                      ? 'bg-gradient-to-r from-purple-500 to-primary hover:opacity-95'
                      : 'bg-gradient-to-r from-purple-600 to-primary hover:opacity-90'
                  }`}
                  onClick={currentPlan === 'business' ? handleOpenCustomerPortal : () => handleCheckout('business')}
                  disabled={isLoading}
                >
                  {isLoading
                    ? "Processing..."
                    : currentPlan === 'business'
                    ? "Manage Subscription"
                    : "Upgrade to Business"}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>

        {/* Features */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-24 max-w-6xl mx-auto"
        >
          <h2 className="text-2xl font-bold text-center mb-10">All Plans Include</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl border shadow-sm">
              <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Fast Processing</h3>
              <p className="text-gray-500 text-sm">Get your AI-generated content in seconds with our optimized infrastructure.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border shadow-sm">
              <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Secure & Private</h3>
              <p className="text-gray-500 text-sm">Your data is encrypted and never shared with third parties.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border shadow-sm">
              <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Regular Updates</h3>
              <p className="text-gray-500 text-sm">We're constantly improving our AI models and adding new features.</p>
            </div>
          </div>
        </motion.div>
        
        {/* FAQ */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-24 max-w-4xl mx-auto"
        >
          <h2 className="text-2xl font-bold text-center mb-10">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border">
              <h3 className="font-semibold text-lg">Can I upgrade or downgrade my plan later?</h3>
              <p className="mt-2 text-gray-500">Yes, you can change your plan at any time. When upgrading, we'll prorate your existing subscription.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border">
              <h3 className="font-semibold text-lg">How do credits work?</h3>
              <p className="mt-2 text-gray-500">Credits represent the number of words our AI can generate for you. They refresh monthly on your billing date.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border">
              <h3 className="font-semibold text-lg">Do unused credits roll over?</h3>
              <p className="mt-2 text-gray-500">No, credits reset each month with your new billing cycle to ensure optimal service performance.</p>
            </div>
          </div>
        </motion.div>
        
        {/* CTA */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-violet-600 to-primary p-8 md:p-12 rounded-2xl max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to transform your content creation?</h2>
            <p className="text-white/80 mb-6 max-w-2xl mx-auto">Join thousands of satisfied users who are boosting their productivity with our AI tools.</p>
            <Button 
              size="lg"
              className="bg-white text-primary hover:bg-white/90"
              onClick={() => handleCheckout('pro')}
              disabled={isLoading || currentPlan === 'pro'}
            >
              <span className="mr-2">Get Started</span>
              <CreditCard className="h-5 w-5" />
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}