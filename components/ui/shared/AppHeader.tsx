"use client";

import { UserButton, useAuth } from "@clerk/nextjs";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "@/components/ui/button";

interface AppHeaderProps {
  toggleSidebar?: () => void;
  isSidebarOpen?: boolean;
  showSidebarToggle?: boolean;
}

export function AppHeader({ 
  toggleSidebar, 
  isSidebarOpen, 
  showSidebarToggle = false 
}: AppHeaderProps) {
  const router = useRouter();
  const { isSignedIn } = useAuth();
  
  const handleLogoClick = () => {
    if (isSignedIn) {
      router.push("/dashboard");
    } else {
      router.push("/");
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white border-b shadow-sm h-[60px]">
      <div className="w-full h-full px-4 md:px-6 flex items-center justify-between max-w-screen-2xl mx-auto">
        <div className="flex items-center gap-3">
          {/* Sidebar toggle button - only shown when requested */}
          {showSidebarToggle && toggleSidebar && (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="lg:hidden flex-shrink-0"
              aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
            >
              {isSidebarOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          )}
          
          {/* Logo and brand name - consistent across all pages */}
          <div 
            onClick={handleLogoClick}
            className="flex items-center gap-2.5 cursor-pointer"
          >
            <div className="animate-spin-slow">
              <Image src="/logo.svg" alt="AI-Gen Logo" width={32} height={32} priority />
            </div>
            <h1 className="text-xl font-bold">AI-Gen</h1>
          </div>
        </div>
        
        {/* Right side - auth controls */}
        <div>
          {isSignedIn ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <div className="flex gap-2">
              <Link href="/sign-in">
                <Button variant="outline" size="sm">Log In</Button>
              </Link>
              <Link href="/sign-up">
                <Button size="sm">Sign Up</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}