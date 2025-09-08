import { forwardRef, useState } from "react";
import { motion } from "framer-motion";

export const Input = forwardRef(({ 
  label, 
  error, 
  helperText,
  required = false,
  className = "",
  ...props 
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(!!props.value || !!props.defaultValue);

  const handleChange = (e) => {
    setHasValue(!!e.target.value);
    if (props.onChange) props.onChange(e);
  };

  return (
    <div className="block w-full">
      {label && (
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
          {label}
          {required && <span className="text-red-500 ml-1" aria-label="requis">*</span>}
        </label>
      )}
      
      <div className="relative">
        <motion.input
          ref={ref}
          {...props}
          onChange={handleChange}
          onFocus={(e) => {
            setIsFocused(true);
            if (props.onFocus) props.onFocus(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            if (props.onBlur) props.onBlur(e);
          }}
          className={`
            mt-1 block w-full px-4 py-3 rounded-lg border transition-all duration-200
            ${error 
              ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200" 
              : isFocused
                ? "border-blue-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                : "border-gray-300 dark:border-gray-600 focus:border-blue-500"
            }
            bg-white dark:bg-gray-800 text-gray-900 dark:text-white
            placeholder-gray-500 dark:placeholder-gray-400
            focus:outline-none
            ${className}
          `}
          aria-invalid={!!error}
          aria-describedby={error ? `${props.id}-error` : helperText ? `${props.id}-helper` : undefined}
        />
        
        {/* Focus ring animation */}
        <motion.div
          className="absolute inset-0 rounded-lg pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: isFocused ? 1 : 0,
            scale: isFocused ? 1.02 : 1
          }}
          transition={{ duration: 0.2 }}
          style={{
            background: error 
              ? "linear-gradient(45deg, transparent, rgba(239, 68, 68, 0.1), transparent)"
              : "linear-gradient(45deg, transparent, rgba(59, 130, 246, 0.1), transparent)"
          }}
        />
      </div>
      
      {/* Error message */}
      {error && (
        <motion.div
          id={`${props.id}-error`}
          className="text-xs text-red-600 dark:text-red-400 mt-1 flex items-center gap-1"
          role="alert"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </motion.div>
      )}
      
      {/* Helper text */}
      {helperText && !error && (
        <div id={`${props.id}-helper`} className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {helperText}
        </div>
      )}
    </div>
  );
});

Input.displayName = "Input";