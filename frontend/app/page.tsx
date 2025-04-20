"use client";

import Navbar from "@/components/navbar";
import Header from "@/components/header";

export default function Home() {
  return (
    <div
      className="min-h-full flex flex-col"
      style={{
        background:
          "linear-gradient(to bottom, rgb(0, 0, 0), rgb(109, 28, 28))",
      }}>
      <Navbar />
      <Header />
    </div>
  );
}
