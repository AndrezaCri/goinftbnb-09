
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface LoanProgressProps {
  currentStep: 'select' | 'terms' | 'confirm' | 'complete';
}

export const LoanProgress: React.FC<LoanProgressProps> = ({
  currentStep
}) => {
  const steps = [{
    id: 'select',
    title: 'Select NFT',
    description: 'Choose collateral'
  }, {
    id: 'terms',
    title: 'Loan Terms',
    description: 'Configure loan'
  }, {
    id: 'confirm',
    title: 'Confirm',
    description: 'Review details'
  }, {
    id: 'complete',
    title: 'Complete',
    description: 'Loan created'
  }];

  const getStepIndex = (step: string) => steps.findIndex(s => s.id === step);
  const currentIndex = getStepIndex(currentStep);

  return (
    <Card className="bg-[#111] border-[#333] text-white">
      <CardContent className="py-6">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  index <= currentIndex 
                    ? 'bg-[#FFEB3B] text-black' 
                    : 'bg-gray-600 text-gray-300'
                }`}>
                  {index < currentIndex ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    index + 1
                  )}
                </div>
                <div className="mt-2 text-center">
                  <p className={`text-sm font-medium ${
                    index <= currentIndex ? 'text-[#FFEB3B]' : 'text-gray-400'
                  }`}>
                    {step.title}
                  </p>
                  <p className="text-xs text-gray-500">{step.description}</p>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-16 h-0.5 mx-4 ${
                  index < currentIndex ? 'bg-[#FFEB3B]' : 'bg-gray-600'
                }`} />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
