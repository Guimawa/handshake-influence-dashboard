import { useState } from 'react';

const Stepper = ({ 
  steps = [], 
  currentStep = 0, 
  completedSteps = [],
  onStepClick,
  className = "",
  orientation = "horizontal" // horizontal | vertical
}) => {
  const [hoveredStep, setHoveredStep] = useState(null);

  const getStepStatus = (stepIndex) => {
    if (completedSteps.includes(stepIndex)) return 'completed';
    if (stepIndex === currentStep) return 'current';
    if (stepIndex < currentStep) return 'completed';
    return 'inactive';
  };

  const getStepClasses = (stepIndex, status) => {
    const baseClasses = "w-9 h-9 rounded-full flex items-center justify-center font-bold shadow transition-all duration-120 ease-[cubic-bezier(0.23,1,0.32,1)]";
    
    switch (status) {
      case 'completed':
        return `${baseClasses} bg-[#10B981] text-white shadow-lg scale-105`;
      case 'current':
        return `${baseClasses} bg-[#3B82F6] text-white shadow-lg scale-108`;
      case 'inactive':
        return `${baseClasses} bg-[#232B3E] border-2 border-[#3B82F6] text-[#3B82F6]`;
      default:
        return baseClasses;
    }
  };

  const getConnectorClasses = (stepIndex) => {
    const isCompleted = completedSteps.includes(stepIndex) || stepIndex < currentStep;
    return `flex-1 h-1 rounded-full transition-all duration-120 ${
      isCompleted ? 'bg-[#3B82F6]' : 'bg-[#222C3B]'
    }`;
  };

  return (
    <div className={`flex ${orientation === 'vertical' ? 'flex-col' : 'flex-row'} items-center gap-4 ${className}`}>
      {steps.map((step, index) => {
        const status = getStepStatus(index);
        const isLast = index === steps.length - 1;
        const isInteractive = onStepClick && (status === 'current' || status === 'completed');
        
        return (
          <div key={index} className="flex items-center w-full">
            {/* Step */}
            <div className="relative flex flex-col items-center">
              <button
                className={getStepClasses(index, status)}
                onClick={() => isInteractive && onStepClick(index)}
                onMouseEnter={() => setHoveredStep(index)}
                onMouseLeave={() => setHoveredStep(null)}
                disabled={!isInteractive}
                tabIndex={isInteractive ? 0 : -1}
                role="listitem"
                aria-current={status === 'current' ? 'step' : undefined}
                aria-label={`Étape ${index + 1}: ${step.label || step}`}
                aria-disabled={!isInteractive}
              >
                {status === 'completed' ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  index + 1
                )}
              </button>
              
              {/* Label */}
              <span className="mt-2 text-xs text-[#AAB7C6] uppercase font-semibold tracking-wide text-center">
                {step.label || step}
              </span>
            </div>
            
            {/* Connector */}
            {!isLast && (
              <div className={getConnectorClasses(index)} />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Stepper;
