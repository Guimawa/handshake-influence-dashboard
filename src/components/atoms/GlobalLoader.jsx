import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GlobalLoader = ({ 
  isVisible = false,
  message = "Chargement…",
  progress = null, // 0-100, si null = spinner infini
  onComplete,
  className = ""
}) => {
  const [showLoader, setShowLoader] = useState(isVisible);
  const [displayProgress, setDisplayProgress] = useState(0);

  useEffect(() => {
    setShowLoader(isVisible);
  }, [isVisible]);

  useEffect(() => {
    if (progress !== null) {
      // Animation du progress avec count-up
      const duration = 1000; // 1 seconde
      const startTime = Date.now();
      const startProgress = displayProgress;
      const targetProgress = progress;

      const animateProgress = () => {
        const elapsed = Date.now() - startTime;
        const progressRatio = Math.min(elapsed / duration, 1);
        
        // Easing function (ease-out)
        const easedProgress = 1 - Math.pow(1 - progressRatio, 3);
        const currentProgress = startProgress + (targetProgress - startProgress) * easedProgress;
        
        setDisplayProgress(Math.round(currentProgress));

        if (progressRatio < 1) {
          requestAnimationFrame(animateProgress);
        } else if (progress === 100 && onComplete) {
          // Délai avant de fermer le loader quand 100%
          setTimeout(() => {
            setShowLoader(false);
            onComplete();
          }, 500);
        }
      };

      requestAnimationFrame(animateProgress);
    }
  }, [progress, onComplete]);

  if (!showLoader) return null;

  return (
    <AnimatePresence>
      <motion.div
        className={`fixed inset-0 bg-[#212837]/90 flex flex-col items-center justify-center z-[200] ${className}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
        role="dialog"
        aria-modal="true"
        aria-live="polite"
        aria-busy="true"
      >
        {/* Spinner */}
        <motion.div
          className="relative"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
        >
          <motion.svg
            className="w-16 h-16 text-[#7DE3F4]"
            fill="none"
            viewBox="0 0 24 24"
            animate={{ rotate: 360 }}
            transition={{ 
              duration: 1.1, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="60 40"
              strokeDashoffset="0"
            />
          </motion.svg>
          
          {/* Checkmark when complete */}
          {progress === 100 && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                duration: 0.3, 
                delay: 0.2,
                ease: [0.23, 1, 0.32, 1] 
              }}
            >
              <motion.svg
                className="w-8 h-8 text-[#10B981]"
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
                  strokeWidth="3"
                  d="M5 13l4 4L19 7"
                />
              </motion.svg>
            </motion.div>
          )}
        </motion.div>

        {/* Message */}
        <motion.span
          className="mt-4 text-[#7DE3F4] font-semibold text-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {message}
        </motion.span>

        {/* Progress bar */}
        {progress !== null && (
          <motion.div
            className="w-64 mt-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <div className="w-full bg-[#384356] rounded-full h-2 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#7DE3F4] to-[#F69AC1] rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${displayProgress}%` }}
                transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              />
            </div>
            <div className="text-center mt-2 text-[#AAB7C6] text-sm">
              {displayProgress}%
            </div>
          </motion.div>
        )}

        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent 
                          transform -skew-x-12 animate-shimmer" />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default GlobalLoader;
