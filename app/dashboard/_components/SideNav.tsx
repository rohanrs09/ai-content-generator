"use client";

import { FileClock, Home, Settings, WalletCards } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import UsageTrack from "./UsageTrack";
import Link from "next/link";

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
      name: "Setting",
      icon: Settings,
      path: "/dashboard/settings",
    },
  ];

  const path = usePathname();
  const router = useRouter();
  
  useEffect(() => {
    console.log(path);
  }, [path]);

  const handleNavigation = (menuPath:string) => {
    router.push(menuPath);
  };

  return (
    <div className="h-screen relative p-5 shadow-sm border bg-white">
      <div className="flex justify-center ">
      <div className="flex justify-center  animate-spin-slow ">
          <Image src={"/logo.svg"} alt="logo" width={40} height={40} />
        </div>
        <Link href="/">
        <div className="ml-4 flex justify-center">
          <h1 className="flex text-4xl">AI-Gen</h1>
        </div>
        </Link>
      </div>

      <hr className="my-5 border" />

      <div className="mt-5">
        {MenuList.map((menu, index) => (
          <div 
            key={index} 
            className={`flex gap-2 mb-2 p-3  hover:bg-primary hover:text-white rounded-lg cursor-pointer items-center ${path == menu.path && 'bg-primary text-white'}`} 
            onClick={() => handleNavigation(menu.path)}
          >
            <menu.icon className="h-6 w-6" />
            <h2 className="text-lg">{menu.name}</h2>
          </div>
        ))}
      </div>

      <div className="absolute bottom-10 left-0 w-full">
        <UsageTrack />
      </div>
    </div>
  );
}

export default SideNav;
