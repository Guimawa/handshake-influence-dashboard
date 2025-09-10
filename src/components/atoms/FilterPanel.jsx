import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FilterPanel = ({ 
  isOpen = false,
  onClose,
  onFilterChange,
  filters = {},
  className = ""
}) => {
  const [isVisible, setIsVisible] = useState(isOpen);
  const [localFilters, setLocalFilters] = useState(filters);
  const panelRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setLocalFilters(filters);
    } else {
      setIsVisible(false);
    }
  }, [isOpen, filters]);

  // Fermeture avec ESC
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose?.();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Fermeture en cliquant à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        onClose?.();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleFilterChange = (key, value) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters = {};
    setLocalFilters(clearedFilters);
    onFilterChange?.(clearedFilters);
  };

  const activeFiltersCount = Object.values(localFilters).filter(value => 
    value !== undefined && value !== '' && value !== null
  ).length;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          ref={panelRef}
          className={`
            fixed right-0 top-0 h-full w-80 max-w-full bg-[#232B3E] border-l-2 border-[#3B82F6] 
            shadow-2xl z-40 ${className}
          `}
          initial={{ 
            x: '100%',
            opacity: 0.7
          }}
          animate={{ 
            x: 0,
            opacity: 1
          }}
          exit={{ 
            x: '100%',
            opacity: 0.7
          }}
          transition={{ 
            duration: 0.18, 
            ease: [0.23, 1, 0.32, 1] 
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#222C3B]">
            <h2 className="text-lg font-semibold text-[#F1F5F9]">
              Filtres
              {activeFiltersCount > 0 && (
                <span className="ml-2 px-2 py-1 bg-[#3B82F6] text-white text-xs rounded-full">
                  {activeFiltersCount}
                </span>
              )}
            </h2>
            <button
              className="w-8 h-8 rounded-full flex items-center justify-center text-[#AAB7C6] 
                         hover:bg-[#222C3B] hover:text-white transition-colors
                         focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
              onClick={onClose}
              aria-label="Fermer le panel de filtres"
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
            </button>
          </div>

          {/* Body */}
          <div className="flex flex-col gap-6 px-6 py-6 overflow-y-auto h-[calc(100vh-120px)]">
            
            {/* Recherche textuelle */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#F1F5F9]">
                Recherche
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 bg-[#222C3B] border border-[#3B82F6] rounded-lg 
                           text-[#F1F5F9] placeholder-[#AAB7C6] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
                placeholder="Rechercher un node..."
                value={localFilters.search || ''}
                onChange={(e) => handleFilterChange('search', e.target.value)}
              />
            </div>

            {/* Type de node */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#F1F5F9]">
                Type de node
              </label>
              <select
                className="w-full px-3 py-2 bg-[#222C3B] border border-[#3B82F6] rounded-lg 
                           text-[#F1F5F9] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
                value={localFilters.type || ''}
                onChange={(e) => handleFilterChange('type', e.target.value)}
              >
                <option value="">Tous les types</option>
                <option value="hub">Hub</option>
                <option value="satellite">Satellite</option>
                <option value="leaf">Leaf</option>
                <option value="custom">Custom</option>
              </select>
            </div>

            {/* Score minimum */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#F1F5F9]">
                Score minimum: {localFilters.minScore || 0}
              </label>
              <input
                type="range"
                min="0"
                max="10"
                step="0.1"
                className="w-full"
                value={localFilters.minScore || 0}
                onChange={(e) => handleFilterChange('minScore', parseFloat(e.target.value))}
              />
            </div>

            {/* Nodes actifs */}
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-[#F1F5F9]">
                Nodes actifs uniquement
              </label>
              <button
                className={`w-12 h-6 rounded-full transition-colors duration-200
                           ${localFilters.activeOnly 
                             ? 'bg-[#3B82F6]' 
                             : 'bg-[#222C3B]'
                           }`}
                onClick={() => handleFilterChange('activeOnly', !localFilters.activeOnly)}
                aria-pressed={localFilters.activeOnly}
              >
                <motion.div
                  className="w-5 h-5 bg-white rounded-full shadow"
                  animate={{ 
                    x: localFilters.activeOnly ? 24 : 2 
                  }}
                  transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                />
              </button>
            </div>

            {/* Filtres actifs */}
            {activeFiltersCount > 0 && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#F1F5F9]">
                  Filtres actifs
                </label>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(localFilters).map(([key, value]) => {
                    if (value === undefined || value === '' || value === null) return null;
                    
                    return (
                      <motion.div
                        key={key}
                        className="flex items-center gap-2 px-3 py-1 bg-[#3B82F6] text-white text-sm rounded-full"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <span>
                          {key}: {typeof value === 'boolean' ? (value ? 'Oui' : 'Non') : value}
                        </span>
                        <button
                          className="w-4 h-4 rounded-full hover:bg-white/20 transition-colors"
                          onClick={() => handleFilterChange(key, undefined)}
                          aria-label={`Supprimer le filtre ${key}`}
                        >
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24">
                            <path 
                              stroke="currentColor" 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth="2" 
                              d="M6 18L18 6M6 6l12 12" 
                            />
                          </svg>
                        </button>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-2 mt-6">
              <button
                className="flex-1 px-4 py-2 bg-[#222C3B] text-[#AAB7C6] rounded-lg 
                           hover:bg-[#3B82F6] hover:text-white transition-colors"
                onClick={handleClearFilters}
              >
                Effacer tout
              </button>
              <button
                className="flex-1 px-4 py-2 bg-[#3B82F6] text-white rounded-lg 
                           hover:bg-[#2563eb] transition-colors"
                onClick={onClose}
              >
                Appliquer
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FilterPanel;
