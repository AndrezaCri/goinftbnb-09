
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
    <main className="flex flex-col min-h-screen bg-black text-white">
      <header>
        <Navbar />
      </header>

      <div className="container mx-auto p-8 max-sm:p-4">
        <h1 className="text-4xl font-bold mb-6">NFT Marketplace</h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-8 bg-[#111] border border-[#333]">
            <TabsTrigger value="browse">Navegar no Mercado</TabsTrigger>
            <TabsTrigger value="packs">Pacotes NFT</TabsTrigger>
            <TabsTrigger value="trading">Sistema de Trocas</TabsTrigger>
            <TabsTrigger value="my-listings">Minhas Listagens</TabsTrigger>
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
      </div>
    </main>
  );
};

export default Marketplace;
