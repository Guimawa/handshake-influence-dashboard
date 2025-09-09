import React from 'react';

/**
 * ZONE 4 - RANKING PANEL COMPOSANT MODULAIRE
 * Structure vide, prête pour modules futurs
 */

const RankingPanel = ({ 
  className = '',
  children,
  ...props 
}) => {
  return (
    <aside 
      className={`w-[380px] flex flex-col gap-6 ${className}`} 
      role="complementary" 
      aria-label="Zone latérale"
      {...props}
    >
      <div 
        className="panel bg-panel rounded-xl p-8 min-h-[240px] flex flex-col items-center justify-center"
        tabIndex="0"
        aria-label="Ranking card vide, slot à remplir plus tard"
      >
        {children || '[Ranking card vide, slot à remplir plus tard]'}
      </div>
      
      {/* D'autres panels peuvent être ajoutés ici */}
    </aside>
  );
};

export default RankingPanel;
