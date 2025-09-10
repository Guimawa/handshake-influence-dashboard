import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Toast = ({ 
  id,
  type = "info", // info, success, error, warning
  title = "Notification",
  message = "",
  duration = 5000,
  onClose,
  className = ""
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => onClose?.(id), 110); // Délai pour l'animation de sortie
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, id, onClose]);

  const getTypeClasses = () => {
    switch (type) {
      case 'success':
        return {
          border: 'border-[#10B981]',
          icon: 'text-[#10B981]',
          iconPath: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
        };
      case 'error':
        return {
          border: 'border-[#EF4444]',
          icon: 'text-[#EF4444]',
          iconPath: 'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
        };
      case 'warning':
        return {
          border: 'border-[#F59E0B]',
          icon: 'text-[#F59E0B]',
          iconPath: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z'
        };
      default:
        return {
          border: 'border-[#3B82F6]',
          icon: 'text-[#3B82F6]',
          iconPath: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
        };
    }
  };

  const typeClasses = getTypeClasses();

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose?.(id), 110);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={`
            bg-[#232B3E] rounded-xl shadow-lg px-6 py-4 flex items-center gap-3 
            border-l-4 ${typeClasses.border} ${className}
          `}
          role="status"
          aria-live="polite"
          initial={{ 
            opacity: 0, 
            y: 40,
            scale: 0.95
          }}
          animate={{ 
            opacity: 1, 
            y: 0,
            scale: 1
          }}
          exit={{ 
            opacity: 0, 
            scale: 0.92
          }}
          transition={{ 
            duration: 0.14, 
            ease: [0.23, 1, 0.32, 1] 
          }}
        >
          {/* Icône */}
          <motion.svg 
            className={`w-6 h-6 ${typeClasses.icon} flex-shrink-0`}
            fill="none" 
            viewBox="0 0 24 24"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2, delay: 0.1 }}
          >
            <path 
              stroke="currentColor" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d={typeClasses.iconPath}
            />
          </motion.svg>

          {/* Contenu */}
          <div className="flex-1 min-w-0">
            <div className="text-white font-semibold text-sm">
              {title}
            </div>
            {message && (
              <div className="text-[#AAB7C6] text-xs mt-1">
                {message}
              </div>
            )}
          </div>

          {/* Bouton fermer */}
          <motion.button
            className="ml-auto text-[#AAB7C6] hover:text-white rounded-full p-2 transition-all duration-80
                       focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
            onClick={handleClose}
            aria-label="Fermer la notification"
            whileHover={{ 
              scale: 1.08,
              transition: { duration: 0.08, ease: [0.23, 1, 0.32, 1] }
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
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
