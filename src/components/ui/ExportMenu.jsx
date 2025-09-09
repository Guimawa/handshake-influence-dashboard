import React, { useState, useRef, useEffect } from 'react';

/**
 * Composant ExportMenu
 * Zone 45 - EXPORT / SHARE MENU selon spécifications exactes du fichier de référence
 * Ligne 8728 du fichier chat gpt dash v2 0.1.txt
 */

const ExportMenu = ({ 
  isOpen = false,
  onClose,
  onExport,
  className = ""
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportType, setExportType] = useState('');
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose?.();
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose?.();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const handleExport = async (type) => {
    setIsExporting(true);
    setExportType(type);
    
    try {
      // Simulation de l'export
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Appel de la fonction d'export
      onExport?.(type);
      
      // Toast de succès (géré par le parent)
      onClose?.();
    } catch (error) {
      console.error('Erreur lors de l\'export:', error);
    } finally {
      setIsExporting(false);
      setExportType('');
    }
  };

  const exportOptions = [
    {
      id: 'png',
      label: 'PNG/JPG',
      description: 'Image du graphique',
      icon: '🖼️'
    },
    {
      id: 'svg',
      label: 'SVG',
      description: 'Format vectoriel',
      icon: '📐'
    },
    {
      id: 'csv',
      label: 'CSV',
      description: 'Données nodes/edges',
      icon: '📊'
    },
    {
      id: 'link',
      label: 'Copier lien',
      description: 'URL partageable',
      icon: '🔗'
    },
    {
      id: 'selection',
      label: 'Exporter sélection',
      description: 'Sous-graphique',
      icon: '✂️'
    }
  ];

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/60 z-40 opacity-0 pointer-events-none transition-opacity duration-100 data-[open=true]:opacity-100 data-[open=true]:pointer-events-auto" 
        aria-hidden="true"
        data-open={isOpen}
        onClick={onClose}
      />
      
      {/* Menu */}
      <div
        ref={menuRef}
        className={`absolute top-16 right-4 z-50 bg-[#232B3E] rounded-xl shadow-panel border border-[#222C3B] min-w-[280px] py-2 animate-export-menu-in ${className}`}
        role="menu"
        aria-label="Menu d'export et partage"
        data-open={isOpen}
      >
        {/* Header */}
        <div className="px-4 py-3 border-b border-[#222C3B]">
          <h3 className="text-[#F1F5F9] font-semibold text-sm">Exporter/Partager</h3>
        </div>
        
        {/* Options */}
        <div className="py-2">
          {exportOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => handleExport(option.id)}
              disabled={isExporting}
              className="w-full px-4 py-3 text-left hover:bg-[#222C3B] transition-colors duration-120 flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
              role="menuitem"
              aria-label={`Exporter en ${option.label}`}
            >
              <span className="text-lg">{option.icon}</span>
              <div className="flex-1">
                <div className="text-[#F1F5F9] font-medium text-sm">{option.label}</div>
                <div className="text-[#AAB7C6] text-xs">{option.description}</div>
              </div>
              {isExporting && exportType === option.id && (
                <div className="w-4 h-4 border-2 border-[#3B82F6] border-t-transparent rounded-full animate-spin" />
              )}
            </button>
          ))}
        </div>
        
        {/* Footer */}
        <div className="px-4 py-2 border-t border-[#222C3B]">
          <button
            onClick={onClose}
            className="w-full px-3 py-2 text-[#AAB7C6] hover:text-white hover:bg-[#222C3B] rounded-lg transition-colors duration-120 text-sm"
          >
            Annuler
          </button>
        </div>
      </div>
    </>
  );
};

export default ExportMenu;
