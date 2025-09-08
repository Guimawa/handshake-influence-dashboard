import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

export function RankingPanel({ 
  title = "Influence Ranking",
  stats = {
    totalInfluencers: 24,
    avgScore: 8.7
  },
  rankingData = [],
  onAddItem,
  isMobile = false
}) {
  // Données de démonstration pour le placeholder
  const defaultRankingData = [
    { id: 1, name: 'Influencer 1', score: 8.2, progress: 85 },
    { id: 2, name: 'Influencer 2', score: 7.8, progress: 70 },
    { id: 3, name: 'Influencer 3', score: 7.4, progress: 60 },
    { id: 4, name: 'Influencer 4', score: 6.9, progress: 45 },
    { id: 5, name: 'Influencer 5', score: 6.2, progress: 30 }
  ];

  const displayData = rankingData.length > 0 ? rankingData : defaultRankingData;

  return (
    <aside className={`flex flex-col gap-6 ${isMobile ? 'w-full' : 'w-[380px]'}`} role="complementary" aria-label="Zone latérale">
      {/* Card principale avec animations NANO-précises selon spécifications exactes */}
      <motion.div 
        className={`bg-[#232B3E] rounded-xl flex flex-col shadow-panel ${isMobile ? 'p-4 min-h-[180px]' : 'p-8 min-h-[240px]'}`}
        whileHover={{ 
          scale: 1.02,
          translateY: -2,
          boxShadow: "0 6px 24px 0 rgba(30, 41, 59, 0.24)",
          transition: { 
            duration: 0.12, 
            ease: [0.23, 1, 0.32, 1] 
          }
        }}
      >
        {/* Header avec titre et bouton add */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-[#F1F5F9]">
            {title}
          </h3>
          <motion.button 
            className="w-8 h-8 bg-[#3B82F6] rounded-full flex items-center justify-center hover:bg-[#2563eb] transition-all duration-120 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
            onClick={onAddItem}
            aria-label="Ajouter un élément"
            whileHover={{ 
              scale: 1.05,
              backgroundColor: '#2563eb',
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
            <Plus className="w-4 h-4 text-white" />
          </motion.button>
        </div>

        {/* Stats grid selon spécifications exactes */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-[#F1F5F9]">
              {stats.totalInfluencers}
            </p>
            <p className="text-sm text-[#AAB7C6]">Total Influencers</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-[#3B82F6]">
              {stats.avgScore}
            </p>
            <p className="text-sm text-[#AAB7C6]">Avg Score</p>
          </div>
        </div>

        {/* Mini-cards list selon spécifications exactes */}
        <div className="space-y-2">
          {displayData.map((item, index) => (
            <div 
              key={item.id} 
              className="mini-card flex items-center space-x-3 p-4 bg-[#222C3B] rounded-xl hover:bg-[#2A3142] hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] transition-all duration-200 cursor-pointer"
              tabIndex={0}
              role="button"
              aria-label={`${item.name} - Score ${item.score}`}
            >
              {/* Avatar avec numéro */}
              <div className="w-8 h-8 bg-[#3B82F6] rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-white">{index + 1}</span>
              </div>
              
              {/* Contenu principal */}
              <div className="flex-1">
                {/* Barre de progression */}
                <div className="h-2 bg-[#1E3A8A] rounded-full mb-1">
                  <div 
                    className="h-2 bg-[#3B82F6] rounded-full transition-all duration-300"
                    style={{ width: `${item.progress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-[#AAB7C6]">{item.name}</p>
              </div>
              
              {/* Score */}
              <span className="text-sm font-medium text-[#F1F5F9]">{item.score}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Card stats supplémentaires selon spécifications exactes */}
      <div className="panel-card bg-[#232B3E] rounded-xl p-8 min-h-[180px] flex flex-col">
        <h3 className="text-xl font-bold text-[#F1F5F9] mb-4">Quick Stats</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-[#AAB7C6]">Active Projects</span>
            <span className="text-[#F1F5F9] font-semibold">12</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#AAB7C6]">Team Members</span>
            <span className="text-[#F1F5F9] font-semibold">8</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#AAB7C6]">This Month</span>
            <span className="text-[#22C55E] font-semibold">+23%</span>
          </div>
        </div>
      </div>

      {/* Slot pour modules futurs */}
      <div className="panel-card bg-[#232B3E] rounded-xl p-8 min-h-[120px] flex items-center justify-center text-[#AAB7C6]">
        <div className="text-center">
          <p className="text-sm">[Slot pour modules futurs]</p>
          <p className="text-xs text-[#AAB7C6]/70 mt-1">Prêt à accueillir de nouveaux composants</p>
        </div>
      </div>
    </aside>
  );
}
