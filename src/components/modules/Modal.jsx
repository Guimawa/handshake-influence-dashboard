import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export function Modal({ 
  isOpen = false, 
  onClose, 
  title = "Modal Title",
  children,
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true
}) {
  const modalRef = useRef(null);

  // Focus trap et gestion ESC selon spécifications exactes
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e) => {
      if (closeOnEscape && e.key === 'Escape') {
        onClose();
      }
    };

    const handleTab = (e) => {
      if (e.key === 'Tab') {
        const focusableElements = modalRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        if (!focusableElements || focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('keydown', handleTab);

    // Focus initial sur la modale
    if (modalRef.current) {
      modalRef.current.focus();
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('keydown', handleTab);
    };
  }, [isOpen, onClose, closeOnEscape]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabIndex="-1"
      >
        {/* Overlay selon spécifications exactes */}
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.12, ease: [0.23, 1, 0.32, 1] }}
          onClick={closeOnOverlayClick ? onClose : undefined}
        />

        {/* Modal container selon spécifications exactes */}
        <motion.div
          ref={modalRef}
          className="relative bg-[#232B3E] rounded-2xl shadow-panel w-full max-w-md p-8 flex flex-col items-center justify-center focus-trap focus-visible:ring-2 focus-visible:ring-[#3B82F6] outline-none"
          tabIndex="0"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          transition={{ 
            duration: 0.18, 
            ease: [0.42, 0, 0.58, 1] 
          }}
        >
          {/* Header avec titre et bouton close */}
          <div className="flex items-center justify-between w-full mb-4">
            <h2 id="modal-title" className="text-xl font-bold text-[#F1F5F9]">
              {title}
            </h2>
            {showCloseButton && (
              <motion.button
                className="p-2 text-[#AAB7C6] hover:text-white transition-colors focus-ring rounded-lg"
                onClick={onClose}
                aria-label="Fermer la modale"
                whileHover={{ 
                  scale: 1.04,
                  transition: { duration: 0.12, ease: [0.23, 1, 0.32, 1] }
                }}
                whileTap={{ 
                  scale: 0.98,
                  transition: { duration: 0.08, ease: [0.23, 1, 0.32, 1] }
                }}
              >
                <X className="w-5 h-5" />
              </motion.button>
            )}
          </div>

          {/* Contenu de la modale */}
          <div className="text-[#AAB7C6] mb-6 w-full">
            {children}
          </div>

          {/* Actions selon spécifications exactes */}
          <div className="flex gap-4 w-full justify-end">
            <motion.button
              className="px-5 py-2 rounded-xl bg-[#3B82F6] text-white font-semibold shadow hover:bg-[#2563eb] transition-all duration-120 focus-ring"
              onClick={onClose}
              whileHover={{ 
                scale: 1.03,
                transition: { duration: 0.12, ease: [0.23, 1, 0.32, 1] }
              }}
              whileTap={{ 
                scale: 0.97,
                transition: { duration: 0.08, ease: [0.23, 1, 0.32, 1] }
              }}
            >
              OK
            </motion.button>
            <motion.button
              className="px-5 py-2 rounded-xl bg-[#222C3B] text-[#AAB7C6] font-semibold shadow hover:bg-[#232B3E] transition-all duration-120 focus-ring"
              onClick={onClose}
              whileHover={{ 
                scale: 1.03,
                transition: { duration: 0.12, ease: [0.23, 1, 0.32, 1] }
              }}
              whileTap={{ 
                scale: 0.97,
                transition: { duration: 0.08, ease: [0.23, 1, 0.32, 1] }
              }}
            >
              Annuler
            </motion.button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
