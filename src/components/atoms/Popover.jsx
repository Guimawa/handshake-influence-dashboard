import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Popover = ({ 
  isOpen = false,
  onClose,
  position = { x: 0, y: 0 },
  title = "Détail",
  content = "Plus d'infos ici...",
  trigger,
  placement = "top", // top, bottom, left, right
  className = ""
}) => {
  const [isVisible, setIsVisible] = useState(isOpen);
  const popoverRef = useRef(null);
  const triggerRef = useRef(null);

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
      if (popoverRef.current && !popoverRef.current.contains(event.target) &&
          triggerRef.current && !triggerRef.current.contains(event.target)) {
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

  const getPlacementClasses = () => {
    switch (placement) {
      case 'bottom':
        return 'top-full left-1/2 transform -translate-x-1/2 mt-2';
      case 'left':
        return 'right-full top-1/2 transform -translate-y-1/2 mr-2';
      case 'right':
        return 'left-full top-1/2 transform -translate-y-1/2 ml-2';
      default:
        return 'bottom-full left-1/2 transform -translate-x-1/2 mb-2';
    }
  };

  const getArrowClasses = () => {
    switch (placement) {
      case 'bottom':
        return 'top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 border-l-transparent border-r-transparent border-b-transparent border-t-[#3B82F6]';
      case 'left':
        return 'right-0 top-1/2 transform translate-x-1 -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent border-l-[#3B82F6]';
      case 'right':
        return 'left-0 top-1/2 transform -translate-x-1 -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent border-r-[#3B82F6]';
      default:
        return 'bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 border-l-transparent border-r-transparent border-t-transparent border-b-[#3B82F6]';
    }
  };

  return (
    <>
      {/* Trigger */}
      {trigger && (
        <div ref={triggerRef} className="inline-block">
          {trigger}
        </div>
      )}

      {/* Popover */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            ref={popoverRef}
            className={`
              absolute z-60 bg-[#232B3E] rounded-xl shadow-panel px-6 py-3 min-w-[160px] 
              border border-[#3B82F6] ${getPlacementClasses()} ${className}
            `}
            role="tooltip"
            id="popover-1"
            initial={{ 
              opacity: 0, 
              scale: 0.98
            }}
            animate={{ 
              opacity: 1, 
              scale: 1.05
            }}
            exit={{ 
              opacity: 0, 
              scale: 0.98
            }}
            transition={{ 
              duration: 0.12, 
              ease: [0.23, 1, 0.32, 1] 
            }}
          >
            {/* Flèche */}
            <div className={`
              absolute w-0 h-0 border-4 ${getArrowClasses()}
            `} />
            
            {/* Contenu */}
            <div className="relative z-10">
              <div className="text-white font-semibold text-sm">
                {title}
              </div>
              <p className="text-[#AAB7C6] text-sm mt-2">
                {content}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Popover;
