import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Modal = ({ 
  isOpen = false,
  onClose,
  title = "Fenêtre modale",
  children,
  footer,
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  size = "md", // sm, md, lg, xl
  className = ""
}) => {
  const [isVisible, setIsVisible] = useState(isOpen);
  const modalRef = useRef(null);
  const previousActiveElement = useRef(null);

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'max-w-sm';
      case 'lg':
        return 'max-w-2xl';
      case 'xl':
        return 'max-w-4xl';
      default:
        return 'max-w-lg';
    }
  };

  // Focus trap
  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement;
      setIsVisible(true);
      
      // Focus sur le premier élément focusable
      const focusableElements = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements && focusableElements.length > 0) {
        focusableElements[0].focus();
      }
    } else {
      setIsVisible(false);
      // Restaurer le focus
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    }
  }, [isOpen]);

  // Gestion des événements clavier
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && closeOnEscape) {
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
  }, [isOpen, closeOnEscape, onClose]);

  const handleOverlayClick = (event) => {
    if (closeOnOverlayClick && event.target === event.currentTarget) {
      onClose?.();
    }
  };

  const handleClose = () => {
    onClose?.();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/60 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12, ease: [0.23, 1, 0.32, 1] }}
            onClick={handleOverlayClick}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            ref={modalRef}
            className={`
              fixed left-1/2 top-1/2 z-50 w-full ${getSizeClasses()} bg-[#232B3E] rounded-2xl shadow-2xl 
              px-8 py-10 flex flex-col gap-6 transform -translate-x-1/2 -translate-y-1/2
              ${className}
            `}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            tabIndex="-1"
            initial={{ 
              opacity: 0, 
              scale: 0.95,
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
              scale: 0.96,
              y: '-50%',
              x: '-50%'
            }}
            transition={{ 
              duration: 0.18, 
              ease: [0.42, 0, 0.58, 1] 
            }}
          >
            {/* Bouton fermer */}
            {showCloseButton && (
              <motion.button
                className="absolute top-5 right-6 w-9 h-9 rounded-full flex items-center justify-center 
                           text-[#AAB7C6] hover:bg-[#222C3B] hover:text-white transition-all duration-90
                           focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
                onClick={handleClose}
                aria-label="Fermer la modale"
                whileHover={{ 
                  scale: 1.08,
                  transition: { duration: 0.09, ease: [0.23, 1, 0.32, 1] }
                }}
                whileTap={{ 
                  scale: 0.95,
                  transition: { duration: 0.06, ease: [0.23, 1, 0.32, 1] }
                }}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
                  <path 
                    stroke="currentColor" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M6 18L18 6M6 6l12 12" 
                  />
                </svg>
              </motion.button>
            )}

            {/* Contenu */}
            <div className="flex flex-col gap-4 items-stretch">
              {children}
            </div>

            {/* Footer */}
            {footer && (
              <div className="flex gap-2 justify-end mt-4">
                {footer}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;
