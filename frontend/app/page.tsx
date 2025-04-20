"use client";

import Navbar from "@/components/navbar";
import Header from "@/components/header";
import SpotlightCard from "@/components/spotlight";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";

export default function Home() {
  return (
    <div className="min-h-full flex flex-col">
      <ShootingStars />
      <StarsBackground starDensity={0.00055} />
      <SpotlightCard>
        <Navbar />
        <Header />
      </SpotlightCard>
    </div>
  );
}
