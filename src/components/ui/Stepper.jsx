import React from 'react';

/**
 * Composant Stepper
 * Zone 13 - STEPPER selon spécifications
 */

const Stepper = ({ 
  steps = [],
  currentStep = 0,
  onStepClick,
  orientation = 'horizontal',
  className = ""
}) => {
  const isHorizontal = orientation === 'horizontal';
  const isVertical = orientation === 'vertical';

  return (
    <div 
      className={`stepper ${isHorizontal ? 'flex items-center' : 'flex flex-col'} ${className}`}
      role="progressbar"
      aria-valuenow={currentStep + 1}
      aria-valuemin={1}
      aria-valuemax={steps.length}
    >
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;
        const isUpcoming = index > currentStep;
        
        return (
          <div
            key={step.id || index}
            className={`stepper-item flex items-center ${
              isHorizontal ? 'flex-1' : 'mb-4'
            }`}
          >
            {/* Step Circle */}
            <div className="flex items-center">
              <button
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200 ${
                  isCompleted
                    ? 'bg-[#3B82F6] text-white'
                    : isCurrent
                    ? 'bg-[#3B82F6] text-white ring-2 ring-[#3B82F6] ring-offset-2 ring-offset-[#232B3E]'
                    : 'bg-[#222C3B] text-[#AAB7C6]'
                }`}
                onClick={() => onStepClick && onStepClick(index)}
                disabled={!onStepClick}
                aria-label={`Étape ${index + 1}: ${step.title}`}
              >
                {isCompleted ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  index + 1
                )}
              </button>
              
              {/* Step Content */}
              <div className={`ml-3 ${isHorizontal ? 'text-center' : ''}`}>
                <div className={`text-sm font-medium ${
                  isCurrent ? 'text-[#F1F5F9]' : 'text-[#AAB7C6]'
                }`}>
                  {step.title}
                </div>
                {step.description && (
                  <div className="text-xs text-[#AAB7C6] mt-1">
                    {step.description}
                  </div>
                )}
              </div>
            </div>
            
            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div 
                className={`flex-1 h-0.5 mx-4 ${
                  isCompleted ? 'bg-[#3B82F6]' : 'bg-[#222C3B]'
                } ${isHorizontal ? 'mt-0' : 'mt-4'}`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Stepper;
