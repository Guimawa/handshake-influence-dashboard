import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const HelpOverlay = ({ 
  isOpen = false,
  onClose,
  className = ""
}) => {
  const [isVisible, setIsVisible] = useState(isOpen);
  const overlayRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      
      // Focus sur le titre
      setTimeout(() => {
        const title = overlayRef.current?.querySelector('h2');
        if (title) {
          title.focus();
        }
      }, 200);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  // Fermeture avec ESC
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose?.();
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
  }, [isOpen, onClose]);

  const shortcuts = [
    {
      category: 'Navigation',
      items: [
        { key: 'Tab', description: 'Naviguer entre les éléments' },
        { key: 'Shift + Tab', description: 'Navigation inverse' },
        { key: 'Flèches', description: 'Déplacer le focus' },
        { key: 'Entrée / Espace', description: 'Sélectionner un élément' }
      ]
    },
    {
      category: 'Graphique',
      items: [
        { key: 'A ou +', description: 'Ajouter un node' },
        { key: 'Delete', description: 'Supprimer le node sélectionné' },
        { key: 'Ctrl + Souris', description: 'Zoom et pan' },
        { key: 'Pinch', description: 'Zoom sur mobile' }
      ]
    },
    {
      category: 'Interface',
      items: [
        { key: 'Escape', description: 'Fermer les modales' },
        { key: 'Ctrl + Shift + /', description: 'Ouvrir cette aide' },
        { key: 'H', description: 'Basculer le mode Heatmap' },
        { key: 'C', description: 'Basculer le mode Cluster' }
      ]
    }
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/60 z-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            ref={overlayRef}
            className={`
              fixed left-1/2 top-1/2 z-101 w-full max-w-2xl bg-[#232B3E] rounded-2xl shadow-2xl 
              p-8 transform -translate-x-1/2 -translate-y-1/2 max-h-[80vh] overflow-y-auto
              ${className}
            `}
            role="dialog"
            aria-modal="true"
            aria-label="Aide et raccourcis clavier"
            initial={{ 
              opacity: 0, 
              scale: 0.9,
              y: '-50%',
              x: '-50%'
            }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              y: '-50%',
              x: '-50%'
            }}
            exit={{ 
              opacity: 0, 
              scale: 0.9,
              y: '-50%',
              x: '-50%'
            }}
            transition={{ 
              duration: 0.2, 
              ease: [0.23, 1, 0.32, 1] 
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 
                className="text-2xl font-bold text-[#F1F5F9]"
                tabIndex={0}
              >
                Aide et Raccourcis
              </h2>
              <button
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#AAB7C6] 
                           hover:bg-[#222C3B] hover:text-white transition-colors
                           focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
                onClick={onClose}
                aria-label="Fermer l'aide"
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

            {/* Contenu */}
            <div className="space-y-6">
              {shortcuts.map((category, categoryIndex) => (
                <motion.div
                  key={category.category}
                  className="space-y-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: categoryIndex * 0.1 }}
                >
                  <h3 className="text-lg font-semibold text-[#F1F5F9] border-b border-[#222C3B] pb-2">
                    {category.category}
                  </h3>
                  
                  <div className="space-y-2">
                    {category.items.map((item, itemIndex) => (
                      <motion.div
                        key={item.key}
                        className="flex items-center justify-between py-2 px-3 bg-[#222C3B] rounded-lg"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ 
                          duration: 0.15, 
                          delay: (categoryIndex * 0.1) + (itemIndex * 0.05) 
                        }}
                      >
                        <span className="text-[#AAB7C6] text-sm">
                          {item.description}
                        </span>
                        <kbd className="px-2 py-1 bg-[#3B82F6] text-white text-xs font-mono rounded">
                          {item.key}
                        </kbd>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-[#222C3B] flex items-center justify-between">
              <div className="text-sm text-[#AAB7C6]">
                Appuyez sur <kbd className="px-1 py-0.5 bg-[#222C3B] text-xs rounded">Escape</kbd> pour fermer
              </div>
              <button
                className="px-4 py-2 bg-[#3B82F6] text-white rounded-lg hover:bg-[#2563eb] transition-colors
                           focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
                onClick={onClose}
              >
                Fermer
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default HelpOverlay;
