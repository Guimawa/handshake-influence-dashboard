import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Accordion = ({ 
  items = [],
  allowMultiple = false,
  className = "",
  onToggle
}) => {
  const [openItems, setOpenItems] = useState(new Set());

  const toggleItem = (itemId) => {
    const newOpenItems = new Set(openItems);
    
    if (openItems.has(itemId)) {
      newOpenItems.delete(itemId);
    } else {
      if (!allowMultiple) {
        newOpenItems.clear();
      }
      newOpenItems.add(itemId);
    }
    
    setOpenItems(newOpenItems);
    if (onToggle) onToggle(itemId, newOpenItems.has(itemId));
  };

  return (
    <div className={`w-full max-w-xl mx-auto ${className}`}>
      {items.map((item, index) => {
        const isOpen = openItems.has(item.id);
        
        return (
          <div key={item.id} className="rounded-xl bg-[#232B3E] shadow-panel mb-4">
            {/* Header */}
            <button
              className="w-full flex justify-between items-center px-6 py-4 rounded-xl 
                         focus-visible:ring-2 focus-visible:ring-[#3B82F6] text-left 
                         text-[#F1F5F9] font-semibold text-lg transition-all duration-120
                         hover:bg-[#222C3B] hover:text-[#3B82F6] hover:scale-[1.02]"
              onClick={() => toggleItem(item.id)}
              aria-expanded={isOpen}
              aria-controls={`collapse-content-${item.id}`}
              tabIndex={0}
            >
              <span>{item.title}</span>
              <motion.svg 
                className="w-5 h-5 ml-2 text-[#AAB7C6] transition-transform duration-120" 
                viewBox="0 0 20 20" 
                fill="currentColor"
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.12, ease: [0.23, 1, 0.32, 1] }}
              >
                <path 
                  fillRule="evenodd" 
                  d="M5.23 7.21a.75.75 0 011.06.02L10 10.67l3.71-3.44a.75.75 0 111.02 1.1l-4.25 3.95a.75.75 0 01-1.02 0L5.23 8.33a.75.75 0 01.02-1.12z" 
                  clipRule="evenodd" 
                />
              </motion.svg>
            </button>
            
            {/* Content */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  id={`collapse-content-${item.id}`}
                  className="px-6 py-4 border-t border-[#222C3B] text-[#AAB7C6]"
                  initial={{ 
                    maxHeight: 0, 
                    opacity: 0,
                    overflow: 'hidden'
                  }}
                  animate={{ 
                    maxHeight: '300px', 
                    opacity: 1,
                    overflow: 'visible'
                  }}
                  exit={{ 
                    maxHeight: 0, 
                    opacity: 0,
                    overflow: 'hidden'
                  }}
                  transition={{ 
                    duration: 0.14, 
                    ease: [0.23, 1, 0.32, 1] 
                  }}
                  aria-hidden={!isOpen}
                >
                  {item.content || (
                    <div className="text-center py-4 text-[#AAB7C6]">
                      Contenu vide - {item.title}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
