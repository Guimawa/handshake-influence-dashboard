import React, { useState, useEffect } from 'react';
import './App.css';
import './styles/animations.css';
import './styles/variables.css';
import { useLayoutObserver, useIdleMode } from './hooks/useLayoutObserver';
import { useTimeline, useMicroInteractions } from './hooks/useTimeline';
import { AnimationProvider, useAnimation } from './context/AnimationContext';
import NewProjectModal from './components/modals/NewProjectModal';
import Toast from './components/ui/Toast';
import LiveRegion from './components/accessibility/LiveRegion';
import Sidebar from './components/layout/Sidebar';
import Topbar from './components/layout/Topbar';
import MainContent from './components/dashboard/MainContent';
import RankingPanel from './components/dashboard/RankingPanel';
import NotificationMenu from './components/ui/NotificationMenu';
import NetworkGraph from './components/dashboard/NetworkGraph';
import BottomNavigation from './components/mobile/BottomNavigation';
import TagInput from './components/ui/TagInput';
import Stepper from './components/ui/Stepper';
import Switch from './components/ui/Switch';
import Pagination from './components/ui/PaginationComponent';
import EmptyState from './components/ui/EmptyState';
import ProgressBar from './components/ui/ProgressBar';
import Timeline from './components/ui/Timeline';
import Tooltip from './components/ui/Tooltip';
import Badge from './components/ui/Badge';
import AdvancedModal from './components/ui/AdvancedModal';
import SkeletonLoader from './components/ui/SkeletonLoader';
import ContextMenu from './components/ui/ContextMenu';
import Popover from './components/ui/Popover';
import TooltipAvance from './components/ui/TooltipAvance';
import DetailPanel from './components/ui/DetailPanel';
import EdgePopover from './components/ui/EdgePopover';
import ExportMenu from './components/ui/ExportMenu';
import Onboarding from './components/ui/Onboarding';
import KeyboardShortcuts from './components/ui/KeyboardShortcuts';
import FiltersPanel from './components/ui/FiltersPanel';

