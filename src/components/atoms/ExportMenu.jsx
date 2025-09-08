import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ExportMenu = ({ 
  isOpen = false,
  onClose,
  onExport,
  className = ""
}) => {
  const [isVisible, setIsVisible] = useState(isOpen);
  const [isExporting, setIsExporting] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      
      // Focus sur le premier item
      const firstItem = menuRef.current?.querySelector('button');
      if (firstItem) {
        firstItem.focus();
      }
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
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Fermeture en cliquant à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
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

  const exportOptions = [
    {
      id: 'png',
      label: 'Exporter en PNG',
      description: 'Image haute qualité',
      icon: '🖼️',
      format: 'png'
    },
    {
      id: 'jpg',
      label: 'Exporter en JPG',
      description: 'Image compressée',
      icon: '📷',
      format: 'jpg'
    },
    {
      id: 'svg',
      label: 'Exporter en SVG',
      description: 'Format vectoriel',
      icon: '📐',
      format: 'svg'
    },
    {
      id: 'csv',
      label: 'Exporter en CSV',
      description: 'Données tabulaires',
      icon: '📊',
      format: 'csv'
    },
    {
      id: 'link',
      label: 'Copier le lien',
      description: 'URL partageable',
      icon: '🔗',
      format: 'link'
    },
    {
      id: 'selection',
      label: 'Exporter sélection',
      description: 'Sous-graphique',
      icon: '✂️',
      format: 'selection'
    }
  ];

  const handleExport = async (option) => {
    setIsExporting(true);
    
    try {
      // Simulation de l'export
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      onExport?.(option);
      
      // Toast de succès
      console.log(`Export ${option.format} réussi !`);
      
    } catch (error) {
      console.error('Erreur lors de l\'export:', error);
    } finally {
      setIsExporting(false);
      onClose?.();
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      const button = event.target.closest('button');
      if (button) {
        const optionId = button.dataset.optionId;
        const option = exportOptions.find(opt => opt.id === optionId);
        if (option) {
          handleExport(option);
        }
      }
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          ref={menuRef}
          className={`
            absolute top-full right-0 mt-2 bg-[#232B3E] rounded-xl shadow-panel py-2 px-4 
            border border-[#222C3B] min-w-[200px] z-50 ${className}
          `}
          role="menu"
          aria-label="Menu d'export"
          onKeyDown={handleKeyDown}
          initial={{ 
            opacity: 0, 
            scale: 0.95,
            y: -10
          }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            y: 0
          }}
          exit={{ 
            opacity: 0, 
            scale: 0.95,
            y: -10
          }}
          transition={{ 
            duration: 0.1, 
            ease: [0.23, 1, 0.32, 1] 
          }}
        >
          {exportOptions.map((option, index) => (
            <motion.button
              key={option.id}
              data-option-id={option.id}
              className="block w-full text-left px-3 py-2 rounded-lg transition-all duration-80
                         text-[#AAB7C6] hover:bg-[#3B82F6] hover:text-white
                         focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:outline-none"
              onClick={() => handleExport(option)}
              disabled={isExporting}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.1, delay: index * 0.05 }}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.08, ease: [0.23, 1, 0.32, 1] }
              }}
              whileTap={{ 
                scale: 0.98,
                transition: { duration: 0.06, ease: [0.23, 1, 0.32, 1] }
              }}
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">{option.icon}</span>
                <div className="flex-1">
                  <div className="font-medium text-sm">{option.label}</div>
                  <div className="text-xs text-[#AAB7C6]">{option.description}</div>
                </div>
                {isExporting && option.id === 'png' && (
                  <motion.div
                    className="w-4 h-4 border-2 border-[#3B82F6] border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                )}
              </div>
            </motion.button>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ExportMenu;
