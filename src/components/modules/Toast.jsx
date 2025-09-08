import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, XCircle, Info, X } from 'lucide-react';

export function Toast({ 
  id,
  type = 'info',
  title = "Toast Title",
  message = "Toast message here",
  duration = 5000,
  onClose,
  position = 'top-right'
}) {
  const [isVisible, setIsVisible] = useState(true);

  // Auto-close selon spécifications exactes
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => onClose?.(id), 120); // Délai pour animation de sortie
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, id, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose?.(id), 120);
  };

  // Icônes selon type selon spécifications exactes
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="text-[#22C55E] text-xl" />;
      case 'error':
        return <XCircle className="text-[#EF4444] text-xl" />;
      case 'warning':
        return <AlertCircle className="text-[#F59E0B] text-xl" />;
      default:
        return <Info className="text-[#3B82F6] text-xl" />;
    }
  };

  // Couleurs selon type selon spécifications exactes
  const getColors = () => {
    switch (type) {
      case 'success':
        return 'border-l-[#22C55E]';
      case 'error':
        return 'border-l-[#EF4444]';
      case 'warning':
        return 'border-l-[#F59E0B]';
      default:
        return 'border-l-[#3B82F6]';
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={`fixed z-50 flex flex-col gap-4 items-end ${
            position === 'top-right' ? 'top-6 right-6' : 
            position === 'top-left' ? 'top-6 left-6' :
            position === 'bottom-right' ? 'bottom-6 right-6' :
            'bottom-6 left-6'
          }`}
          initial={{ y: -32, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -32, opacity: 0 }}
          transition={{ 
            duration: 0.14, 
            ease: [0.23, 1, 0.32, 1] 
          }}
        >
          <motion.div
            className={`bg-[#232B3E] rounded-xl shadow-panel px-6 py-3 flex items-center gap-3 border-l-4 ${getColors()} focus-trap`}
            role="status"
            aria-live="polite"
            tabIndex="0"
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.12, ease: [0.23, 1, 0.32, 1] }
            }}
          >
            {/* Icône selon spécifications exactes */}
            {getIcon()}
            
            {/* Contenu selon spécifications exactes */}
            <div className="flex-1 min-w-0">
              <div className="text-[#F1F5F9] font-semibold text-sm">
                {title}
              </div>
              <div className="text-[#AAB7C6] text-sm">
                {message}
              </div>
            </div>
            
            {/* Bouton close selon spécifications exactes */}
            <motion.button
              className="ml-2 px-2 py-1 rounded focus-ring text-[#AAB7C6] hover:text-white transition-colors"
              onClick={handleClose}
              aria-label="Fermer la notification"
              whileHover={{ 
                scale: 1.04,
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                transition: { duration: 0.1, ease: [0.23, 1, 0.32, 1] }
              }}
              whileTap={{ 
                scale: 0.98,
                transition: { duration: 0.08, ease: [0.23, 1, 0.32, 1] }
              }}
            >
              <X className="w-4 h-4" />
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Hook pour gérer les toasts selon spécifications exactes
export function useToast() {
  const [toasts, setToasts] = useState([]);

  const addToast = (toast) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { ...toast, id }]);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const showSuccess = (title, message) => {
    addToast({ type: 'success', title, message });
  };

  const showError = (title, message) => {
    addToast({ type: 'error', title, message });
  };

  const showWarning = (title, message) => {
    addToast({ type: 'warning', title, message });
  };

  const showInfo = (title, message) => {
    addToast({ type: 'info', title, message });
  };

  return {
    toasts,
    addToast,
    removeToast,
    showSuccess,
    showError,
    showWarning,
    showInfo
  };
}

// Container pour afficher tous les toasts selon spécifications exactes
export function ToastContainer({ toasts, onRemove }) {
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          {...toast}
          onClose={onRemove}
        />
      ))}
    </div>
  );
}
