import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SpeedDial = ({ 
  actions = [],
  position = 'bottom-right', // bottom-right, bottom-left, top-right, top-left
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredAction, setHoveredAction] = useState(null);
  const speedDialRef = useRef(null);

  const defaultActions = [
    {
      id: 'add-node',
      label: 'Ajouter node',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      ),
      color: '#7DE3F4',
      hoverColor: '#F6E58D',
      onClick: () => console.log('Ajouter node')
    },
    {
      id: 'export',
      label: 'Exporter',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      color: '#F69AC1',
      hoverColor: '#3B82F6',
      onClick: () => console.log('Exporter')
    },
    {
      id: 'settings',
      label: 'Paramètres',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      color: '#F7C873',
      hoverColor: '#3B82F6',
      onClick: () => console.log('Paramètres')
    },
    {
      id: 'help',
      label: 'Aide',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: '#10B981',
      hoverColor: '#3B82F6',
      onClick: () => console.log('Aide')
    }
  ];

  const actionsData = actions.length > 0 ? actions : defaultActions;

  const getPositionClasses = () => {
    switch (position) {
      case 'bottom-left':
        return 'bottom-8 left-8';
      case 'top-right':
        return 'top-8 right-8';
      case 'top-left':
        return 'top-8 left-8';
      default:
        return 'bottom-8 right-8';
    }
  };

  const getDirectionClasses = () => {
    switch (position) {
      case 'bottom-left':
        return 'flex-col-reverse items-start';
      case 'top-right':
        return 'flex-col items-end';
      case 'top-left':
        return 'flex-col items-start';
      default:
        return 'flex-col items-end';
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (speedDialRef.current && !speedDialRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleMainButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const handleActionClick = (action) => {
    action.onClick?.();
    setIsOpen(false);
  };

  return (
    <div
      ref={speedDialRef}
      className={`fixed z-50 flex ${getDirectionClasses()} gap-3 ${getPositionClasses()} ${className}`}
    >
      {/* Speed dial actions */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`flex ${getDirectionClasses()} gap-2`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ 
              duration: 0.1, 
              ease: [0.23, 1, 0.32, 1] 
            }}
          >
            {actionsData.map((action, index) => (
              <motion.button
                key={action.id}
                className="w-11 h-11 rounded-full flex items-center justify-center shadow-lg transition-all duration-120
                           focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:outline-none"
                style={{ 
                  backgroundColor: hoveredAction === action.id ? action.hoverColor : action.color,
                  color: hoveredAction === action.id ? '#232B3E' : '#232B3E'
                }}
                onClick={() => handleActionClick(action)}
                onMouseEnter={() => setHoveredAction(action.id)}
                onMouseLeave={() => setHoveredAction(null)}
                aria-label={action.label}
                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.5, y: 20 }}
                transition={{ 
                  duration: 0.06, 
                  delay: index * 0.06,
                  ease: [0.23, 1, 0.32, 1] 
                }}
                whileHover={{ 
                  scale: 1.1,
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)',
                  transition: { duration: 0.12, ease: [0.23, 1, 0.32, 1] }
                }}
                whileTap={{ 
                  scale: 0.95,
                  transition: { duration: 0.08, ease: [0.23, 1, 0.32, 1] }
                }}
              >
                {action.icon}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main FAB button */}
      <motion.button
        className="w-14 h-14 rounded-full bg-[#3B82F6] shadow-xl flex items-center justify-center text-white text-2xl 
                   hover:bg-[#2563eb] transition-all duration-120 focus-visible:ring-2 focus-visible:ring-[#7DE3F4]
                   focus-visible:outline-none"
        onClick={handleMainButtonClick}
        aria-label="Actions rapides"
        initial={{ scale: 0.93, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          duration: 0.1, 
          ease: [0.23, 1, 0.32, 1] 
        }}
        whileHover={{ 
          scale: 1.05,
          boxShadow: '0 12px 30px rgba(59, 130, 246, 0.4)',
          transition: { duration: 0.12, ease: [0.23, 1, 0.32, 1] }
        }}
        whileTap={{ 
          scale: 0.95,
          transition: { duration: 0.08, ease: [0.23, 1, 0.32, 1] }
        }}
      >
        <motion.svg
          className="w-8 h-8"
          fill="none"
          viewBox="0 0 24 24"
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
        >
          <path 
            stroke="currentColor" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M12 6v6m0 0v6m0-6h6m-6 0H6" 
          />
        </motion.svg>
      </motion.button>
    </div>
  );
};

export default SpeedDial;
