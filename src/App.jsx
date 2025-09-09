import React, { useState } from 'react';
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

function DashboardContent() {
  const layoutState = useLayoutObserver();
  const { isIdle, resetIdle } = useIdleMode();
  const { timeline, currentPhase, isComplete } = useTimeline();
  const { handleSidebarHover, handleNotificationPulse, handleCardHover, hoverStates } = useMicroInteractions();
  const { state, actions } = useAnimation();
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        <aside 
          className="sidebar bg-[#232B3E] min-h-screen w-[90px] lg:w-[90px] flex flex-col py-6"
          role="navigation"
          aria-label="Barre de navigation principale"
        >
          {/* Logo */}
          <div className="logo flex items-center justify-center mb-6" style={{ marginTop: '24px' }}>
            <span className="logo-circle bg-[#3B82F6] text-white font-bold text-2xl w-10 h-10 flex items-center justify-center rounded-full shadow-lg">H</span>
          </div>
          
          {/* Navigation */}
          <nav className="menu flex-1 flex flex-col items-center" style={{ gap: '32px' }}>
            <button
              className="nav-item group flex flex-col items-center w-full rounded-xl hover:bg-[#222C3B] focus-visible:ring-2 focus-visible:ring-[#3B82F6] transition-all duration-120 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.04] outline-none bg-[#3B82F6] text-white border-l-4 border-[#3B82F6]"
              style={{ paddingTop: '12px', paddingBottom: '16px' }}
              aria-label="Dashboard"
              aria-current="page"
              tabIndex="0"
              onMouseEnter={() => handleSidebarHover('dashboard', true)}
              onMouseLeave={() => handleSidebarHover('dashboard', false)}
            >
              <svg className="icon text-2xl text-white group-hover:text-white transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
              </svg>
              <span className="label text-xs text-white mt-1 group-hover:text-white uppercase tracking-wider font-semibold">Dashboard</span>
            </button>
            
            <button
              className="nav-item group flex flex-col items-center w-full rounded-xl hover:bg-[#222C3B] focus-visible:ring-2 focus-visible:ring-[#3B82F6] transition-all duration-120 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.04] outline-none"
              style={{ paddingTop: '12px', paddingBottom: '16px' }}
              aria-label="Projects"
              tabIndex="0"
              onMouseEnter={() => handleSidebarHover('projects', true)}
              onMouseLeave={() => handleSidebarHover('projects', false)}
            >
              <svg className="icon text-2xl text-[#AAB7C6] group-hover:text-white transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <span className="label text-xs text-[#AAB7C6] mt-1 group-hover:text-white uppercase tracking-wider font-semibold">Projects</span>
            </button>
            
            <button
              className="nav-item group flex flex-col items-center w-full rounded-xl hover:bg-[#222C3B] focus-visible:ring-2 focus-visible:ring-[#3B82F6] transition-all duration-120 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.04] outline-none"
              style={{ paddingTop: '12px', paddingBottom: '16px' }}
              aria-label="Team"
              tabIndex="0"
              onMouseEnter={() => handleSidebarHover('team', true)}
              onMouseLeave={() => handleSidebarHover('team', false)}
            >
              <svg className="icon text-2xl text-[#AAB7C6] group-hover:text-white transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="label text-xs text-[#AAB7C6] mt-1 group-hover:text-white uppercase tracking-wider font-semibold">Team</span>
            </button>
            
            <button
              className="nav-item group flex flex-col items-center w-full rounded-xl hover:bg-[#222C3B] focus-visible:ring-2 focus-visible:ring-[#3B82F6] transition-all duration-120 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.04] outline-none"
              style={{ paddingTop: '12px', paddingBottom: '16px' }}
              aria-label="Reports"
              tabIndex="0"
              onMouseEnter={() => handleSidebarHover('reports', true)}
              onMouseLeave={() => handleSidebarHover('reports', false)}
            >
              <svg className="icon text-2xl text-[#AAB7C6] group-hover:text-white transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span className="label text-xs text-[#AAB7C6] mt-1 group-hover:text-white uppercase tracking-wider font-semibold">Reports</span>
            </button>
          </nav>
          
          {/* Footer */}
          <div className="sidebar-footer flex flex-col items-center mt-auto mb-4" style={{ gap: '16px' }}>
            <div 
              className="avatar w-10 h-10 rounded-full bg-[#181E29] border-2 border-white shadow" 
              tabIndex="0" 
              aria-label="Profil utilisateur"
            ></div>
            <button 
              className="settings w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#222C3B] focus-visible:ring-2 focus-visible:ring-[#3B82F6] transition-all duration-120 ease-out hover:scale-105 outline-none" 
              aria-label="Paramètres"
              tabIndex="0"
            >
              <svg className="text-[#AAB7C6] w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {/* Top Bar */}
          <header 
            className="topbar bg-[#232B3E] h-[70px] flex items-center px-8 sticky top-0 z-20"
            style={{ boxShadow: '0 1px 0 rgba(0,0,0,0.08)' }}
            role="banner"
          >
            <div className="flex-1 text-xl font-semibold text-[#F1F5F9]">Titre du dashboard</div>
            
            {/* Burger menu pour mobile */}
            <button 
              className="burger-menu lg:hidden w-8 h-8 flex flex-col justify-center items-center gap-1 focus-visible:ring-2 focus-visible:ring-[#3B82F6] transition-all duration-120 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.04]"
              aria-label="Ouvrir le menu"
              tabIndex="0"
            >
              <span className="w-6 h-0.5 bg-[#AAB7C6] transition-all duration-200"></span>
              <span className="w-6 h-0.5 bg-[#AAB7C6] transition-all duration-200"></span>
              <span className="w-6 h-0.5 bg-[#AAB7C6] transition-all duration-200"></span>
            </button>
            
            <div className="actions hidden lg:flex items-center" style={{ gap: '32px' }}>
              <button
                className="btn-main relative rounded-xl bg-[#3B82F6] text-white font-semibold text-base shadow focus-visible:ring-2 focus-visible:ring-[#3B82F6] transition-all duration-120 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-[#2563eb] hover:shadow-lg hover:scale-[1.03] active:scale-95"
                style={{ paddingTop: '12px', paddingBottom: '12px', paddingLeft: '24px', paddingRight: '24px' }}
                aria-label="Nouveau projet"
                tabIndex="0"
                onClick={() => {
                  setIsModalOpen(true);
                  actions.openModal('newProject');
                }}
              >+ Nouveau projet</button>
              <button
                className="notif-btn relative flex items-center focus-visible:ring-2 focus-visible:ring-[#3B82F6] transition-all duration-120 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.04]"
                aria-label="Notifications"
                tabIndex="0"
                onMouseEnter={() => handleNotificationPulse()}
              >
                <svg className="text-2xl text-[#AAB7C6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="badge absolute -top-1 -right-1 w-4 h-4 bg-[#EF4444] text-xs text-white rounded-full flex items-center justify-center font-bold animate-pop-badge" aria-live="polite">2</span>
              </button>
              <div
                className="avatar w-10 h-10 rounded-full bg-[#181E29] border-2 border-white flex items-center justify-center text-[#AAB7C6] text-lg font-bold shadow focus-visible:ring-2 focus-visible:ring-[#3B82F6] transition-all duration-120 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.04] hover:shadow-lg"
                tabIndex="0"
                aria-label="Profil utilisateur"
                aria-haspopup="menu"
              >A</div>
            </div>
          </header>

          {/* Zone centrale avec panel droit */}
          <div className="flex-1 flex flex-col lg:flex-row gap-8 px-8 py-8">
            {/* ZONE 3 - MAIN CONTENT */}
            <main className="flex-1 flex flex-col px-8 py-8 gap-6">
              <section className="mb-6">
                <h1 className="text-3xl font-bold text-[#F1F5F9] mb-2">Titre du dashboard</h1>
                <div className="text-lg text-[#AAB7C6] mb-6">Sous-titre ici</div>
                <div className="search-bar w-full max-w-lg mb-8 flex items-center bg-[#222C3B] rounded-xl h-12 px-4 shadow focus-within:ring-2 focus-within:ring-[#3B82F6]">
                  <svg className="text-xl text-[#AAB7C6] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="search"
                    className="flex-1 bg-transparent border-none text-[#F1F5F9] placeholder-[#AAB7C6] font-semibold text-base focus:outline-none"
                    placeholder="Search..."
                    aria-label="Recherche"
                  />
                </div>
                <div className="tabs flex gap-4 mb-8" role="tablist">
                  <button 
                    className="tab px-6 py-2 rounded-full font-bold bg-[#3B82F6] text-white shadow focus-visible:ring-2 focus-visible:ring-[#3B82F6] transition-all duration-140 ease-[cubic-bezier(0.18,0.89,0.32,1.27)]" 
                    role="tab"
                    aria-selected="true"
                    tabIndex="0"
                  >
                  Network
                </button>
                  <button 
                    className="tab px-6 py-2 rounded-full font-bold border border-[#222C3B] text-[#AAB7C6] bg-transparent shadow-none hover:bg-[#222C3B] hover:text-white focus-visible:ring-2 focus-visible:ring-[#3B82F6] transition-all duration-120 ease-[cubic-bezier(0.23,1,0.32,1)]" 
                    role="tab"
                    aria-selected="false"
                    tabIndex="0"
                  >
                  Heatmap
                </button>
                </div>
                <div 
                  className="panel bg-[#232B3E] rounded-xl p-10 min-h-[320px] flex items-center justify-center text-[#AAB7C6] text-xl"
                  aria-label="Zone centrale vide, slot à remplir plus tard"
                >
                  [Zone centrale vide, slot à remplir plus tard]
                </div>
              </section>
            </main>
            
            {/* ZONE 4 - PANEL DROIT */}
            <aside className="w-[380px] flex flex-col gap-6" role="complementary" aria-label="Zone latérale">
              <div 
                className="panel bg-[#232B3E] rounded-xl p-8 min-h-[240px] flex flex-col items-center justify-center"
                tabIndex="0"
                aria-label="Ranking card vide, slot à remplir plus tard"
              >
                [Ranking card vide, slot à remplir plus tard]
              </div>
            </aside>
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


