"use client";

import { UserButton } from "@clerk/nextjs";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
  isMobile?: boolean;
}

function Header({ toggleSidebar, isSidebarOpen, isMobile }: HeaderProps) {
  const router = useRouter();
  
  const handleLogoClick = () => {
    router.push("/dashboard");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white border-b shadow-sm h-[60px]">
      <div className="w-full h-full px-4 md:px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Mobile menu toggle button */}
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
          
          {/* Logo and brand name */}
          <div 
            onClick={handleLogoClick}
            className="flex items-center gap-2.5 cursor-pointer"
          >
            <div className="animate-spin-slow">
              <Image src="/logo.svg" alt="AI-Gen Logo" width={32} height={32} priority />
            </div>
            <h1 className="text-xl font-bold hidden sm:block">AI-Gen</h1>
          </div>
        </div>
        
        <div>
          {/* Set afterSignOutUrl to / instead of /sign-in */}
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </header>
  );
}

export default Header;