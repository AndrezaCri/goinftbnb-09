
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { NFTCollateral, LoanTerms } from '@/pages/Borrowing';

interface LoanTermsConfigProps {
  collateralNFT: NFTCollateral;
  onTermsConfirm: (terms: Partial<LoanTerms>) => void;
  onBack: () => void;
}

export const LoanTermsConfig: React.FC<LoanTermsConfigProps> = ({
  collateralNFT,
  onTermsConfirm,
  onBack
}) => {
  const [borrowAmount, setBorrowAmount] = useState(0);
  const [duration, setDuration] = useState(30);
  const [interestRate, setInterestRate] = useState(8.5);

  const maxLoanAmount = Math.floor(collateralNFT.estimatedValue * 0.6);
  const liquidationThreshold = 80;
  const loanToValue = borrowAmount > 0 ? (borrowAmount / collateralNFT.estimatedValue) * 100 : 0;

  const calculateInterestRate = (amount: number, days: number) => {
    // Base rate + risk premium based on LTV and duration
    let rate = 5.0; // Base rate
    
    const ltv = (amount / collateralNFT.estimatedValue) * 100;
    if (ltv > 50) rate += 2.0;
    if (ltv > 60) rate += 1.5;
    
    if (days > 60) rate += 1.0;
    if (days > 90) rate += 1.5;
    
    return Math.round(rate * 10) / 10;
  };

  const handleAmountChange = (value: string) => {
    const amount = Math.min(Number(value), maxLoanAmount);
    setBorrowAmount(amount);
    setInterestRate(calculateInterestRate(amount, duration));
  };

  const handleDurationChange = (value: string) => {
    const days = Number(value);
    setDuration(days);
    setInterestRate(calculateInterestRate(borrowAmount, days));
  };

  const totalInterest = (borrowAmount * interestRate / 100 * duration / 365);
  const totalRepayment = borrowAmount + totalInterest;

  const handleConfirm = () => {
    onTermsConfirm({
      borrowAmount,
      duration,
      interestRate,
      liquidationThreshold
    });
  };

  const isValidLoan = borrowAmount > 0 && borrowAmount <= maxLoanAmount;

  return (
    <div className="space-y-6">
      <Card className="bg-[#111] border-[#333] text-white">
        <CardHeader>
          <CardTitle className="text-white">Configure Loan Terms</CardTitle>
          <CardDescription className="text-gray-400">
            Set your loan amount and duration for {collateralNFT.name}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="borrowAmount" className="text-white">Borrow Amount (USD)</Label>
                <Input
                  id="borrowAmount"
                  type="number"
                  placeholder="Enter amount"
                  value={borrowAmount || ''}
                  onChange={(e) => handleAmountChange(e.target.value)}
                  max={maxLoanAmount}
                  className="bg-[#222] border-[#333] text-white placeholder:text-gray-400 focus:border-[#FFEB3B]"
                />
                <p className="text-sm text-gray-400">
                  Maximum: ${maxLoanAmount.toLocaleString()} (60% of NFT value)
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration" className="text-white">Loan Duration</Label>
                <Select value={duration.toString()} onValueChange={handleDurationChange}>
                  <SelectTrigger className="bg-[#222] border-[#333] text-white focus:border-[#FFEB3B]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#222] border-[#333]">
                    <SelectItem value="7" className="text-white hover:bg-[#333]">7 days</SelectItem>
                    <SelectItem value="14" className="text-white hover:bg-[#333]">14 days</SelectItem>
                    <SelectItem value="30" className="text-white hover:bg-[#333]">30 days</SelectItem>
                    <SelectItem value="60" className="text-white hover:bg-[#333]">60 days</SelectItem>
                    <SelectItem value="90" className="text-white hover:bg-[#333]">90 days</SelectItem>
                    <SelectItem value="180" className="text-white hover:bg-[#333]">180 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-[#FFEB3B]/10 border border-[#FFEB3B] rounded-lg p-4 space-y-3">
                <h4 className="font-semibold text-white">Loan Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Loan Amount:</span>
                    <span className="font-medium text-white">${borrowAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Interest Rate:</span>
                    <span className="font-medium text-white">{interestRate}% APR</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Interest:</span>
                    <span className="font-medium text-white">${totalInterest.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between border-t border-[#FFEB3B]/20 pt-2">
                    <span className="font-semibold text-white">Total Repayment:</span>
                    <span className="font-semibold text-[#FFEB3B]">${totalRepayment.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#111] border border-[#333] rounded-lg p-4 space-y-3">
                <h4 className="font-semibold text-white">Risk Metrics</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Loan-to-Value:</span>
                    <span className={`font-medium ${loanToValue > 60 ? 'text-red-400' : 'text-green-400'}`}>
                      {loanToValue.toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Liquidation Threshold:</span>
                    <span className="font-medium text-white">{liquidationThreshold}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Safety Buffer:</span>
                    <span className="font-medium text-green-400">
                      {(liquidationThreshold - loanToValue).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex space-x-3">
            <Button 
              variant="outline" 
              onClick={onBack}
              className="border-[#333] text-white hover:bg-[#222] bg-transparent"
            >
              Back
            </Button>
            <Button 
              onClick={handleConfirm} 
              disabled={!isValidLoan}
              className="flex-1 bg-[#FFEB3B] text-black hover:bg-[#E6D136] disabled:opacity-50"
            >
              Review Loan Terms
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
