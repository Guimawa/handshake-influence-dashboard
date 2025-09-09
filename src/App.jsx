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
              <div className="text-center text-[#AAB7C6]">
                Ranking Panel - À implémenter
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


