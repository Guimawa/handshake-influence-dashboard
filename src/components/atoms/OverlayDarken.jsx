import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function OverlayDarken({ 
  isVisible = false,
  onClose,
  zIndex = 50
}) {
  // Gestion ESC pour fermer
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape' && isVisible) {
        onClose?.();
      }
    };

    if (isVisible) {
      document.addEventListener('keydown', handleEscape);
      // Empêcher le scroll du body
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
          className={`
            fixed inset-0 bg-black/70 z-${zIndex}
            flex items-center justify-center
          `}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.12, ease: [0.23, 1, 0.32, 1] }}
          onClick={onClose}
          aria-hidden="true"
          role="presentation"
        />
      )}
    </AnimatePresence>
  );
}
