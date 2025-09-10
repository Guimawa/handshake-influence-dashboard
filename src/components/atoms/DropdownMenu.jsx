import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DropdownMenu = ({ 
  trigger,
  items = [],
  onItemClick,
  className = "",
  placement = "bottom-right" // bottom-right, bottom-left, top-right, top-left
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const buttonRef = useRef(null);
  const menuRef = useRef(null);

  // Focus trap et fermeture
  useEffect(() => {
    if (isOpen) {
      const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target) && 
            buttonRef.current && !buttonRef.current.contains(event.target)) {
          setIsOpen(false);
        }
      };

      const handleEscape = (event) => {
        if (event.key === 'Escape') {
          setIsOpen(false);
          buttonRef.current?.focus();
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
      
      // Focus sur le premier item du menu
      const firstItem = menuRef.current?.querySelector('button');
      if (firstItem) {
        firstItem.focus();
      }

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [isOpen]);

  const getPlacementClasses = () => {
    switch (placement) {
      case 'top-right':
        return 'bottom-full right-0 mb-2';
      case 'top-left':
        return 'bottom-full left-0 mb-2';
      case 'bottom-left':
        return 'top-full left-0 mt-2';
      default:
        return 'top-full right-0 mt-2';
    }
  };

  const handleItemClick = (item) => {
    if (onItemClick) {
      onItemClick(item);
    }
    setIsOpen(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className={`relative inline-block text-left ${className}`}>
      {/* Trigger */}
      <button
        ref={buttonRef}
        className="flex items-center px-4 py-2 rounded-xl bg-[#232B3E] text-[#F1F5F9] font-semibold 
                   hover:bg-[#222C3B] focus-visible:ring-2 focus-visible:ring-[#3B82F6] 
                   transition-all duration-120"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-controls="dropdown-menu"
        tabIndex={0}
      >
        {trigger || 'Actions'}
        <motion.svg 
          className="w-4 h-4 ml-2 text-[#AAB7C6] transition-transform duration-100" 
          viewBox="0 0 20 20" 
          fill="currentColor"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.1, ease: [0.23, 1, 0.32, 1] }}
        >
          <path 
            fillRule="evenodd" 
            d="M5.23 7.21a.75.75 0 011.06.02L10 10.67l3.71-3.44a.75.75 0 111.02 1.1l-4.25 3.95a.75.75 0 01-1.02 0L5.23 8.33a.75.75 0 01.02-1.12z" 
            clipRule="evenodd" 
          />
        </motion.svg>
      </button>

      {/* Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuRef}
            id="dropdown-menu"
            className={`absolute ${getPlacementClasses()} w-48 bg-[#232B3E] rounded-xl shadow-panel z-30 py-2 border border-[#222C3B]`}
            role="menu"
            aria-label="Menu actions"
            initial={{ 
              opacity: 0, 
              y: 8,
              scale: 0.95
            }}
            animate={{ 
              opacity: 1, 
              y: 0,
              scale: 1
            }}
            exit={{ 
              opacity: 0, 
              y: 8,
              scale: 0.95
            }}
            transition={{ 
              duration: 0.12, 
              ease: [0.23, 1, 0.32, 1] 
            }}
          >
            {items.map((item, index) => (
              <motion.button
                key={item.id || index}
                className="block w-full text-left px-5 py-2 text-[#AAB7C6] 
                           hover:bg-[#222C3B] hover:text-[#3B82F6] 
                           focus-visible:bg-[#222C3B] focus-visible:text-[#3B82F6] 
                           transition-all duration-80 rounded-lg"
                onClick={() => handleItemClick(item)}
                onMouseEnter={() => setHoveredItem(item.id || index)}
                onMouseLeave={() => setHoveredItem(null)}
                tabIndex={0}
                whileHover={{ 
                  scale: 1.03,
                  transition: { 
                    duration: 0.08, 
                    ease: [0.23, 1, 0.32, 1] 
                  }
                }}
                whileTap={{ 
                  scale: 0.98,
                  transition: { 
                    duration: 0.06, 
                    ease: [0.23, 1, 0.32, 1] 
                  }
                }}
              >
                {item.icon && (
                  <span className="inline-block mr-2">{item.icon}</span>
                )}
                {item.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DropdownMenu;
