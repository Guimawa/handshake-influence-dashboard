import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

const SearchBar = ({ 
  placeholder = "Recherche…",
  onSearch,
  onClear,
  className = "",
  disabled = false,
  showClearButton = true
}) => {
  const [searchValue, setSearchValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleClear = () => {
    setSearchValue('');
    if (onClear) {
      onClear();
    }
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      handleClear();
    }
  };

  return (
    <motion.div 
      className={`
        w-full max-w-xl mx-auto flex items-center bg-[#222C3B] rounded-xl h-12 px-4 shadow 
        transition-all duration-120 focus-within:ring-2 focus-within:ring-[#3B82F6]
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
      animate={{
        boxShadow: isFocused 
          ? '0 0 0 2px #3B82F6, 0 4px 12px rgba(59, 130, 246, 0.15)' 
          : '0 2px 8px rgba(0, 0, 0, 0.1)'
      }}
      transition={{ duration: 0.1, ease: [0.23, 1, 0.32, 1] }}
    >
      {/* Icône de recherche */}
      <motion.svg 
        className="text-xl text-[#AAB7C6] mr-3 flex-shrink-0" 
        fill="none" 
        viewBox="0 0 24 24"
        animate={{
          color: isFocused ? '#3B82F6' : '#AAB7C6'
        }}
        transition={{ duration: 0.1 }}
      >
        <path 
          stroke="currentColor" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth="2" 
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
        />
      </motion.svg>

      {/* Input */}
      <input
        ref={inputRef}
        type="search"
        value={searchValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="flex-1 bg-transparent border-none text-[#F1F5F9] placeholder-[#AAB7C6] font-semibold text-base focus:outline-none"
        placeholder={placeholder}
        aria-label={placeholder}
        disabled={disabled}
      />

      {/* Bouton clear */}
      {showClearButton && searchValue && (
        <motion.button
          className="text-[#AAB7C6] hover:text-[#3B82F6] transition-colors duration-100 ml-2"
          onClick={handleClear}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.1 }}
          aria-label="Effacer la recherche"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path 
              fillRule="evenodd" 
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" 
              clipRule="evenodd" 
            />
          </svg>
        </motion.button>
      )}
    </motion.div>
  );
};

export default SearchBar;
