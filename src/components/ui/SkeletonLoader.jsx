import React from 'react';

/**
 * Composant SkeletonLoader
 * Zone 40 - SKELETON LOADER selon spécifications exactes du fichier de référence
 * Ligne 8332 du fichier chat gpt dash v2 0.1.txt
 */

const SkeletonLoader = ({ 
  lines = 3,
  className = ""
}) => {
  const renderSkeletonLines = () => {
    const skeletonLines = [];
    
    for (let i = 0; i < lines; i++) {
      let width = "w-full";
      
      // Varier la largeur des lignes pour un effet plus réaliste
      if (i === 1) width = "w-[80%]";
      if (i === 2) width = "w-[60%]";
      if (i === 3) width = "w-[90%]";
      if (i === 4) width = "w-[70%]";
      
      skeletonLines.push(
        <div 
          key={i}
          className={`bg-[#384356] rounded-xl h-6 animate-skeleton ${width}`}
        />
      );
    }
    
    return skeletonLines;
  };

  return (
    <div 
      className={`flex flex-col gap-4 w-full max-w-2xl mx-auto py-6 ${className}`}
      aria-busy="true"
    >
      {/* Texte pour lecteurs d'écran */}
      <span className="sr-only">Chargement...</span>
      
      {/* Lignes skeleton */}
      {renderSkeletonLines()}
    </div>
  );
};

export default SkeletonLoader;
