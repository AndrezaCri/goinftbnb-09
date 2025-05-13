
import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { DashboardNav } from "@/components/sections/DashboardNav";
import { Plus } from "lucide-react";
import { toast } from "sonner";

interface StickerProps {
  id: number;
  isPlaced: boolean;
  imageUrl?: string;
}

const Albums = () => {
  const [stickers, setStickers] = useState<StickerProps[]>([
    { id: 1, isPlaced: true, imageUrl: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=300" },
    { id: 2, isPlaced: false },
    { id: 3, isPlaced: true, imageUrl: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=300" },
    { id: 4, isPlaced: false },
    { id: 5, isPlaced: false },
    { id: 6, isPlaced: true, imageUrl: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?auto=format&fit=crop&w=300" },
    { id: 7, isPlaced: false },
    { id: 8, isPlaced: true, imageUrl: "https://images.unsplash.com/photo-1501286353178-1ec871214838?auto=format&fit=crop&w=300" },
    { id: 9, isPlaced: false },
    { id: 10, isPlaced: false },
    { id: 11, isPlaced: false },
    { id: 12, isPlaced: false },
  ]);

  const placeSticker = (id: number) => {
    setStickers(
      stickers.map((sticker) => {
        if (sticker.id === id) {
          // Randomly select a sticker image for demonstration
          const images = [
            "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=300",
            "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=300",
            "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?auto=format&fit=crop&w=300",
            "https://images.unsplash.com/photo-1501286353178-1ec871214838?auto=format&fit=crop&w=300"
          ];
          const randomImage = images[Math.floor(Math.random() * images.length)];
          
          toast.success(`Sticker #${id} placed successfully!`);
          return { ...sticker, isPlaced: true, imageUrl: randomImage };
        }
        return sticker;
      })
    );
  };

  const completionPercentage = Math.round(
    (stickers.filter((s) => s.isPlaced).length / stickers.length) * 100
  );

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <Navbar />
      
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">My NFT Albums</h1>
        
        <DashboardNav />
        
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Animal Collection</h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-300">
                {stickers.filter(s => s.isPlaced).length} / {stickers.length} collected
              </span>
              <span className="text-sm font-medium text-[#FFEB3B]">{completionPercentage}%</span>
            </div>
          </div>
          
          <div className="w-full mb-8">
            <Progress value={completionPercentage} className="h-2 bg-gray-700" />
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {stickers.map((sticker) => (
              <Card 
                key={sticker.id}
                className={`overflow-hidden border ${
                  sticker.isPlaced ? "border-[#FFEB3B]" : "border-gray-700"
                }`}
              >
                <CardContent className="p-2">
                  <AspectRatio ratio={3/4} className="overflow-hidden">
                    <div className="w-full h-full rounded-sm flex items-center justify-center">
                      {sticker.isPlaced ? (
                        <img 
                          src={sticker.imageUrl} 
                          alt={`Sticker ${sticker.id}`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="bg-gray-800 w-full h-full flex flex-col items-center justify-center">
                          <span className="text-lg font-bold opacity-30">#{sticker.id}</span>
                          <Button 
                            variant="outline" 
                            className="mt-2 border-[#FFEB3B] text-[#FFEB3B] hover:bg-[#FFEB3B]/20"
                            onClick={() => placeSticker(sticker.id)}
                          >
                            <Plus className="h-4 w-4 mr-1" />
                            Stick
                          </Button>
                        </div>
                      )}
                    </div>
                  </AspectRatio>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs font-medium">#{sticker.id}</span>
                    <span className={`text-xs ${sticker.isPlaced ? "text-[#FFEB3B]" : "text-gray-400"}`}>
                      {sticker.isPlaced ? "Collected" : "Empty"}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Albums;
