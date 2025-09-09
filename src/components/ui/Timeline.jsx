import React from 'react';

/**
 * Composant Timeline
 * Zone 35 - TIMELINE / CHRONOLOGIE selon spécifications exactes du fichier de référence
 * Ligne 6965 du fichier chat gpt dash v2 0.1.txt
 */

const Timeline = ({ 
  items = [],
  emptyMessage = "Aucun événement à afficher",
  className = ""
}) => {
  if (items.length === 0) {
    return (
      <ul className={`relative border-l-2 border-[#3B82F6] pl-8 py-8 flex flex-col gap-8 ${className}`} role="list">
        <li className="relative" role="listitem">
          <div className="absolute -left-5 top-0 w-4 h-4 bg-[#3B82F6] rounded-full shadow"></div>
          <div className="bg-[#232B3E] rounded-xl p-6 shadow-panel text-[#AAB7C6]">
            {emptyMessage}
          </div>
        </li>
      </ul>
    );
  }

  return (
    <ul className={`relative border-l-2 border-[#3B82F6] pl-8 py-8 flex flex-col gap-8 ${className}`} role="list">
      {items.map((item, index) => (
        <li key={index} className="relative" role="listitem">
          <div className="absolute -left-5 top-0 w-4 h-4 bg-[#3B82F6] rounded-full shadow"></div>
          <div className="bg-[#232B3E] rounded-xl p-6 shadow-panel text-[#AAB7C6] hover:shadow-accented hover:scale-103 transition-all duration-100">
            {item.content || item}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Timeline;
