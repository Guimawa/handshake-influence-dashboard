import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const StatsCard = ({ 
  title = "Statistique",
  value = 0,
  subtitle = "",
  trend = null, // { value: 5, isPositive: true }
  icon = null,
  color = "#3B82F6",
  className = ""
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    if (isVisible) {
      const duration = 800; // 0.8s
      const startTime = Date.now();
      const startValue = 0;
      const endValue = value;

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing out cubic
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        const currentValue = startValue + (endValue - startValue) * easeOutCubic;
        
        setDisplayValue(currentValue);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [isVisible, value]);

  const formatValue = (val) => {
    if (typeof val === 'number') {
      return val.toFixed(val % 1 === 0 ? 0 : 1);
    }
    return val;
  };

  return (
    <motion.div
      className={`
        bg-[#232B3E] rounded-xl shadow-panel p-5 flex items-center justify-between gap-6 
        min-w-[240px] max-w-xs ${className}
      `}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.12, ease: [0.23, 1, 0.32, 1] }
      }}
    >
      {/* Contenu principal */}
      <div className="flex flex-col gap-1 flex-1">
        <span className="text-xs uppercase tracking-wide text-[#AAB7C6]">
          {title}
        </span>
        
        <div className="flex items-baseline gap-2">
          <motion.span
            className="text-2xl font-bold"
            style={{ color }}
            animate={{ 
              scale: [0.96, 1.08, 1.00],
              transition: { 
                duration: 0.6, 
                ease: [0.23, 1, 0.32, 1],
                times: [0, 0.5, 1]
              }
            }}
            aria-live="polite"
            aria-label={`${title}: ${formatValue(displayValue)}`}
          >
            {formatValue(displayValue)}
          </motion.span>
          
          {trend && (
            <motion.div
              className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium
                         ${trend.isPositive 
                           ? 'bg-green-500/20 text-green-400' 
                           : 'bg-red-500/20 text-red-400'
                         }`}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <span>{trend.isPositive ? '+' : ''}{trend.value}%</span>
              <svg 
                className={`w-3 h-3 ${trend.isPositive ? 'rotate-0' : 'rotate-180'}`}
                fill="none" 
                viewBox="0 0 24 24"
              >
                <path 
                  stroke="currentColor" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M7 17l9.2-9.2M17 17V7H7" 
                />
              </svg>
            </motion.div>
          )}
        </div>
        
        {subtitle && (
          <span className="text-xs text-[#AAB7C6]">
            {subtitle}
          </span>
        )}
      </div>

      {/* Icône */}
      {icon && (
        <motion.div
          className="w-12 h-12 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `${color}20` }}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.4, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
        >
          <span className="text-2xl" style={{ color }}>
            {icon}
          </span>
        </motion.div>
      )}
    </motion.div>
  );
};

export default StatsCard;
