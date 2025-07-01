
import React from 'react';
import { CheckIcon } from './IconComponents';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  stepNames: string[];
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps, stepNames }) => {
  const progressPercentage = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="mb-8">
      <div className="flex justify-between mb-2">
        {stepNames.map((name, index) => (
          <div
            key={index}
            className={`text-center flex-1 ${
              index <= currentStep ? 'text-pink-600 font-semibold' : 'text-gray-400'
            }`}
          >
            <div className="relative">
              <div
                className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center border-2
                ${index < currentStep ? 'bg-pink-500 border-pink-500 text-white' : ''}
                ${index === currentStep ? 'bg-white border-pink-500 text-pink-500 scale-110 shadow-lg' : ''}
                ${index > currentStep ? 'bg-gray-200 border-gray-300 text-gray-500' : ''}
                transition-all duration-300`}
              >
                {index < currentStep ? <CheckIcon className="w-5 h-5"/> : index + 1}
              </div>
              {index < totalSteps -1 && (
                 <div className={`absolute top-1/2 left-full w-full h-0.5 -translate-y-1/2 -translate-x-0 
                 ${ index < currentStep ? 'bg-pink-500' : 'bg-gray-300' }
                 md:block hidden`} style={{zIndex: -1, width: 'calc(100% - 2rem)' , left: 'calc(50% + 1rem)'}}></div>
              )}
            </div>
            <p className="text-xs mt-1.5 hidden sm:block">{name}</p>
          </div>
        ))}
      </div>
       <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div 
          className="bg-pink-500 h-2.5 rounded-full transition-all duration-500 ease-out" 
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      <p className="text-sm text-center mt-2 text-gray-600">
        Paso {currentStep + 1} de {totalSteps}: {stepNames[currentStep]}
      </p>
    </div>
  );
};

export default ProgressBar;
