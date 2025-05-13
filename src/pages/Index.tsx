import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { NFTCollection } from "@/components/sections/NFTCollection";
import { TrustedPartners } from "@/components/sections/TrustedPartners";
import { CallToAction } from "@/components/sections/CallToAction";

const Index = () => {
  return (
    <main className="flex flex-col min-h-screen bg-black text-white">
      <header>
        <Navbar />
      </header>
      
      <div className="flex flex-col gap-12 px-8 py-12 max-sm:px-4">
        <Hero />
        
        <div className="flex-1">
          <NFTCollection />
          <div className="mt-12">
            <TrustedPartners />
            <CallToAction />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Index;