function DashboardContent() {
  const layoutState = useLayoutObserver();
  const { isIdle, resetIdle } = useIdleMode();
  const { timeline, currentPhase, isComplete } = useTimeline();
  const { handleSidebarHover, handleNotificationPulse, handleCardHover, hoverStates } = useMicroInteractions();
  const { state, actions } = useAnimation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSidebarItem, setActiveSidebarItem] = useState('dashboard');
  const [activeTab, setActiveTab] = useState('network');
  const [notifications] = useState([
    { id: 1, title: 'Nouveau projet', message: 'Un nouveau projet a été créé', time: '2 min', read: false },
    { id: 2, title: 'Mise à jour', message: 'Système mis à jour', time: '1h', read: false }
  ]);
  const [tags, setTags] = useState(['React', 'Dashboard']);
  const [stepperSteps] = useState([
    { id: 1, title: 'Configuration' },
    { id: 2, title: 'Données' },
    { id: 3, title: 'Finalisation' }
  ]);
  const [switchState, setSwitchState] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
  const [timelineItems] = useState([
    { content: 'Événement 1 - Configuration initiale' },
    { content: 'Événement 2 - Chargement des données' },
    { content: 'Événement 3 - Finalisation du processus' }
  ]);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false);
  const [showFiltersPanel, setShowFiltersPanel] = useState(false);
  const [onboardingSteps] = useState([
    {
      title: 'Bienvenue !',
      description: 'Découvrez les fonctionnalités principales du dashboard.',
      targetElement: '.main-content',
      targetPosition: { x: '50%', y: '50%' },
      targetSize: { width: '300px', height: '200px' }
    },
    {
      title: 'Graphique réseau',
      description: 'Cliquez ici pour interagir avec le graphique principal.',
      targetElement: '.network-graph',
      targetPosition: { x: '50%', y: '50%' },
      targetSize: { width: '400px', height: '300px' }
    },
    {
      title: 'Panel de contrôle',
      description: 'Utilisez ce panel pour configurer vos paramètres.',
      targetElement: '.ranking-panel',
      targetPosition: { x: '50%', y: '50%' },
      targetSize: { width: '300px', height: '400px' }
    }
  ]);

  // PHASE 5 - UX Fine Tuning
  useEffect(() => {
    // Idle mode detection
    let idleTimer;
    const resetIdleTimer = () => {
      clearTimeout(idleTimer);
      if (state.idleMode) {
        actions.triggerWakeUp();
      }
      idleTimer = setTimeout(() => {
        actions.setIdleMode(true);
      }, 30000); // 30 secondes d'inactivité
    };

    // Event listeners pour détecter l'activité
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    events.forEach(event => {
      document.addEventListener(event, resetIdleTimer, true);
    });

    resetIdleTimer();

    return () => {
      clearTimeout(idleTimer);
      events.forEach(event => {
        document.removeEventListener(event, resetIdleTimer, true);
      });
    };
  }, [state.idleMode, actions]);

  // Reset wake-up pulse après animation
  useEffect(() => {
    if (state.wakeUpPulse) {
      const timer = setTimeout(() => {
        // Reset du wake-up pulse dans le contexte
        // (nécessiterait une action dans le reducer)
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [state.wakeUpPulse]);

  return (
    <div className={`min-h-screen bg-[#181E29] text-[#F1F5F9] custom-scrollbar ${state.idleMode ? 'idle-mode' : ''} ${state.wakeUpPulse ? 'wake-up-pulse' : ''}`}>
      <div className="flex flex-col lg:flex-row">
        {/* Sidebar */}
        <Sidebar 
          activeItem={activeSidebarItem}
          onItemClick={setActiveSidebarItem}
          onSidebarHover={handleSidebarHover}
          hoverStates={hoverStates}
        />

        {/* Main Content */}
        <main className="flex-1">
          {/* Top Bar */}
          <Topbar 
            title="Titre du dashboard"
            onNewProject={() => {
              setIsModalOpen(true);
              actions.openModal('newProject');
            }}
            onNotificationClick={() => handleNotificationPulse()}
            onProfileClick={() => {}}
            onBurgerMenuClick={() => {}}
            notificationCount={notifications.filter(n => !n.read).length}
            isMobile={false}
          />

          {/* Zone centrale avec panel droit */}
          <div className="flex-1 flex flex-col lg:flex-row gap-8 px-8 py-8">
            {/* ZONE 3 - MAIN CONTENT */}
            <MainContent 
              title="Titre du dashboard"
              subtitle="Sous-titre ici"
              onSearch={(value) => console.log('Search:', value)}
              onTabChange={setActiveTab}
              activeTab={activeTab}
            >
              {activeTab === 'network' ? (
                <NetworkGraph 
                  width={400}
                  height={300}
                />
              ) : (
                <div className="text-center text-[#AAB7C6]">
                  Mode Heatmap - À implémenter
                </div>
              )}
            </MainContent>
            
            {/* ZONE 4 - PANEL DROIT */}
            <RankingPanel>
              <div className="space-y-6">
                <div className="text-center text-[#AAB7C6] mb-6">
                  Ranking Panel - À implémenter
                </div>
                
                {/* Zone 21 - Stepper */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-[#F1F5F9] mb-4">Progression</h3>
                  <Stepper 
                    steps={stepperSteps}
                    currentStep={1}
                    onStepClick={(index) => console.log('Step clicked:', index)}
                  />
                </div>
                
                {/* Zone 29 - TagInput */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-[#F1F5F9] mb-4">Tags</h3>
                  <TagInput 
                    tags={tags}
                    onTagsChange={setTags}
                    placeholder="Ajouter un tag"
                  />
                </div>
                
                {/* Zone 31 - Switch */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-[#F1F5F9] mb-4">Paramètres</h3>
                  <Switch 
                    checked={switchState}
                    onChange={setSwitchState}
                    label="Activer les notifications"
                  />
                </div>
                
                {/* Zone 32 - Pagination */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-[#F1F5F9] mb-4">Navigation</h3>
                  <Pagination 
                    currentPage={currentPage}
                    totalPages={5}
                    onPageChange={setCurrentPage}
                  />
                </div>
                
                {/* Zone 33 - Empty State */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-[#F1F5F9] mb-4">État vide</h3>
                  <EmptyState 
                    title="Aucune donnée"
                    description="Essayez de modifier vos filtres ou d'ajouter un élément."
                    actionLabel="Créer un élément"
                    onAction={() => setShowToast(true)}
                  />
                </div>
                
                {/* Zone 34 - Progress Bar */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-[#F1F5F9] mb-4">Progression</h3>
                  <ProgressBar 
                    value={66}
                    max={100}
                    showPercentage={true}
                  />
                </div>
                
                {/* Zone 35 - Timeline */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-[#F1F5F9] mb-4">Chronologie</h3>
                  <Timeline 
                    items={timelineItems}
                    emptyMessage="Aucun événement à afficher"
                  />
                </div>
                
                {/* Zone 36 - Tooltip */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-[#F1F5F9] mb-4">Tooltips</h3>
                  <div className="flex gap-4">
                    <Tooltip content="Ceci est un tooltip d'information">
                      <button className="px-4 py-2 bg-[#3B82F6] text-white rounded-lg">
                        Hover me
                      </button>
                    </Tooltip>
                    <TooltipAvance content={{ title: "Tooltip avancé", description: "Description détaillée" }}>
                      <button className="px-4 py-2 bg-[#22C55E] text-white rounded-lg">
                        Tooltip avancé
                      </button>
                    </TooltipAvance>
                  </div>
                </div>
                
                {/* Zone 37 - Badge */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-[#F1F5F9] mb-4">Badges</h3>
                  <div className="flex gap-2 flex-wrap">
                    <Badge variant="success">Actif</Badge>
                    <Badge variant="error">Erreur</Badge>
                    <Badge variant="warning">Attention</Badge>
                    <Badge variant="info">Information</Badge>
                  </div>
                </div>
                
                {/* Zone 38 - Advanced Modal */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-[#F1F5F9] mb-4">Modale avancée</h3>
                  <button 
                    onClick={() => setShowModal(true)}
                    className="px-4 py-2 bg-[#3B82F6] text-white rounded-lg hover:bg-[#2563eb] transition"
                  >
                    Ouvrir modale
                  </button>
                </div>
                
                {/* Zone 39 - Toast */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-[#F1F5F9] mb-4">Notifications</h3>
                  <button 
                    onClick={() => setShowToast(true)}
                    className="px-4 py-2 bg-[#22C55E] text-white rounded-lg hover:bg-[#16a34a] transition"
                  >
                    Afficher toast
                  </button>
                </div>
                
                {/* Zone 40 - Skeleton Loader */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-[#F1F5F9] mb-4">Chargement</h3>
                  <SkeletonLoader lines={4} />
                </div>
                
                {/* Zone 41 - Context Menu */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-[#F1F5F9] mb-4">Menu contextuel</h3>
                  <button 
                    onContextMenu={(e) => {
                      e.preventDefault();
                      setContextMenuPosition({ x: e.clientX, y: e.clientY });
                      setShowContextMenu(true);
                    }}
                    className="px-4 py-2 bg-[#F59E0B] text-white rounded-lg hover:bg-[#d97706] transition"
                  >
                    Clic droit ici
                  </button>
                </div>
                
                {/* Zone 42 - Popover */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-[#F1F5F9] mb-4">Popover</h3>
                  <Popover content={{ title: "Titre du popover", description: "Description détaillée du popover" }}>
                    <button className="px-4 py-2 bg-[#8B5CF6] text-white rounded-lg">
                      Hover pour popover
                    </button>
                  </Popover>
                </div>
                
                {/* Zone 44 - Detail Panel */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-[#F1F5F9] mb-4">Panel de détail</h3>
                  <button 
                    onClick={() => setShowDetailPanel(true)}
                    className="px-4 py-2 bg-[#EF4444] text-white rounded-lg hover:bg-[#dc2626] transition"
                  >
                    Ouvrir panel
                  </button>
                </div>
                
                {/* Zone 45 - Export Menu */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-[#F1F5F9] mb-4">Export/Partage</h3>
                  <button 
                    onClick={() => setShowExportMenu(true)}
                    className="px-4 py-2 bg-[#8B5CF6] text-white rounded-lg hover:bg-[#7c3aed] transition"
                  >
                    Exporter/Partager
                  </button>
                </div>
                
                {/* Zone 46 - Onboarding */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-[#F1F5F9] mb-4">Guide d'utilisation</h3>
                  <button 
                    onClick={() => setShowOnboarding(true)}
                    className="px-4 py-2 bg-[#06B6D4] text-white rounded-lg hover:bg-[#0891b2] transition"
                  >
                    Démarrer l'onboarding
                  </button>
                </div>
                
                {/* Zone 47 - Raccourcis clavier */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-[#F1F5F9] mb-4">Aide</h3>
                  <button 
                    onClick={() => setShowKeyboardShortcuts(true)}
                    className="px-4 py-2 bg-[#F59E0B] text-white rounded-lg hover:bg-[#d97706] transition"
                  >
                    Raccourcis clavier
                  </button>
                </div>
                
                {/* Zone 48 - Filtres */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-[#F1F5F9] mb-4">Filtres</h3>
                  <button 
                    onClick={() => setShowFiltersPanel(true)}
                    className="px-4 py-2 bg-[#10B981] text-white rounded-lg hover:bg-[#059669] transition"
                  >
                    Ouvrir filtres
                  </button>
                </div>
              </div>
            </RankingPanel>
          </div>
        </main>
      </div>
      
      {/* Mobile Bottom Navigation */}
      <BottomNavigation 
        activeItem={activeSidebarItem}
        onItemClick={setActiveSidebarItem}
      />
      
      {/* Modal Nouveau Projet */}
      <NewProjectModal 
        isOpen={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false);
          actions.closeModal('newProject');
        }} 
      />
      
      {/* Toasts */}
      {state.toasts.map(toast => (
        <Toast 
          key={toast.id} 
          toast={toast} 
          onRemove={actions.removeToast} 
        />
      ))}
      
      {/* Live Region pour l'accessibilité */}
      <LiveRegion type="polite" />
      <LiveRegion type="assertive" />
      
      {/* Modales et composants overlay */}
      <AdvancedModal 
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Modale avancée"
      >
        <h3 className="text-lg font-semibold text-[#F1F5F9] mb-4">Contenu de la modale</h3>
        <p className="text-[#AAB7C6] mb-6">Ceci est un exemple de modale avancée avec toutes les spécifications du fichier de référence.</p>
        <div className="flex gap-2 justify-end">
          <button 
            onClick={() => setShowModal(false)}
            className="px-4 py-2 rounded-xl bg-[#222C3B] text-[#AAB7C6] hover:bg-[#3B82F6] hover:text-white transition"
          >
            Annuler
          </button>
          <button 
            onClick={() => {
              setShowModal(false);
              setShowToast(true);
            }}
            className="px-4 py-2 rounded-xl bg-[#3B82F6] text-white font-semibold hover:bg-[#2563eb] transition"
          >
            Continuer
          </button>
        </div>
      </AdvancedModal>
      
      {showToast && (
        <Toast 
          message="Action réussie !"
          type="success"
          duration={3000}
          onClose={() => setShowToast(false)}
        />
      )}
      
      <ContextMenu 
        isOpen={showContextMenu}
        onClose={() => setShowContextMenu(false)}
        position={contextMenuPosition}
        items={[
          { label: 'Renommer', onClick: () => console.log('Renommer') },
          { label: 'Supprimer', onClick: () => console.log('Supprimer'), danger: true }
        ]}
      />
      
      <DetailPanel 
        isOpen={showDetailPanel}
        onClose={() => setShowDetailPanel(false)}
        title="Détails de l'élément"
      >
        <div className="space-y-4">
          <div>
            <h4 className="text-[#F1F5F9] font-semibold mb-2">Informations</h4>
            <p className="text-[#AAB7C6]">Ceci est un panel de détail avec toutes les spécifications du fichier de référence.</p>
          </div>
          <div>
            <h4 className="text-[#F1F5F9] font-semibold mb-2">Actions</h4>
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-[#3B82F6] text-white rounded-lg text-sm">
                Éditer
              </button>
              <button className="px-3 py-1 bg-[#EF4444] text-white rounded-lg text-sm">
                Supprimer
              </button>
            </div>
          </div>
        </div>
      </DetailPanel>
      
      {/* Zone 45 - Export Menu */}
      <ExportMenu 
        isOpen={showExportMenu}
        onClose={() => setShowExportMenu(false)}
        onExport={(type) => {
          console.log('Export type:', type);
          setShowToast(true);
        }}
      />
      
      {/* Zone 46 - Onboarding */}
      <Onboarding 
        isOpen={showOnboarding}
        onClose={() => setShowOnboarding(false)}
        steps={onboardingSteps}
      />
      
      {/* Zone 47 - Keyboard Shortcuts */}
      <KeyboardShortcuts 
        isOpen={showKeyboardShortcuts}
        onClose={() => setShowKeyboardShortcuts(false)}
      />
      
      {/* Zone 48 - Filters Panel */}
      <FiltersPanel 
        isOpen={showFiltersPanel}
        onClose={() => setShowFiltersPanel(false)}
        onFiltersChange={(filters) => console.log('Filters changed:', filters)}
      />
    </div>
  );
}

function App() {
  return (
    <AnimationProvider>
      <DashboardContent />
    </AnimationProvider>
  );
}

export default App;


