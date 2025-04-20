"use client";

import { UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/clerk-react";
import { Spinner } from "@/components/ui/spinner";
import { useConvexAuth } from "convex/react";
import Image from "next/image";
import rolling from "@/public/rolling.svg";

const Navbar = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const { user } = useUser();

  return (
    <>
      <Image
        alt="rolling film"
        src={rolling}
        className="fixed top-0 left-0 h-[7%] w-auto object-cover z-"
      />
      <div className="w-screen fixed flex justify-end items-center gap-3 p-5">
        {isLoading && <Spinner className="text-white" />}
        {isAuthenticated && !isLoading && (
          <>
            <p className="text-white">Welcome {user?.fullName}</p>
            <UserButton />
          </>
        )}
      </div>
    </>
  );
};

export default Navbar;
