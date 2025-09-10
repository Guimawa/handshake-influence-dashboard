import { useState, useEffect } from 'react';

const Chart = ({ 
  type = "empty", // empty | bar | line | pie | area
  data = [],
  title = "",
  emptyMessage = "Aucun graphique disponible",
  className = "",
  height = 280,
  showLegend = false,
  showGrid = true
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Animation d'apparition
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const renderEmptyState = () => (
    <div className="flex flex-col items-center justify-center text-center py-12">
      {/* Icône graphique */}
      <div className="w-16 h-16 bg-[#222C3B] rounded-xl flex items-center justify-center mb-4">
        <svg className="w-8 h-8 text-[#AAB7C6]" fill="none" viewBox="0 0 24 24">
          <path 
            stroke="currentColor" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      </div>
      
      <h3 className="text-[#AAB7C6] text-lg font-medium mb-2">
        {title || "Graphique"}
      </h3>
      <p className="text-[#AAB7C6] text-base">
        {emptyMessage}
      </p>
    </div>
  );

  const renderChart = () => {
    if (type === "empty" || !data.length) {
      return renderEmptyState();
    }

    // Ici on pourrait intégrer Chart.js, D3, ou autre librairie
    // Pour l'instant, on affiche un placeholder
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-[#AAB7C6] text-lg">
          Graphique {type} - Données à implémenter
        </div>
      </div>
    );
  };

  return (
    <div 
      className={`bg-[#232B3E] rounded-xl shadow-panel p-6 flex flex-col transition-all duration-120 ease-[cubic-bezier(0.23,1,0.32,1)]
                 ${isVisible ? 'opacity-100' : 'opacity-0'}
                 ${isHovered ? 'shadow-lg scale-[1.01]' : ''}
                 ${className}`}
      style={{ minHeight: `${height}px` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="region"
      aria-label={title || "Zone graphique"}
    >
      {/* Titre */}
      {title && (
        <div className="mb-4">
          <h3 className="text-[#F1F5F9] text-lg font-semibold">
            {title}
          </h3>
        </div>
      )}

      {/* Contenu du graphique */}
      <div className="flex-1 flex items-center justify-center">
        {renderChart()}
      </div>

      {/* Légende (si demandée) */}
      {showLegend && data.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2 justify-center">
          {data.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color || '#3B82F6' }}
              />
              <span className="text-[#AAB7C6] text-sm">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Chart;
