import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Onboarding = ({ 
  isOpen = false,
  onClose,
  onComplete,
  steps = [],
  className = ""
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(isOpen);
  const [highlightedElement, setHighlightedElement] = useState(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setCurrentStep(0);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  // Focus trap
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose?.();
        return;
      }

      if (event.key === 'ArrowRight' || event.key === 'Enter') {
        event.preventDefault();
        handleNext();
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        handlePrevious();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, currentStep]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    onComplete?.();
    onClose?.();
  };

  const handleSkip = () => {
    onClose?.();
  };

  const currentStepData = steps[currentStep];
  if (!currentStepData) return null;

  const getHighlightPosition = () => {
    if (currentStepData.target) {
      const element = document.querySelector(currentStepData.target);
      if (element) {
        const rect = element.getBoundingClientRect();
        return {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
          width: rect.width,
          height: rect.height
        };
      }
    }
    return null;
  };

  const highlightPos = getHighlightPosition();

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Overlay sombre */}
          <motion.div
            ref={overlayRef}
            className="fixed inset-0 bg-black/60 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />

          {/* Zone highlightée */}
          {highlightPos && (
            <motion.div
              className="fixed z-51 pointer-events-none"
              style={{
                left: highlightPos.x - highlightPos.width / 2 - 8,
                top: highlightPos.y - highlightPos.height / 2 - 8,
                width: highlightPos.width + 16,
                height: highlightPos.height + 16
              }}
              initial={{ 
                scale: 0.8, 
                opacity: 0,
                boxShadow: '0 0 0 0 rgba(59, 130, 246, 0.4)'
              }}
              animate={{ 
                scale: 1,
                opacity: 1,
                boxShadow: [
                  '0 0 0 0 rgba(59, 130, 246, 0.4)',
                  '0 0 0 8px rgba(59, 130, 246, 0.1)',
                  '0 0 0 0 rgba(59, 130, 246, 0.4)'
                ]
              }}
              transition={{ 
                duration: 1.3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="w-full h-full border-2 border-[#3B82F6] rounded-lg" />
            </motion.div>
          )}

          {/* Card d'explication */}
          <motion.div
            className={`
              fixed z-52 bg-[#232B3E] rounded-xl shadow-2xl p-6 max-w-sm
              ${currentStepData.position === 'top' ? 'bottom-1/2 mb-4' : 'top-1/2 mt-4'}
              ${currentStepData.position === 'left' ? 'right-1/2 mr-4' : 'left-1/2 ml-4'}
              ${className}
            `}
            style={{
              left: highlightPos ? `${highlightPos.x}px` : '50%',
              top: highlightPos ? `${highlightPos.y + (currentStepData.position === 'top' ? -200 : 200)}px` : '50%',
              transform: 'translate(-50%, -50%)'
            }}
            initial={{ 
              opacity: 0, 
              scale: 0.9,
              y: currentStepData.position === 'top' ? 20 : -20
            }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              y: 0
            }}
            exit={{ 
              opacity: 0, 
              scale: 0.9,
              y: currentStepData.position === 'top' ? 20 : -20
            }}
            transition={{ 
              duration: 0.2, 
              ease: [0.23, 1, 0.32, 1] 
            }}
          >
            {/* Compteur d'étape */}
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-[#AAB7C6]">
                Étape {currentStep + 1} sur {steps.length}
              </div>
              <button
                className="text-[#AAB7C6] hover:text-white transition-colors"
                onClick={handleSkip}
                aria-label="Passer le tutoriel"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
                  <path 
                    stroke="currentColor" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M6 18L18 6M6 6l12 12" 
                  />
                </svg>
              </button>
            </div>

            {/* Titre */}
            <h3 className="text-lg font-semibold text-[#F1F5F9] mb-2">
              {currentStepData.title}
            </h3>

            {/* Description */}
            <p className="text-[#AAB7C6] text-sm mb-6 leading-relaxed">
              {currentStepData.description}
            </p>

            {/* Actions */}
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                {currentStep > 0 && (
                  <button
                    className="px-3 py-2 text-sm text-[#AAB7C6] hover:text-white transition-colors"
                    onClick={handlePrevious}
                  >
                    Précédent
                  </button>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  className="px-4 py-2 text-sm bg-[#222C3B] text-[#AAB7C6] rounded-lg hover:bg-[#3B82F6] hover:text-white transition-colors"
                  onClick={handleSkip}
                >
                  Passer
                </button>
                <button
                  className="px-4 py-2 text-sm bg-[#3B82F6] text-white rounded-lg hover:bg-[#2563eb] transition-colors"
                  onClick={handleNext}
                >
                  {currentStep === steps.length - 1 ? 'Terminer' : 'Suivant'}
                </button>
              </div>
            </div>

            {/* Barre de progression */}
            <div className="mt-4 w-full bg-[#222C3B] rounded-full h-1">
              <motion.div
                className="bg-[#3B82F6] h-1 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Onboarding;
