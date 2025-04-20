"use client";

import Navbar from "@/components/navbar";
import Header from "@/components/header";
import SpotlightCard from "@/components/spotlight";

export default function Home() {
  return (
    <div className="min-h-full flex flex-col">
      <SpotlightCard>
        <Navbar />
        <Header />
      </SpotlightCard>
    </div>
  );
}
