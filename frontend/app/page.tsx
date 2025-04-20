"use client";

import Navbar from "@/components/navbar";
import Header from "@/components/header";

export default function Home() {
  return (
    <div className="min-h-full flex flex-col">
      <Navbar />
      <Header />
    </div>
  );
}
