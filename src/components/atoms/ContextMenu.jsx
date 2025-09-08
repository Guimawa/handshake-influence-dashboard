import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ContextMenu = ({ 
  isOpen = false,
  onClose,
  position = { x: 0, y: 0 },
  items = [],
  onItemClick,
  className = ""
}) => {
  const [isVisible, setIsVisible] = useState(isOpen);
  const menuRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      
      // Focus sur le premier item
      const firstItem = menuRef.current?.querySelector('button');
      if (firstItem) {
        firstItem.focus();
      }
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  // Fermeture avec ESC
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose?.();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Fermeture en cliquant à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose?.();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleItemClick = (item) => {
    onItemClick?.(item);
    onClose?.();
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      const button = event.target.closest('button');
      if (button) {
        const itemId = button.dataset.itemId;
        const item = items.find(i => i.id === itemId);
        if (item) {
          handleItemClick(item);
        }
      }
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          ref={menuRef}
          className={`
            absolute z-50 bg-[#232B3E] rounded-xl shadow-panel py-2 px-4 border border-[#222C3B] 
            min-w-[140px] ${className}
          `}
          style={{
            left: position.x,
            top: position.y
          }}
          role="menu"
          aria-label="Actions rapides"
          onKeyDown={handleKeyDown}
          initial={{ 
            opacity: 0, 
            scale: 0.97,
            y: 10
          }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            y: 0
          }}
          exit={{ 
            opacity: 0, 
            scale: 0.96
          }}
          transition={{ 
            duration: 0.1, 
            ease: [0.23, 1, 0.32, 1] 
          }}
        >
          {items.map((item) => (
            <motion.button
              key={item.id}
              data-item-id={item.id}
              className={`
                block w-full text-left px-2 py-2 rounded-lg transition-all duration-80
                focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:outline-none
                ${item.danger 
                  ? 'text-[#EF4444] hover:bg-[#222C3B] hover:text-[#EF4444]' 
                  : 'text-[#AAB7C6] hover:bg-[#3B82F6] hover:text-white'
                }
              `}
              onClick={() => handleItemClick(item)}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.08, ease: [0.23, 1, 0.32, 1] }
              }}
              whileTap={{ 
                scale: 0.98,
                transition: { duration: 0.06, ease: [0.23, 1, 0.32, 1] }
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
  );
};

export default ContextMenu;
