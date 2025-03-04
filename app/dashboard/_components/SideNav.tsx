"use client";

import { FileClock, Home, Settings, WalletCards } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import UsageTrack from "./UsageTrack";

function SideNav() {
  const MenuList = [
    {
      name: "Home",
      icon: Home,
      path: "/dashboard",
    },
    {
      name: "History",
      icon: FileClock,
      path: "/dashboard/history",
    },
    {
      name: "Billing",
      icon: WalletCards,
      path: "/dashboard/billing",
    },
    {
      name: "Settings",
      icon: Settings,
      path: "/dashboard/settings",
    },
  ];
  
  const path = usePathname();
  const router = useRouter();
  
  const handleNavigation = (menuPath: string) => {
    router.push(menuPath);
  };
  
  return (
    <div className="h-full bg-white flex flex-col">
      {/* Main navigation menu */}
      <nav className="flex-1 overflow-y-auto py-3">
        <div className="space-y-1 px-3">
          {MenuList.map((menu, index) => (
            <button
              key={index}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-left
                ${path === menu.path 
                  ? 'bg-primary text-white shadow-sm' 
                  : 'text-gray-700 hover:bg-gray-100'
                }`}
              onClick={() => handleNavigation(menu.path)}
            >
              <menu.icon className="h-5 w-5 flex-shrink-0" />
              <span className="font-medium">{menu.name}</span>
            </button>
          ))}
        </div>
      </nav>
      
      {/* Usage tracker at bottom */}
      <div className="p-4 border-t mt-auto">
        <UsageTrack />
      </div>
    </div>
  );
}

export default SideNav;