
import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { TrustedPartners } from "@/components/sections/TrustedPartners";
import { CallToAction } from "@/components/sections/CallToAction";
import { OnboardingSection } from "@/components/sections/OnboardingSection";
import { Footer } from "@/components/layout/Footer";

const Index = () => {
  return (
    <main className="flex flex-col min-h-screen bg-black text-white">
      <header>
        <Navbar />
      </header>
      
      <div className="flex flex-col gap-6 px-8 py-2 max-sm:px-4 max-sm:py-1 flex-1">
        <Hero />
        <OnboardingSection />
        
        <div className="flex-1">
          <TrustedPartners />
          <CallToAction />
        </div>
      </div>
      
      <Footer />
    </main>
  );
};

export default Index;
