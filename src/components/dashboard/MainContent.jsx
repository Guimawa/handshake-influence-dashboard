import React, { useState } from 'react';

/**
 * Composant MainContent modulaire
 * Zone 3 - MAIN CONTENT selon spécifications
 */

const MainContent = ({ 
  title = "Titre du dashboard",
  subtitle = "Sous-titre ici",
  onSearch,
  onTabChange,
  activeTab = "network",
  children
}) => {
  const [searchValue, setSearchValue] = useState('');
  
  const tabs = [
    { id: 'network', label: 'Network' },
    { id: 'heatmap', label: 'Heatmap' }
  ];

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch && onSearch(value);
  };

  const handleTabClick = (tabId) => {
    onTabChange && onTabChange(tabId);
  };

  return (
    <main className="flex-1 flex flex-col px-8 py-8 gap-6">
      <section className="mb-6">
        <h1 className="text-3xl font-bold text-[#F1F5F9] mb-2">{title}</h1>
        <div className="text-lg text-[#AAB7C6] mb-6">{subtitle}</div>
        
        {/* Search Bar */}
        <div className="search-bar w-full max-w-lg mb-8 flex items-center bg-[#222C3B] rounded-xl h-12 px-4 shadow focus-within:ring-2 focus-within:ring-[#3B82F6] transition-all">
          <svg className="text-xl text-[#AAB7C6] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="search"
            className="flex-1 bg-transparent border-none text-[#F1F5F9] placeholder-[#AAB7C6] font-semibold text-base focus:outline-none"
            placeholder="Search..."
            aria-label="Recherche"
            value={searchValue}
            onChange={handleSearchChange}
          />
        </div>
        
        {/* Tabs */}
        <div className="tabs flex gap-4 mb-8" role="tablist">
          {tabs.map((tab) => (
            <button 
              key={tab.id}
              className={`tab px-6 py-2 rounded-full font-bold shadow focus-visible:ring-2 focus-visible:ring-[#3B82F6] transition-all duration-140 ease-[cubic-bezier(0.18,0.89,0.32,1.27)] ${
                activeTab === tab.id
                  ? 'bg-[#3B82F6] text-white'
                  : 'border border-[#222C3B] text-[#AAB7C6] bg-transparent shadow-none hover:bg-[#222C3B] hover:text-white'
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
        
        {/* Main Panel */}
        <div 
          className="panel bg-[#232B3E] rounded-xl p-10 min-h-[320px] flex items-center justify-center text-[#AAB7C6] text-xl"
          aria-label="Zone centrale vide, slot à remplir plus tard"
        >
          {children || '[Zone centrale vide, slot à remplir plus tard]'}
        </div>
      </section>
    </main>
  );
};

export default MainContent;