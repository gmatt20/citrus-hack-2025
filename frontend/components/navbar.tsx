"use client";

import { usePathname, useRouter } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/clerk-react";
import { Spinner } from "@/components/ui/spinner";
import { useConvexAuth } from "convex/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Navbar = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const { user } = useUser();
  const pathname = usePathname();
  let isHome: boolean;
  const router = useRouter();

  if (pathname === "/") {
    isHome = true;
  } else {
    isHome = false;
  }

  return (
    <>
      <div className="w-screen fixed flex justify-between items-center md:px-20 p-6 z-10">
        {isLoading && <Spinner className="text-white" />}
        {isAuthenticated && !isLoading && (
          <>
            <div className="cursor-pointer text-white flex">
              <ChevronLeft onClick={() => router.back()} />
              <ChevronRight onClick={() => window.history.forward()} />
            </div>
            <div className="flex justify-center items-center gap-3">
              <p className="text-white font-bold">
                {isHome ? `Welcome ${user?.fullName}` : user?.fullName}
              </p>
              <UserButton />
            </div>
          </>
        )}
        {isLoading && <Spinner className="text-white" />}
      </div>
    </>
  );
};

export default Navbar;
