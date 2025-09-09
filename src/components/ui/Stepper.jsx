import React from 'react';

/**
 * Composant Stepper
 * Zone 21 - STEPPER / BARRE DE PROGRESSION selon spécifications exactes du fichier source
 */

const Stepper = ({ 
  steps = [],
  currentStep = 0,
  onStepClick,
  className = ""
}) => {
  return (
    <div 
      className={`flex items-center w-full max-w-lg mx-auto gap-4 my-8 ${className}`}
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
          <React.Fragment key={step.id || index}>
            {/* Step Circle */}
            <div className="relative flex flex-col items-center">
              <div 
                className={`w-9 h-9 rounded-full flex items-center justify-center text-white font-bold shadow-lg transition-all duration-120 ${
                  isCompleted
                    ? 'bg-[#3B82F6] scale-100'
                    : isCurrent
                    ? 'bg-[#3B82F6] scale-108 shadow-accented'
                    : 'bg-[#232B3E] border-2 border-[#3B82F6] text-[#3B82F6] shadow'
                }`}
                role="listitem"
                aria-current={isCurrent ? "step" : "false"}
                tabIndex={onStepClick ? 0 : -1}
                onClick={() => onStepClick && onStepClick(index)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onStepClick && onStepClick(index);
                  }
                }}
                aria-label={`Étape ${index + 1}: ${step.title || `Step ${index + 1}`}`}
              >
                {isCompleted ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  index + 1
                )}
              </div>
              <span className="mt-2 text-xs text-[#AAB7C6] uppercase font-semibold tracking-wide">
                {step.title || `Step ${index + 1}`}
              </span>
            </div>
            
            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div 
                className={`flex-1 h-1 rounded-full transition-all duration-120 ${
                  isCompleted ? 'bg-[#3B82F6]' : 'bg-[#222C3B]'
                }`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Stepper;
