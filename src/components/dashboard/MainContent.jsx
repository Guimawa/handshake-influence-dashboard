import React, { useState } from 'react';

/**
 * ZONE 3 - MAIN CONTENT COMPOSANT MODULAIRE
 * Structure vide, prête pour modules futurs
 */

const MainContent = ({ 
  title = "Titre du dashboard",
  subtitle = "Sous-titre ici",
  onSearch,
  onTabChange,
  activeTab = 'network',
  className = '',
  children,
  ...props 
}) => {
  const [searchValue, setSearchValue] = useState('');

  const tabs = [
    { id: 'network', label: 'Network' },
    { id: 'heatmap', label: 'Heatmap' }
  ];

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch?.(value);
  };

  const handleTabClick = (tabId) => {
    onTabChange?.(tabId);
  };

  return (
    <main className={`flex-1 flex flex-col px-8 py-8 gap-6 ${className}`} {...props}>
      <section className="mb-6">
        <h1 className="text-3xl font-bold text-textMain mb-2">{title}</h1>
        <div className="text-lg text-textSub mb-6">{subtitle}</div>
        
        <div className="search-bar w-full max-w-lg mb-8 flex items-center bg-input rounded-xl h-12 px-4 shadow focus-within:ring-2 focus-within:ring-primary">
          <svg className="text-xl text-textSub mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="search"
            className="flex-1 bg-transparent border-none text-textMain placeholder-textSub font-semibold text-base focus:outline-none"
            placeholder="Search..."
            aria-label="Recherche"
            value={searchValue}
            onChange={handleSearchChange}
          />
        </div>
        
        <div className="tabs flex gap-4 mb-8" role="tablist">
          {tabs.map((tab) => (
            <button 
              key={tab.id}
              className={`tab px-6 py-2 rounded-full font-bold shadow focus-visible:ring-2 focus-visible:ring-primary transition-all duration-140 ease-[cubic-bezier(0.18,0.89,0.32,1.27)] ${
                activeTab === tab.id
                  ? 'bg-primary text-white'
                  : 'border border-border text-textSub bg-transparent shadow-none hover:bg-input hover:text-white'
              }`}
              role="tab"
              aria-selected={activeTab === tab.id}
              tabIndex="0"
              onClick={() => handleTabClick(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        
        <div 
          className="panel bg-panel rounded-xl p-10 min-h-[320px] flex items-center justify-center text-textSub text-xl"
          aria-label="Zone centrale vide, slot à remplir plus tard"
        >
          {children || '[Zone centrale vide, slot à remplir plus tard]'}
        </div>
      </section>
    </main>
  );
};

export default MainContent;
