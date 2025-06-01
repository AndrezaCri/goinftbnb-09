import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { NFTCollateralSelector } from '@/components/borrowing/NFTCollateralSelector';
import { LoanTermsConfig } from '@/components/borrowing/LoanTermsConfig';
import { ActiveLoans } from '@/components/borrowing/ActiveLoans';
import { LoanProgress } from '@/components/borrowing/LoanProgress';
import { Navbar } from '@/components/layout/Navbar';

export interface NFTCollateral {
  id: string;
  name: string;
  collection: string;
  image: string;
  floorPrice: number;
  estimatedValue: number;
  isRare: boolean;
}

export interface LoanTerms {
  collateralNFT: NFTCollateral | null;
  borrowAmount: number;
  duration: number; // in days
  interestRate: number;
  liquidationThreshold: number;
}

export interface Loan {
  id: string;
  collateralNFT: NFTCollateral;
  borrowAmount: number;
  remainingAmount: number;
  duration: number;
  interestRate: number;
  startDate: Date;
  dueDate: Date;
  status: 'active' | 'overdue' | 'liquidated' | 'repaid';
  liquidationThreshold: number;
  currentLTV: number;
}

const Borrowing = () => {
  const [currentStep, setCurrentStep] = useState<'select' | 'terms' | 'confirm' | 'complete'>('select');
  const [loanTerms, setLoanTerms] = useState<LoanTerms>({
    collateralNFT: null,
    borrowAmount: 0,
    duration: 30,
    interestRate: 8.5,
    liquidationThreshold: 80
  });

  const handleNFTSelect = (nft: NFTCollateral) => {
    setLoanTerms(prev => ({ ...prev, collateralNFT: nft }));
    setCurrentStep('terms');
  };

  const handleTermsConfirm = (terms: Partial<LoanTerms>) => {
    setLoanTerms(prev => ({ ...prev, ...terms }));
    setCurrentStep('confirm');
  };

  const handleLoanConfirm = () => {
    // Here you would integrate with smart contracts
    console.log('Creating loan with terms:', loanTerms);
    setCurrentStep('complete');
  };

  const resetFlow = () => {
    setCurrentStep('select');
    setLoanTerms({
      collateralNFT: null,
      borrowAmount: 0,
      duration: 30,
      interestRate: 8.5,
      liquidationThreshold: 80
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Navbar />
      <div className="p-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">NFT-Backed Loans</h1>
            <p className="text-gray-600">Use your rare NFTs as collateral to borrow crypto instantly</p>
          </div>
        </div>
      </div>
      <Tabs defaultValue="borrow" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="borrow">Borrow</TabsTrigger>
          <TabsTrigger value="manage">Manage Loans</TabsTrigger>
        </TabsList>

        <TabsContent value="borrow" className="space-y-6">
          <LoanProgress currentStep={currentStep} />

          {currentStep === 'select' && (
            <NFTCollateralSelector onNFTSelect={handleNFTSelect} />
          )}

          {currentStep === 'terms' && loanTerms.collateralNFT && (
            <LoanTermsConfig
              collateralNFT={loanTerms.collateralNFT}
              onTermsConfirm={handleTermsConfirm}
              onBack={() => setCurrentStep('select')}
            />
          )}

          {currentStep === 'confirm' && loanTerms.collateralNFT && (
            <Card>
              <CardHeader>
                <CardTitle>Confirm Loan Details</CardTitle>
                <CardDescription>Review your loan terms before confirming</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Collateral NFT</h3>
                    <div className="flex items-center space-x-3">
                      <img
                        src={loanTerms.collateralNFT.image}
                        alt={loanTerms.collateralNFT.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div>
                        <p className="font-medium">{loanTerms.collateralNFT.name}</p>
                        <p className="text-sm text-gray-600">{loanTerms.collateralNFT.collection}</p>
                        <p className="text-sm font-medium">${loanTerms.collateralNFT.estimatedValue.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-semibold">Loan Terms</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Borrow Amount:</span>
                        <span className="font-medium">${loanTerms.borrowAmount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Duration:</span>
                        <span className="font-medium">{loanTerms.duration} days</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Interest Rate:</span>
                        <span className="font-medium">{loanTerms.interestRate}% APR</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Liquidation Threshold:</span>
                        <span className="font-medium">{loanTerms.liquidationThreshold}%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep('terms')}
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleLoanConfirm}
                    className="flex-1"
                  >
                    Confirm Loan
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep === 'complete' && (
            <Card>
              <CardContent className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Loan Created Successfully!</h3>
                <p className="text-gray-600 mb-6">Your NFT has been locked as collateral and crypto has been transferred to your wallet.</p>
                <Button onClick={resetFlow}>Create Another Loan</Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="manage">
          <ActiveLoans />
        </TabsContent>
      </Tabs>
    </div>
    
  );
};
export default Borrowing;
// Note: The above code is a complete React component for a borrowing page that allows users to create NFT-backed loans.