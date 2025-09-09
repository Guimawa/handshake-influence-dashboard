import React, { useState, useEffect, useRef } from 'react';

/**
 * Composant KeyboardShortcuts
 * Zone 47 - KEYBOARD SHORTCUTS / HELP OVERLAY selon spécifications exactes du fichier de référence
 * Ligne 8784 du fichier chat gpt dash v2 0.1.txt
 */

const KeyboardShortcuts = ({ 
  isOpen = false,
  onClose,
  className = ""
}) => {
  const overlayRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose?.();
      }
    };

    const handleShortcut = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === '/') {
        e.preventDefault();
        onClose?.();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('keydown', handleShortcut);
      // Focus automatique sur le titre
      setTimeout(() => titleRef.current?.focus(), 100);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('keydown', handleShortcut);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const shortcuts = [
    {
      category: 'Navigation',
      items: [
        { key: 'Tab', description: 'Naviguer vers l\'élément suivant' },
        { key: 'Shift + Tab', description: 'Naviguer vers l\'élément précédent' },
        { key: 'Flèches', description: 'Naviguer dans les listes' }
      ]
    },
    {
      category: 'Sélection',
      items: [
        { key: 'Entrée', description: 'Sélectionner l\'élément' },
        { key: 'Espace', description: 'Sélectionner l\'élément' }
      ]
    },
    {
      category: 'Modales',
      items: [
        { key: 'ESC', description: 'Fermer la modale' }
      ]
    },
    {
      category: 'Graphique',
      items: [
        { key: 'A ou +', description: 'Ajouter un nœud' },
        { key: 'Delete', description: 'Supprimer le nœud sélectionné' }
      ]
    },
    {
      category: 'Zoom/Pan',
      items: [
        { key: 'Ctrl + Souris', description: 'Zoom avec la molette' },
        { key: 'Pinch', description: 'Zoom tactile (mobile)' }
      ]
    },
    {
      category: 'Aide',
      items: [
        { key: 'Ctrl + Shift + /', description: 'Ouvrir/fermer cette aide' }
      ]
    }
  ];

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        ref={overlayRef}
        className="fixed inset-0 bg-black/80 z-100 opacity-0 transition-opacity duration-300 data-[open=true]:opacity-100" 
        data-open={isOpen}
        aria-hidden="true"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className={`fixed inset-0 z-100 flex items-center justify-center p-4 ${className}`}>
        <div 
          className="bg-[#232B3E] rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden animate-help-overlay-in"
          role="dialog"
          aria-modal="true"
          aria-label="Raccourcis clavier"
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-[#222C3B]">
            <div className="flex items-center justify-between">
              <h2 
                ref={titleRef}
                className="text-[#F1F5F9] text-xl font-bold"
                tabIndex={-1}
              >
                Raccourcis clavier
              </h2>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#AAB7C6] hover:bg-[#222C3B] hover:text-white transition-colors"
                aria-label="Fermer l'aide"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Contenu */}
          <div className="px-6 py-4 overflow-y-auto max-h-[60vh]">
            <div className="space-y-6">
              {shortcuts.map((category, categoryIndex) => (
                <div key={categoryIndex} className="space-y-3">
                  <h3 className="text-[#F1F5F9] font-semibold text-sm uppercase tracking-wide">
                    {category.category}
                  </h3>
                  <div className="space-y-2">
                    {category.items.map((item, itemIndex) => (
                      <div 
                        key={itemIndex}
                        className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-[#222C3B] transition-colors"
                      >
                        <span className="text-[#AAB7C6] text-sm">{item.description}</span>
                        <kbd className="bg-[#222C3B] text-[#F1F5F9] px-2 py-1 rounded text-xs font-mono">
                          {item.key}
                        </kbd>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Footer */}
          <div className="px-6 py-4 border-t border-[#222C3B] bg-[#1a1f2e]">
            <p className="text-[#AAB7C6] text-xs text-center">
              Appuyez sur <kbd className="bg-[#222C3B] text-[#F1F5F9] px-1 py-0.5 rounded text-xs">ESC</kbd> ou <kbd className="bg-[#222C3B] text-[#F1F5F9] px-1 py-0.5 rounded text-xs">Ctrl + Shift + /</kbd> pour fermer
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default KeyboardShortcuts;
