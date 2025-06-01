
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NFTMarketplaceSection } from "@/components/marketplace/NFTMarketplaceSection";
import { NFTPacksSection } from "@/components/marketplace/NFTPacksSection";
import { MyListingsSection } from "@/components/marketplace/MyListingsSection";
import { TradingSystemSection } from "@/components/marketplace/TradingSystemSection";

const Marketplace = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState("browse");

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab === "packs") {
      setActiveTab("packs");
    } else if (tab === "trading") {
      setActiveTab("trading");
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">NFT Marketplace</h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-8 bg-[#111] border border-[#333]">
            <TabsTrigger 
              value="browse"
              className="text-white data-[state=active]:bg-[#FFEB3B] data-[state=active]:text-black"
            >
              Navegar no Mercado
            </TabsTrigger>
            <TabsTrigger 
              value="packs"
              className="text-white data-[state=active]:bg-[#FFEB3B] data-[state=active]:text-black"
            >
              Pacotes NFT
            </TabsTrigger>
            <TabsTrigger 
              value="trading"
              className="text-white data-[state=active]:bg-[#FFEB3B] data-[state=active]:text-black"
            >
              Sistema de Trocas
            </TabsTrigger>
            <TabsTrigger 
              value="my-listings"
              className="text-white data-[state=active]:bg-[#FFEB3B] data-[state=active]:text-black"
            >
              Minhas Listagens
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="browse">
            <NFTMarketplaceSection />
          </TabsContent>
          
          <TabsContent value="packs">
            <NFTPacksSection />
          </TabsContent>
          
          <TabsContent value="trading">
            <TradingSystemSection />
          </TabsContent>
          
          <TabsContent value="my-listings">
            <MyListingsSection />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Marketplace;
