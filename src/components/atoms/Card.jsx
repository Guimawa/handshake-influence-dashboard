import { motion } from 'framer-motion';

export function Card({ 
  children,
  className = "",
  onClick,
  isInteractive = true,
  ariaLabel = "Card item"
}) {
  const CardComponent = isInteractive ? motion.div : 'div';
  
  const interactiveProps = isInteractive ? {
    whileHover: { 
      scale: 1.05,
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      transition: { 
        duration: 0.12, 
        ease: [0.23, 1, 0.32, 1] 
      }
    },
    whileTap: { 
      scale: 0.98,
      transition: { 
        duration: 0.08, 
        ease: [0.23, 1, 0.32, 1] 
      }
    }
  } : {};

  return (
    <CardComponent
      className={`
        bg-[#232B3E] rounded-xl shadow-panel p-6 flex items-center gap-4
        transition-all duration-120 ease-[cubic-bezier(0.23,1,0.32,1)]
        hover:shadow-lg hover:scale-105 focus-visible:ring-2 focus-visible:ring-[#3B82F6]
        ${isInteractive ? 'cursor-pointer' : ''}
        ${className}
      `}
      tabIndex={isInteractive ? 0 : undefined}
      aria-label={ariaLabel}
      onClick={onClick}
      {...interactiveProps}
    >
      {children}
    </CardComponent>
  );
}

export function CardAvatar({ 
  children, 
  className = "",
  size = "md" 
}) {
  const sizeClasses = {
    sm: "w-8 h-8 text-sm",
    md: "w-12 h-12 text-lg", 
    lg: "w-16 h-16 text-xl"
  };

  return (
    <div className={`
      rounded-full bg-[#3B82F6] flex items-center justify-center text-white font-bold shadow
      ${sizeClasses[size]}
      ${className}
    `}>
      {children}
    </div>
  );
}

export function CardContent({ 
  title, 
  subtitle, 
  className = "" 
}) {
  return (
    <div className={`flex-1 flex flex-col ${className}`}>
      <span className="text-[#F1F5F9] text-base font-semibold">
        {title}
      </span>
      <span className="text-[#AAB7C6] text-xs">
        {subtitle}
      </span>
    </div>
  );
}

export function CardAction({ 
  children, 
  onClick,
  variant = "secondary",
  className = "" 
}) {
  const variantClasses = {
    primary: "bg-[#3B82F6] text-white hover:bg-[#2563eb]",
    secondary: "bg-[#222C3B] text-[#AAB7C6] hover:bg-[#3B82F6] hover:text-white",
    danger: "bg-[#EF4444] text-white hover:bg-[#DC2626]"
  };

  return (
    <motion.button
      className={`
        px-3 py-1 rounded-full font-semibold transition-all duration-120
        focus-visible:ring-2 focus-visible:ring-[#3B82F6]
        ${variantClasses[variant]}
        ${className}
      `}
      onClick={onClick}
      whileHover={{ 
        scale: 1.04,
        transition: { duration: 0.12, ease: [0.23, 1, 0.32, 1] }
      }}
      whileTap={{ 
        scale: 0.97,
        transition: { duration: 0.08, ease: [0.23, 1, 0.32, 1] }
      }}
    >
      {children}
    </motion.button>
  );
}
