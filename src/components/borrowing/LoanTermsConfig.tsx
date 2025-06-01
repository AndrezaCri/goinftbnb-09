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
      <Card>
        <CardHeader>
          <CardTitle>Configure Loan Terms</CardTitle>
          <CardDescription>
            Set your loan amount and duration for {collateralNFT.name}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="borrowAmount">Borrow Amount (USD)</Label>
                <Input
                  id="borrowAmount"
                  type="number"
                  placeholder="Enter amount"
                  value={borrowAmount || ''}
                  onChange={(e) => handleAmountChange(e.target.value)}
                  max={maxLoanAmount}
                />
                <p className="text-sm text-gray-600">
                  Maximum: ${maxLoanAmount.toLocaleString()} (60% of NFT value)
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Loan Duration</Label>
                <Select value={duration.toString()} onValueChange={handleDurationChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">7 days</SelectItem>
                    <SelectItem value="14">14 days</SelectItem>
                    <SelectItem value="30">30 days</SelectItem>
                    <SelectItem value="60">60 days</SelectItem>
                    <SelectItem value="90">90 days</SelectItem>
                    <SelectItem value="180">180 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <h4 className="font-semibold">Loan Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Loan Amount:</span>
                    <span className="font-medium">${borrowAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Interest Rate:</span>
                    <span className="font-medium">{interestRate}% APR</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Interest:</span>
                    <span className="font-medium">${totalInterest.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="font-semibold">Total Repayment:</span>
                    <span className="font-semibold">${totalRepayment.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-4 space-y-3">
                <h4 className="font-semibold">Risk Metrics</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Loan-to-Value:</span>
                    <span className={`font-medium ${loanToValue > 60 ? 'text-red-600' : 'text-green-600'}`}>
                      {loanToValue.toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Liquidation Threshold:</span>
                    <span className="font-medium">{liquidationThreshold}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Safety Buffer:</span>
                    <span className="font-medium text-green-600">
                      {(liquidationThreshold - loanToValue).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex space-x-3">
            <Button variant="outline" onClick={onBack}>
              Back
            </Button>
            <Button 
              onClick={handleConfirm} 
              disabled={!isValidLoan}
              className="flex-1"
            >
              Review Loan Terms
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};