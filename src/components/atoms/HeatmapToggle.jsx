import { useState } from 'react';
import { motion } from 'framer-motion';

const HeatmapToggle = ({ 
  isActive = false,
  onToggle,
  mode = 'heatmap', // heatmap, cluster
  className = ""
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleToggle = () => {
    onToggle?.(mode);
  };

  return (
    <motion.button
      className={`
        flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm
        transition-all duration-120 ease-[cubic-bezier(0.23,1,0.32,1)]
        focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:outline-none
        ${isActive 
          ? 'bg-[#3B82F6] text-white shadow-lg' 
          : 'bg-[#222C3B] text-[#AAB7C6] hover:bg-[#3B82F6] hover:text-white'
        }
        ${className}
      `}
      onClick={handleToggle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.12, ease: [0.23, 1, 0.32, 1] }
      }}
      whileTap={{ 
        scale: 0.98,
        transition: { duration: 0.08, ease: [0.23, 1, 0.32, 1] }
      }}
      aria-label={`Activer le mode ${mode === 'heatmap' ? 'Heatmap' : 'Cluster'}`}
      aria-pressed={isActive}
    >
      {/* Icône */}
      <motion.div
        className="w-4 h-4"
        animate={isActive ? { 
          scale: [1, 1.1, 1],
          transition: { duration: 0.3, ease: [0.23, 1, 0.32, 1] }
        } : {}}
      >
        {mode === 'heatmap' ? (
          <svg fill="none" viewBox="0 0 24 24" className="w-full h-full">
            <path 
              stroke="currentColor" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" 
            />
          </svg>
        ) : (
          <svg fill="none" viewBox="0 0 24 24" className="w-full h-full">
            <path 
              stroke="currentColor" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" 
            />
          </svg>
        )}
      </motion.div>

      {/* Label */}
      <span className="uppercase tracking-wide">
        {mode === 'heatmap' ? 'Heatmap' : 'Cluster'}
      </span>

      {/* Indicateur actif */}
      {isActive && (
        <motion.div
          className="w-2 h-2 bg-white rounded-full"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
        />
      )}
    </motion.button>
  );
};

export default HeatmapToggle;
