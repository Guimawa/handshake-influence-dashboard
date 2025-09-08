import './index.css';
import { useState, useEffect } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { Topbar } from './components/layout/Topbar';
import { MainContent } from './components/dashboard/MainContent';
import { RankingPanel } from './components/dashboard/RankingPanel';
import BottomNavigation from './components/layout/BottomNavigation';
import ComponentsDemo from './components/demo/ComponentsDemo';
import AdvancedComponentsDemo from './components/demo/AdvancedComponentsDemo2';
import AdvancedUIComponentsDemo from './components/demo/AdvancedUIComponentsDemo';
import GraphInteractionsDemo from './components/demo/GraphInteractionsDemo';
import AdvancedFeaturesDemo from './components/demo/AdvancedFeaturesDemo';
import AdvancedNavigationDemo from './components/demo/AdvancedNavigationDemo';
import AdvancedInteractionsDemo from './components/demo/AdvancedInteractionsDemo';
import NetworkGraphDemo from './components/demo/NetworkGraphDemo';
import EmptyComponentsDemo from './components/demo/EmptyComponentsDemo';
import FinalPagesDemo from './components/demo/FinalPagesDemo';
import SolarSystemDemo from './components/demo/SolarSystemDemo';

function App() {
  // États selon spécifications exactes - Sidebar masquée par défaut selon cahier des charges
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [activeTab, setActiveTab] = useState('Network');
  const [activeNavItem, setActiveNavItem] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard'); // Pour navigation

  // Données de démonstration
  const notifications = [
    { id: 1, text: 'New project created', time: '2 min ago', read: false },
    { id: 2, text: 'Task assigned to you', time: '5 min ago', read: false },
    { id: 3, text: 'Weekly report ready', time: '1h ago', read: true }
  ];

  // Responsive sidebar selon spécifications exactes
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 900;
      setIsMobile(mobile);
      if (mobile) {
        setSidebarCollapsed(true);
        setSidebarOpen(false);
      } else {
        setSidebarCollapsed(false);
        setSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handlers selon spécifications exactes
  const handleToggleSidebar = () => {
    if (isMobile) {
      setSidebarOpen(!sidebarOpen);
    } else {
      setSidebarCollapsed(!sidebarCollapsed);
    }
  };

  const handleNavItemClick = (itemId) => {
    setActiveNavItem(itemId);
    setCurrentPage(itemId);
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  const handleCloseSidebar = () => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  const handleNewProject = () => {
    console.log('Nouveau projet créé');
    // Slot pour logique métier future
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    console.log('Recherche:', term);
    // Slot pour logique de recherche future
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    console.log('Tab changé:', tabId);
    // Slot pour logique de changement d'onglet future
  };

  const handleNavItemChange = (itemId) => {
    setActiveNavItem(itemId);
    console.log('Navigation changée:', itemId);
    // Slot pour logique de navigation future
  };

  const handleAddItem = () => {
    console.log('Ajouter un élément');
    // Slot pour logique d'ajout future
  };

  const handleNotificationClick = () => {
    console.log('Notifications cliquées');
    // Slot pour logique de notifications future
  };

  const handleUserMenuClick = () => {
    console.log('Menu utilisateur cliqué');
    // Slot pour logique de menu utilisateur future
  };

  return (
    <div className="min-h-screen bg-[#181E29] text-[#F1F5F9]">
      <div className="flex">
        {/* Sidebar selon spécifications exactes avec responsive */}
        <Sidebar 
          collapsed={sidebarCollapsed}
          onToggleCollapse={handleToggleSidebar}
          activeItem={activeNavItem}
          onItemClick={handleNavItemClick}
          isMobile={isMobile}
          isOpen={sidebarOpen}
          onClose={handleCloseSidebar}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-h-screen">
          {/* Topbar selon spécifications exactes avec responsive */}
          <Topbar 
            title="Dashboard"
            onToggleSidebar={handleToggleSidebar}
            showMobileMenu={isMobile}
            notifications={notifications}
            onNewProject={handleNewProject}
            onNotificationClick={handleNotificationClick}
            onUserMenuClick={handleUserMenuClick}
            isMobile={isMobile}
          />

                      {/* Contenu conditionnel selon la page */}
                      {currentPage === 'demo' ? (
                        <ComponentsDemo />
                      ) : currentPage === 'advanced-demo' ? (
                        <AdvancedComponentsDemo />
                      ) : currentPage === 'ui-components' ? (
                        <AdvancedUIComponentsDemo />
                      ) : currentPage === 'graph-interactions' ? (
                        <GraphInteractionsDemo />
                      ) : currentPage === 'advanced-features' ? (
                        <AdvancedFeaturesDemo />
                      ) : currentPage === 'navigation' ? (
                        <AdvancedNavigationDemo />
                      ) : currentPage === 'interactions' ? (
                        <AdvancedInteractionsDemo />
                      ) : currentPage === 'components' ? (
                        <AdvancedComponentsDemo />
                      ) : currentPage === 'network-graph' ? (
                        <NetworkGraphDemo />
                      ) : currentPage === 'empty-components' ? (
                        <EmptyComponentsDemo />
                      ) : currentPage === 'final-pages' ? (
                        <FinalPagesDemo />
                      ) : currentPage === 'solar-system' ? (
                        <SolarSystemDemo />
                      ) : (
            <div className={`flex-1 flex ${isMobile ? 'flex-col gap-4 p-4' : 'gap-6 p-8'}`}>
              <MainContent 
                title="Influence Dashboard"
                subtitle="Monitor and analyze influence networks"
                onSearch={handleSearch}
                activeTab={activeTab}
                onTabChange={handleTabChange}
                isMobile={isMobile}
              />

              {/* Ranking Panel selon spécifications exactes avec responsive */}
              <RankingPanel 
                title="Influence Ranking"
                stats={{
                  totalInfluencers: 24,
                  avgScore: 8.7
                }}
                onAddItem={handleAddItem}
                isMobile={isMobile}
              />
            </div>
          )}
        </div>
      </div>
      
                  {/* Navigation mobile bottom */}
                  <BottomNavigation 
                    activeItem={activeNavItem}
                    onItemClick={(index, item) => {
                      const pageMap = {
                        'Dashboard': 'dashboard',
                        'Demo': 'demo',
                        'UI': 'ui-components',
                        'Interact': 'interactions',
                        'Features': 'advanced-features',
                        'Nav': 'navigation',
                        'Comp': 'components',
                        'Network': 'network-graph',
                        'Empty': 'empty-components',
                        'Final': 'final-pages',
                        'Solar': 'solar-system'
                      };
                      const page = pageMap[item.label] || 'dashboard';
                      setActiveNavItem(page);
                      setCurrentPage(page);
                    }}
                  />
    </div>
  );
}

export default App;