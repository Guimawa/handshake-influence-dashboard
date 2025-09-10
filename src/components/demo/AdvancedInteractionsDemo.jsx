import { useState } from 'react';
import AdvancedFilterDropdown from '../atoms/AdvancedFilterDropdown';
import AdvancedFileUploader from '../atoms/AdvancedFileUploader';
import InteractiveTimeline from '../atoms/InteractiveTimeline';
import QuickAddModal from '../atoms/QuickAddModal';
import QuickReactions from '../atoms/QuickReactions';
import { motion } from 'framer-motion';

const AdvancedInteractionsDemo = () => {
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);
  const [quickAddType, setQuickAddType] = useState('node');
  const [reactions, setReactions] = useState([
    { id: 'like', emoji: '👍', label: 'J\'aime', count: 12, active: false },
    { id: 'love', emoji: '❤️', label: 'J\'adore', count: 8, active: true },
    { id: 'laugh', emoji: '😂', label: 'Rire', count: 3, active: false },
    { id: 'wow', emoji: '😮', label: 'Wow', count: 5, active: false },
    { id: 'sad', emoji: '😢', label: 'Triste', count: 1, active: false },
    { id: 'angry', emoji: '😠', label: 'En colère', count: 0, active: false }
  ]);

  const handleFiltersChange = (filters) => {
    console.log('Filtres sélectionnés:', filters);
  };

  const handleFilesChange = (files) => {
    console.log('Fichiers sélectionnés:', files);
  };

  const handleQuickAdd = (item) => {
    console.log('Élément ajouté:', item);
    setIsQuickAddOpen(false);
  };

  const handleReactionClick = (updatedReactions) => {
    setReactions(updatedReactions);
    console.log('Réactions mises à jour:', updatedReactions);
  };

  const openQuickAdd = (type) => {
    setQuickAddType(type);
    setIsQuickAddOpen(true);
  };

  return (
    <div className="p-8 space-y-8 bg-[#181E29] min-h-screen">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Titre */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#F1F5F9] mb-2">
            Interactions Avancées
          </h1>
          <p className="text-[#AAB7C6]">
            Zones 66-70 : Filtres avancés, Upload multi-fichiers, Timeline, Ajout rapide, Réactions
          </p>
        </div>

        {/* Advanced Filter Dropdown */}
        <div className="bg-[#232B3E] rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-[#F1F5F9] mb-4">
            ZONE 66 : Dropdown Filtre Avancé
          </h2>
          <div className="flex justify-center">
            <AdvancedFilterDropdown
              onFiltersChange={handleFiltersChange}
            />
          </div>
        </div>

        {/* Advanced File Uploader */}
        <div className="bg-[#232B3E] rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-[#F1F5F9] mb-4">
            ZONE 67 : File Uploader Avancé
          </h2>
          <AdvancedFileUploader
            onFilesChange={handleFilesChange}
            maxFiles={5}
            acceptedTypes={['image/*', 'application/pdf', 'text/*']}
            maxSize={10 * 1024 * 1024}
          />
        </div>

        {/* Interactive Timeline */}
        <div className="bg-[#232B3E] rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-[#F1F5F9] mb-4">
            ZONE 68 : Timeline Interactive
          </h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium text-[#7DE3F4] mb-4">Timeline Verticale</h3>
              <InteractiveTimeline orientation="vertical" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-[#7DE3F4] mb-4">Timeline Horizontale</h3>
              <InteractiveTimeline orientation="horizontal" />
            </div>
          </div>
        </div>

        {/* Quick Add Modal */}
        <div className="bg-[#232B3E] rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-[#F1F5F9] mb-4">
            ZONE 69 : Modal d'Ajout Rapide
          </h2>
          <div className="flex justify-center gap-4">
            <button
              className="px-6 py-3 bg-[#3B82F6] text-white rounded-lg hover:bg-[#2563eb] transition-colors
                         focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
              onClick={() => openQuickAdd('node')}
            >
              + Ajouter Node
            </button>
            <button
              className="px-6 py-3 bg-[#7DE3F4] text-[#232B3E] rounded-lg hover:bg-[#5DD5F4] transition-colors
                         focus-visible:ring-2 focus-visible:ring-[#7DE3F4]"
              onClick={() => openQuickAdd('edge')}
            >
              + Ajouter Connexion
            </button>
            <button
              className="px-6 py-3 bg-[#F69AC1] text-white rounded-lg hover:bg-[#F472B6] transition-colors
                         focus-visible:ring-2 focus-visible:ring-[#F69AC1]"
              onClick={() => openQuickAdd('project')}
            >
              + Nouveau Projet
            </button>
          </div>
        </div>

        {/* Quick Reactions */}
        <div className="bg-[#232B3E] rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-[#F1F5F9] mb-4">
            ZONE 70 : Réactions / Badges Quick Emojis
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-[#7DE3F4] mb-4">Réactions sur un Post</h3>
              <div className="bg-[#181E29] rounded-xl p-6">
                <div className="text-[#F1F5F9] mb-4">
                  <h4 className="font-semibold text-lg mb-2">Nouvelle fonctionnalité disponible !</h4>
                  <p className="text-[#AAB7C6]">
                    Nous avons ajouté de nouvelles interactions avancées à notre dashboard. 
                    Testez-les et donnez-nous votre avis !
                  </p>
                </div>
                <QuickReactions
                  reactions={reactions}
                  onReactionClick={handleReactionClick}
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-[#7DE3F4] mb-4">Réactions sur un Commentaire</h3>
              <div className="bg-[#181E29] rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#3B82F6] flex items-center justify-center text-white font-bold text-sm">
                    U
                  </div>
                  <div className="flex-1">
                    <div className="text-[#F1F5F9] font-medium mb-1">Utilisateur</div>
                    <div className="text-[#AAB7C6] text-sm mb-2">
                      Excellente implémentation ! Les animations sont parfaites.
                    </div>
                    <QuickReactions
                      reactions={[
                        { id: 'like', emoji: '👍', label: 'J\'aime', count: 3, active: false },
                        { id: 'love', emoji: '❤️', label: 'J\'adore', count: 1, active: false },
                        { id: 'laugh', emoji: '😂', label: 'Rire', count: 0, active: false }
                      ]}
                      onReactionClick={handleReactionClick}
                      maxReactions={3}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Composants modaux */}
        <QuickAddModal
          isOpen={isQuickAddOpen}
          onClose={() => setIsQuickAddOpen(false)}
          onAdd={handleQuickAdd}
          type={quickAddType}
        />

      </div>
    </div>
  );
};

export default AdvancedInteractionsDemo;
