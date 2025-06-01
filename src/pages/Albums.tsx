
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
          <h1 className="text-3xl font-bold">Albums</h1>
          <Link to="/album-lab">
            <Button>Create New Album</Button>
          </Link>
        </div>

        <Tabs defaultValue="collection" className="w-full">
          <TabsList className="mb-8 bg-[#111] border border-[#333]">
            <TabsTrigger 
              value="collection"
              className="text-white data-[state=active]:bg-[#FFEB3B] data-[state=active]:text-black"
            >
              Minha Coleção
            </TabsTrigger>
            <TabsTrigger 
              value="my-albums"
              className="text-white data-[state=active]:bg-[#FFEB3B] data-[state=active]:text-black"
            >
              Meus Albums
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
