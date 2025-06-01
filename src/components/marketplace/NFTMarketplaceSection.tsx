import React, { useState, useEffect } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Package, Tag, ShoppingCart } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useWriteContract, useWaitForTransactionReceipt, useAccount } from "wagmi";
import { mainnet } from "wagmi/chains";

// Mock NFT data with real images mapped by collection and rarity
const mockNFTs = [
  {
    id: 1,
    name: "Golden Striker",
    image: "/lovable-uploads/fa9a2fdc-8d89-438a-97ef-bebe851f5a32.png",
    price: 50000000000000000,// 0.05 BNB
    rarity: "Legendary",
    collection: "Premier League",
    seller: "0x1234...5678"
  },
  {
    id: 2,
    name: "Midfield Maestro",
    image: "/lovable-uploads/3ff138cd-7347-4885-a303-e03841fb166c.png",
    price: 30000000000000000, // 0.03 BNB
    rarity: "Rare",
    collection: "La Liga",
    seller: "0x8765...4321"
  },
  {
    id: 3,
    name: "Top Defender",
    image: "/lovable-uploads/92627ff6-fee9-43e4-af64-9fcfcf4e34f3.png",
    price: 200000000000000, // 0.02 BNB
    rarity: "Uncommon",
    collection: "Serie A",
    seller: "0x5432...8765"
  },
  {
    id: 4,
    name: "Star Goalkeeper",
    image: "/lovable-uploads/26dc6bd3-e9df-4644-8cec-affbf6c79319.png",
    price: 40000000000000000, // 0.04 BNB
    rarity: "Rare",
    collection: "Bundesliga",
    seller: "0x9876...5432"
  },
  {
    id: 5,
    name: "Team Captain",
    image: "/lovable-uploads/edda13e2-4967-47b2-922a-11d95d8c5a24.png",
    price: 60000000000000000, // 0.06 BNB
    rarity: "Legendary",
    collection: "Premier League",
    seller: "0x2468...1357"
  },
];

// Rarity color mapping
const rarityColors = {
  Common: "bg-gray-400",
  Uncommon: "bg-green-500",
  Rare: "bg-yellow-400",
  Legendary: "bg-yellow-400"
};

