import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AdvancedFilterDropdown = ({ 
  filters = [],
  onFiltersChange,
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [activeTags, setActiveTags] = useState([]);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const defaultFilters = [
    { id: 'group1', label: 'Groupe 1', color: '#3B82F6', checked: false },
    { id: 'group2', label: 'Groupe 2', color: '#F7C873', checked: false },
    { id: 'group3', label: 'Groupe 3', color: '#F69AC1', checked: false },
    { id: 'group4', label: 'Groupe 4', color: '#7DE3F4', checked: false },
    { id: 'group5', label: 'Groupe 5', color: '#F6E58D', checked: false }
  ];

  const filtersData = filters.length > 0 ? filters : defaultFilters;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
          buttonRef.current && !buttonRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleFilterToggle = (filterId) => {
    const updatedFilters = filtersData.map(filter => 
      filter.id === filterId 
        ? { ...filter, checked: !filter.checked }
        : filter
    );
    
    const checkedFilters = updatedFilters.filter(f => f.checked);
    setSelectedFilters(checkedFilters);
    
    // Mettre à jour les tags actifs
    const newActiveTags = checkedFilters.map(filter => ({
      id: filter.id,
      label: filter.label,
      color: filter.color
    }));
    setActiveTags(newActiveTags);
    
    onFiltersChange?.(checkedFilters);
  };

  const handleTagRemove = (tagId) => {
    const updatedFilters = filtersData.map(filter => 
      filter.id === tagId 
        ? { ...filter, checked: false }
        : filter
    );
    
    const checkedFilters = updatedFilters.filter(f => f.checked);
    setSelectedFilters(checkedFilters);
    
    const newActiveTags = checkedFilters.map(filter => ({
      id: filter.id,
      label: filter.label,
      color: filter.color
    }));
    setActiveTags(newActiveTags);
    
    onFiltersChange?.(checkedFilters);
  };

  const handleReset = () => {
    const resetFilters = filtersData.map(filter => ({ ...filter, checked: false }));
    setSelectedFilters([]);
    setActiveTags([]);
    onFiltersChange?.([]);
  };

  return (
    <div className={`relative inline-block text-left ${className}`}>
      {/* Bouton trigger */}
      <motion.button
        ref={buttonRef}
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#232B3E] text-[#F1F5F9] font-semibold 
                   hover:bg-[#222C3B] focus-visible:ring-2 focus-visible:ring-[#3B82F6] transition-all duration-120"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-controls="filter-dropdown"
        whileHover={{ 
          scale: 1.02,
          transition: { duration: 0.12, ease: [0.23, 1, 0.32, 1] }
        }}
        whileTap={{ 
          scale: 0.98,
          transition: { duration: 0.08, ease: [0.23, 1, 0.32, 1] }
        }}
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24">
          <path 
            stroke="currentColor" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" 
          />
        </svg>
        Filtrer
        <svg 
          className={`w-4 h-4 transition-transform duration-120 ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          viewBox="0 0 24 24"
        >
          <path 
            stroke="currentColor" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M19 9l-7 7-7-7" 
          />
        </svg>
      </motion.button>

      {/* Dropdown menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={dropdownRef}
            id="filter-dropdown"
            className="absolute right-0 mt-2 w-64 bg-[#232B3E] rounded-xl shadow-panel border border-[#222C3B] z-30 py-3 px-4"
            role="menu"
            aria-label="Filtres avancés"
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.12, ease: [0.23, 1, 0.32, 1] }}
          >
            {/* Liste des filtres */}
            <div className="flex flex-col gap-3">
              {filtersData.map((filter, index) => (
                <motion.label
                  key={filter.id}
                  className="flex items-center gap-2 cursor-pointer hover:bg-[#222C3B] rounded-lg p-2 -m-2 transition-colors duration-120"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    duration: 0.1, 
                    delay: index * 0.05,
                    ease: [0.23, 1, 0.32, 1] 
                  }}
                >
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded accent-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6] focus:ring-offset-2 focus:ring-offset-[#232B3E]"
                    checked={filter.checked}
                    onChange={() => handleFilterToggle(filter.id)}
                    aria-label={`Filtrer par ${filter.label}`}
                  />
                  <span className="text-[#F1F5F9] font-medium">{filter.label}</span>
                </motion.label>
              ))}
            </div>

            {/* Tags des filtres actifs */}
            {activeTags.length > 0 && (
              <motion.div
                className="flex flex-wrap gap-2 mt-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: 0.1 }}
              >
                {activeTags.map((tag, index) => (
                  <motion.span
                    key={tag.id}
                    className="inline-flex items-center px-3 py-1 rounded-full font-semibold text-xs shadow"
                    style={{ 
                      backgroundColor: tag.color,
                      color: tag.color === '#F6E58D' ? '#212837' : '#232B3E'
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ 
                      duration: 0.08, 
                      delay: index * 0.05,
                      ease: [0.23, 1, 0.32, 1] 
                    }}
                  >
                    {tag.label}
                    <motion.button
                      className="ml-2 text-current hover:text-[#EF4444] focus-visible:ring-2 focus-visible:ring-[#3B82F6] rounded transition-colors duration-120"
                      onClick={() => handleTagRemove(tag.id)}
                      aria-label={`Supprimer le filtre ${tag.label}`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      ✕
                    </motion.button>
                  </motion.span>
                ))}
              </motion.div>
            )}

            {/* Bouton reset */}
            <motion.button
              className="mt-4 w-full px-4 py-2 rounded-xl bg-[#222C3B] text-[#AAB7C6] 
                         hover:bg-[#3B82F6] hover:text-white transition-all duration-120
                         focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
              onClick={handleReset}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 0.15 }}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.12, ease: [0.23, 1, 0.32, 1] }
              }}
              whileTap={{ 
                scale: 0.98,
                transition: { duration: 0.08, ease: [0.23, 1, 0.32, 1] }
              }}
            >
              Réinitialiser
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdvancedFilterDropdown;
