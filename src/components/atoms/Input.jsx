import { useState, forwardRef } from 'react';
import { motion } from 'framer-motion';

export const Input = forwardRef(({ 
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  onBlur,
  onFocus,
  error,
  required = false,
  disabled = false,
  className = "",
  id,
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(!!value);

  const handleFocus = (e) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    setHasValue(!!e.target.value);
    onBlur?.(e);
  };

  const handleChange = (e) => {
    setHasValue(!!e.target.value);
    onChange?.(e);
  };

  const isLabelFloating = isFocused || hasValue;
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={`relative w-full ${className}`}>
      <motion.input
        ref={ref}
        type={type}
        id={inputId}
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        disabled={disabled}
        required={required}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${inputId}-error` : undefined}
        className={`
          peer w-full bg-[#222C3B] text-[#F1F5F9] placeholder-transparent rounded-xl h-12 px-4 
          border-none focus:outline-none focus:ring-2 focus:ring-[#3B82F6] shadow 
          transition-all duration-120
          ${error ? 'focus:ring-[#EF4444]' : ''}
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
        placeholder={placeholder || label}
        {...props}
        whileFocus={{ 
          boxShadow: error 
            ? "0 0 0 3px #EF4444" 
            : "0 0 0 3px #3B82F6, 0 4px 6px -1px rgba(0, 0, 0, 0.1)",
          transition: { duration: 0.1, ease: [0.23, 1, 0.32, 1] }
        }}
      />
      
      <motion.label
        htmlFor={inputId}
        className={`
          absolute left-4 text-[#AAB7C6] text-base transition-all duration-150
          pointer-events-none
          ${isLabelFloating ? 'top-2 text-xs' : 'top-1/2 -translate-y-1/2'}
          ${isLabelFloating ? (error ? 'text-[#EF4444]' : 'text-[#3B82F6]') : ''}
        `}
        animate={{
          top: isLabelFloating ? 8 : '50%',
          fontSize: isLabelFloating ? '0.75rem' : '1rem',
          color: isLabelFloating 
            ? (error ? '#EF4444' : '#3B82F6') 
            : '#AAB7C6'
        }}
        transition={{ 
          duration: 0.15, 
          ease: [0.23, 1, 0.32, 1] 
        }}
      >
        {label}
        {required && <span className="text-[#EF4444] ml-1">*</span>}
      </motion.label>

      {error && (
        <motion.div
          id={`${inputId}-error`}
          className="mt-2 text-sm text-[#EF4444]"
          role="alert"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {error}
        </motion.div>
      )}
    </div>
  );
});

Input.displayName = 'Input';
