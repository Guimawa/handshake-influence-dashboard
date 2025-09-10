import { useState } from 'react';
import { motion } from 'framer-motion';

const Badge = ({ 
  children,
  variant = "success", // success, danger, warning, info, neutral
  size = "md", // sm, md, lg
  animated = true,
  className = "",
  onClick,
  isInteractive = false
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const getVariantClasses = () => {
    switch (variant) {
      case 'danger':
        return 'bg-[#EF4444] text-white';
      case 'warning':
        return 'bg-[#F59E0B] text-white';
      case 'info':
        return 'bg-[#3B82F6] text-white';
      case 'neutral':
        return 'bg-[#AAB7C6] text-white';
      default:
        return 'bg-[#22C55E] text-white';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-2 py-0.5 text-xs min-w-[24px]';
      case 'lg':
        return 'px-3 py-1 text-sm min-w-[32px]';
      default:
        return 'px-2.5 py-0.5 text-xs min-w-[28px]';
    }
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
    <motion.span
      className={`
        inline-flex items-center rounded-full font-semibold shadow transition-all duration-90
        ${getVariantClasses()} ${getSizeClasses()}
        ${isInteractive ? 'cursor-pointer focus-visible:ring-2 focus-visible:ring-[#3B82F6]' : ''}
        ${className}
      `}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      tabIndex={isInteractive ? 0 : -1}
      role={isInteractive ? 'button' : 'status'}
      aria-label={isInteractive ? `Badge: ${children}` : undefined}
      initial={animated ? { opacity: 0, scale: 0.9 } : false}
      animate={animated ? { 
        opacity: 1, 
        scale: 1,
        boxShadow: isHovered ? '0 4px 12px rgba(0, 0, 0, 0.15)' : '0 2px 4px rgba(0, 0, 0, 0.1)'
      } : {}}
      whileHover={isInteractive ? { 
        scale: 1.05,
        transition: { duration: 0.09, ease: [0.23, 1, 0.32, 1] }
      } : {}}
      whileTap={isInteractive ? { 
        scale: 0.95,
        transition: { duration: 0.06, ease: [0.23, 1, 0.32, 1] }
      } : {}}
      transition={{ 
        duration: animated ? 0.08 : 0,
        ease: [0.23, 1, 0.32, 1] 
      }}
    >
      {children}
    </motion.span>
  );
};

export default Badge;
