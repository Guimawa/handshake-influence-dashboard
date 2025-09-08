import { useState } from 'react';
import { motion } from 'framer-motion';

const StepIndicator = ({ 
  steps = [],
  currentStep = 0,
  onStepClick,
  className = ""
}) => {
  const [hoveredStep, setHoveredStep] = useState(null);

  const defaultSteps = [
    { id: 1, label: 'Configuration' },
    { id: 2, label: 'Déploiement' },
    { id: 3, label: 'Validation' },
    { id: 4, label: 'Finalisation' }
  ];

  const stepsData = steps.length > 0 ? steps : defaultSteps;
  const progressPercentage = (currentStep / (stepsData.length - 1)) * 100;

  const handleStepClick = (step, index) => {
    if (onStepClick && index <= currentStep) {
      onStepClick(step, index);
    }
  };

  const getStepStatus = (index) => {
    if (index < currentStep) return 'completed';
    if (index === currentStep) return 'current';
    return 'upcoming';
  };

  return (
    <motion.div
      className={`flex items-center gap-5 my-8 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
    >
      {/* Barre de progression */}
      <div className="flex-1 h-1 bg-[#384356] rounded-full relative overflow-hidden">
        <motion.div
          className="h-1 rounded-full bg-[#3B82F6] absolute left-0 top-0"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ 
            duration: 0.12, 
            ease: [0.23, 1, 0.32, 1] 
          }}
        />
      </div>

      {/* Steps */}
      <div className="flex gap-3" role="group" aria-label="Indicateur d'étapes">
        {stepsData.map((step, index) => {
          const status = getStepStatus(index);
          const isHovered = hoveredStep === index;
          const isClickable = index <= currentStep;

          return (
            <motion.div
              key={step.id || index}
              className="flex flex-col items-center gap-2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.2, 
                delay: index * 0.1,
                ease: [0.23, 1, 0.32, 1] 
              }}
            >
              {/* Cercle de l'étape */}
              <motion.button
                className={`
                  w-9 h-9 flex items-center justify-center rounded-full border-2 font-bold text-sm
                  transition-all duration-120 focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:outline-none
                  ${status === 'completed' 
                    ? 'border-[#3B82F6] text-white bg-[#3B82F6] shadow-lg' 
                    : status === 'current'
                    ? 'border-[#3B82F6] text-[#3B82F6] bg-[#181E29]'
                    : 'border-[#384356] text-[#AAB7C6] bg-[#181E29]'
                  }
                  ${isClickable ? 'cursor-pointer' : 'cursor-default'}
                `}
                onClick={() => handleStepClick(step, index)}
                onMouseEnter={() => setHoveredStep(index)}
                onMouseLeave={() => setHoveredStep(null)}
                disabled={!isClickable}
                aria-current={status === 'current' ? 'step' : undefined}
                aria-label={`Étape ${index + 1}: ${step.label}`}
                whileHover={isClickable ? { 
                  scale: 1.1,
                  transition: { duration: 0.12, ease: [0.23, 1, 0.32, 1] }
                } : {}}
                whileTap={isClickable ? { 
                  scale: 0.95,
                  transition: { duration: 0.08, ease: [0.23, 1, 0.32, 1] }
                } : {}}
              >
                {status === 'completed' ? (
                  <motion.svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                      duration: 0.3, 
                      delay: 0.2,
                      ease: [0.23, 1, 0.32, 1] 
                    }}
                  >
                    <path 
                      stroke="currentColor" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d="M5 13l4 4L19 7" 
                    />
                  </motion.svg>
                ) : (
                  <span>{index + 1}</span>
                )}
              </motion.button>

              {/* Label de l'étape */}
              <motion.span
                className={`
                  text-xs font-medium text-center transition-colors duration-120
                  ${status === 'current' 
                    ? 'text-[#3B82F6]' 
                    : status === 'completed'
                    ? 'text-white'
                    : 'text-[#AAB7C6]'
                  }
                  ${isHovered && isClickable ? 'text-[#3B82F6]' : ''}
                `}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.2, 
                  delay: index * 0.1 + 0.1,
                  ease: [0.23, 1, 0.32, 1] 
                }}
              >
                {step.label}
              </motion.span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default StepIndicator;
