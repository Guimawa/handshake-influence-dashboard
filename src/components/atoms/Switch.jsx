import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

const Switch = ({ 
  checked = false,
  onChange,
  label = "Label toggle",
  disabled = false,
  size = "md", // sm, md, lg
  className = "",
  id
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return {
          track: 'w-8 h-4',
          thumb: 'w-3 h-3',
          translate: 'translate-x-4'
        };
      case 'lg':
        return {
          track: 'w-12 h-6',
          thumb: 'w-5 h-5',
          translate: 'translate-x-6'
        };
      default:
        return {
          track: 'w-10 h-6',
          thumb: 'w-4 h-4',
          translate: 'translate-x-4'
        };
    }
  };

  const sizeClasses = getSizeClasses();

  const handleToggle = () => {
    if (!disabled && onChange) {
      onChange(!checked);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggle();
    }
  };

  return (
    <label 
      className={`
        inline-flex items-center cursor-pointer gap-3 select-none
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
      htmlFor={id}
    >
      <span className="text-[#AAB7C6] text-base font-semibold">
        {label}
      </span>
      
      <input 
        ref={inputRef}
        type="checkbox" 
        id={id}
        checked={checked}
        onChange={handleToggle}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="sr-only peer" 
        aria-label={`Activer/désactiver ${label}`}
        disabled={disabled}
      />
      
      <motion.span
        className={`
          ${sizeClasses.track} bg-[#222C3B] rounded-full relative transition-all duration-120
          after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full 
          after:${sizeClasses.thumb} after:shadow after:transition-all after:duration-120
          peer-checked:bg-[#3B82F6] peer-focus-visible:ring-2 peer-focus-visible:ring-[#3B82F6]
          peer-checked:after:${sizeClasses.translate}
        `}
        aria-hidden="true"
        animate={{
          backgroundColor: checked ? '#3B82F6' : '#222C3B',
          boxShadow: isFocused ? '0 0 0 2px #3B82F6' : 'none'
        }}
        transition={{ duration: 0.12, ease: [0.23, 1, 0.32, 1] }}
      >
        <motion.div
          className={`
            absolute top-1 left-1 bg-white rounded-full ${sizeClasses.thumb} shadow
          `}
          animate={{
            x: checked ? (size === 'sm' ? 16 : size === 'lg' ? 24 : 16) : 0
          }}
          transition={{ duration: 0.12, ease: [0.23, 1, 0.32, 1] }}
        />
      </motion.span>
    </label>
  );
};

export default Switch;
