import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle,
  Circle,
  Play
} from 'lucide-react';

export function EmptyTourGuide({ 
  isVisible = false,
  onClose,
  onComplete
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const tourSteps = [
    {
      id: 'welcome',
      title: 'Bienvenue !',
      description: 'Découvrez les fonctionnalités du dashboard',
      icon: Play
    },
    {
      id: 'navigation',
      title: 'Navigation',
      description: 'Explorez les différentes sections',
      icon: Circle
    },
    {
      id: 'features',
      title: 'Fonctionnalités',
      description: 'Utilisez les outils disponibles',
      icon: Circle
    },
    {
      id: 'settings',
      title: 'Paramètres',
      description: 'Personnalisez votre expérience',
      icon: Circle
    }
  ];

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsCompleted(true);
      onComplete?.();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    onClose?.();
  };

  // Gestion ESC pour fermer
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape' && isVisible) {
        onClose?.();
      }
    };

    if (isVisible) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isVisible, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-[200] p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.12, ease: [0.23, 1, 0.32, 1] }}
          onClick={onClose}
        >
          <motion.div
            className="
              bg-[#232B3E] rounded-2xl shadow-2xl p-12 w-full max-w-lg
              border border-[#222C3B]
            "
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.12, ease: [0.23, 1, 0.32, 1] }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="tour-title"
            aria-describedby="tour-description"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <h2 id="tour-title" className="text-2xl font-bold text-[#F1F5F9]">
                {isCompleted ? 'Tour terminé !' : 'Bienvenue !'}
              </h2>
              
              <motion.button
                className="
                  p-2 text-[#AAB7C6] hover:text-white 
                  transition-colors focus-visible:ring-2 focus-visible:ring-[#3B82F6] 
                  rounded-lg
                "
                onClick={onClose}
                aria-label="Fermer le tour"
                tabIndex={0}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Contenu principal */}
            <div className="mb-8">
              {isCompleted ? (
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.12 }}
                >
                  <CheckCircle className="w-16 h-16 text-[#7DE3F4] mx-auto mb-4" />
                  <p id="tour-description" className="text-[#AAB7C6] text-lg">
                    Vous avez terminé le tour guidé !
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.12, ease: [0.23, 1, 0.32, 1] }}
                >
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-[#3B82F6] rounded-2xl flex items-center justify-center mx-auto mb-4">
                      {(() => {
                        const Icon = tourSteps[currentStep].icon;
                        return <Icon className="w-8 h-8 text-white" />;
                      })()}
                    </div>
                    <h3 className="text-xl font-semibold text-[#F1F5F9] mb-2">
                      {tourSteps[currentStep].title}
                    </h3>
                    <p id="tour-description" className="text-[#AAB7C6]">
                      {tourSteps[currentStep].description}
                    </p>
                  </div>

                  {/* Liste des étapes */}
                  <div className="space-y-3">
                    {tourSteps.map((step, index) => {
                      const Icon = step.icon;
                      const isActive = index === currentStep;
                      const isCompleted = index < currentStep;
                      
                      return (
                        <motion.div
                          key={step.id}
                          className={`
                            flex items-center gap-3 p-3 rounded-lg
                            ${isActive ? 'bg-[#3B82F6]/20 border border-[#3B82F6]/40' : 'bg-[#222C3B]'}
                            transition-all duration-120
                          `}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.12, delay: index * 0.05 }}
                        >
                          <div className="flex-shrink-0">
                            {isCompleted ? (
                              <CheckCircle className="w-5 h-5 text-[#7DE3F4]" />
                            ) : (
                              <Icon className={`w-5 h-5 ${isActive ? 'text-[#3B82F6]' : 'text-[#AAB7C6]'}`} />
                            )}
                          </div>
                          <div className="flex-1">
                            <h4 className={`font-medium ${isActive ? 'text-[#F1F5F9]' : 'text-[#AAB7C6]'}`}>
                              {step.title}
                            </h4>
                            <p className="text-sm text-[#AAB7C6]">
                              {step.description}
                            </p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Actions */}
            <div className="flex justify-between items-center">
              <motion.button
                className="
                  px-4 py-2 text-[#AAB7C6] hover:text-white 
                  transition-colors focus-visible:ring-2 focus-visible:ring-[#3B82F6] 
                  rounded-lg
                "
                onClick={handleSkip}
                tabIndex={0}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Passer
              </motion.button>

              <div className="flex gap-3">
                {currentStep > 0 && !isCompleted && (
                  <motion.button
                    className="
                      flex items-center gap-2 px-4 py-2 text-[#AAB7C6] 
                      hover:text-white transition-colors
                      focus-visible:ring-2 focus-visible:ring-[#3B82F6] rounded-lg
                    "
                    onClick={handlePrevious}
                    tabIndex={0}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Précédent</span>
                  </motion.button>
                )}

                <motion.button
                  className="
                    flex items-center gap-2 px-6 py-2 bg-[#3B82F6] text-white
                    font-semibold rounded-lg hover:bg-[#2563eb] transition-colors
                    focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus:ring-offset-2
                    disabled:opacity-50 disabled:cursor-not-allowed
                  "
                  onClick={isCompleted ? onClose : handleNext}
                  disabled={false}
                  tabIndex={0}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>{isCompleted ? 'Terminer' : 'Commencer'}</span>
                  {!isCompleted && <ArrowRight className="w-4 h-4" />}
                </motion.button>
              </div>
            </div>

            {/* Empty state message */}
            <motion.div
              className="mt-6 p-3 bg-[#222C3B] rounded-lg text-center"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.12, delay: 0.3 }}
            >
              <p className="text-xs text-[#AAB7C6]">
                Aucune étape disponible pour le moment
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
