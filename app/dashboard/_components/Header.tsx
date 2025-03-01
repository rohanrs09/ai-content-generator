import { DockDemo } from "@/components/DockDemo";
import { UserButton } from "@clerk/nextjs";
import { Search } from "lucide-react";
import React from "react";

function Header() {
  return (
    <div className="p-2 shadow-sm border-b-2 flex justify-between bg-white">
      <div className="flex justify-center w-full">
        <div className="flex gap-2 items-center">
          <DockDemo />
        </div>
      </div>
      <div className="flex gap-5 items-center">
        {/* <h2 className='bg-primary p-1 rounded-full text-xs text-white px-2 '>🔥Join Membership just for $9.9/Month</h2> */}
        <UserButton />
      </div>
    </div>
  );
}

export default Header;
