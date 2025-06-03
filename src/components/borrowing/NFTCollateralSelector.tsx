
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { NFTCollateral } from '@/pages/Borrowing';

interface NFTCollateralSelectorProps {
  onNFTSelect: (nft: NFTCollateral) => void;
}

export const NFTCollateralSelector: React.FC<NFTCollateralSelectorProps> = ({
  onNFTSelect
}) => {
  // Mock NFT data with non-logo images
  const mockNFTs: NFTCollateral[] = [{
    id: '1',
    name: 'Neymar #1234',
    collection: 'Neymar Collection',
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=400&fit=crop&auto=format',
    floorPrice: 45000,
    estimatedValue: 52000,
    isRare: true
  }, {
    id: '2',
    name: 'Marta #5678',
    collection: 'Marta Collection',
    image: 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=400&h=400&fit=crop&auto=format',
    floorPrice: 85000,
    estimatedValue: 95000,
    isRare: true
  }, {
    id: '3',
    name: 'Cristiano Ronaldo #9999',
    collection: 'Cristiano Ronaldo Collection',
    image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=400&h=400&fit=crop&auto=format',
    floorPrice: 12000,
    estimatedValue: 15000,
    isRare: false
  }, {
    id: '4',
    name: 'Messi #4567',
    collection: 'Messi Collection',
    image: 'https://images.unsplash.com/photo-1458668383970-8ddd3927deed?w=400&h=400&fit=crop&auto=format',
    floorPrice: 8500,
    estimatedValue: 10200,
    isRare: true
  }];

  const [selectedNFT, setSelectedNFT] = useState<NFTCollateral | null>(null);

  const handleSelect = (nft: NFTCollateral) => {
    setSelectedNFT(nft);
  };

  const handleConfirm = () => {
    if (selectedNFT) {
      onNFTSelect(selectedNFT);
    }
  };

  const getMaxLoanAmount = (nft: NFTCollateral) => {
    return Math.floor(nft.estimatedValue * 0.6); // 60% LTV
  };

  return (
    <Card className="bg-[#111] border-[#333] text-white">
      <CardHeader>
        <CardTitle className="text-white">Select NFT Collateral</CardTitle>
        <CardDescription className="text-gray-400">
          Choose which NFT you'd like to use as collateral for your loan
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {mockNFTs.map(nft => (
            <div
              key={nft.id}
              className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                selectedNFT?.id === nft.id 
                  ? 'border-[#FFEB3B] bg-[#FFEB3B]/10' 
                  : 'border-[#FFEB3B] hover:border-[#FFEB3B] hover:bg-[#FFEB3B]/5'
              }`}
              onClick={() => handleSelect(nft)}
            >
              <img
                src={nft.image}
                alt={nft.name}
                className="w-full h-48 object-cover rounded-lg mb-3"
              />
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold truncate text-white">{nft.name}</h3>
                  {nft.isRare && (
                    <Badge variant="secondary" className="text-xs bg-[#FFEB3B] text-black">
                      Rare
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-gray-400">{nft.collection}</p>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Estimated Value:</span>
                    <span className="font-medium text-white">${nft.estimatedValue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Max Loan:</span>
                    <span className="font-medium text-[#FFEB3B]">
                      ${getMaxLoanAmount(nft).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedNFT && (
          <div className="border-t border-[#333] pt-4">
            <div className="bg-[#FFEB3B]/10 border border-[#FFEB3B] rounded-lg p-4 mb-4">
              <h4 className="font-semibold mb-2 text-white">Selected NFT Details</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Collection:</span>
                  <p className="font-medium text-white">{selectedNFT.collection}</p>
                </div>
                <div>
                  <span className="text-gray-400">Floor Price:</span>
                  <p className="font-medium text-white">${selectedNFT.floorPrice.toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-gray-400">Estimated Value:</span>
                  <p className="font-medium text-white">${selectedNFT.estimatedValue.toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-gray-400">Maximum Loan:</span>
                  <p className="font-medium text-[#FFEB3B]">
                    ${getMaxLoanAmount(selectedNFT).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
            <Button 
              onClick={handleConfirm} 
              className="w-full bg-[#FFEB3B] text-black hover:bg-[#E6D136]"
            >
              Continue with {selectedNFT.name}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
