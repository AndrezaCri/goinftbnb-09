
import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NFTMarketplaceSection } from "@/components/marketplace/NFTMarketplaceSection";
import { NFTPacksSection } from "@/components/marketplace/NFTPacksSection";
import { MyListingsSection } from "@/components/marketplace/MyListingsSection";

const Marketplace = () => {
  return (
    <main className="flex flex-col min-h-screen bg-black text-white">
      <header>
        <Navbar />
      </header>

      <div className="container mx-auto p-8 max-sm:p-4">
        <h1 className="text-4xl font-bold mb-6">NFT Marketplace</h1>
        
        <Tabs defaultValue="browse" className="w-full">
          <TabsList className="mb-8 bg-[#111] border border-[#333]">
            <TabsTrigger value="browse">Browse Market</TabsTrigger>
            <TabsTrigger value="packs">NFT Packs</TabsTrigger>
            <TabsTrigger value="my-listings">My Listings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="browse">
            <NFTMarketplaceSection />
          </TabsContent>
          
          <TabsContent value="packs">
            <NFTPacksSection />
          </TabsContent>
          
          <TabsContent value="my-listings">
            <MyListingsSection />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default Marketplace;
