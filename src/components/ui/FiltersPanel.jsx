import React, { useState, useEffect, useRef } from 'react';

/**
 * Composant FiltersPanel
 * Zone 48 - PANEL FILTRE CONTEXTUEL selon spécifications exactes du fichier de référence
 * Ligne 8813 du fichier chat gpt dash v2 0.1.txt
 */

const FiltersPanel = ({ 
  isOpen = false,
  onClose,
  onFiltersChange,
  className = ""
}) => {
  const [filters, setFilters] = useState({
    search: '',
    categories: [],
    scoreRange: [0, 100],
    activeNodes: true,
    dateRange: { start: '', end: '' }
  });
  const [activeFilters, setActiveFilters] = useState([]);
  const panelRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
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

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  const addActiveFilter = (key, label, value) => {
    const newFilter = { key, label, value, id: Date.now() };
    setActiveFilters(prev => [...prev, newFilter]);
  };

  const removeActiveFilter = (id) => {
    setActiveFilters(prev => prev.filter(filter => filter.id !== id));
  };

  const clearAllFilters = () => {
    setFilters({
      search: '',
      categories: [],
      scoreRange: [0, 100],
      activeNodes: true,
      dateRange: { start: '', end: '' }
    });
    setActiveFilters([]);
    onFiltersChange?.(filters);
  };

  const categories = [
    { id: 'project', label: 'Projets' },
    { id: 'task', label: 'Tâches' },
    { id: 'document', label: 'Documents' },
    { id: 'user', label: 'Utilisateurs' }
  ];

  if (!isOpen) return null;

  return (
    <div
      ref={panelRef}
      className={`fixed right-0 top-0 h-full w-full max-w-md bg-[#232B3E] rounded-l-2xl shadow-2xl transform transition-all duration-300 ease-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } ${className}`}
      role="dialog"
      aria-modal="true"
      aria-label="Panneau de filtres"
    >
      {/* Header */}
      <div className="px-6 py-4 border-b border-[#222C3B]">
        <div className="flex items-center justify-between">
          <h2 className="text-[#F1F5F9] text-lg font-semibold">Filtres</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#AAB7C6] hover:bg-[#222C3B] hover:text-white transition-colors"
            aria-label="Fermer le panneau"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Contenu */}
      <div className="px-6 py-4 overflow-y-auto flex-1">
        <div className="space-y-6">
          {/* Filtres actifs */}
          {activeFilters.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-[#F1F5F9] font-medium text-sm">Filtres actifs</h3>
                <button
                  onClick={clearAllFilters}
                  className="text-[#3B82F6] hover:text-[#2563eb] text-xs transition-colors"
                >
                  Tout effacer
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {activeFilters.map((filter) => (
                  <span
                    key={filter.id}
                    className="inline-flex items-center gap-2 px-3 py-1 bg-[#3B82F6] text-white rounded-full text-xs animate-filter-badge-in"
                  >
                    {filter.label}: {filter.value}
                    <button
                      onClick={() => removeActiveFilter(filter.id)}
                      className="hover:text-[#AAB7C6] transition-colors"
                      aria-label="Supprimer le filtre"
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Recherche textuelle */}
          <div className="space-y-2">
            <label className="text-[#F1F5F9] font-medium text-sm">Recherche</label>
            <input
              type="text"
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              placeholder="Rechercher..."
              className="w-full px-3 py-2 bg-[#222C3B] border border-[#384356] rounded-lg text-[#F1F5F9] placeholder-[#AAB7C6] focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] transition-colors"
            />
          </div>

          {/* Catégories */}
          <div className="space-y-2">
            <label className="text-[#F1F5F9] font-medium text-sm">Catégories</label>
            <div className="space-y-2">
              {categories.map((category) => (
                <label key={category.id} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.categories.includes(category.id)}
                    onChange={(e) => {
                      const newCategories = e.target.checked
                        ? [...filters.categories, category.id]
                        : filters.categories.filter(id => id !== category.id);
                      handleFilterChange('categories', newCategories);
                      if (e.target.checked) {
                        addActiveFilter('category', 'Catégorie', category.label);
                      }
                    }}
                    className="w-4 h-4 text-[#3B82F6] bg-[#222C3B] border-[#384356] rounded focus:ring-[#3B82F6]"
                  />
                  <span className="text-[#AAB7C6] text-sm">{category.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Score range */}
          <div className="space-y-2">
            <label className="text-[#F1F5F9] font-medium text-sm">
              Score: {filters.scoreRange[0]} - {filters.scoreRange[1]}
            </label>
            <div className="space-y-2">
              <input
                type="range"
                min="0"
                max="100"
                value={filters.scoreRange[0]}
                onChange={(e) => handleFilterChange('scoreRange', [parseInt(e.target.value), filters.scoreRange[1]])}
                className="w-full h-2 bg-[#222C3B] rounded-lg appearance-none cursor-pointer slider"
              />
              <input
                type="range"
                min="0"
                max="100"
                value={filters.scoreRange[1]}
                onChange={(e) => handleFilterChange('scoreRange', [filters.scoreRange[0], parseInt(e.target.value)])}
                className="w-full h-2 bg-[#222C3B] rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
          </div>

          {/* Switch nœuds actifs */}
          <div className="space-y-2">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.activeNodes}
                onChange={(e) => handleFilterChange('activeNodes', e.target.checked)}
                className="w-4 h-4 text-[#3B82F6] bg-[#222C3B] border-[#384356] rounded focus:ring-[#3B82F6]"
              />
              <span className="text-[#F1F5F9] font-medium text-sm">Nœuds actifs uniquement</span>
            </label>
          </div>

          {/* Date range */}
          <div className="space-y-2">
            <label className="text-[#F1F5F9] font-medium text-sm">Période</label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="date"
                value={filters.dateRange.start}
                onChange={(e) => handleFilterChange('dateRange', { ...filters.dateRange, start: e.target.value })}
                className="px-3 py-2 bg-[#222C3B] border border-[#384356] rounded-lg text-[#F1F5F9] focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] transition-colors"
              />
              <input
                type="date"
                value={filters.dateRange.end}
                onChange={(e) => handleFilterChange('dateRange', { ...filters.dateRange, end: e.target.value })}
                className="px-3 py-2 bg-[#222C3B] border border-[#384356] rounded-lg text-[#F1F5F9] focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] transition-colors"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-[#222C3B] bg-[#1a1f2e]">
        <div className="flex gap-2">
          <button
            onClick={clearAllFilters}
            className="flex-1 px-4 py-2 text-[#AAB7C6] hover:text-white hover:bg-[#222C3B] rounded-lg transition-colors"
          >
            Effacer
          </button>
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-[#3B82F6] text-white rounded-lg hover:bg-[#2563eb] transition-colors"
          >
            Appliquer
          </button>
        </div>
      </div>
    </div>
  );
};

export default FiltersPanel;
