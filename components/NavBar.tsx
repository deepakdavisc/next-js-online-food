import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";

function NavBar() {
  return (
    <div className="flex items-center justify-between px-10 border-b-[2px]">
      <div className="flex items-center ">
        <Image
          src="/delivery-bike.png"
          alt="delivery bike"
          width={60}
          height={60}
        />
      </div>
      <div className="hidden sm:flex gap-5 items-center">
        <div className="hover:bg-gray-200 rounded-md p-2 transition-all cursor-pointer">
          How It Works
        </div>
        <div className="hover:bg-gray-200 rounded-md p-2 transition-all cursor-pointer">
          About Us
        </div>
        <div className="hover:bg-gray-200 rounded-md p-2 transition-all cursor-pointer">
          Resource Center
        </div>
      </div>
      <div>
        <UserButton afterSignOutUrl="/"></UserButton>
      </div>
    </div>
  );
}

export default NavBar;
