import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";

function Header() {
  return (
    <div className="p-3 px-5 flex justify-between shadow-md bg-background border-b">
      <div className="flex justify-center">
        <div className="flex justify-center  animate-spin-slow ">
          <Link href="/dashboard">
            <Image src={"/logo.svg"} alt="logo" width={40} height={40} />
          </Link>
        </div>
        <div className="ml-4 flex justify-center">
          <h1 className="flex text-4xl">AI-Gen</h1>
        </div>
      </div>
      {/* //  dont show for a render sigin error */}
      {/* <div className="flex gap-2 items-center">
        <Link href="/auth/sign-in">
          <Button>Get Started</Button>
        </Link>
      </div>  */}
    </div>
  );
}

export default Header;
