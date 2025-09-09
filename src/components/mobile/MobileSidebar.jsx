import React, { useEffect, useRef } from 'react';

/**
 * ZONE 9 - Sidebar Mobile/Drawer
 * Spécifications exactes selon les directives
 */

const MobileSidebar = ({ isOpen, onClose, children }) => {
  const drawerRef = useRef(null);
  const overlayRef = useRef(null);

  // Focus trap
  useEffect(() => {
    if (isOpen && drawerRef.current) {
      const focusableElements = drawerRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      const handleTabKey = (e) => {
        if (e.key === 'Tab') {
          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              lastElement.focus();
              e.preventDefault();
            }
          } else {
            if (document.activeElement === lastElement) {
              firstElement.focus();
              e.preventDefault();
            }
          }
        }
      };

      const handleEscape = (e) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };

      // Focus sur le premier élément
      firstElement?.focus();

      // Event listeners
      document.addEventListener('keydown', handleTabKey);
      document.addEventListener('keydown', handleEscape);

      return () => {
        document.removeEventListener('keydown', handleTabKey);
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [isOpen, onClose]);

  // Gestion du clic sur l'overlay
  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black/60 z-30 animate-fade-in"
        onClick={handleOverlayClick}
        aria-hidden="true"
      />
      
      {/* Drawer */}
      <aside
        ref={drawerRef}
        className="fixed left-0 top-0 h-full w-[90px] bg-[#232B3E] z-40 animate-drawer-slide-in"
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navigation mobile"
      >
        {children}
      </aside>
    </>
  );
};

export default MobileSidebar;
