import React from 'react';

/**
 * Composant RankingPanel modulaire
 * Zone 4 - PANEL DROIT selon spécifications
 */

const RankingPanel = ({ 
  title = "Ranking",
  children,
  className = ""
}) => {
  return (
    <aside 
      className={`w-[380px] flex flex-col gap-6 ${className}`} 
      role="complementary" 
      aria-label="Zone latérale"
    >
      <div 
        className="panel bg-[#232B3E] rounded-xl p-8 min-h-[240px] flex flex-col items-center justify-center"
        tabIndex="0"
        aria-label="Ranking card vide, slot à remplir plus tard"
      >
        {children || '[Ranking card vide, slot à remplir plus tard]'}
      </div>
    </aside>
  );
};

export default RankingPanel;