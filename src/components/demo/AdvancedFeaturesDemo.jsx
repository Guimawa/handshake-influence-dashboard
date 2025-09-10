import { useState } from 'react';
import HeatmapToggle from '../atoms/HeatmapToggle';
import ExportMenu from '../atoms/ExportMenu';
import Onboarding from '../atoms/Onboarding';
import HelpOverlay from '../atoms/HelpOverlay';
import FilterPanel from '../atoms/FilterPanel';
import StatsCard from '../atoms/StatsCard';
import AnnouncementBar from '../atoms/AnnouncementBar';
import QuickHelp from '../atoms/QuickHelp';
import FeedbackModal from '../atoms/FeedbackModal';
import Tag from '../atoms/Tag';
import { motion } from 'framer-motion';

const AdvancedFeaturesDemo = () => {
  const [isHeatmapActive, setIsHeatmapActive] = useState(false);
  const [isClusterActive, setIsClusterActive] = useState(false);
  const [isExportMenuOpen, setIsExportMenuOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isHelpOverlayOpen, setIsHelpOverlayOpen] = useState(false);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [isQuickHelpOpen, setIsQuickHelpOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [filters, setFilters] = useState({});
  const [tags, setTags] = useState([
    { id: 1, label: 'Hub', variant: 'selected' },
    { id: 2, label: 'Satellite', variant: 'default' },
    { id: 3, label: 'Leaf', variant: 'removable' },
    { id: 4, label: 'Custom', variant: 'filter' }
  ]);

  const onboardingSteps = [
    {
      title: "Bienvenue dans le Dashboard",
      description: "Ce tutoriel vous guidera à travers les fonctionnalités principales.",
      target: ".welcome-target",
      position: "bottom"
    },
    {
      title: "Ajouter un Node",
      description: "Cliquez sur le bouton '+' pour ajouter un nouveau node au graphique.",
      target: ".add-node-target",
      position: "top"
    },
    {
      title: "Filtrer les Données",
      description: "Utilisez le bouton 'Filtrer' pour affiner l'affichage selon vos besoins.",
      target: ".filter-target",
      position: "left"
    },
    {
      title: "Exporter vos Données",
      description: "Le menu d'export vous permet de sauvegarder votre travail.",
      target: ".export-target",
      position: "right"
    }
  ];

  const handleHeatmapToggle = (mode) => {
    if (mode === 'heatmap') {
      setIsHeatmapActive(!isHeatmapActive);
      setIsClusterActive(false);
    } else {
      setIsClusterActive(!isClusterActive);
      setIsHeatmapActive(false);
    }
  };

  const handleExport = (option) => {
    console.log('Export:', option);
    // Simulation d'export
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    console.log('Filtres:', newFilters);
  };

  const handleTagRemove = (tagId) => {
    setTags(prev => prev.filter(tag => tag.id !== tagId));
  };

  const handleTagClick = (tag) => {
    console.log('Tag cliqué:', tag);
  };

  const handleFeedbackSubmit = (data) => {
    console.log('Feedback envoyé:', data);
  };

  return (
    <div className="p-8 space-y-8 bg-[#181E29] min-h-screen">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Titre */}
        <div className="text-center welcome-target">
          <h1 className="text-3xl font-bold text-[#F1F5F9] mb-2">
            Fonctionnalités Avancées
          </h1>
          <p className="text-[#AAB7C6]">
            Zones 43-58 : Heatmap, Export, Onboarding, Aide, Filtres, Stats, etc.
          </p>
        </div>

        {/* Announcement Bar */}
        {showAnnouncement && (
          <AnnouncementBar
            message="Nouvelle fonctionnalité disponible ! Essayez le mode Heatmap."
            actionText="Essayer"
            onAction={() => setIsHeatmapActive(true)}
            onClose={() => setShowAnnouncement(false)}
            type="info"
            autoClose={true}
            duration={8000}
          />
        )}

        {/* Contrôles principaux */}
        <div className="bg-[#232B3E] rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-[#F1F5F9] mb-6">
            Contrôles du Graphique
          </h2>
          
          <div className="flex flex-wrap gap-4 items-center">
            {/* Heatmap Toggle */}
            <div className="flex gap-2">
              <HeatmapToggle
                isActive={isHeatmapActive}
                onToggle={handleHeatmapToggle}
                mode="heatmap"
              />
              <HeatmapToggle
                isActive={isClusterActive}
                onToggle={handleHeatmapToggle}
                mode="cluster"
              />
            </div>

            {/* Export Menu */}
            <div className="relative">
              <button
                className="px-4 py-2 bg-[#3B82F6] text-white rounded-lg hover:bg-[#2563eb] transition-colors export-target"
                onClick={() => setIsExportMenuOpen(!isExportMenuOpen)}
              >
                Exporter
              </button>
              <ExportMenu
                isOpen={isExportMenuOpen}
                onClose={() => setIsExportMenuOpen(false)}
                onExport={handleExport}
              />
            </div>

            {/* Filter Panel */}
            <button
              className="px-4 py-2 bg-[#222C3B] text-[#AAB7C6] rounded-lg hover:bg-[#3B82F6] hover:text-white transition-colors filter-target"
              onClick={() => setIsFilterPanelOpen(true)}
            >
              Filtrer
            </button>

            {/* Help */}
            <button
              className="px-4 py-2 bg-[#222C3B] text-[#AAB7C6] rounded-lg hover:bg-[#3B82F6] hover:text-white transition-colors"
              onClick={() => setIsHelpOverlayOpen(true)}
            >
              Aide (Ctrl+Shift+/)
            </button>

            {/* Onboarding */}
            <button
              className="px-4 py-2 bg-[#10B981] text-white rounded-lg hover:bg-[#059669] transition-colors add-node-target"
              onClick={() => setIsOnboardingOpen(true)}
            >
              Tutoriel
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Nodes Total"
            value={1247}
            subtitle="+12% par rapport à hier"
            trend={{ value: 12, isPositive: true }}
            icon="🔗"
            color="#7DE3F4"
          />
          <StatsCard
            title="Connexions"
            value={3892}
            subtitle="+5% cette semaine"
            trend={{ value: 5, isPositive: true }}
            icon="🔗"
            color="#F69AC1"
          />
          <StatsCard
            title="Score Moyen"
            value={8.7}
            subtitle="Stable"
            trend={{ value: 0, isPositive: true }}
            icon="⭐"
            color="#F7C873"
          />
          <StatsCard
            title="Activité"
            value={94}
            subtitle="% des nodes actifs"
            trend={{ value: 3, isPositive: false }}
            icon="📊"
            color="#10B981"
          />
        </div>

        {/* Tags */}
        <div className="bg-[#232B3E] rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-[#F1F5F9] mb-4">
            Tags et Filtres
          </h2>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Tag
                key={tag.id}
                label={tag.label}
                variant={tag.variant}
                onRemove={tag.variant === 'removable' ? () => handleTagRemove(tag.id) : undefined}
                onClick={() => handleTagClick(tag)}
              />
            ))}
          </div>
        </div>

        {/* Actions rapides */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#232B3E] rounded-xl p-6">
            <h3 className="text-lg font-semibold text-[#F1F5F9] mb-4">
              Aide Rapide
            </h3>
            <p className="text-[#AAB7C6] text-sm mb-4">
              Cliquez sur le bouton d'aide pour obtenir des réponses rapides.
            </p>
            <button
              className="px-4 py-2 bg-[#3B82F6] text-white rounded-lg hover:bg-[#2563eb] transition-colors"
              onClick={() => setIsQuickHelpOpen(true)}
            >
              Ouvrir l'aide
            </button>
          </div>

          <div className="bg-[#232B3E] rounded-xl p-6">
            <h3 className="text-lg font-semibold text-[#F1F5F9] mb-4">
              Signaler un Problème
            </h3>
            <p className="text-[#AAB7C6] text-sm mb-4">
              Aidez-nous à améliorer l'application en signalant les bugs.
            </p>
            <button
              className="px-4 py-2 bg-[#EF4444] text-white rounded-lg hover:bg-[#DC2626] transition-colors"
              onClick={() => setIsFeedbackModalOpen(true)}
            >
              Signaler un bug
            </button>
          </div>
        </div>

        {/* Composants modaux */}
        <Onboarding
          isOpen={isOnboardingOpen}
          onClose={() => setIsOnboardingOpen(false)}
          onComplete={() => console.log('Onboarding terminé')}
          steps={onboardingSteps}
        />

        <HelpOverlay
          isOpen={isHelpOverlayOpen}
          onClose={() => setIsHelpOverlayOpen(false)}
        />

        <FilterPanel
          isOpen={isFilterPanelOpen}
          onClose={() => setIsFilterPanelOpen(false)}
          onFilterChange={handleFilterChange}
          filters={filters}
        />

        <QuickHelp
          isOpen={isQuickHelpOpen}
          onClose={() => setIsQuickHelpOpen(false)}
        />

        <FeedbackModal
          isOpen={isFeedbackModalOpen}
          onClose={() => setIsFeedbackModalOpen(false)}
          onSubmit={handleFeedbackSubmit}
        />

      </div>
    </div>
  );
};

export default AdvancedFeaturesDemo;
