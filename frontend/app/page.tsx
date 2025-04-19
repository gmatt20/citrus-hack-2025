"use client";

import { SignInButton, UserButton } from "@clerk/clerk-react";
import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";

export default function Home() {
  return (
    <>
      <Unauthenticated>
        <SignInButton />
      </Unauthenticated>
      <Authenticated>
        <UserButton />
        <Content />
      </Authenticated>
    </>
  );
}

function Content() {
  return <div>Authenticated content</div>;
}
