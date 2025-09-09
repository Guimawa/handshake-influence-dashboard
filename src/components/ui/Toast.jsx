import React, { useState, useEffect } from 'react';

/**
 * Composant Toast
 * Zone 39 - TOASTS selon spécifications exactes du fichier de référence
 * Ligne 8292 du fichier chat gpt dash v2 0.1.txt
 */

const Toast = ({ 
  message = "Action réussie !",
  type = "success",
  duration = 5000,
  onClose,
  className = ""
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => onClose?.(), 110); // Délai pour l'animation de sortie
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose?.(), 110);
  };

  const getTypeClasses = () => {
    switch (type) {
      case "error":
        return "border-l-4 border-[#EF4444]";
      case "warning":
        return "border-l-4 border-[#F59E0B]";
      case "info":
        return "border-l-4 border-[#3B82F6]";
      default:
        return "border-l-4 border-[#3B82F6]";
    }
  };

  const getIcon = () => {
    switch (type) {
      case "error":
        return (
          <svg className="w-6 h-6 text-[#EF4444]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case "warning":
        return (
          <svg className="w-6 h-6 text-[#F59E0B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        );
      case "info":
        return (
          <svg className="w-6 h-6 text-[#3B82F6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return (
          <svg className="w-6 h-6 text-[#3B82F6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
    }
  };

  if (!isVisible) return null;

  return (
    <div className={`fixed bottom-6 right-6 z-[70] flex flex-col gap-3 ${className}`}>
      <div 
        className={`bg-[#232B3E] rounded-xl shadow-lg px-6 py-4 flex items-center gap-3 ${getTypeClasses()} animate-toast-in`}
        role="status"
        aria-live="polite"
      >
        {getIcon()}
        <span className="text-white font-semibold">{message}</span>
        <button 
          className="ml-auto text-[#AAB7C6] hover:text-white rounded-full p-2 transition" 
          onClick={handleClose}
          aria-label="Fermer la notification"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Toast;