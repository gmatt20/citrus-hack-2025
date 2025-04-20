"use client";

import { usePathname, useRouter } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/clerk-react";
import { Spinner } from "@/components/ui/spinner";
import { useConvexAuth } from "convex/react";
import Image from "next/image";
import rolling from "@/public/rolling.svg";
import { ChevronLeft } from "lucide-react";

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
      <Image
        alt="rolling film"
        src={rolling}
        className="fixed top-0 left-0 h-[8%] w-auto object-cover"
      />
      <div className="w-screen fixed flex justify-between items-center p-6">
        <div className="cursor-pointer text-white">
          <ChevronLeft onClick={() => router.back()} />
        </div>
        {isLoading && <Spinner className="text-white" />}
        {isAuthenticated && !isLoading && (
          <div className="flex justify-center items-center gap-3">
            <p className="text-white">
              {isHome ? `Welcome ${user?.fullName}` : user?.fullName}
            </p>
            <UserButton />
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
