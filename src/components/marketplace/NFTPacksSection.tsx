
import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Package, PackageOpen, ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog, DialogContent, DialogDescription, DialogFooter, 
  DialogHeader, DialogTitle, DialogTrigger 
} from "@/components/ui/dialog";

// Mock data for packs
const packs = [
  {
    id: 1,
    name: "Premier League Starter Pack",
    description: "Get started with 3 random Premier League NFTs",
    price: 0.05,
    image: "/placeholder.svg",
    containsRarity: ["Common", "Uncommon", "Rare"]
  },
  {
    id: 2,
    name: "Champions Elite Pack",
    description: "3 NFTs with higher chance of Rare and Legendary cards",
    price: 0.08,
    image: "/placeholder.svg",
    containsRarity: ["Uncommon", "Rare", "Legendary"]
  },
  {
    id: 3,
    name: "International Stars Pack",
    description: "3 NFTs featuring international soccer stars",
    price: 0.06,
    image: "/placeholder.svg",
    containsRarity: ["Common", "Uncommon", "Rare", "Legendary"]
  }
];

// Animation for pack opening
const PackOpeningAnimation = ({ onComplete }: { onComplete: () => void }) => {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="flex flex-col items-center justify-center py-10">
      <div className="relative w-64 h-64 animate-pulse">
        <PackageOpen className="w-full h-full text-[#FFEB3B]" />
      </div>
      <p className="mt-4 text-xl font-semibold animate-bounce">Opening your pack...</p>
    </div>
  );
};

// Mock NFTs that could be revealed
const possibleNFTs = [
  { id: 101, name: "Star Forward", rarity: "Rare", image: "/placeholder.svg" },
  { id: 102, name: "Defensive Wall", rarity: "Uncommon", image: "/placeholder.svg" },
  { id: 103, name: "Midfield General", rarity: "Common", image: "/placeholder.svg" },
  { id: 104, name: "Golden Boot", rarity: "Legendary", image: "/placeholder.svg" },
  { id: 105, name: "Rising Talent", rarity: "Common", image: "/placeholder.svg" },
  { id: 106, name: "Team Captain", rarity: "Rare", image: "/placeholder.svg" },
];

// Rarity color mapping
const rarityColors = {
  Common: "bg-gray-400",
  Uncommon: "bg-green-500",
  Rare: "bg-blue-500",
  Legendary: "bg-yellow-400"
};

export const NFTPacksSection = () => {
  const [isOpening, setIsOpening] = useState(false);
  const [revealedNFTs, setRevealedNFTs] = useState<any[]>([]);
  const [showRevealDialog, setShowRevealDialog] = useState(false);

  const handleOpenPack = () => {
    setIsOpening(true);
    setShowRevealDialog(true);
    
    // Simulate random NFT selection
    setTimeout(() => {
      const revealed = [];
      // Get 3 random NFTs from the possible NFTs
      for (let i = 0; i < 3; i++) {
        const randomIndex = Math.floor(Math.random() * possibleNFTs.length);
        revealed.push(possibleNFTs[randomIndex]);
      }
      setRevealedNFTs(revealed);
      setIsOpening(false);
    }, 3000);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">NFT Packs</h2>
        <p className="text-gray-400 mb-6">
          Purchase packs containing 3 random NFTs to complete your collection.
          Each pack has different odds of containing rare and legendary cards!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packs.map((pack) => (
          <Card key={pack.id} className="bg-[#111] border-[#333] overflow-hidden hover:border-[#FFEB3B] transition-colors">
            <div className="p-4">
              <AspectRatio ratio={4/3}>
                <div className="relative w-full h-full rounded-md overflow-hidden bg-[#0a0a0a] flex items-center justify-center">
                  <Package className="w-24 h-24 text-[#FFEB3B]" />
                  <img 
                    src={pack.image} 
                    alt={pack.name}
                    width="400"
                    height="300"
                    className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60"
                  />
                </div>
              </AspectRatio>
            </div>
            <CardHeader>
              <CardTitle>{pack.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400 mb-4">{pack.description}</p>
              <div className="flex flex-wrap gap-2 mb-2">
                <div className="text-sm text-gray-400">Contains:</div>
                {pack.containsRarity.map(rarity => (
                  <Badge 
                    key={rarity}
                    className={`${rarityColors[rarity as keyof typeof rarityColors]} text-black`}
                  >
                    {rarity}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center bg-[#0a0a0a] border-t border-[#333] p-4">
              <div className="font-semibold">{pack.price} ETH</div>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Buy Pack
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-[#111] border-[#333] text-white">
                  <DialogHeader>
                    <DialogTitle>Purchase Pack</DialogTitle>
                    <DialogDescription className="text-gray-400">
                      You are about to purchase {pack.name} for {pack.price} ETH.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4">
                    <div className="flex items-center justify-center mb-4">
                      <Package className="w-24 h-24 text-[#FFEB3B]" />
                    </div>
                    <p className="text-center mb-4">{pack.description}</p>
                    <div className="flex justify-center space-x-2 mb-4">
                      {pack.containsRarity.map(rarity => (
                        <Badge 
                          key={rarity}
                          className={`${rarityColors[rarity as keyof typeof rarityColors]} text-black`}
                        >
                          {rarity}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" className="border-[#333]">Cancel</Button>
                    <Button onClick={handleOpenPack}>
                      Purchase & Open
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* NFT Reveal Dialog */}
      <Dialog open={showRevealDialog} onOpenChange={setShowRevealDialog}>
        <DialogContent className="bg-[#111] border-[#333] text-white max-w-3xl">
          <DialogHeader>
            <DialogTitle>{isOpening ? "Opening Pack" : "Your New NFTs!"}</DialogTitle>
          </DialogHeader>

          {isOpening ? (
            <PackOpeningAnimation onComplete={() => {}} />
          ) : (
            <div className="py-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {revealedNFTs.map((nft) => (
                  <Card key={nft.id} className="bg-[#1a1a1a] border-[#333]">
                    <div className="p-3">
                      <AspectRatio ratio={1/1}>
                        <img 
                          src={nft.image} 
                          alt={nft.name}
                          width="400"
                          height="400"
                          className="rounded-md object-cover w-full h-full"
                        />
                      </AspectRatio>
                    </div>
                    <CardContent className="p-3">
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold">{nft.name}</h3>
                        <Badge className={`${rarityColors[nft.rarity as keyof typeof rarityColors]} text-black`}>
                          {nft.rarity}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="text-center mt-6">
                <p className="text-gray-400 mb-4">
                  These NFTs have been added to your collection!
                </p>
                <Button onClick={() => setShowRevealDialog(false)}>
                  Continue
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
