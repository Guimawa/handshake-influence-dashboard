import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ProgressBar = ({ 
  progress = 0, // 0-100
  showPercentage = true,
  animated = true,
  color = 'gradient', // 'gradient', 'blue', 'green', 'red', 'custom'
  customColor = '#7DE3F4',
  size = 'md', // sm, md, lg
  className = ""
}) => {
  const [displayProgress, setDisplayProgress] = useState(0);

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'h-2';
      case 'lg':
        return 'h-6';
      default:
        return 'h-4';
    }
  };

  const getColorClasses = () => {
    switch (color) {
      case 'gradient':
        return 'bg-gradient-to-r from-[#7DE3F4] to-[#F69AC1]';
      case 'blue':
        return 'bg-[#3B82F6]';
      case 'green':
        return 'bg-[#10B981]';
      case 'red':
        return 'bg-[#EF4444]';
      case 'custom':
        return '';
      default:
        return 'bg-gradient-to-r from-[#7DE3F4] to-[#F69AC1]';
    }
  };

  const getTextSize = () => {
    switch (size) {
      case 'sm':
        return 'text-xs';
      case 'lg':
        return 'text-sm';
      default:
        return 'text-xs';
    }
  };

  useEffect(() => {
    if (animated) {
      // Animation du progress avec count-up
      const duration = 800; // 0.8 seconde
      const startTime = Date.now();
      const startProgress = displayProgress;
      const targetProgress = Math.max(0, Math.min(100, progress));

      const animateProgress = () => {
        const elapsed = Date.now() - startTime;
        const progressRatio = Math.min(elapsed / duration, 1);
        
        // Easing function (ease-out cubic)
        const easedProgress = 1 - Math.pow(1 - progressRatio, 3);
        const currentProgress = startProgress + (targetProgress - startProgress) * easedProgress;
        
        setDisplayProgress(Math.round(currentProgress));

        if (progressRatio < 1) {
          requestAnimationFrame(animateProgress);
        }
      };

      requestAnimationFrame(animateProgress);
    } else {
      setDisplayProgress(Math.max(0, Math.min(100, progress)));
    }
  }, [progress, animated]);

  return (
    <div className={`w-full bg-[#384356] rounded-xl relative overflow-hidden shadow ${getSizeClasses()} ${className}`}>
      {/* Progress bar */}
      <motion.div
        className={`absolute left-0 top-0 h-full rounded-xl transition-all duration-150 ${getColorClasses()}`}
        style={{ 
          width: `${displayProgress}%`,
          backgroundColor: color === 'custom' ? customColor : undefined
        }}
        initial={{ width: 0 }}
        animate={{ width: `${displayProgress}%` }}
        transition={{ 
          duration: 0.15, 
          ease: [0.23, 1, 0.32, 1] 
        }}
        role="progressbar"
        aria-valuenow={displayProgress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Progression: ${displayProgress}%`}
      >
        {/* Shimmer effect */}
        {animated && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{
              x: ['-100%', '100%']
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'linear'
            }}
          />
        )}
      </motion.div>

      {/* Percentage text */}
      {showPercentage && (
        <motion.span
          className={`absolute right-2 top-1/2 -translate-y-1/2 font-bold text-[#7DE3F4] ${getTextSize()}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            duration: 0.2, 
            delay: 0.1,
            ease: [0.23, 1, 0.32, 1] 
          }}
        >
          {displayProgress}%
        </motion.span>
      )}

      {/* Completion checkmark */}
      {displayProgress === 100 && (
        <motion.div
          className="absolute right-2 top-1/2 -translate-y-1/2"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            duration: 0.3, 
            delay: 0.2,
            ease: [0.23, 1, 0.32, 1] 
          }}
        >
          <motion.svg
            className="w-4 h-4 text-[#10B981]"
            fill="none"
            viewBox="0 0 24 24"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </motion.svg>
        </motion.div>
      )}
    </div>
  );
};

export default ProgressBar;