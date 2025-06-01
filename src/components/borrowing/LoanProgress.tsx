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
  return <Card>
      <CardContent className="py-6 bg-gray-700">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => <div key={step.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${index <= currentIndex ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                  {index < currentIndex ? <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg> : index + 1}
                </div>
                <div className="mt-2 text-center">
                  <p className={`text-sm font-medium ${index <= currentIndex ? 'text-blue-600' : 'text-gray-600'}`}>
                    {step.title}
                  </p>
                  <p className="text-xs text-gray-500">{step.description}</p>
                </div>
              </div>
              {index < steps.length - 1 && <div className={`w-16 h-0.5 mx-4 ${index < currentIndex ? 'bg-blue-600' : 'bg-gray-200'}`} />}
            </div>)}
        </div>
      </CardContent>
    </Card>;
};