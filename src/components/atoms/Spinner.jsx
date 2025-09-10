import { motion } from 'framer-motion';

export function Spinner({ 
  size = "md",
  color = "primary",
  className = "",
  label = "Chargement en cours"
}) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8", 
    lg: "w-12 h-12",
    xl: "w-16 h-16"
  };

  const colorClasses = {
    primary: "text-[#3B82F6]",
    secondary: "text-[#AAB7C6]",
    success: "text-[#22C55E]",
    danger: "text-[#EF4444]",
    warning: "text-[#F59E0B]"
  };

  return (
    <div 
      className={`w-12 h-12 flex items-center justify-center ${className}`}
      role="status"
      aria-label={label}
    >
      <motion.svg
        className={`${sizeClasses[size]} ${colorClasses[color]}`}
        fill="none"
        viewBox="0 0 24 24"
        animate={{ rotate: 360 }}
        transition={{
          duration: 1.2,
          ease: "linear",
          repeat: Infinity
        }}
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <motion.path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v8z"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 1.2,
            ease: "easeInOut",
            repeat: Infinity
          }}
        />
      </motion.svg>
    </div>
  );
}

export function LoadingOverlay({ 
  isLoading = false,
  children,
  className = ""
}) {
  if (!isLoading) return children;

  return (
    <div className={`relative ${className}`}>
      {children}
      <motion.div
        className="absolute inset-0 bg-[#181E29]/80 backdrop-blur-sm flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className="bg-[#232B3E] rounded-xl p-6 shadow-panel flex flex-col items-center gap-4">
          <Spinner size="lg" />
          <span className="text-[#F1F5F9] font-semibold">Chargement...</span>
        </div>
      </motion.div>
    </div>
  );
}

export function Skeleton({ 
  width = "100%",
  height = "1rem",
  className = ""
}) {
  return (
    <motion.div
      className={`
        bg-[#222C3B] rounded animate-pulse
        ${className}
      `}
      style={{ width, height }}
      animate={{
        opacity: [0.5, 1, 0.5]
      }}
      transition={{
        duration: 1.5,
        ease: "easeInOut",
        repeat: Infinity
      }}
    />
  );
}
