import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const QuickHelp = ({ 
  isOpen = false,
  onClose,
  className = ""
}) => {
  const [isVisible, setIsVisible] = useState(isOpen);
  const popoverRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  // Fermeture en cliquant à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        onClose?.();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Fermeture avec ESC
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose?.();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const faqItems = [
    {
      question: "Comment ajouter un node ?",
      answer: "Cliquez sur le bouton '+' ou appuyez sur la touche 'A'",
      icon: "➕"
    },
    {
      question: "Comment supprimer un node ?",
      answer: "Sélectionnez le node et appuyez sur 'Delete'",
      icon: "🗑️"
    },
    {
      question: "Comment naviguer dans le graphique ?",
      answer: "Utilisez la molette pour zoomer, cliquez-glissez pour déplacer",
      icon: "🖱️"
    },
    {
      question: "Comment voir les détails d'un node ?",
      answer: "Cliquez sur un node pour ouvrir le panel de détails",
      icon: "ℹ️"
    },
    {
      question: "Comment filtrer les nodes ?",
      answer: "Utilisez le bouton 'Filtrer' pour affiner l'affichage",
      icon: "🔍"
    }
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          ref={popoverRef}
          className={`
            fixed bottom-6 right-6 z-60 bg-[#232B3E] rounded-xl shadow-lg p-4 
            max-w-xs border border-[#3B82F6] ${className}
          `}
          role="tooltip"
          aria-label="Aide rapide"
          initial={{ 
            opacity: 0, 
            scale: 0.98,
            y: 20
          }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            y: 0
          }}
          exit={{ 
            opacity: 0, 
            scale: 0.98,
            y: 20
          }}
          transition={{ 
            duration: 0.1, 
            ease: [0.23, 1, 0.32, 1] 
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-[#F1F5F9]">
              Aide rapide
            </h3>
            <button
              className="w-5 h-5 rounded-full flex items-center justify-center text-[#AAB7C6] 
                         hover:bg-[#222C3B] hover:text-white transition-colors"
              onClick={onClose}
              aria-label="Fermer l'aide"
            >
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24">
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

          {/* FAQ Items */}
          <div className="space-y-3">
            {faqItems.map((item, index) => (
              <motion.div
                key={index}
                className="space-y-1"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.1, delay: index * 0.05 }}
              >
                <div className="flex items-start gap-2">
                  <span className="text-sm mt-0.5">{item.icon}</span>
                  <div className="flex-1">
                    <div className="text-xs font-medium text-[#F1F5F9] mb-1">
                      {item.question}
                    </div>
                    <div className="text-xs text-[#AAB7C6]">
                      {item.answer}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-4 pt-3 border-t border-[#222C3B]">
            <a
              href="#"
              className="text-xs text-[#3B82F6] hover:text-[#7DE3F4] transition-colors underline"
              onClick={(e) => {
                e.preventDefault();
                // Ouvrir la page d'aide complète
                console.log('Ouvrir aide complète');
              }}
            >
              Plus d'aide →
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default QuickHelp;
