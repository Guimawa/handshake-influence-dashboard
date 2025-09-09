import React, { useEffect, useRef } from 'react';

/**
 * Composant DetailPanel
 * Zone 44 - PANEL DE DÉTAIL À DROITE selon spécifications exactes du fichier de référence
 * Ligne 8667 du fichier chat gpt dash v2 0.1.txt
 */

const DetailPanel = ({ 
  isOpen = false,
  onClose,
  title = "Détails",
  children,
  className = ""
}) => {
  const panelRef = useRef(null);
  const previousActiveElement = useRef(null);

  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement;
      panelRef.current?.focus();
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

    const handleClickOutside = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target) && isOpen) {
        onClose?.();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
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
      
      {/* Panel */}
      <div 
        ref={panelRef}
        className={`fixed right-0 top-0 h-full w-full max-w-md bg-[#232B3E] rounded-l-2xl shadow-2xl px-6 py-8 flex flex-col gap-6 transform translate-x-full transition-all duration-180 ease-[cubic-bezier(0.42,0,0.58,1)] data-[open=true]:translate-x-0 ${className}`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex="-1"
        data-open={isOpen}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-[#F1F5F9] text-xl font-bold">{title}</h2>
          <button 
            className="w-9 h-9 rounded-full flex items-center justify-center text-[#AAB7C6] hover:bg-[#222C3B] hover:text-white transition focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
            onClick={onClose}
            aria-label="Fermer le panel"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Contenu */}
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </>
  );
};

export default DetailPanel;
