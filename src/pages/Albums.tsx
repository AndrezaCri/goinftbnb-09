import React, { useState, useMemo, useCallback } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { LazyIcon } from "@/components/ui/lazy-icon";
import { toast } from "sonner";

interface StickerProps {
  id: number;
  isPlaced: boolean;
  imageUrl?: string;
  playerName?: string;
  team?: string;
}

// Memoized empty sticker component
const EmptySticker = React.memo(({ sticker, onPlace }: { sticker: StickerProps; onPlace: (id: number) => void }) => (
  <div className="bg-gray-800 w-full h-full flex flex-col items-center justify-center">
    <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center mb-2">
      <span className="text-lg font-bold opacity-30">#{sticker.id}</span>
    </div>
    <Button 
      variant="outline" 
      className="mt-2 border-[#FFEB3B] text-[#FFEB3B] hover:bg-[#FFEB3B]/20"
      onClick={() => onPlace(sticker.id)}
    >
      <LazyIcon name="Plus" className="h-4 w-4 mr-1" />
      Stick
    </Button>
  </div>
));

// Memoized placed sticker component
const PlacedSticker = React.memo(({ sticker }: { sticker: StickerProps }) => (
  <div className="relative w-full h-full">
    <OptimizedImage
      src={sticker.imageUrl!}
      alt={`${sticker.playerName} sticker`}
      width={150}
      height={200}
      quality={50}
      className="w-full h-full object-cover"
      loading="lazy"
    />
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
      <p className="text-white font-bold text-sm truncate">{sticker.playerName}</p>
      <p className="text-[#FFEB3B] text-xs truncate">{sticker.team}</p>
    </div>
  </div>
));

const Albums = () => {
  const [stickers, setStickers] = useState<StickerProps[]>(() => [
    { id: 1, isPlaced: true, imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b", playerName: "M. Silva", team: "Brazil" },
    { id: 2, isPlaced: false },
    { id: 3, isPlaced: true, imageUrl: "https://images.unsplash.com/photo-1574680096145-d05b474e2155", playerName: "K. Mbappé", team: "France" },
    { id: 4, isPlaced: false },
    { id: 5, isPlaced: false },
    { id: 6, isPlaced: true, imageUrl: "https://images.unsplash.com/photo-1553778263-73a83bab9b0c", playerName: "L. Messi", team: "Argentina" },
    { id: 7, isPlaced: false },
    { id: 8, isPlaced: true, imageUrl: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12", playerName: "C. Ronaldo", team: "Portugal" },
    { id: 9, isPlaced: false },
    { id: 10, isPlaced: false },
    { id: 11, isPlaced: false },
    { id: 12, isPlaced: false },
  ]);

  // Memoize expensive calculations
  const completionStats = useMemo(() => {
    const placedCount = stickers.filter(s => s.isPlaced).length;
    const total = stickers.length;
    const percentage = Math.round((placedCount / total) * 100);
    
    return { placedCount, total, percentage };
  }, [stickers]);

  // Memoize random data arrays with updated URLs
  const randomData = useMemo(() => ({
    images: [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b",
      "https://images.unsplash.com/photo-1574680096145-d05b474e2155",
      "https://images.unsplash.com/photo-1553778263-73a83bab9b0c",
      "https://images.unsplash.com/photo-1560272564-c83b66b1ad12",
      "https://images.unsplash.com/photo-1589487391730-58f20eb2c308",
      "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d"
    ],
    playerNames: ["A. Martinez", "N. Williams", "J. Bellingham", "R. Lewandowski", "V. van Dijk", "T. Kroos", "K. De Bruyne"],
    teams: ["Argentina", "Spain", "England", "Poland", "Netherlands", "Germany", "Belgium"]
  }), []);

  const placeSticker = useCallback((id: number) => {
    setStickers(prevStickers => 
      prevStickers.map((sticker) => {
        if (sticker.id === id) {
          const randomImage = randomData.images[Math.floor(Math.random() * randomData.images.length)];
          const randomPlayerName = randomData.playerNames[Math.floor(Math.random() * randomData.playerNames.length)];
          const randomTeam = randomData.teams[Math.floor(Math.random() * randomData.teams.length)];
          
          toast.success(`${randomPlayerName} sticker placed!`);
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
  }, [randomData]);

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
                {completionStats.placedCount} / {completionStats.total}
              </span>
              <span className="text-sm font-medium text-[#FFEB3B]">{completionStats.percentage}%</span>
            </div>
          </div>
          
          <Progress value={completionStats.percentage} className="h-2 bg-gray-700 mb-8" />
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {stickers.map((sticker) => (
              <Card 
                key={sticker.id}
                className={`overflow-hidden border transition-colors ${
                  sticker.isPlaced ? "border-[#FFEB3B]" : "border-gray-700"
                }`}
              >
                <CardContent className="p-2">
                  <AspectRatio ratio={3/4} className="overflow-hidden">
                    <div className="w-full h-full rounded-sm flex items-center justify-center">
                      {sticker.isPlaced ? (
                        <PlacedSticker sticker={sticker} />
                      ) : (
                        <EmptySticker sticker={sticker} onPlace={placeSticker} />
                      )}
                    </div>
                  </AspectRatio>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs font-medium">#{sticker.id}</span>
                    <span className={`text-xs ${sticker.isPlaced ? "text-[#FFEB3B]" : "text-gray-400"}`}>
                      {sticker.isPlaced ? "✓" : "○"}
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
