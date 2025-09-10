import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SlidePanel = ({ 
  isOpen = false,
  onClose,
  title = "Panel",
  children,
  position = "right", // left, right
  size = "md", // sm, md, lg, xl
  showHeader = true,
  showFooter = false,
  footer,
  className = ""
}) => {
  const [isVisible, setIsVisible] = useState(isOpen);
  const panelRef = useRef(null);
  const previousActiveElement = useRef(null);

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'w-80';
      case 'lg':
        return 'w-96';
      case 'xl':
        return 'w-[500px]';
      default:
        return 'w-80';
    }
  };

  const getPositionClasses = () => {
    return position === 'left' ? 'left-0' : 'right-0';
  };

  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement;
      setIsVisible(true);
      
      // Focus sur le premier élément focusable
      setTimeout(() => {
        const focusableElements = panelRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements && focusableElements.length > 0) {
          focusableElements[0].focus();
        }
      }, 200);
    } else {
      setIsVisible(false);
      // Restaurer le focus
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    }
  }, [isOpen]);

  // Focus trap
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose?.();
        return;
      }

      if (event.key === 'Tab' && panelRef.current) {
        const focusableElements = panelRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement?.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement?.focus();
          }
        }
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

  const handleClose = () => {
    onClose?.();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/60 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            ref={panelRef}
            className={`
              fixed ${getPositionClasses()} top-0 h-full ${getSizeClasses()} bg-[#232B3E] 
              shadow-2xl border-l-2 border-[#3B82F6] z-50 flex flex-col
              ${className}
            `}
            role="dialog"
            aria-modal="true"
            aria-labelledby="panel-title"
            initial={{ 
              x: position === 'left' ? '-100%' : '100%',
              opacity: 0.7
            }}
            animate={{ 
              x: 0,
              opacity: 1
            }}
            exit={{ 
              x: position === 'left' ? '-100%' : '100%',
              opacity: 0.7
            }}
            transition={{ 
              duration: 0.18, 
              ease: [0.23, 1, 0.32, 1] 
            }}
          >
            {/* Header */}
            {showHeader && (
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#222C3B] sticky top-0 bg-[#232B3E] z-10">
                <h2 
                  id="panel-title"
                  className="text-lg font-semibold text-[#F1F5F9]"
                >
                  {title}
                </h2>
                <motion.button
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[#AAB7C6] 
                             hover:bg-[#222C3B] hover:text-white transition-colors
                             focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
                  onClick={handleClose}
                  aria-label="Fermer le panel"
                  whileHover={{ 
                    scale: 1.08,
                    transition: { duration: 0.09, ease: [0.23, 1, 0.32, 1] }
                  }}
                  whileTap={{ 
                    scale: 0.95,
                    transition: { duration: 0.06, ease: [0.23, 1, 0.32, 1] }
                  }}
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
                </motion.button>
              </div>
            )}

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              {children}
            </div>

            {/* Footer */}
            {showFooter && footer && (
              <div className="px-6 py-4 border-t border-[#222C3B] bg-[#232B3E]">
                {footer}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SlidePanel;
