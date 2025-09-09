import React from 'react';

/**
 * Composant ProgressBar
 * Zone 34 - PROGRESS BAR HORIZONTALE selon spécifications exactes du fichier de référence
 * Ligne 6935 du fichier chat gpt dash v2 0.1.txt
 */

const ProgressBar = ({ 
  value = 0,
  max = 100,
  showPercentage = true,
  className = ""
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={`w-full max-w-md mx-auto my-6 ${className}`}>
      {/* Barre de progression */}
      <div className="w-full h-3 bg-[#222C3B] rounded-full overflow-hidden">
        <div 
          className="bg-[#3B82F6] h-3 rounded-full transition-all duration-140" 
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-label={`Progression: ${Math.round(percentage)}%`}
        />
      </div>
      
      {/* Labels de pourcentage */}
      {showPercentage && (
        <div className="flex justify-between text-xs text-[#AAB7C6] mt-2">
          <span>0%</span>
          <span>100%</span>
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
