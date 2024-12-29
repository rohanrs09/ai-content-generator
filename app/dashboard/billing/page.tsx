"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check,Star } from 'lucide-react'

function billing() {
  return (
    <section className="w-full py-4 lg:py-8  min-h-screen flex items-center">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center space-y-4 mb-4 md:mb-6">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight opacity-0 animate-fade-in">
            Upgrade With <span className="text-primary">Monthly Plan</span>
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm md:text-base">
            Choose the perfect plan for your needs. Unlock premium features and boost your productivity.
          </p>
        </div>

        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
    {/* Free Plan */}
    <div className="w-full max-w-md mx-auto">
      <Card className="relative overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 group h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
        <CardHeader className="text-center pb-8 pt-6 relative">
          <CardTitle>
            <h3 className="text-2xl sm:text-3xl font-bold mb-2">Free</h3>
            <div className="flex items-baseline justify-center">
              <span className="text-4xl sm:text-5xl font-extrabold">0</span>
              <span className="text-2xl sm:text-3xl font-extrabold">$</span>
              <span className="ml-2 text-gray-500 text-base sm:text-lg">/month</span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="pb-8 relative">
          <ul className="space-y-4">
            {[
              "10,000 Words/Month",
              "25+ Content Templates",
              "Unlimited Download & Copy",
              "1 Month of History"
            ].map((feature, index) => (
              <li key={index} className="flex items-center space-x-3 text-sm sm:text-base">
                <Check className="h-5 w-5 text-primary shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>

    {/* Monthly Plan */}
    <div className="w-full max-w-md mx-auto">
      <Card className="relative overflow-hidden border-2 border-primary shadow-lg shadow-primary/10 group h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
        <div className="absolute top-0 right-0 bg-primary text-white px-3 py-1 text-sm rounded-bl-lg">
          Popular
        </div>
        <CardHeader className="text-center pb-8 pt-6 relative">
          <CardTitle>
            <h3 className="text-2xl sm:text-3xl font-bold mb-2">Monthly</h3>
            <div className="flex items-baseline justify-center">
              <span className="text-4xl sm:text-5xl font-extrabold">9.99</span>
              <span className="text-2xl sm:text-3xl font-extrabold">$</span>
              <span className="ml-2 text-gray-500 text-base sm:text-lg">/month</span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="pb-8 relative">
          <ul className="space-y-4">
            {[
              "1,00,000 Words/Month",
              "50+ Template Access",
              "Unlimited Download & Copy",
              "1 Year of History"
            ].map((feature, index) => (
              <li key={index} className="flex items-center space-x-3 text-sm sm:text-base">
                <div className="rounded-full bg-primary/10 p-1">
                  <Check className="h-4 w-4 text-primary shrink-0" />
                </div>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          <Button 
            className="w-full mt-8 bg-primary hover:bg-primary/90 text-white shadow-md hover:shadow-lg transition-all duration-300 rounded-xl"
          >
            Get Started
          </Button>
        </CardContent>
      </Card>
    </div>
  </div>
</div>

        {/* Additional Features Section */}
        <div className="mt-16 text-center opacity-0 animate-fade-in-up">
          <h2 className="text-2xl font-bold mb-8">Why Choose Our Plans?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { title: "No Credit Card", desc: "Required for free plan", icon: "💳" },
              { title: "Cancel Anytime", desc: "No long-term contracts", icon: "🔓" },
              { title: "24/7 Support", desc: "Get help when you need it", icon: "🛟" },
              { title: "Regular Updates", desc: "New features every month", icon: "🚀" }
            ].map((item, index) => (
              <div 
                key={index}
                className="p-6 rounded-lg bg-white border-2 border-gray-100 hover:border-primary/50 transition-all duration-300 group"
              >
                <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">{item.icon}</div>
                <h3 className="font-semibold mb-2 text-lg">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slide-in-left {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes slide-in-right {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }

        .animate-slide-in-left {
          animation: slide-in-left 0.5s ease-out 0.2s forwards;
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.5s ease-out 0.4s forwards;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.5s ease-out 0.6s forwards;
        }
      `}</style>
    </section>
  )
}

export default billing