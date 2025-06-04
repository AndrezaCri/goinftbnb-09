
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Loan } from '@/pages/Borrowing';

export const ActiveLoans: React.FC = () => {
  // Mock active loans data
  const mockLoans: Loan[] = [
    {
      id: '1',
      collateralNFT: {
        id: '1',
        name: 'Bored Ape #1234',
        collection: 'Bored Ape Yacht Club',
        image: '/placeholder.svg',
        floorPrice: 45000,
        estimatedValue: 52000,
        isRare: true
      },
      borrowAmount: 30000,
      remainingAmount: 25000,
      duration: 60,
      interestRate: 8.5,
      startDate: new Date('2024-01-15'),
      dueDate: new Date('2024-03-15'),
      status: 'active',
      liquidationThreshold: 80,
      currentLTV: 58
    },
    {
      id: '2',
      collateralNFT: {
        id: '2',
        name: 'CryptoPunk #5678',
        collection: 'CryptoPunks',
        image: '/placeholder.svg',
        floorPrice: 85000,
        estimatedValue: 95000,
        isRare: true
      },
      borrowAmount: 50000,
      remainingAmount: 52500,
      duration: 90,
      interestRate: 9.2,
      startDate: new Date('2024-02-01'),
      dueDate: new Date('2024-05-01'),
      status: 'overdue',
      liquidationThreshold: 80,
      currentLTV: 75
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-900/20 text-green-400 border-green-500/20';
      case 'overdue': return 'bg-red-900/20 text-red-400 border-red-500/20';
      case 'liquidated': return 'bg-gray-900/20 text-gray-400 border-gray-500/20';
      default: return 'bg-blue-900/20 text-blue-400 border-blue-500/20';
    }
  };

  const getRiskLevel = (ltv: number, threshold: number) => {
    const buffer = threshold - ltv;
    if (buffer < 5) return { level: 'High Risk', color: 'text-red-400' };
    if (buffer < 15) return { level: 'Medium Risk', color: 'text-yellow-400' };
    return { level: 'Low Risk', color: 'text-green-400' };
  };

  const getDaysRemaining = (dueDate: Date) => {
    const today = new Date();
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-6">
      <Card className="bg-[#111] border-[#333] text-white">
        <CardHeader>
          <CardTitle className="text-white">Active Loans</CardTitle>
          <CardDescription className="text-gray-400">
            Manage your existing NFT-backed loans and repayments
          </CardDescription>
        </CardHeader>
        <CardContent>
          {mockLoans.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-400 mb-4">No active loans found</p>
              <Button className="bg-[#FFEB3B] text-black hover:bg-[#E6D136]">Create Your First Loan</Button>
            </div>
          ) : (
            <div className="space-y-4">
              {mockLoans.map((loan) => {
                const daysRemaining = getDaysRemaining(loan.dueDate);
                const riskLevel = getRiskLevel(loan.currentLTV, loan.liquidationThreshold);
                const repaymentProgress = ((loan.borrowAmount - loan.remainingAmount) / loan.borrowAmount) * 100;

                return (
                  <Card key={loan.id} className="bg-[#111] border-[#333] text-white">
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Collateral Info */}
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3">
                            <img
                              src={loan.collateralNFT.image}
                              alt={loan.collateralNFT.name}
                              className="w-16 h-16 rounded-lg object-cover border border-[#333]"
                            />
                            <div>
                              <h3 className="font-semibold text-white">{loan.collateralNFT.name}</h3>
                              <p className="text-sm text-gray-400">{loan.collateralNFT.collection}</p>
                              <Badge className={getStatusColor(loan.status)}>
                                {loan.status.charAt(0).toUpperCase() + loan.status.slice(1)}
                              </Badge>
                            </div>
                          </div>
                          <div className="text-sm space-y-1">
                            <div className="flex justify-between">
                              <span className="text-gray-400">NFT Value:</span>
                              <span className="font-medium text-white">${loan.collateralNFT.estimatedValue.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Current LTV:</span>
                              <span className={`font-medium ${riskLevel.color}`}>
                                {loan.currentLTV}%
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Risk Level:</span>
                              <span className={`font-medium ${riskLevel.color}`}>
                                {riskLevel.level}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Loan Details */}
                        <div className="space-y-3">
                          <h4 className="font-semibold text-white">Loan Details</h4>
                          <div className="text-sm space-y-1">
                            <div className="flex justify-between">
                              <span className="text-gray-400">Original Amount:</span>
                              <span className="font-medium text-white">${loan.borrowAmount.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Remaining:</span>
                              <span className="font-medium text-white">${loan.remainingAmount.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Interest Rate:</span>
                              <span className="font-medium text-white">{loan.interestRate}% APR</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Due Date:</span>
                              <span className={`font-medium ${daysRemaining < 7 ? 'text-red-400' : 'text-white'}`}>
                                {loan.dueDate.toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Days Remaining:</span>
                              <span className={`font-medium ${daysRemaining < 7 ? 'text-red-400' : 'text-white'}`}>
                                {daysRemaining > 0 ? `${daysRemaining} days` : 'Overdue'}
                              </span>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-400">Repayment Progress:</span>
                              <span className="text-white">{repaymentProgress.toFixed(1)}%</span>
                            </div>
                            <Progress value={repaymentProgress} className="h-2 bg-[#333]" />
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="space-y-3">
                          <h4 className="font-semibold text-white">Actions</h4>
                          <div className="space-y-2">
                            <Button className="w-full bg-[#FFEB3B] text-black hover:bg-[#E6D136]" size="sm">
                              Make Payment
                            </Button>
                            <Button variant="outline" className="w-full border-[#333] text-white hover:bg-[#222] bg-transparent" size="sm">
                              Extend Loan
                            </Button>
                            {loan.status === 'active' && (
                              <Button variant="outline" className="w-full border-[#333] text-white hover:bg-[#222] bg-transparent" size="sm">
                                Repay in Full
                              </Button>
                            )}
                          </div>
                          
                          {loan.currentLTV > 70 && (
                            <div className="bg-yellow-900/20 border border-yellow-500/20 rounded-lg p-3">
                              <p className="text-sm text-yellow-400">
                                ⚠️ High LTV ratio. Consider making a payment to avoid liquidation.
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
