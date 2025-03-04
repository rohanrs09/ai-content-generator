"use client";

import React, { useState, useEffect } from "react";
import SideNav from "./_components/SideNav";
import { TotalUsageContext } from "../context/TotalUsageContext";
import { UpdateCreditUsageContext } from "../context/UpdateCreditUsageContext";
import { Menu } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { AppHeader } from "@/components/ui/shared/AppHeader";

function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [totalUsage, setTotalUsage] = useState<number>(0);
  const [updateCreditUsage, setUpdateCreditUsage] = useState<number>(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const { isLoaded, userId } = useAuth();
  const router = useRouter();
  
  // Redirect if not authenticated
  useEffect(() => {
    if (isLoaded && !userId) {
      router.push("/sign-in");
    }
  }, [isLoaded, userId, router]);

  // Check screen size for responsive design
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      setIsSidebarOpen(!mobile);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);
  
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  
  // Show loading while auth check happens
  if (!isLoaded || !userId) {
    return <div className="h-screen flex items-center justify-center">Loading...</div>;
  }
  
  return (
    <TotalUsageContext.Provider value={{ totalUsage, setTotalUsage }}>
      <UpdateCreditUsageContext.Provider value={{ updateCreditUsage, setUpdateCreditUsage }}>
        <div className="flex flex-col h-screen overflow-hidden">
          {/* Using shared header component with sidebar toggle */}
          <AppHeader 
            toggleSidebar={toggleSidebar}
            isSidebarOpen={isSidebarOpen}
            showSidebarToggle={true}
          />
          
          {/* Main content area with proper padding for header */}
          <div className="flex w-full mt-[60px] h-[calc(100vh-60px)]">
            {/* Sidebar */}
            <aside 
              className={`
                fixed lg:static h-full z-30 bg-white
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} 
                transition-transform duration-300 ease-in-out
                w-64 shadow-md
              `}
            >
              <SideNav />
            </aside>
            
            {/* Overlay for mobile sidebar */}
            {isMobile && isSidebarOpen && (
              <div 
                className="fixed inset-0 top-[60px] bg-black/50 z-20"
                onClick={() => setIsSidebarOpen(false)}
              />
            )}

            {/* Main content */}
            <main className={`
              flex-1 overflow-y-auto bg-gray-50
            `}>
              {/* Mobile sidebar toggle */}
              {isMobile && !isSidebarOpen && (
                <button
                  className="fixed bottom-4 right-4 z-40 bg-primary text-white p-3 rounded-full shadow-lg"
                  onClick={() => setIsSidebarOpen(true)}
                >
                  <Menu className="h-5 w-5" />
                </button>
              )}
              
              {children}
            </main>
          </div>
        </div>
      </UpdateCreditUsageContext.Provider>
    </TotalUsageContext.Provider>
  );
}

export default Layout;