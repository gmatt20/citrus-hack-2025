"use client";

import { SignInButton, UserButton } from "@clerk/nextjs";

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
        <div className ="flex items-center justify-center translate-y-[60vh]">
        <SignInButton>
          <button className = "px-2 py-3 text-white bg-amber-700 rounded-lg text-lg hover:bg-amber-900 transition">
            Sign in!
          </button>
        </SignInButton>
        </div>
      </Unauthenticated>
      <Authenticated >
        <UserButton/>
      </Authenticated>
      <div className="flex flex-col items-center justify-center min-h-screen gap-9 ">
        <h1 className= "text-9xl text-center translate-y-[-10vh] text-white text-shadow-lg"
            style = {{fontFamily: '"Limelight",cursive'}}>CINEMAGINE</h1>
        <Authenticated>
          <Link href='/onboarding'>
          <button className = "px-2 py-3 text-white bg-amber-700 translate-y-[-10vh] rounded-lg text-lg hover:bg-amber-900 transition">
            Enter the Cinemagic!
          </button>
          </Link></Authenticated> 
      </div>
    </div>
  );
}

function Content() {
  return <div>Authenticated content</div>;
}