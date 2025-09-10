import { useState } from 'react';
import { motion } from 'framer-motion';

const Avatar = ({ 
  name = "A",
  size = "md", // sm, md, lg, xl
  color = "#3B82F6",
  src,
  alt,
  className = "",
  onClick,
  isInteractive = true
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'w-8 h-8 text-sm';
      case 'lg':
        return 'w-16 h-16 text-xl';
      case 'xl':
        return 'w-20 h-20 text-2xl';
      default:
        return 'w-12 h-12 text-xl';
    }
  };

  const getInitials = (name) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleClick = () => {
    if (isInteractive && onClick) {
      onClick();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <motion.div
      className={`
        ${getSizeClasses()} rounded-full flex items-center justify-center text-white font-bold shadow
        border-2 border-white transition-all duration-120 cursor-pointer select-none
        ${isInteractive ? 'focus-visible:ring-2 focus-visible:ring-[#3B82F6]' : ''}
        ${className}
      `}
      style={{
        backgroundColor: color,
        minWidth: size === 'sm' ? '32px' : size === 'lg' ? '64px' : size === 'xl' ? '80px' : '48px',
        minHeight: size === 'sm' ? '32px' : size === 'lg' ? '64px' : size === 'xl' ? '80px' : '48px'
      }}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      tabIndex={isInteractive ? 0 : -1}
      role={isInteractive ? 'button' : 'img'}
      aria-label={alt || `Avatar de ${name}`}
      whileHover={isInteractive ? { 
        scale: 1.06,
        transition: { 
          duration: 0.12, 
          ease: [0.23, 1, 0.32, 1] 
        }
      } : {}}
      whileTap={isInteractive ? { 
        scale: 0.98,
        transition: { 
          duration: 0.08, 
          ease: [0.23, 1, 0.32, 1] 
        }
      } : {}}
      animate={{
        boxShadow: isHovered || isFocused 
          ? `0 4px 20px 0 ${color}40, 0 0 0 2px #F1F5F9` 
          : `0 2px 8px 0 ${color}20`,
        borderColor: isHovered || isFocused ? '#F1F5F9' : 'white'
      }}
      transition={{ duration: 0.12, ease: [0.23, 1, 0.32, 1] }}
    >
      {src ? (
        <img 
          src={src} 
          alt={alt || name}
          className="w-full h-full rounded-full object-cover"
        />
      ) : (
        <span className="truncate max-w-[90%] text-center">
          {getInitials(name)}
        </span>
      )}
    </motion.div>
  );
};

export default Avatar;
