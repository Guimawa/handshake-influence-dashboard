import { useState } from 'react';
import Breadcrumb from '../atoms/Breadcrumb';
import UserMenu from '../atoms/UserMenu';
import ProjectList from '../atoms/ProjectList';
import CommandPalette from '../atoms/CommandPalette';
import StepIndicator from '../atoms/StepIndicator';
import AvatarUploader from '../atoms/AvatarUploader';
import SlidePanel from '../atoms/SlidePanel';
import { motion } from 'framer-motion';

const AdvancedNavigationDemo = () => {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isSlidePanelOpen, setIsSlidePanelOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [user, setUser] = useState({
    name: "Chef",
    email: "chef@example.com",
    avatar: null
  });

  const breadcrumbItems = [
    { id: 1, label: 'Accueil', href: '#' },
    { id: 2, label: 'Projets', href: '#' },
    { id: 3, label: 'Dashboard', active: true }
  ];

  const stepItems = [
    { id: 1, label: 'Configuration' },
    { id: 2, label: 'Déploiement' },
    { id: 3, label: 'Validation' },
    { id: 4, label: 'Finalisation' }
  ];

  const projects = [
    {
      id: 1,
      name: "Jarvis UI",
      status: "active",
      lastModified: "Aujourd'hui",
      description: "Interface utilisateur pour le système Jarvis"
    },
    {
      id: 2,
      name: "Dashboard Analytics",
      status: "inactive",
      lastModified: "Hier",
      description: "Tableau de bord analytique"
    },
    {
      id: 3,
      name: "Mobile App",
      status: "pending",
      lastModified: "Il y a 2 jours",
      description: "Application mobile native"
    },
    {
      id: 4,
      name: "API Backend",
      status: "active",
      lastModified: "Il y a 3 heures",
      description: "API REST pour les services"
    }
  ];

  const handleUserMenuClick = (item) => {
    console.log('Menu utilisateur:', item);
  };

  const handleProjectClick = (project) => {
    console.log('Projet cliqué:', project);
  };

  const handleProjectAction = (project, action) => {
    console.log('Action projet:', project, action);
  };

  const handleCommandSelect = (command) => {
    console.log('Commande sélectionnée:', command);
  };

  const handleStepClick = (step, index) => {
    setCurrentStep(index);
    console.log('Étape cliquée:', step, index);
  };

  const handleAvatarChange = (file, preview) => {
    setUser(prev => ({ ...prev, avatar: preview }));
    console.log('Avatar changé:', file);
  };

  const handleNextStep = () => {
    if (currentStep < stepItems.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="p-8 space-y-8 bg-[#181E29] min-h-screen">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Titre */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#F1F5F9] mb-2">
            Navigation Avancée
          </h1>
          <p className="text-[#AAB7C6]">
            Zones 59-65 : Breadcrumb, User Menu, Project List, Command Palette, etc.
          </p>
        </div>

        {/* Breadcrumb */}
        <div className="bg-[#232B3E] rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-[#F1F5F9] mb-4">
            ZONE 59 : Breadcrumb / Fil d'Ariane
          </h2>
          <Breadcrumb items={breadcrumbItems} />
        </div>

        {/* User Menu */}
        <div className="bg-[#232B3E] rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-[#F1F5F9] mb-4">
            ZONE 60 : Menu Utilisateur / Avatar Dropdown
          </h2>
          <div className="flex justify-center">
            <UserMenu
              user={user}
              onItemClick={handleUserMenuClick}
            />
          </div>
        </div>

        {/* Project List */}
        <div className="bg-[#232B3E] rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-[#F1F5F9] mb-4">
            ZONE 61 : Liste des Projets
          </h2>
          <ProjectList
            projects={projects}
            onProjectClick={handleProjectClick}
            onProjectAction={handleProjectAction}
          />
        </div>

        {/* Command Palette */}
        <div className="bg-[#232B3E] rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-[#F1F5F9] mb-4">
            ZONE 62 : Command Palette / Navigation Rapide
          </h2>
          <div className="flex justify-center">
            <button
              className="px-6 py-3 bg-[#3B82F6] text-white rounded-lg hover:bg-[#2563eb] transition-colors
                         focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
              onClick={() => setIsCommandPaletteOpen(true)}
            >
              Ouvrir Command Palette (Ctrl+K)
            </button>
          </div>
        </div>

        {/* Step Indicator */}
        <div className="bg-[#232B3E] rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-[#F1F5F9] mb-4">
            ZONE 63 : Barre de Progression Multi-étapes
          </h2>
          <StepIndicator
            steps={stepItems}
            currentStep={currentStep}
            onStepClick={handleStepClick}
          />
          <div className="flex justify-center gap-4 mt-4">
            <button
              className="px-4 py-2 bg-[#222C3B] text-[#AAB7C6] rounded-lg hover:bg-[#3B82F6] hover:text-white transition-colors"
              onClick={handlePrevStep}
              disabled={currentStep === 0}
            >
              Précédent
            </button>
            <button
              className="px-4 py-2 bg-[#3B82F6] text-white rounded-lg hover:bg-[#2563eb] transition-colors"
              onClick={handleNextStep}
              disabled={currentStep === stepItems.length - 1}
            >
              Suivant
            </button>
          </div>
        </div>

        {/* Avatar Uploader */}
        <div className="bg-[#232B3E] rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-[#F1F5F9] mb-4">
            ZONE 64 : Avatar Uploader / Drag & Drop
          </h2>
          <div className="flex justify-center">
            <AvatarUploader
              currentAvatar={user.avatar}
              onAvatarChange={handleAvatarChange}
              size="large"
            />
          </div>
        </div>

        {/* Slide Panel */}
        <div className="bg-[#232B3E] rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-[#F1F5F9] mb-4">
            ZONE 65 : Slide Panel / Modale Latérale
          </h2>
          <div className="flex justify-center gap-4">
            <button
              className="px-4 py-2 bg-[#3B82F6] text-white rounded-lg hover:bg-[#2563eb] transition-colors"
              onClick={() => setIsSlidePanelOpen(true)}
            >
              Ouvrir Slide Panel
            </button>
          </div>
        </div>

        {/* Composants modaux */}
        <CommandPalette
          isOpen={isCommandPaletteOpen}
          onClose={() => setIsCommandPaletteOpen(false)}
          onCommand={handleCommandSelect}
        />

        <SlidePanel
          isOpen={isSlidePanelOpen}
          onClose={() => setIsSlidePanelOpen(false)}
          title="Configuration du Projet"
          position="right"
          size="lg"
          showHeader={true}
          showFooter={true}
          footer={
            <div className="flex gap-3">
              <button
                className="flex-1 px-4 py-2 bg-[#222C3B] text-[#AAB7C6] rounded-lg hover:bg-[#3B82F6] hover:text-white transition-colors"
                onClick={() => setIsSlidePanelOpen(false)}
              >
                Annuler
              </button>
              <button
                className="flex-1 px-4 py-2 bg-[#3B82F6] text-white rounded-lg hover:bg-[#2563eb] transition-colors"
                onClick={() => setIsSlidePanelOpen(false)}
              >
                Sauvegarder
              </button>
            </div>
          }
        >
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#F1F5F9] mb-2">
                Nom du projet
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 bg-[#222C3B] border border-[#3B82F6] rounded-lg text-[#F1F5F9] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
                placeholder="Entrez le nom du projet"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[#F1F5F9] mb-2">
                Description
              </label>
              <textarea
                className="w-full px-3 py-2 bg-[#222C3B] border border-[#3B82F6] rounded-lg text-[#F1F5F9] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] resize-none"
                rows="4"
                placeholder="Description du projet"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#F1F5F9] mb-2">
                Type de projet
              </label>
              <select className="w-full px-3 py-2 bg-[#222C3B] border border-[#3B82F6] rounded-lg text-[#F1F5F9] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]">
                <option value="web">Application Web</option>
                <option value="mobile">Application Mobile</option>
                <option value="desktop">Application Desktop</option>
                <option value="api">API</option>
              </select>
            </div>
          </div>
        </SlidePanel>

      </div>
    </div>
  );
};

export default AdvancedNavigationDemo;
