
import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { TrustedPartners } from "@/components/sections/TrustedPartners";
import { CallToAction } from "@/components/sections/CallToAction";
import { OnboardingSection } from "@/components/sections/OnboardingSection";

const Index = () => {
  return (
    <main className="flex flex-col min-h-screen bg-black text-white">
      <header>
        <Navbar />
      </header>
      
      <div className="flex flex-col gap-8 px-8 py-4 max-sm:px-4 max-sm:py-2">
        <Hero />
        <OnboardingSection />
        
        <div className="flex-1">
          <TrustedPartners />
          <CallToAction />
        </div>
      </div>
    </main>
  );
};

export default Index;
