
import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { StickerCollection } from "@/components/albums/StickerCollection";
import { UserAlbumsSection } from "@/components/albums/UserAlbumsSection";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";

const Albums = () => {
  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold"></h1>
          <Link to="/album-lab">
            <Button></Button>
          </Link>
        </div>

        <Tabs defaultValue="collection" className="w-full">
          <TabsList className="mb-8 bg-[#111] border border-[#333]">
            <TabsTrigger 
              value="collection"
              className="data-[state=active]:bg-[#FFEB3B] data-[state=active]:text-black"
            >
            </TabsTrigger>
            <TabsTrigger 
              value="my-albums"
              className="data-[state=active]:bg-[#FFEB3B] data-[state=active]:text-black"
            >
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="collection">
            <StickerCollection />
          </TabsContent>
          
          <TabsContent value="my-albums">
            <UserAlbumsSection />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Albums;
