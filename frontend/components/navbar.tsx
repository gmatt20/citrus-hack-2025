"use client";

import { UserButton } from "@clerk/nextjs";
import { Authenticated } from "convex/react";
import { useUser } from "@clerk/clerk-react";
import { Spinner } from "@/components/ui/spinner";
import { useConvexAuth } from "convex/react";

const Navbar = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const { user } = useUser();

  return (
    <>
      <div className="w-screen absolute flex justify-end items-center gap-3 p-5">
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