export const NFTMarketplaceSection = () => {
  // Estados para filtro e busca
  const [filteredNFTs, setFilteredNFTs] = useState(mockNFTs);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 0.1]);
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
  const [openDialogId, setOpenDialogId] = useState<number | null>(null);

  // Hooks do wagmi
  const { address } = useAccount();

  //Read Smart Contract - Fund()
  const {
    writeContract,
    data: hash,
    error,
    isPending
  } = useWriteContract()
  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
  } = useWaitForTransactionReceipt({
    hash,
  })

  function handleFund({ _value }: { _value: bigint }) {
    // Convert ETH to wei
    writeContract({
      address: "0xeE38F69e1e5d08d0A88901740186e0A5186A59Fa",
      abi: [
        {
          "type": "function",
          "name": "fund",
          "inputs": [],
          "outputs": [],
          "stateMutability": "payable"
        }
      ],
      functionName: "fund",
      args: [],
      value: _value,
      account: address,
      chain: mainnet,
    })
  }

  // Get unique collections for filter
  const collections = Array.from(new Set(mockNFTs.map(nft => nft.collection)));

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    filterNFTs(e.target.value, priceRange, selectedCollection);
  };

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
    filterNFTs(searchQuery, value, selectedCollection);
  };

  const handleCollectionFilter = (collection: string) => {
    const newSelected = selectedCollection === collection ? null : collection;
    setSelectedCollection(newSelected);
    filterNFTs(searchQuery, priceRange, newSelected);
  };

  const filterNFTs = (query: string, price: number[], collection: string | null) => {
    let result = mockNFTs;

    // Filter by search query
    if (query) {
      result = result.filter(nft =>
        nft.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Filter by price range
    result = result.filter(nft =>
      nft.price >= price[0] && nft.price <= price[1]
    );

    // Filter by collection
    if (collection) {
      result = result.filter(nft => nft.collection === collection);
    }

    setFilteredNFTs(result);
  };

  // Scroll to top when dialog opens
  useEffect(() => {
    if (openDialogId !== null) {
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    }
  }, [openDialogId]);

  const handleOpenDialog = (nftId: number) => {
    setOpenDialogId(nftId);
  };

  const handleCloseDialog = () => {
    setOpenDialogId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex-1 min-w-[300px]">
          <Input
            placeholder="Search NFTs..."
            value={searchQuery}
            onChange={handleSearch}
            className="bg-[#111] border-[#333] text-white placeholder:text-white"
          />
        </div>

        <div className="flex flex-col gap-2 min-w-[200px]">
          <span className="text-sm text-white">Price Range (BNB): {priceRange[0].toFixed(2)} - {priceRange[1].toFixed(2)}</span>
          <Slider
            defaultValue={[0, 0.1]}
            max={0.1}
            step={0.01}
            value={priceRange}
            onValueChange={handlePriceChange}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <div className="text-sm mr-2 flex items-center text-white">
          <Tag size={16} className="mr-1" /> Collections:
        </div>
        {collections.map(collection => (
          <Badge
            key={collection}
            variant={selectedCollection === collection ? "default" : "outline"}
            className="cursor-pointer hover:bg-[#333] transition-colors text-white border-[#333]"
            onClick={() => handleCollectionFilter(collection)}
          >
            {collection}
          </Badge>
        ))}
      </div>

      <Separator className="my-4 bg-[#333]" />

      {filteredNFTs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNFTs.map((nft) => (
            <Card key={nft.id} className="bg-[#111] border-[#333] overflow-hidden">
              <div className="p-4">
                <AspectRatio ratio={1 / 1}>
                  <img
                    src={nft.image}
                    alt={nft.name}
                    className="rounded-md object-cover w-full h-full"
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
                <p className="text-sm text-white">Seller: {nft.seller}</p>
              </CardContent>
              <CardFooter className="flex justify-between items-center bg-[#0a0a0a] border-t border-[#333] p-4">
                <div className="font-semibold text-white">{nft.price * 1e-18} BNB</div>

                <Dialog open={openDialogId === nft.id} onOpenChange={(open) => open ? handleOpenDialog(nft.id) : handleCloseDialog()}>
                  <Button size="sm" onClick={() => handleOpenDialog(nft.id)}>
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Buy Now
                  </Button>
                  <DialogContent className="bg-[#111] border-[#333] text-white">
                    <DialogHeader>
                      <DialogTitle className="text-white">Purchase NFT</DialogTitle>
                      <DialogDescription className="text-white">
                        You are about to purchase {nft.name} for {nft.price * 1e-18} BNB.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <div className="flex items-center justify-center mb-4">
                        <img
                          src={nft.image}
                          alt={nft.name}
                          className="w-32 h-32 rounded-md"
                        />
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-white">Item Price:</span>
                          <span className="text-white">{nft.price * 1e-18} BNB</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white">Platform Fee:</span>
                          <span className="text-white">{(nft.price * 0.025 * 1e-18).toFixed(4)} BNB</span>
                        </div>
                        <Separator className="my-2 bg-[#333]" />
                        <div className="flex justify-between font-bold">
                          <span className="text-white">Total:</span>
                          <span className="text-white">{(nft.price * 1.025 * 1e-18).toFixed(4)} BNB</span>
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" className="border-[#333] text-white" onClick={handleCloseDialog}>Cancel</Button>
                      <Button 
                        onClick={() => handleFund({ _value: BigInt(Math.floor(nft.price * 1.025)) })}
                        disabled={isPending || isConfirming || isConfirmed || !address}
                        className="bg-[#FFEB3B] text-black hover:bg-[#FFD700]"
                      >
                        {isPending
                          ? "Processing..."
                          : isConfirming
                            ? "Waiting for confirmation..."
                            : isConfirmed
                              ? "Transaction confirmed!"
                              : !address
                                ? "Connect Wallet"
                                : "Confirm Purchase"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-white">No NFTs found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};
