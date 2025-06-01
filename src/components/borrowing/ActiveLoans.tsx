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
      case 'active': return 'bg-green-100 text-green-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      case 'liquidated': return 'bg-gray-100 text-gray-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const getRiskLevel = (ltv: number, threshold: number) => {
    const buffer = threshold - ltv;
    if (buffer < 5) return { level: 'High Risk', color: 'text-red-600' };
    if (buffer < 15) return { level: 'Medium Risk', color: 'text-yellow-600' };
    return { level: 'Low Risk', color: 'text-green-600' };
  };

  const getDaysRemaining = (dueDate: Date) => {
    const today = new Date();
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Active Loans</CardTitle>
          <CardDescription>
            Manage your existing NFT-backed loans and repayments
          </CardDescription>
        </CardHeader>
        <CardContent>
          {mockLoans.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">No active loans found</p>
              <Button>Create Your First Loan</Button>
            </div>
          ) : (
            <div className="space-y-4">
              {mockLoans.map((loan) => {
                const daysRemaining = getDaysRemaining(loan.dueDate);
                const riskLevel = getRiskLevel(loan.currentLTV, loan.liquidationThreshold);
                const repaymentProgress = ((loan.borrowAmount - loan.remainingAmount) / loan.borrowAmount) * 100;

                return (
                  <Card key={loan.id} className="border">
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Collateral Info */}
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3">
                            <img
                              src={loan.collateralNFT.image}
                              alt={loan.collateralNFT.name}
                              className="w-16 h-16 rounded-lg object-cover"
                            />
                            <div>
                              <h3 className="font-semibold">{loan.collateralNFT.name}</h3>
                              <p className="text-sm text-gray-600">{loan.collateralNFT.collection}</p>
                              <Badge className={getStatusColor(loan.status)}>
                                {loan.status.charAt(0).toUpperCase() + loan.status.slice(1)}
                              </Badge>
                            </div>
                          </div>
                          <div className="text-sm space-y-1">
                            <div className="flex justify-between">
                              <span>NFT Value:</span>
                              <span className="font-medium">${loan.collateralNFT.estimatedValue.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Current LTV:</span>
                              <span className={`font-medium ${riskLevel.color}`}>
                                {loan.currentLTV}%
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>Risk Level:</span>
                              <span className={`font-medium ${riskLevel.color}`}>
                                {riskLevel.level}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Loan Details */}
                        <div className="space-y-3">
                          <h4 className="font-semibold">Loan Details</h4>
                          <div className="text-sm space-y-1">
                            <div className="flex justify-between">
                              <span>Original Amount:</span>
                              <span className="font-medium">${loan.borrowAmount.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Remaining:</span>
                              <span className="font-medium">${loan.remainingAmount.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Interest Rate:</span>
                              <span className="font-medium">{loan.interestRate}% APR</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Due Date:</span>
                              <span className={`font-medium ${daysRemaining < 7 ? 'text-red-600' : ''}`}>
                                {loan.dueDate.toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>Days Remaining:</span>
                              <span className={`font-medium ${daysRemaining < 7 ? 'text-red-600' : ''}`}>
                                {daysRemaining > 0 ? `${daysRemaining} days` : 'Overdue'}
                              </span>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Repayment Progress:</span>
                              <span>{repaymentProgress.toFixed(1)}%</span>
                            </div>
                            <Progress value={repaymentProgress} className="h-2" />
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="space-y-3">
                          <h4 className="font-semibold">Actions</h4>
                          <div className="space-y-2">
                            <Button className="w-full" size="sm">
                              Make Payment
                            </Button>
                            <Button variant="outline" className="w-full" size="sm">
                              Extend Loan
                            </Button>
                            {loan.status === 'active' && (
                              <Button variant="outline" className="w-full" size="sm">
                                Repay in Full
                              </Button>
                            )}
                          </div>
                          
                          {loan.currentLTV > 70 && (
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                              <p className="text-sm text-yellow-800">
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