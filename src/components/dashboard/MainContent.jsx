import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, BarChart3 } from 'lucide-react';
import { SolarSystem } from '../solar-system/SolarSystem';

export function MainContent({ 
  title = "Influence Dashboard",
  subtitle = "Monitor and analyze influence networks",
  onSearch,
  activeTab = 'Network',
  onTabChange,
  isMobile = false
}) {
  const [searchTerm, setSearchTerm] = useState('');

  const tabs = [
    { id: 'Network', label: 'Network' },
    { id: 'Heatmap', label: 'Heatmap' }
  ];

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (onSearch) onSearch(value);
  };

  const handleTabChange = (tabId) => {
    if (onTabChange) onTabChange(tabId);
  };

  return (
    <main className={`flex-1 flex flex-col gap-6 ${isMobile ? 'px-4 py-4' : 'px-8 py-8'}`} role="main">
      <section className="mb-6">
        {/* Header selon spécifications exactes */}
        <h1 className="text-3xl font-bold text-[#F1F5F9] mb-2">
          {title}
        </h1>
        <div className="text-lg text-[#AAB7C6] mb-6">
          {subtitle}
        </div>

        {/* Search bar avec animations NANO-précises selon spécifications exactes */}
        <motion.div 
          className={`w-full mb-8 flex items-center bg-[#222C3B] rounded-xl h-12 px-4 shadow focus-within:ring-2 focus-within:ring-[#3B82F6] ${isMobile ? 'max-w-full' : 'max-w-lg'}`}
          whileFocus={{ 
            boxShadow: "0 0 0 3px #3B82F6, 0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            transition: { 
              duration: 0.1, 
              ease: [0.23, 1, 0.32, 1] 
            }
          }}
        >
          <Search className="text-xl text-[#AAB7C6] mr-3" />
          <input
            type="search"
            className="flex-1 bg-transparent border-none text-[#F1F5F9] placeholder-[#AAB7C6] font-semibold text-base focus:outline-none"
            placeholder="Search Influencer, organization or event"
            value={searchTerm}
            onChange={handleSearch}
            aria-label="Recherche"
          />
        </motion.div>

        {/* Tabs avec animations NANO-précises - effet pill "glisse" selon spécifications exactes */}
        <div className={`tabs flex mb-8 ${isMobile ? 'gap-2 overflow-x-auto' : 'gap-4'}`} role="tablist">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              className={`
                relative px-6 py-2 rounded-full font-bold shadow focus-visible:ring-2 ring-[#3B82F6] transition-all duration-120
                ${activeTab === tab.id
                  ? 'text-white'
                  : 'border border-[#222C3B] text-[#AAB7C6] font-bold bg-transparent shadow-none hover:bg-[#222C3B] hover:text-white'
                }
              `}
              role="tab"
              aria-selected={activeTab === tab.id}
              tabIndex={activeTab === tab.id ? 0 : -1}
              onClick={() => handleTabChange(tab.id)}
              // ANIMATIONS NANO-PRÉCISES selon spécifications exactes
              whileHover={{ 
                scale: 1.05,
                transition: { 
                  duration: 0.12, 
                  ease: [0.23, 1, 0.32, 1] 
                }
              }}
              whileTap={{ 
                scale: 0.98,
                transition: { 
                  duration: 0.08, 
                  ease: [0.23, 1, 0.32, 1] 
                }
              }}
            >
              {/* Fond animé avec effet pill "glisse" selon spécifications exactes */}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="tab-bg"
                  className="absolute inset-0 bg-[#3B82F6] rounded-full z-0"
                  transition={{ 
                    type: "spring", 
                    bounce: 0.18, 
                    duration: 0.22 
                  }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </motion.button>
          ))}
        </div>

        {/* Système Solaire - Zone centrale principale selon cahier des charges */}
        <div className="relative w-full h-full">
          <SolarSystem 
            isMobile={isMobile}
            onOpenDetailPanel={(bubble) => {
              console.log('Panel détail ouvert pour:', bubble);
            }}
          />
        </div>
      </section>
    </main>
  );
}
