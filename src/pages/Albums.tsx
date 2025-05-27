
import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { Plus } from "lucide-react";
import { toast } from "sonner";

interface StickerProps {
  id: number;
  isPlaced: boolean;
  imageUrl?: string;
  playerName?: string;
  team?: string;
}

const Albums = () => {
  const [stickers, setStickers] = useState<StickerProps[]>([
    { id: 1, isPlaced: true, imageUrl: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop", playerName: "M. Silva", team: "Brazil" },
    { id: 2, isPlaced: false },
    { id: 3, isPlaced: true, imageUrl: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop", playerName: "K. Mbappé", team: "France" },
    { id: 4, isPlaced: false },
    { id: 5, isPlaced: false },
    { id: 6, isPlaced: true, imageUrl: "https://images.unsplash.com/photo-1624280157150-4d1ed8cbb5d3?auto=format&fit=crop", playerName: "L. Messi", team: "Argentina" },
    { id: 7, isPlaced: false },
    { id: 8, isPlaced: true, imageUrl: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop", playerName: "C. Ronaldo", team: "Portugal" },
    { id: 9, isPlaced: false },
    { id: 10, isPlaced: false },
    { id: 11, isPlaced: false },
    { id: 12, isPlaced: false },
  ]);

  const placeSticker = (id: number) => {
    setStickers(
      stickers.map((sticker) => {
        if (sticker.id === id) {
          // Optimized image URLs for smaller payloads
          const soccerImages = [
            "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop",
            "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop",
            "https://images.unsplash.com/photo-1624280157150-4d1ed8cbb5d3?auto=format&fit=crop",
            "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop"
          ];
          
          const playerNames = ["A. Martinez", "N. Williams", "J. Bellingham", "R. Lewandowski", "V. van Dijk", "T. Kroos", "K. De Bruyne"];
          const teams = ["Argentina", "Spain", "England", "Poland", "Netherlands", "Germany", "Belgium"];
          
          const randomImage = soccerImages[Math.floor(Math.random() * soccerImages.length)];
          const randomPlayerName = playerNames[Math.floor(Math.random() * playerNames.length)];
          const randomTeam = teams[Math.floor(Math.random() * teams.length)];
          
          toast.success(`${randomPlayerName} sticker placed successfully!`);
          return { 
            ...sticker, 
            isPlaced: true, 
            imageUrl: randomImage,
            playerName: randomPlayerName,
            team: randomTeam
          };
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
        <h1 className="text-3xl font-bold mb-8">My Soccer Stars Collection</h1>
        
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">World Cup Legends</h2>
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
                        <div className="relative w-full h-full">
                          <OptimizedImage
                            src={sticker.imageUrl!}
                            alt={`${sticker.playerName} sticker`}
                            width={150}
                            height={200}
                            quality={60}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                            <p className="text-white font-bold text-sm">{sticker.playerName}</p>
                            <p className="text-[#FFEB3B] text-xs">{sticker.team}</p>
                          </div>
                        </div>
                      ) : (
                        <div className="bg-gray-800 w-full h-full flex flex-col items-center justify-center">
                          <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center mb-2">
                            <span className="text-lg font-bold opacity-30">#{sticker.id}</span>
                          </div>
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
