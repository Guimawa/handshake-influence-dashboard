import React, { useEffect, useRef } from 'react';

/**
 * Composant ContextMenu
 * Zone 41 - MENU CONTEXTUEL SUR NODE/BULLE selon spécifications exactes du fichier de référence
 * Ligne 8354 du fichier chat gpt dash v2 0.1.txt
 */

const ContextMenu = ({ 
  isOpen = false,
  onClose,
  items = [],
  position = { x: 0, y: 0 },
  className = ""
}) => {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose?.();
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose?.();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen && menuRef.current) {
      menuRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen || items.length === 0) return null;

  return (
    <div
      ref={menuRef}
      className={`absolute z-50 bg-[#232B3E] rounded-xl shadow-panel py-2 px-4 border border-[#222C3B] min-w-[140px] transition-all duration-110 animate-menu-in ${className}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
      role="menu"
      aria-label="Actions rapides"
      tabIndex={-1}
    >
      {items.map((item, index) => (
        <button
          key={index}
          className={`block w-full text-left px-2 py-2 rounded-lg transition ${
            item.danger 
              ? 'text-[#EF4444] hover:bg-[#222C3B] hover:text-[#EF4444]' 
              : 'text-[#AAB7C6] hover:bg-[#3B82F6] hover:text-white'
          }`}
          onClick={() => {
            item.onClick?.();
            onClose?.();
          }}
          disabled={item.disabled}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default ContextMenu;
