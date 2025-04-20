"use client";

import { SignInButton, UserButton } from "@clerk/clerk-react";

import { Authenticated, Unauthenticated, useMutation } from "convex/react";
import { useConvexAuth } from "convex/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";



export default function Home() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  return (
    <div className="h-screen w-screen" style={{
      background: 'linear-gradient(to bottom, rgb(0, 0, 0), rgb(109, 28, 28))'
    }}>
      <Unauthenticated>
        <SignInButton />
      </Unauthenticated>
      <Authenticated >
        <UserButton/>
      </Authenticated>
      <div className="flex flex-col items-center justify-center min-h-screen gap-9 ">
        <h1 className="text-6xl text-center text-white text-shadow-lg">Lorem Ipsum</h1>
        <Authenticated>
          <Link href='/onboarding'>
            <Button className="bg-white text-black ">Go to onboarding</Button>
          </Link>
        </Authenticated>
        

      </div>
      
    </div>
  );
}

function Content() {
  return <div>Authenticated content</div>;
}