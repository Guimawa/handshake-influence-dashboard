import React, { useState, useRef, useEffect } from 'react';

/**
 * Composant EdgePopover
 * Zone 45 - POPOVER SUR EDGE selon spécifications exactes du fichier de référence
 * Ligne 8502 du fichier chat gpt dash v2 0.1.txt
 */

const EdgePopover = ({ 
  edge,
  isVisible = false,
  position = { x: 0, y: 0 },
  onClose,
  className = ""
}) => {
  const popoverRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        onClose?.();
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose?.();
      }
    };

    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isVisible, onClose]);

  useEffect(() => {
    if (isVisible && popoverRef.current) {
      popoverRef.current.focus();
    }
  }, [isVisible]);

  if (!isVisible || !edge) return null;

  return (
    <div
      ref={popoverRef}
      className={`absolute z-60 bg-[#232B3E] border border-[#3B82F6] rounded-xl shadow-lg px-6 py-3 min-w-[160px] transition-all duration-110 animate-popover-in ${className}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
      role="tooltip"
      id={`popover-edge-${edge.id || Math.random().toString(36).substr(2, 9)}`}
      tabIndex={-1}
    >
      <div className="font-semibold text-white mb-1">{edge.label || 'Lien'}</div>
      <div className="text-[#AAB7C6] text-sm">
        <div><b>Source</b>: {edge.sourceLabel || edge.source}</div>
        <div><b>Cible</b>: {edge.targetLabel || edge.target}</div>
        {edge.weight && <div><b>Poids</b>: {edge.weight}</div>}
        {edge.type && <div><b>Type</b>: {edge.type}</div>}
        {edge.date && <div><b>Date</b>: {edge.date}</div>}
      </div>
    </div>
  );
};

export default EdgePopover;
