import React, { useEffect, useRef } from 'react';

/**
 * Composant AdvancedModal
 * Zone 38 - MODALE AVANCÉE selon spécifications exactes du fichier de référence
 * Ligne 8212 du fichier chat gpt dash v2 0.1.txt
 */

const AdvancedModal = ({ 
  isOpen = false,
  onClose,
  title = "Fenêtre modale",
  children,
  className = ""
}) => {
  const modalRef = useRef(null);
  const previousActiveElement = useRef(null);

  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement;
      modalRef.current?.focus();
    } else if (previousActiveElement.current) {
      previousActiveElement.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose?.();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/60 z-40 opacity-0 pointer-events-none transition-opacity duration-120 data-[open=true]:opacity-100 data-[open=true]:pointer-events-auto" 
        aria-hidden="true"
        data-open={isOpen}
        onClick={onClose}
      />
      
      {/* Modal */}
      <div 
        ref={modalRef}
        className={`fixed left-1/2 top-1/2 z-50 w-full max-w-lg bg-[#232B3E] rounded-2xl shadow-2xl px-8 py-10 flex flex-col gap-6 transform -translate-x-1/2 -translate-y-1/2 opacity-0 scale-95 transition-all duration-180 ease-[cubic-bezier(0.42,0,0.58,1)] data-[open=true]:opacity-100 data-[open=true]:scale-100 ${className}`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex="-1"
        data-open={isOpen}
      >
        {/* Bouton fermer */}
        <button 
          className="absolute top-5 right-6 w-9 h-9 rounded-full flex items-center justify-center text-[#AAB7C6] hover:bg-[#222C3B] hover:text-white transition focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
          onClick={onClose}
          aria-label="Fermer la modale"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        {/* Contenu */}
        <div className="flex flex-col gap-4 items-stretch">
          {children}
        </div>
      </div>
    </>
  );
};

export default AdvancedModal;
