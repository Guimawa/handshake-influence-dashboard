import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Toast from './Toast';

const ToastContainer = ({ 
  toasts = [],
  onRemove,
  position = "bottom-right", // bottom-right, bottom-left, top-right, top-left
  maxToasts = 5,
  className = ""
}) => {
  const getPositionClasses = () => {
    switch (position) {
      case 'bottom-left':
        return 'bottom-6 left-6';
      case 'top-right':
        return 'top-6 right-6';
      case 'top-left':
        return 'top-6 left-6';
      default:
        return 'bottom-6 right-6';
    }
  };

  const handleRemove = useCallback((id) => {
    onRemove?.(id);
  }, [onRemove]);

  return (
    <div className={`
      fixed ${getPositionClasses()} z-[70] flex flex-col gap-3 max-w-sm w-full
      ${className}
    `}>
      <AnimatePresence>
        {toasts.slice(0, maxToasts).map((toast) => (
          <motion.div
            key={toast.id}
            layout
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ 
              duration: 0.2, 
              ease: [0.23, 1, 0.32, 1] 
            }}
          >
            <Toast
              id={toast.id}
              type={toast.type}
              title={toast.title}
              message={toast.message}
              duration={toast.duration}
              onClose={handleRemove}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ToastContainer;
