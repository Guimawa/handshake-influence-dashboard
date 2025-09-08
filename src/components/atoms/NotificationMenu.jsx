import { useState, useRef, useEffect } from 'react';

const NotificationMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications] = useState([]); // Empty state pour l'instant
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
      
      // Focus sur le menu à l'ouverture
      menuRef.current?.focus();

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      {/* Bouton cloche avec badge */}
      <button
        ref={buttonRef}
        onClick={toggleMenu}
        className="relative flex items-center justify-center w-12 h-12 rounded-full 
                   hover:bg-[#222C3B] focus-visible:ring-2 focus-visible:ring-[#3B82F6] 
                   transition-all duration-120 ease-[cubic-bezier(0.23,1,0.32,1)]
                   hover:scale-105 active:scale-95"
        aria-label="Ouvrir les notifications"
        tabIndex="0"
        aria-haspopup="true"
        aria-controls="notif-menu"
        aria-expanded={isOpen}
      >
        {/* Icône cloche */}
        <svg 
          className="w-7 h-7 text-[#AAB7C6] transition-colors duration-120" 
          fill="none" 
          viewBox="0 0 24 24"
        >
          <path 
            stroke="currentColor" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
        
        {/* Badge de notification */}
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#EF4444] text-xs text-white 
                        rounded-full flex items-center justify-center font-bold 
                        animate-pop-badge shadow-lg">
          3
        </span>
      </button>

      {/* Menu notifications */}
      <div
        ref={menuRef}
        id="notif-menu"
        className={`absolute right-0 mt-3 w-80 bg-[#232B3E] rounded-xl shadow-panel z-40 p-4 
                   border border-[#222C3B] transition-all duration-120 ease-[cubic-bezier(0.23,1,0.32,1)]
                   ${isOpen 
                     ? 'opacity-100 pointer-events-auto translate-y-0' 
                     : 'opacity-0 pointer-events-none translate-y-4'
                   }`}
        role="menu"
        aria-label="Liste des notifications"
        tabIndex="-1"
      >
        {/* Empty state */}
        <div className="text-[#AAB7C6] text-base text-center py-12">
          Aucune notification pour l'instant
        </div>
      </div>
    </div>
  );
};

export default NotificationMenu;
