import React, { useState, useRef } from 'react';

/**
 * Composant TagInput
 * Zone 29 - TAG INPUT / MULTI-TAGS selon spécifications exactes du fichier source
 */

const TagInput = ({ 
  tags = [],
  onTagsChange,
  placeholder = "Ajouter un tag",
  className = "",
  disabled = false
}) => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (disabled) return;

    // Entrée pour ajouter un tag
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      addTag(inputValue.trim());
    }
    
    // Backspace pour supprimer le dernier tag si input vide
    if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
      removeTag(tags.length - 1);
    }
  };

  const addTag = (tag) => {
    if (tag && !tags.includes(tag)) {
      const newTags = [...tags, tag];
      onTagsChange && onTagsChange(newTags);
      setInputValue('');
    }
  };

  const removeTag = (index) => {
    const newTags = tags.filter((_, i) => i !== index);
    onTagsChange && onTagsChange(newTags);
  };

  const handleInputBlur = () => {
    // Ajouter le tag si il y a du contenu
    if (inputValue.trim()) {
      addTag(inputValue.trim());
    }
  };

  return (
    <div 
      className={`bg-[#222C3B] rounded-xl px-4 py-3 flex flex-wrap gap-2 items-center min-h-[56px] focus-within:ring-2 focus-within:ring-[#3B82F6] transition ${className}`}
      role="list"
      aria-label="Gestion des tags"
    >
      {/* Tags existants */}
      {tags.map((tag, index) => (
        <span
          key={`${tag}-${index}`}
          className="inline-flex items-center px-3 py-1 rounded-full bg-[#3B82F6] text-white font-semibold text-xs shadow animate-tag-appear"
          role="listitem"
        >
          {tag}
          {!disabled && (
            <button
              type="button"
              onClick={() => removeTag(index)}
              className="ml-2 text-[#AAB7C6] hover:text-white focus-visible:ring-2 focus-visible:ring-[#3B82F6] rounded transition"
              aria-label="Supprimer le tag"
              tabIndex="0"
            >
              ✕
            </button>
          )}
        </span>
      ))}
      
      {/* Input pour nouveau tag */}
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onBlur={handleInputBlur}
        placeholder={placeholder}
        disabled={disabled}
        className="bg-transparent outline-none border-none flex-1 min-w-[60px] text-[#F1F5F9] text-base px-1 focus:ring-0"
        aria-label="Ajouter un tag"
        autoComplete="off"
      />
    </div>
  );
};

export default TagInput;
