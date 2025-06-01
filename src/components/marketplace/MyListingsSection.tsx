import React, { useState, useEffect } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tag, Pencil, Trash2, Package } from "lucide-react";
import { 
  Dialog, DialogContent, DialogDescription, DialogFooter, 
  DialogHeader, DialogTitle, DialogTrigger 
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for my NFTs
const myNFTs = [
  { 
    id: 1, 
    name: "Speedy Winger", 
    image: "/lovable-uploads/fa9a2fdc-8d89-438a-97ef-bebe851f5a32.png", 
    collection: "Premier League",
    rarity: "Rare",
    listed: true,
    price: 0.045
  },
  { 
    id: 2, 
    name: "Captain's Armband", 
    image: "/lovable-uploads/5d66beca-ee47-4a4e-a404-dc84aa62883f.png", 
    collection: "La Liga",
    rarity: "Uncommon",
    listed: true,
    price: 0.025
  },
  { 
    id: 3, 
    name: "Golden Trophy", 
    image: "/lovable-uploads/48f299fc-e84b-45a2-94c9-a2654f4dffa6.png", 
    collection: "Champions League",
    rarity: "Legendary",
    listed: false,
    price: 0
  },
  { 
    id: 4, 
    name: "Team Jersey", 
    image: "/lovable-uploads/9760dfd8-0775-48ba-8fc6-859c8dfd1323.png", 
    collection: "Serie A",
    rarity: "Common",
    listed: false,
    price: 0
  },
];

// Rarity color mapping
const rarityColors = {
  Common: "bg-gray-400",
  Uncommon: "bg-green-500",
  Rare: "bg-yellow-400",
  Legendary: "bg-yellow-400"
};

export const MyListingsSection = () => {
  const [listings, setListings] = useState(myNFTs);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [listDialogOpen, setListDialogOpen] = useState(false);
  const [currentNFT, setCurrentNFT] = useState<any>(null);
  const [price, setPrice] = useState<string>("");
  
  const listedNFTs = listings.filter(nft => nft.listed);
  const unlistedNFTs = listings.filter(nft => !nft.listed);
  
  const handleEditPrice = (nft: any) => {
    setCurrentNFT(nft);
    setPrice(nft.price.toString());
    setEditDialogOpen(true);
  };
  
  const handleListNFT = (nft: any) => {
    setCurrentNFT(nft);
    setPrice("");
    setListDialogOpen(true);
  };
  
  const confirmPriceUpdate = () => {
    if (!currentNFT || !price || isNaN(parseFloat(price))) return;
    
    const updatedListings = listings.map(nft => {
      if (nft.id === currentNFT.id) {
        return { ...nft, price: parseFloat(price) };
      }
      return nft;
    });
    
    setListings(updatedListings);
    setEditDialogOpen(false);
    setCurrentNFT(null);
    setPrice("");
  };
  
  const confirmListing = () => {
    if (!currentNFT || !price || isNaN(parseFloat(price))) return;
    
    const updatedListings = listings.map(nft => {
      if (nft.id === currentNFT.id) {
        return { ...nft, listed: true, price: parseFloat(price) };
      }
      return nft;
    });
    
    setListings(updatedListings);
    setListDialogOpen(false);
    setCurrentNFT(null);
    setPrice("");
  };
  
  const removeListing = (id: number) => {
    const updatedListings = listings.map(nft => {
      if (nft.id === id) {
        return { ...nft, listed: false, price: 0 };
      }
      return nft;
    });
    
    setListings(updatedListings);
  };

  // Scroll to top when dialogs open
  useEffect(() => {
    if (editDialogOpen || listDialogOpen) {
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    }
  }, [editDialogOpen, listDialogOpen]);
  
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4 text-white">My NFT Listings</h2>
        <p className="text-white mb-6">
          Manage your NFTs. List items for sale or remove them from the marketplace.
        </p>
      </div>

      <Tabs defaultValue="listed" className="w-full">
        <TabsList className="mb-6 bg-[#111] border border-[#333]">
          <TabsTrigger value="listed" className="text-white">Listed NFTs ({listedNFTs.length})</TabsTrigger>
          <TabsTrigger value="unlisted" className="text-white">Not Listed ({unlistedNFTs.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="listed">
          {listedNFTs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {listedNFTs.map((nft) => (
                <Card key={nft.id} className="bg-[#111] border-[#333] overflow-hidden">
                  <div className="p-4">
                    <AspectRatio ratio={1/1}>
                      <img 
                        src={nft.image} 
                        alt={nft.name}
                        width="300"
                        height="300"
                        className="rounded-md object-cover w-full h-full"
                        loading="lazy"
                        decoding="async"
                      />
                    </AspectRatio>
                  </div>
                  <CardContent>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg text-white">{nft.name}</h3>
                      <Badge className={`${rarityColors[nft.rarity as keyof typeof rarityColors]} text-black`}>
                        {nft.rarity}
                      </Badge>
                    </div>
                    <p className="text-sm text-white mb-2">Collection: {nft.collection}</p>
                    <p className="text-sm font-semibold text-white">{nft.price} ETH</p>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center bg-[#0a0a0a] border-t border-[#333] p-4">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-[#333] text-black"
                      onClick={() => handleEditPrice(nft)}
                    >
                      <Pencil className="h-4 w-4 mr-1" />
                      Edit Price
                    </Button>
                    
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => removeListing(nft.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delist
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Package className="h-12 w-12 mx-auto text-white mb-4" />
              <p className="text-white">You don't have any NFTs listed for sale.</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="unlisted">
          {unlistedNFTs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {unlistedNFTs.map((nft) => (
                <Card key={nft.id} className="bg-[#111] border-[#333] overflow-hidden">
                  <div className="p-4">
                    <AspectRatio ratio={1/1}>
                      <img 
                        src={nft.image} 
                        alt={nft.name}
                        width="300"
                        height="300"
                        className="rounded-md object-cover w-full h-full"
                        loading="lazy"
                        decoding="async"
                      />
                    </AspectRatio>
                  </div>
                  <CardContent>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg text-white">{nft.name}</h3>
                      <Badge className={`${rarityColors[nft.rarity as keyof typeof rarityColors]} text-black`}>
                        {nft.rarity}
                      </Badge>
                    </div>
                    <p className="text-sm text-white mb-2">Collection: {nft.collection}</p>
                    <p className="text-sm text-white">Not listed</p>
                  </CardContent>
                  <CardFooter className="flex justify-center items-center bg-[#0a0a0a] border-t border-[#333] p-4">
                    <Button onClick={() => handleListNFT(nft)}>
                      <Tag className="h-4 w-4 mr-1" />
                      List for Sale
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Package className="h-12 w-12 mx-auto text-white mb-4" />
              <p className="text-white">You don't have any unlisted NFTs.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Edit Price Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="bg-[#111] border-[#333] text-white">
          <DialogHeader>
            <DialogTitle className="text-white">Update Listing Price</DialogTitle>
            <DialogDescription className="text-white">
              Enter a new price for {currentNFT?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {currentNFT && (
              <div className="flex items-center justify-center mb-4">
                <img 
                  src={currentNFT.image} 
                  alt={currentNFT.name}
                  width="128"
                  height="128"
                  className="w-32 h-32 rounded-md"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            )}
            <div className="flex items-center space-x-2 mb-4">
              <Input 
                type="number" 
                placeholder="Price in ETH"
                className="bg-[#0a0a0a] border-[#333] text-white placeholder:text-white"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <span className="text-white">ETH</span>
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="ghost" 
              className="bg-transparent border-none text-white hover:bg-white/10"
              onClick={() => setEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              className="bg-transparent border-none text-white hover:bg-white/10"
              onClick={confirmPriceUpdate}
            >
              Update Price
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* List NFT Dialog */}
      <Dialog open={listDialogOpen} onOpenChange={setListDialogOpen}>
        <DialogContent className="bg-[#111] border-[#333] text-white">
          <DialogHeader>
            <DialogTitle className="text-white">List NFT for Sale</DialogTitle>
            <DialogDescription className="text-white">
              Set a price for {currentNFT?.name} to list it on the marketplace.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {currentNFT && (
              <div className="flex items-center justify-center mb-4">
                <img 
                  src={currentNFT.image} 
                  alt={currentNFT.name}
                  width="128"
                  height="128"
                  className="w-32 h-32 rounded-md"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            )}
            <div className="flex items-center space-x-2 mb-4">
              <Input 
                type="number" 
                placeholder="Price in ETH"
                className="bg-[#0a0a0a] border-[#333] text-white placeholder:text-white"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <span className="text-white">ETH</span>
            </div>
            <p className="text-xs text-white">
              Platform fee: 2.5% of sale price
            </p>
          </div>
          <DialogFooter>
            <Button 
              variant="ghost" 
              className="bg-transparent border-none text-white hover:bg-white/10"
              onClick={() => setListDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              className="bg-transparent border-none text-white hover:bg-white/10"
              onClick={confirmListing}
            >
              List NFT
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
