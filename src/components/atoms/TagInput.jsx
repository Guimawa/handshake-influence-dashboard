import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TagInput = ({ 
  tags = [],
  onTagsChange,
  suggestions = [],
  maxTags = 10,
  placeholder = "Ajouter un tag…",
  className = ""
}) => {
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  const defaultSuggestions = [
    'React', 'JavaScript', 'TypeScript', 'Node.js', 'Python', 'Vue.js', 'Angular', 'Svelte',
    'Frontend', 'Backend', 'Full-stack', 'Mobile', 'Web', 'API', 'Database', 'Cloud'
  ];

  const suggestionsData = suggestions.length > 0 ? suggestions : defaultSuggestions;

  useEffect(() => {
    if (inputValue.trim()) {
      const filtered = suggestionsData.filter(suggestion =>
        suggestion.toLowerCase().includes(inputValue.toLowerCase()) &&
        !tags.some(tag => tag.toLowerCase() === suggestion.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
      setSelectedSuggestionIndex(-1);
    } else {
      setShowSuggestions(false);
      setFilteredSuggestions([]);
    }
  }, [inputValue, suggestionsData, tags]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedSuggestionIndex >= 0 && filteredSuggestions[selectedSuggestionIndex]) {
        addTag(filteredSuggestions[selectedSuggestionIndex]);
      } else if (inputValue.trim()) {
        addTag(inputValue.trim());
      }
    } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
      e.preventDefault();
      removeTag(tags[tags.length - 1]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedSuggestionIndex(prev => 
        prev < filteredSuggestions.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedSuggestionIndex(prev => 
        prev > 0 ? prev - 1 : filteredSuggestions.length - 1
      );
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      setSelectedSuggestionIndex(-1);
    }
  };

  const addTag = (tagText) => {
    if (tagText && !tags.some(tag => tag.toLowerCase() === tagText.toLowerCase()) && tags.length < maxTags) {
      const newTags = [...tags, tagText];
      onTagsChange?.(newTags);
      setInputValue('');
      setShowSuggestions(false);
      setSelectedSuggestionIndex(-1);
    }
  };

  const removeTag = (tagToRemove) => {
    const newTags = tags.filter(tag => tag !== tagToRemove);
    onTagsChange?.(newTags);
  };

  const handleSuggestionClick = (suggestion) => {
    addTag(suggestion);
  };

  const handleFocus = () => {
    if (inputValue.trim()) {
      setShowSuggestions(true);
    }
  };

  const handleBlur = () => {
    // Délai pour permettre le clic sur les suggestions
    setTimeout(() => {
      setShowSuggestions(false);
      setSelectedSuggestionIndex(-1);
    }, 150);
  };

  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div className={`relative ${className}`}>
      {/* Container principal */}
      <motion.div
        ref={containerRef}
        className="flex flex-wrap items-center gap-2 p-2 bg-[#222C3B] rounded-xl shadow-inner 
                   focus-within:ring-2 focus-within:ring-[#3B82F6] transition-all duration-120 cursor-text"
        onClick={handleContainerClick}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
      >
        {/* Tags existants */}
        <AnimatePresence>
          {tags.map((tag, index) => (
            <motion.span
              key={`${tag}-${index}`}
              className="flex items-center gap-1 bg-[#7DE3F4] text-[#232B3E] rounded-full px-3 py-1 
                         font-semibold text-xs shadow animate-tag-pop"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ 
                duration: 0.09, 
                ease: [0.23, 1, 0.32, 1] 
              }}
            >
              {tag}
              <motion.button
                className="ml-1 text-[#3B82F4] hover:text-[#EF4444] rounded-full transition-colors duration-120
                           focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:outline-none"
                onClick={(e) => {
                  e.stopPropagation();
                  removeTag(tag);
                }}
                aria-label={`Supprimer le tag ${tag}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                ✕
              </motion.button>
            </motion.span>
          ))}
        </AnimatePresence>

        {/* Input */}
        <input
          ref={inputRef}
          type="text"
          className="flex-1 bg-transparent border-none text-[#F1F5F9] focus:outline-none min-w-[60px] py-1"
          placeholder={tags.length === 0 ? placeholder : ""}
          aria-label="Ajouter un tag"
          autoComplete="off"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </motion.div>

      {/* Suggestions autocomplete */}
      <AnimatePresence>
        {showSuggestions && (
          <motion.ul
            className="absolute left-0 top-full mt-1 w-full bg-[#232B3E] rounded-xl shadow-lg z-20 
                       border border-[#222C3B] max-h-60 overflow-auto"
            role="listbox"
            aria-label="Suggestions de tags"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ 
              duration: 0.12, 
              ease: [0.23, 1, 0.32, 1] 
            }}
          >
            {filteredSuggestions.map((suggestion, index) => (
              <motion.li
                key={suggestion}
                className={`px-4 py-2 text-[#AAB7C6] hover:bg-[#3B82F6] hover:text-white 
                           transition-all duration-120 cursor-pointer rounded-lg mx-1 my-1
                           ${selectedSuggestionIndex === index ? 'bg-[#3B82F6] text-white' : ''}`}
                onClick={() => handleSuggestionClick(suggestion)}
                role="option"
                aria-selected={selectedSuggestionIndex === index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  duration: 0.1, 
                  delay: index * 0.02,
                  ease: [0.23, 1, 0.32, 1] 
                }}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.08, ease: [0.23, 1, 0.32, 1] }
                }}
                whileTap={{ 
                  scale: 0.98,
                  transition: { duration: 0.06, ease: [0.23, 1, 0.32, 1] }
                }}
              >
                {suggestion}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TagInput;