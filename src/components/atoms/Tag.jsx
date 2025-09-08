import { useState } from 'react';
import { motion } from 'framer-motion';

const Tag = ({ 
  label = "Tag",
  variant = "default", // default, selected, removable, filter
  color = "#3B82F6",
  onRemove,
  onClick,
  className = "",
  disabled = false
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const getVariantClasses = () => {
    switch (variant) {
      case 'selected':
        return {
          bg: 'bg-[#7DE3F4]',
          text: 'text-[#212837]',
          border: 'border-[#7DE3F4]',
          shadow: 'shadow-lg'
        };
      case 'removable':
        return {
          bg: 'bg-[#222C3B]',
          text: 'text-[#AAB7C6]',
          border: 'border-[#3B82F6]',
          shadow: 'shadow'
        };
      case 'filter':
        return {
          bg: 'bg-[#3B82F6]',
          text: 'text-white',
          border: 'border-[#3B82F6]',
          shadow: 'shadow'
        };
      default:
        return {
          bg: 'bg-[#222C3B]',
          text: 'text-[#AAB7C6]',
          border: 'border-[#222C3B]',
          shadow: 'shadow'
        };
    }
  };

  const variantClasses = getVariantClasses();

  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  const handleRemove = (event) => {
    event.stopPropagation();
    if (!disabled && onRemove) {
      onRemove();
    }
  };

  return (
    <motion.div
      className={`
        inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium
        ${variantClasses.bg} ${variantClasses.text} ${variantClasses.border} ${variantClasses.shadow}
        transition-all duration-120 ease-[cubic-bezier(0.23,1,0.32,1)]
        ${onClick ? 'cursor-pointer' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={!disabled ? { 
        scale: 1.05,
        transition: { duration: 0.12, ease: [0.23, 1, 0.32, 1] }
      } : {}}
      whileTap={!disabled ? { 
        scale: 0.95,
        transition: { duration: 0.08, ease: [0.23, 1, 0.32, 1] }
      } : {}}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label={onClick ? `Tag: ${label}` : undefined}
    >
      {/* Label */}
      <span className="flex-1 truncate">
        {label}
      </span>

      {/* Bouton de suppression */}
      {variant === 'removable' && onRemove && (
        <motion.button
          className="w-4 h-4 rounded-full flex items-center justify-center 
                     hover:bg-black/20 transition-colors"
          onClick={handleRemove}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label={`Supprimer le tag ${label}`}
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
        </motion.button>
      )}

      {/* Indicateur de sélection */}
      {variant === 'selected' && (
        <motion.div
          className="w-2 h-2 bg-[#212837] rounded-full"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2, delay: 0.1 }}
        />
      )}
    </motion.div>
  );
};

export default Tag;