import { useState } from 'react';
import { motion } from 'framer-motion';

const Timeline = ({ 
  items = [],
  emptyMessage = "Aucun événement à afficher",
  className = "",
  orientation = "vertical" // vertical, horizontal
}) => {
  const [hoveredItem, setHoveredItem] = useState(null);

  const getOrientationClasses = () => {
    if (orientation === 'horizontal') {
      return 'flex flex-row items-center gap-8 overflow-x-auto pb-4';
    }
    return 'flex flex-col gap-8';
  };

  const getItemClasses = () => {
    if (orientation === 'horizontal') {
      return 'flex-shrink-0 min-w-[200px]';
    }
    return '';
  };

  return (
    <div className={`relative ${className}`}>
      {orientation === 'vertical' && (
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-[#3B82F6]"></div>
      )}
      
      <ul 
        className={`${getOrientationClasses()}`}
        role="list"
        aria-label="Chronologie des événements"
      >
        {items.length > 0 ? (
          items.map((item, index) => (
            <motion.li
              key={item.id || index}
              className={`relative ${getItemClasses()}`}
              initial={{ opacity: 0, x: orientation === 'vertical' ? -16 : 0, y: orientation === 'horizontal' ? -16 : 0 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ 
                duration: 0.12, 
                delay: index * 0.05,
                ease: [0.23, 1, 0.32, 1] 
              }}
              onMouseEnter={() => setHoveredItem(item.id || index)}
              onMouseLeave={() => setHoveredItem(null)}
              role="listitem"
            >
              {/* Bulle de la timeline */}
              <div className="relative">
                {orientation === 'vertical' && (
                  <div className="absolute -left-5 top-0 w-4 h-4 bg-[#3B82F6] rounded-full shadow z-10"></div>
                )}
                
                {/* Contenu de l'événement */}
                <motion.div
                  className={`
                    bg-[#232B3E] rounded-xl p-6 shadow-panel text-[#AAB7C6] transition-all duration-100
                    ${hoveredItem === (item.id || index) ? 'shadow-lg scale-[1.03]' : ''}
                  `}
                  whileHover={{ 
                    scale: 1.03,
                    transition: { duration: 0.1, ease: [0.23, 1, 0.32, 1] }
                  }}
                >
                  {item.title && (
                    <h3 className="text-[#F1F5F9] font-semibold text-lg mb-2">
                      {item.title}
                    </h3>
                  )}
                  
                  {item.description && (
                    <p className="text-[#AAB7C6] text-base mb-3">
                      {item.description}
                    </p>
                  )}
                  
                  {item.date && (
                    <time className="text-[#AAB7C6] text-sm font-medium">
                      {item.date}
                    </time>
                  )}
                  
                  {item.content && (
                    <div className="mt-3">
                      {item.content}
                    </div>
                  )}
                </motion.div>
              </div>
            </motion.li>
          ))
        ) : (
          <motion.li
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
            role="listitem"
          >
            <div className="relative">
              {orientation === 'vertical' && (
                <div className="absolute -left-5 top-0 w-4 h-4 bg-[#3B82F6] rounded-full shadow"></div>
              )}
              <div className="bg-[#232B3E] rounded-xl p-6 shadow-panel text-[#AAB7C6] text-center">
                {emptyMessage}
              </div>
            </div>
          </motion.li>
        )}
      </ul>
    </div>
  );
};

export default Timeline;
