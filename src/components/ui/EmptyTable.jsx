import React from 'react';

/**
 * Composant EmptyTable
 * Zone 12 - EMPTY STATE pour table selon spécifications
 */

const EmptyTable = ({ 
  title = "Aucune donnée",
  description = "Il n'y a actuellement aucune donnée à afficher.",
  actionLabel = "Créer un élément",
  onAction,
  icon
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      {/* Icon */}
      <div className="w-16 h-16 mb-4 text-[#AAB7C6]">
        {icon || (
          <svg 
            className="w-full h-full" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
            />
          </svg>
        )}
      </div>
      
      {/* Title */}
      <h3 className="text-lg font-semibold text-[#F1F5F9] mb-2">
        {title}
      </h3>
      
      {/* Description */}
      <p className="text-sm text-[#AAB7C6] mb-6 max-w-sm">
        {description}
      </p>
      
      {/* Action Button */}
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="px-6 py-3 bg-[#3B82F6] text-white font-medium rounded-xl hover:bg-[#2563eb] focus-visible:ring-2 focus-visible:ring-[#3B82F6] transition-all duration-120 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.03] active:scale-95"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default EmptyTable;
