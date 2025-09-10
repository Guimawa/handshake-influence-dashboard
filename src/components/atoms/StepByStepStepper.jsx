import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const StepByStepStepper = ({ 
  steps = [],
  onStepChange,
  onComplete,
  initialStep = 0,
  className = ""
}) => {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const formRef = useRef(null);

  const defaultSteps = [
    {
      id: 1,
      title: 'Détails',
      description: 'Informations de base',
      fields: [
        { name: 'name', label: 'Nom', type: 'text', required: true },
        { name: 'email', label: 'Email', type: 'email', required: true }
      ]
    },
    {
      id: 2,
      title: 'Paramètres',
      description: 'Configuration',
      fields: [
        { name: 'theme', label: 'Thème', type: 'select', options: ['Sombre', 'Clair'], required: true },
        { name: 'notifications', label: 'Notifications', type: 'checkbox', required: false }
      ]
    },
    {
      id: 3,
      title: 'Validation',
      description: 'Confirmation',
      fields: [
        { name: 'terms', label: 'Accepter les conditions', type: 'checkbox', required: true }
      ]
    }
  ];

  const stepsData = steps.length > 0 ? steps : defaultSteps;
  const progressPercentage = ((currentStep + 1) / stepsData.length) * 100;

  useEffect(() => {
    // Focus sur le premier champ de l'étape courante
    if (formRef.current) {
      const firstInput = formRef.current.querySelector('input, select, textarea');
      if (firstInput) {
        setTimeout(() => firstInput.focus(), 100);
      }
    }
  }, [currentStep]);

  const handleNext = () => {
    if (currentStep < stepsData.length - 1) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentStep(prev => prev + 1);
        onStepChange?.(currentStep + 1);
        setIsTransitioning(false);
      }, 120);
    } else {
      onComplete?.();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentStep(prev => prev - 1);
        onStepChange?.(currentStep - 1);
        setIsTransitioning(false);
      }, 120);
    }
  };

  const getStepStatus = (stepIndex) => {
    if (stepIndex < currentStep) return 'completed';
    if (stepIndex === currentStep) return 'current';
    return 'upcoming';
  };

  const renderField = (field, index) => {
    const fieldId = `field-${field.name}-${index}`;
    
    switch (field.type) {
      case 'select':
        return (
          <div key={fieldId} className="flex flex-col gap-2">
            <label htmlFor={fieldId} className="text-[#F1F5F9] font-medium">
              {field.label} {field.required && <span className="text-[#EF4444]">*</span>}
            </label>
            <select
              id={fieldId}
              className="px-4 py-3 bg-[#181E29] border border-[#3B82F6] rounded-xl text-[#F1F5F9] 
                         focus:outline-none focus:ring-2 focus:ring-[#3B82F6] transition-all duration-120"
              required={field.required}
            >
              <option value="">Sélectionner...</option>
              {field.options?.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        );

      case 'checkbox':
        return (
          <div key={fieldId} className="flex items-center gap-3">
            <input
              type="checkbox"
              id={fieldId}
              className="w-5 h-5 rounded accent-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]"
              required={field.required}
            />
            <label htmlFor={fieldId} className="text-[#F1F5F9] font-medium cursor-pointer">
              {field.label} {field.required && <span className="text-[#EF4444]">*</span>}
            </label>
          </div>
        );

      default:
        return (
          <div key={fieldId} className="flex flex-col gap-2">
            <label htmlFor={fieldId} className="text-[#F1F5F9] font-medium">
              {field.label} {field.required && <span className="text-[#EF4444]">*</span>}
            </label>
            <input
              type={field.type}
              id={fieldId}
              className="px-4 py-3 bg-[#181E29] border border-[#3B82F6] rounded-xl text-[#F1F5F9] 
                         focus:outline-none focus:ring-2 focus:ring-[#3B82F6] transition-all duration-120"
              placeholder={field.placeholder}
              required={field.required}
            />
          </div>
        );
    }
  };

  return (
    <motion.div
      className={`w-full max-w-xl mx-auto bg-[#232B3E] rounded-xl shadow-panel p-8 flex flex-col gap-8 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
    >
      {/* Steps indicator */}
      <ol className="flex items-center gap-4 mb-6" aria-label="Étapes">
        {stepsData.map((step, index) => {
          const status = getStepStatus(index);
          const isLast = index === stepsData.length - 1;
          
          return (
            <motion.div key={step.id} className="flex items-center">
              <motion.li
                className="flex flex-col items-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.2, 
                  delay: index * 0.1,
                  ease: [0.23, 1, 0.32, 1] 
                }}
              >
                <motion.span
                  className={`w-8 h-8 flex items-center justify-center rounded-full font-bold shadow transition-all duration-150
                             ${status === 'completed' 
                               ? 'text-[#212837] bg-[#7DE3F4] ring-2 ring-[#7DE3F4]' 
                               : status === 'current'
                               ? 'text-[#212837] bg-[#7DE3F4] ring-2 ring-[#7DE3F4] scale-110'
                               : 'text-[#232B3E] bg-[#AAB7C6]'
                             }`}
                  animate={status === 'current' ? { 
                    scale: [1, 1.1, 1],
                    boxShadow: ['0 0 0 0 rgba(125, 227, 244, 0.4)', '0 0 0 8px rgba(125, 227, 244, 0.1)', '0 0 0 0 rgba(125, 227, 244, 0.4)']
                  } : {}}
                  transition={{ 
                    duration: 1.5, 
                    repeat: status === 'current' ? Infinity : 0,
                    ease: [0.23, 1, 0.32, 1] 
                  }}
                  aria-current={status === 'current' ? 'step' : undefined}
                >
                  {status === 'completed' ? '✓' : index + 1}
                </motion.span>
                <span className={`mt-1 text-xs transition-colors duration-150 ${
                  status === 'current' ? 'text-[#7DE3F4]' : 'text-[#AAB7C6]'
                }`}>
                  {step.title}
                </span>
              </motion.li>
              
              {/* Connector line */}
              {!isLast && (
                <motion.span
                  className={`w-8 h-1 rounded-full mx-2 ${
                    index < currentStep 
                      ? 'bg-gradient-to-r from-[#7DE3F4] to-[#F6E58D]' 
                      : 'bg-[#384356]'
                  }`}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ 
                    duration: 0.3, 
                    delay: index * 0.1 + 0.2,
                    ease: [0.23, 1, 0.32, 1] 
                  }}
                />
              )}
            </motion.div>
          );
        })}
      </ol>

      {/* Progress bar */}
      <div className="relative w-full h-3 bg-[#384356] rounded-xl overflow-hidden mb-5">
        <motion.div
          className="absolute left-0 top-0 h-full rounded-xl bg-[#7DE3F4]"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ 
            duration: 0.15, 
            ease: [0.23, 1, 0.32, 1] 
          }}
          aria-valuenow={Math.round(progressPercentage)}
          aria-valuemin={0}
          aria-valuemax={100}
          role="progressbar"
          aria-label={`Progression: ${Math.round(progressPercentage)}%`}
        />
      </div>

      {/* Form content */}
      <AnimatePresence mode="wait">
        <motion.form
          key={currentStep}
          ref={formRef}
          className="flex flex-col gap-5"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ 
            duration: 0.12, 
            ease: [0.23, 1, 0.32, 1] 
          }}
        >
          <div className="mb-4">
            <h2 className="text-[#7DE3F4] font-bold text-xl mb-2">
              {stepsData[currentStep]?.title}
            </h2>
            <p className="text-[#AAB7C6]">
              {stepsData[currentStep]?.description}
            </p>
          </div>

          {stepsData[currentStep]?.fields?.map((field, index) => 
            renderField(field, index)
          )}
        </motion.form>
      </AnimatePresence>

      {/* Navigation buttons */}
      <div className="flex justify-end gap-2 mt-6">
        {currentStep > 0 && (
          <motion.button
            type="button"
            className="px-5 py-2 rounded-xl bg-[#222C3B] text-[#AAB7C6] font-semibold 
                       hover:bg-[#3B82F6] hover:text-white transition-all duration-120
                       focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
            onClick={handlePrevious}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Retour
          </motion.button>
        )}
        
        <motion.button
          type="button"
          className="px-5 py-2 rounded-xl bg-[#3B82F6] text-white font-semibold 
                     hover:bg-[#2563eb] transition-all duration-120
                     focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
          onClick={handleNext}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {currentStep === stepsData.length - 1 ? 'Terminer' : 'Suivant'}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default StepByStepStepper;
