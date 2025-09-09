import React, { useState } from 'react';
import './App.css';
import './styles/animations.css';
import './styles/variables.css';
import { AnimationProvider, useAnimation } from './context/AnimationContext';
import NewProjectModal from './components/modals/NewProjectModal';
import Toast from './components/ui/Toast';
import LiveRegion from './components/accessibility/LiveRegion';
import Sidebar from './components/layout/Sidebar';
import Topbar from './components/layout/Topbar';
import MainContent from './components/dashboard/MainContent';
import RankingPanel from './components/dashboard/RankingPanel';

function DashboardContent() {
  const { state, actions } = useAnimation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSidebarItem, setActiveSidebarItem] = useState('dashboard');
  const [activeTab, setActiveTab] = useState('network');

  return (
    <div className={`min-h-screen bg-background text-textMain custom-scrollbar ${state.idleMode ? 'idle-mode' : ''} ${state.wakeUpPulse ? 'wake-up-pulse' : ''}`}>
      <div className="flex flex-col lg:flex-row">
        <Sidebar 
          activeItem={activeSidebarItem}
          onItemClick={setActiveSidebarItem}
        />
        
        <main className="flex-1">
          <Topbar 
            onNewProject={() => {
              setIsModalOpen(true);
              actions.openModal('newProject');
            }}
            onNotificationClick={() => console.log('Notification clicked')}
            onProfileClick={() => console.log('Profile clicked')}
            notificationCount={2}
          />
          
          <div className="flex-1 flex flex-col lg:flex-row gap-8 px-8 py-8">
            <MainContent 
              onSearch={(value) => console.log('Search:', value)}
              onTabChange={setActiveTab}
              activeTab={activeTab}
            />
            <RankingPanel />
          </div>
        </main>
      </div>
      
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
