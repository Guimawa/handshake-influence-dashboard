import React from 'react';

/**
 * Composant EmptyState
 * Zone 33 - EMPTY STATE AVANCÉ selon spécifications exactes du fichier de référence
 * Ligne 6909 du fichier chat gpt dash v2 0.1.txt
 */

const EmptyState = ({ 
  icon,
  title = "Aucune donnée",
  description = "Essayez de modifier vos filtres ou d'ajouter un élément.",
  actionLabel = "Créer un élément",
  onAction,
  className = ""
}) => {
  return (
    <div className={`flex flex-col items-center justify-center py-12 gap-4 text-center ${className}`}>
      {/* Icône */}
      <div className="w-14 h-14 text-[#3B82F6] opacity-70 mb-2">
        {icon || (
          <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        )}
      </div>
      
      {/* Titre */}
      <h2 className="text-[#F1F5F9] text-lg font-bold">{title}</h2>
      
      {/* Description */}
      <p className="text-[#AAB7C6] text-base">{description}</p>
      
      {/* Bouton d'action */}
      {actionLabel && onAction && (
        <button 
          className="mt-4 px-6 py-2 rounded-xl bg-[#3B82F6] text-white font-semibold shadow hover:bg-[#2563eb] transition-all duration-120"
          onClick={onAction}
          aria-label={actionLabel}
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
