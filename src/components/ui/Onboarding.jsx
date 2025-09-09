import React, { useState, useEffect, useRef } from 'react';

/**
 * Composant Onboarding
 * Zone 46 - ONBOARDING "PAS À PAS" selon spécifications exactes du fichier de référence
 * Ligne 8758 du fichier chat gpt dash v2 0.1.txt
 */

const Onboarding = ({ 
  isOpen = false,
  onClose,
  steps = [],
  className = ""
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const overlayRef = useRef(null);
  const stepRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Focus automatique sur l'élément courant
      if (steps[currentStep]?.targetElement) {
        const element = document.querySelector(steps[currentStep].targetElement);
        element?.focus();
      }
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, currentStep, steps]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose?.();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setIsAnimating(false);
      }, 150);
    } else {
      onClose?.();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(currentStep - 1);
        setIsAnimating(false);
      }, 150);
    }
  };

  const skipOnboarding = () => {
    onClose?.();
  };

  if (!isOpen || steps.length === 0) return null;

  const currentStepData = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <>
      {/* Overlay sombre */}
      <div 
        ref={overlayRef}
        className="fixed inset-0 bg-black/80 z-50 opacity-0 transition-opacity duration-300 data-[open=true]:opacity-100" 
        data-open={isOpen}
        aria-hidden="true"
      />
      
      {/* Contenu onboarding */}
      <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${className}`}>
        {/* Bulle pointant vers l'élément */}
        {currentStepData?.targetElement && (
          <div 
            className="absolute w-4 h-4 bg-[#3B82F6] rounded-full animate-pulse"
            style={{
              left: currentStepData.targetPosition?.x || '50%',
              top: currentStepData.targetPosition?.y || '50%',
              transform: 'translate(-50%, -50%)'
            }}
          />
        )}
        
        {/* Zone highlightée */}
        {currentStepData?.targetElement && (
          <div 
            className="absolute border-2 border-[#3B82F6] rounded-lg animate-pulse"
            style={{
              left: currentStepData.targetPosition?.x || '50%',
              top: currentStepData.targetPosition?.y || '50%',
              width: currentStepData.targetSize?.width || '200px',
              height: currentStepData.targetSize?.height || '100px',
              transform: 'translate(-50%, -50%)'
            }}
          />
        )}
        
        {/* Card explicative */}
        <div 
          ref={stepRef}
          className={`bg-[#232B3E] rounded-xl shadow-2xl p-6 max-w-md mx-auto transform transition-all duration-300 ${
            isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
          }`}
          role="dialog"
          aria-modal="true"
          aria-label="Guide d'utilisation"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#3B82F6] rounded-full flex items-center justify-center text-white font-bold text-sm">
                {currentStep + 1}
              </div>
              <span className="text-[#AAB7C6] text-sm">
                Étape {currentStep + 1} sur {steps.length}
              </span>
            </div>
            <button
              onClick={skipOnboarding}
              className="text-[#AAB7C6] hover:text-white transition-colors"
              aria-label="Passer l'onboarding"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Barre de progression */}
          <div className="w-full bg-[#222C3B] rounded-full h-2 mb-4">
            <div 
              className="bg-[#3B82F6] h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          {/* Contenu */}
          <div className="mb-6">
            <h3 className="text-[#F1F5F9] font-semibold text-lg mb-2">
              {currentStepData?.title || `Étape ${currentStep + 1}`}
            </h3>
            <p className="text-[#AAB7C6] text-sm leading-relaxed">
              {currentStepData?.description || 'Description de l\'étape'}
            </p>
          </div>
          
          {/* Actions */}
          <div className="flex justify-between">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className="px-4 py-2 text-[#AAB7C6] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Précédent
            </button>
            <button
              onClick={nextStep}
              className="px-6 py-2 bg-[#3B82F6] text-white rounded-lg hover:bg-[#2563eb] transition-colors font-medium"
            >
              {currentStep === steps.length - 1 ? 'Terminer' : 'Suivant'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Onboarding;
