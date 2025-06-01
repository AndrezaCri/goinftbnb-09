import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { NFTCollateral } from '@/pages/Borrowing';

interface NFTCollateralSelectorProps {
  onNFTSelect: (nft: NFTCollateral) => void;
}

export const NFTCollateralSelector: React.FC<NFTCollateralSelectorProps> = ({ onNFTSelect }) => {
  // Mock NFT data - in a real app, this would come from a wallet connection
  const mockNFTs: NFTCollateral[] = [
    {
      id: '1',
      name: 'Bored Ape #1234',
      collection: 'Bored Ape Yacht Club',
      image: '/placeholder.svg',
      floorPrice: 45000,
      estimatedValue: 52000,
      isRare: true
    },
    {
      id: '2',
      name: 'CryptoPunk #5678',
      collection: 'CryptoPunks',
      image: '/placeholder.svg',
      floorPrice: 85000,
      estimatedValue: 95000,
      isRare: true
    },
    {
      id: '3',
      name: 'Mutant Ape #9999',
      collection: 'Mutant Ape Yacht Club',
      image: '/placeholder.svg',
      floorPrice: 12000,
      estimatedValue: 15000,
      isRare: false
    },
    {
      id: '4',
      name: 'Azuki #4567',
      collection: 'Azuki',
      image: '/placeholder.svg',
      floorPrice: 8500,
      estimatedValue: 10200,
      isRare: true
    }
  ];

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
    <Card>
      <CardHeader>
        <CardTitle>Select NFT Collateral</CardTitle>
        <CardDescription>
          Choose which NFT you'd like to use as collateral for your loan
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {mockNFTs.map((nft) => (
            <div
              key={nft.id}
              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                selectedNFT?.id === nft.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
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
                  <h3 className="font-semibold truncate">{nft.name}</h3>
                  {nft.isRare && (
                    <Badge variant="secondary" className="text-xs">Rare</Badge>
                  )}
                </div>
                <p className="text-sm text-gray-600">{nft.collection}</p>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Estimated Value:</span>
                    <span className="font-medium">${nft.estimatedValue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Max Loan:</span>
                    <span className="font-medium text-green-600">
                      ${getMaxLoanAmount(nft).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedNFT && (
          <div className="border-t pt-4">
            <div className="bg-blue-50 rounded-lg p-4 mb-4">
              <h4 className="font-semibold mb-2">Selected NFT Details</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Collection:</span>
                  <p className="font-medium">{selectedNFT.collection}</p>
                </div>
                <div>
                  <span className="text-gray-600">Floor Price:</span>
                  <p className="font-medium">${selectedNFT.floorPrice.toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-gray-600">Estimated Value:</span>
                  <p className="font-medium">${selectedNFT.estimatedValue.toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-gray-600">Maximum Loan:</span>
                  <p className="font-medium text-green-600">
                    ${getMaxLoanAmount(selectedNFT).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
            <Button onClick={handleConfirm} className="w-full">
              Continue with {selectedNFT.name}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};