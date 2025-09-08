import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AnnouncementBar = ({ 
  message = "Nouvelle fonctionnalité disponible !",
  actionText = "Essayer",
  onAction,
  onClose,
  type = "info", // info, success, warning, error
  autoClose = false,
  duration = 5000,
  className = ""
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (autoClose && duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [autoClose, duration]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, 200);
  };

  const handleAction = () => {
    onAction?.();
    handleClose();
  };

  const getTypeClasses = () => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-green-600',
          text: 'text-white',
          action: 'bg-green-700 hover:bg-green-800'
        };
      case 'warning':
        return {
          bg: 'bg-yellow-600',
          text: 'text-white',
          action: 'bg-yellow-700 hover:bg-yellow-800'
        };
      case 'error':
        return {
          bg: 'bg-red-600',
          text: 'text-white',
          action: 'bg-red-700 hover:bg-red-800'
        };
      default:
        return {
          bg: 'bg-[#3B82F6]',
          text: 'text-white',
          action: 'bg-[#2563eb] hover:bg-[#1d4ed8]'
        };
    }
  };

  const typeClasses = getTypeClasses();

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={`
            fixed top-0 left-0 w-full ${typeClasses.bg} ${typeClasses.text} text-center 
            py-2 px-4 z-[70] shadow-lg ${className}
          `}
          role="status"
          aria-live="polite"
          initial={{ 
            y: '-100%',
            opacity: 0
          }}
          animate={{ 
            y: 0,
            opacity: 1
          }}
          exit={{ 
            y: '-100%',
            opacity: 0
          }}
          transition={{ 
            duration: 0.12, 
            ease: [0.23, 1, 0.32, 1] 
          }}
        >
          <div className="max-w-6xl mx-auto flex items-center justify-center gap-4">
            {/* Message */}
            <div className="flex-1 text-sm font-medium">
              {message}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {actionText && onAction && (
                <motion.button
                  className={`
                    px-3 py-1 text-xs font-medium rounded transition-colors
                    ${typeClasses.action}
                  `}
                  onClick={handleAction}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={`Action: ${actionText}`}
                >
                  {actionText}
                </motion.button>
              )}
              
              <motion.button
                className="ml-2 underline hover:no-underline text-sm transition-colors"
                onClick={handleClose}
                aria-label="Fermer l'annonce"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Fermer
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnnouncementBar;
