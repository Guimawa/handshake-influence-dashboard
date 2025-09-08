import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const UserMenu = ({ 
  user = {
    name: "Chef",
    email: "chef@example.com",
    avatar: null
  },
  menuItems = [],
  onItemClick,
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  // Fermeture avec ESC
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  // Fermeture en cliquant à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const defaultMenuItems = [
    {
      id: 'profile',
      label: 'Mon compte',
      icon: '👤',
      href: '#profile'
    },
    {
      id: 'settings',
      label: 'Paramètres',
      icon: '⚙️',
      href: '#settings'
    },
    {
      id: 'logout',
      label: 'Déconnexion',
      icon: '🚪',
      href: '#logout',
      danger: true
    }
  ];

  const items = menuItems.length > 0 ? menuItems : defaultMenuItems;

  const handleItemClick = (item) => {
    onItemClick?.(item);
    setIsOpen(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      const button = event.target.closest('button, a');
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
    <div className={`relative ${className}`} ref={menuRef}>
      {/* Trigger Button */}
      <motion.button
        ref={buttonRef}
        className="flex items-center gap-2 rounded-xl px-3 py-2 bg-[#232B3E] text-[#F1F5F9] 
                   hover:bg-[#3B82F6] transition-all duration-120
                   focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:outline-none"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label="Menu utilisateur"
        whileHover={{ 
          scale: 1.02,
          transition: { duration: 0.12, ease: [0.23, 1, 0.32, 1] }
        }}
        whileTap={{ 
          scale: 0.98,
          transition: { duration: 0.08, ease: [0.23, 1, 0.32, 1] }
        }}
      >
        {/* Avatar */}
        <div className="w-8 h-8 rounded-full border-2 border-white shadow overflow-hidden">
          {user.avatar ? (
            <img 
              src={user.avatar} 
              alt={`Avatar de ${user.name}`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-[#3B82F6] flex items-center justify-center text-white font-bold text-sm">
              {user.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
          )}
        </div>

        {/* Nom */}
        <span className="font-medium">{user.name}</span>

        {/* Chevron */}
        <motion.svg 
          className="w-4 h-4 text-[#AAB7C6] ml-1"
          fill="none" 
          viewBox="0 0 24 24"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
        >
          <path 
            stroke="currentColor" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M19 9l-7 7-7-7" 
          />
        </motion.svg>
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute right-0 mt-2 w-56 bg-[#232B3E] rounded-xl shadow-lg py-3 border border-[#222C3B] z-50"
            role="menu"
            aria-label="Menu utilisateur"
            onKeyDown={handleKeyDown}
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
            {/* User Info */}
            <div className="px-5 py-3 border-b border-[#222C3B]">
              <div className="font-semibold text-[#F1F5F9]">{user.name}</div>
              <div className="text-sm text-[#AAB7C6]">{user.email}</div>
            </div>

            {/* Menu Items */}
            <div className="py-1">
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    duration: 0.1, 
                    delay: index * 0.05,
                    ease: [0.23, 1, 0.32, 1] 
                  }}
                >
                  {item.href ? (
                    <a
                      href={item.href}
                      data-item-id={item.id}
                      className={`
                        block px-5 py-2 text-[#AAB7C6] hover:bg-[#222C3B] transition-all duration-120
                        focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:outline-none
                        rounded-lg mx-2
                        ${item.danger 
                          ? 'hover:text-[#EF4444]' 
                          : 'hover:text-[#3B82F6]'
                        }
                      `}
                      onClick={() => handleItemClick(item)}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{item.icon}</span>
                        <span>{item.label}</span>
                      </div>
                    </a>
                  ) : (
                    <button
                      data-item-id={item.id}
                      className={`
                        block w-full text-left px-5 py-2 text-[#AAB7C6] hover:bg-[#222C3B] 
                        transition-all duration-120 rounded-lg mx-2
                        focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:outline-none
                        ${item.danger 
                          ? 'hover:text-[#EF4444]' 
                          : 'hover:text-[#3B82F6]'
                        }
                      `}
                      onClick={() => handleItemClick(item)}
                      whileHover={{ 
                        scale: 1.01,
                        transition: { duration: 0.08, ease: [0.23, 1, 0.32, 1] }
                      }}
                      whileTap={{ 
                        scale: 0.99,
                        transition: { duration: 0.06, ease: [0.23, 1, 0.32, 1] }
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{item.icon}</span>
                        <span>{item.label}</span>
                      </div>
                    </button>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserMenu;
