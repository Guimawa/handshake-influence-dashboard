import React, { useState, useEffect, useRef } from 'react';
import { Bell, User, Settings, Home, Folder, Users, BarChart3, Plus } from 'lucide-react';

const DashboardFramePipeline = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [hoveredElement, setHoveredElement] = useState(null);
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Nouveau projet créé', time: '2 min', read: false },
    { id: 2, text: 'Tâche assignée', time: '5 min', read: false },
    { id: 3, text: 'Rapport disponible', time: '1h', read: true }
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [cards, setCards] = useState([
    { id: 1, title: 'Projets Actifs', value: 12, change: 3, trend: 'up', icon: Folder },
    { id: 2, title: 'Tâches Terminées', value: 48, change: -2, trend: 'down', icon: BarChart3 },
    { id: 3, title: 'Équipe', value: 8, change: 1, trend: 'up', icon: Users },
    { id: 4, title: 'Rapports', value: 24, change: 0, trend: 'neutral', icon: BarChart3 }
  ]);

  const sidebarRef = useRef(null);
  const topbarRef = useRef(null);
  const mainContentRef = useRef(null);
  const cardsRef = useRef([]);

  // PHASE 1: INITIALISATION INVISIBLE
  useEffect(() => {
    // Pré-montage du DOM
    document.body.style.overflow = 'hidden';
    
    // Préchargement des ressources
    const preloadResources = async () => {
      // Pré-calcul des gradients et shadows
      const style = document.createElement('style');
      style.textContent = `
        .preload-gradients {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        }
      `;
      document.head.appendChild(style);

      // Génération de la stagger map
      const staggerMap = generateStaggerMap();
      
      // Activation du layout observer
      const observer = new ResizeObserver(handleResize);
      observer.observe(document.body);
      
      // Démarrage de la séquence d'initialisation
      setTimeout(() => {
        startInitializationSequence();
      }, 100);
    };

    preloadResources();
  }, []);

  const generateStaggerMap = () => {
    const elements = document.querySelectorAll('[data-stagger]');
    elements.forEach((el, index) => {
      const delay = index * 12; // 12ms entre chaque élément
      el.style.setProperty('--stagger-delay', `${delay}ms`);
    });
  };

  const handleResize = () => {
    // Ajustement de la densité et taille du texte
    const dpr = window.devicePixelRatio;
    const fontSize = Math.max(14, 16 * (dpr / 2));
    document.documentElement.style.fontSize = `${fontSize}px`;
  };

  const startInitializationSequence = () => {
    // PHASE 2: DÉCLENCHEMENT RENDU
    setCurrentPhase(1);
    
    // T=0ms: Premier paint
    setTimeout(() => {
      setCurrentPhase(2);
      // T=10-60ms: Apparition séquencée
      animateSidebar();
    }, 16);

    // T=70-150ms: Main content + Cards
    setTimeout(() => {
      setCurrentPhase(3);
      animateMainContent();
    }, 100);

    // T=200ms: Micro-interactions
    setTimeout(() => {
      setCurrentPhase(4);
      setIsInitialized(true);
    }, 200);
  };

  const animateSidebar = () => {
    if (sidebarRef.current) {
      // Logo fade-in avec spring
      const logo = sidebarRef.current.querySelector('.logo');
      if (logo) {
        logo.style.animation = 'logoPulse 300ms cubic-bezier(0.68, -0.55, 0.265, 1.55)';
      }

      // Icônes séquentielles
      const icons = sidebarRef.current.querySelectorAll('.nav-icon');
      icons.forEach((icon, index) => {
        setTimeout(() => {
          icon.style.animation = 'iconSlideIn 200ms ease-out';
        }, index * 12);
      });
    }
  };

  const animateMainContent = () => {
    if (mainContentRef.current) {
      // Titre principal
      const title = mainContentRef.current.querySelector('.main-title');
      if (title) {
        title.style.animation = 'titleAppear 300ms ease-out';
      }

      // Cards avec spring physics
      cardsRef.current.forEach((card, index) => {
        if (card) {
          setTimeout(() => {
            card.style.animation = `cardPop 400ms cubic-bezier(0.68, -0.55, 0.265, 1.55)`;
            // Animation du chiffre
            animateCounter(card.querySelector('.card-value'), cards[index].value);
          }, index * 100);
        }
      });
    }
  };

  const animateCounter = (element, targetValue) => {
    if (!element) return;
    
    let current = 0;
    const increment = targetValue / 20; // 20 steps
    const timer = setInterval(() => {
      current += increment;
      if (current >= targetValue) {
        current = targetValue;
        clearInterval(timer);
      }
      element.textContent = Math.floor(current);
    }, 20);
  };

  const handleSidebarHover = (element) => {
    setHoveredElement(element);
    
    // Frame 0: Pointer hover, state change
    // Frame 3: Glow bleu, scale 1.1, lift effect
    // Frame 10: Tooltip fade-in
  };

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
    
    if (!showNotifications) {
      // Animation cascade des notifications
      const notifElements = document.querySelectorAll('.notification-item');
      notifElements.forEach((notif, index) => {
        setTimeout(() => {
          notif.style.animation = 'notificationPop 200ms ease-out';
        }, index * 22);
      });
    }
  };

  const handleCardHover = (cardId) => {
    const card = cardsRef.current[cardId - 1];
    if (card) {
      // Frame 0: Mouse in, state hover
      // Frame 2: Scale 1.03, shadow 8px
      // Frame 5: Action button slide in
      card.style.transform = 'scale(1.03)';
      card.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
      
      const actionBtn = card.querySelector('.action-button');
      if (actionBtn) {
        actionBtn.style.opacity = '1';
        actionBtn.style.transform = 'translateY(0)';
      }
    }
  };

  const handleCardLeave = (cardId) => {
    const card = cardsRef.current[cardId - 1];
    if (card) {
      card.style.transform = 'scale(1)';
      card.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
      
      const actionBtn = card.querySelector('.action-button');
      if (actionBtn) {
        actionBtn.style.opacity = '0';
        actionBtn.style.transform = 'translateY(10px)';
      }
    }
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
    
    // Animation de transition
    if (mainContentRef.current) {
      mainContentRef.current.style.animation = 'contentSlide 300ms ease-in-out';
    }
  };

  return (
    <>
      {/* CSS pour toutes les animations */}
      <style jsx>{`
        @keyframes logoPulse {
          0% { transform: scale(0.9); opacity: 0; }
          50% { transform: scale(1.15); opacity: 0.8; }
          100% { transform: scale(1); opacity: 1; }
        }
        
        @keyframes iconSlideIn {
          0% { transform: translateY(-8px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes titleAppear {
          0% { transform: scale(0.98); opacity: 0; letter-spacing: 0.08em; }
          100% { transform: scale(1); opacity: 1; letter-spacing: 0.02em; }
        }
        
        @keyframes cardPop {
          0% { transform: scale(0.9); opacity: 0; }
          50% { transform: scale(1.02); opacity: 0.8; }
          100% { transform: scale(1); opacity: 1; }
        }
        
        @keyframes notificationPop {
          0% { transform: translateY(-8px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes contentSlide {
          0% { transform: translateX(16px); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes ripple {
          0% { transform: scale(0.8); opacity: 0.4; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        
        @keyframes scanline {
          0% { left: -100%; }
          100% { left: 100%; }
        }
        
        @keyframes nudge {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(1px); }
        }
        
        .dashboard-container {
          opacity: ${isInitialized ? 1 : 0};
          transition: opacity 200ms ease-out;
        }
        
        .sidebar {
          transform: translateX(${currentPhase >= 2 ? 0 : -100}px);
          opacity: ${currentPhase >= 2 ? 1 : 0};
          transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .topbar {
          transform: translateY(${currentPhase >= 2 ? 0 : -20}px);
          opacity: ${currentPhase >= 2 ? 1 : 0};
          transition: all 200ms ease-out;
        }
        
        .main-content {
          transform: translateY(${currentPhase >= 3 ? 0 : 20}px);
          opacity: ${currentPhase >= 3 ? 1 : 0};
          transition: all 300ms ease-out;
        }
        
        .nav-icon {
          transition: all 60ms cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .nav-icon:hover {
          transform: scale(1.12) translateY(-2px);
          filter: drop-shadow(0 0 6px rgba(174, 231, 255, 0.8));
        }
        
        .notification-badge {
          animation: nudge 800ms infinite;
        }
        
        .card {
          transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .card:hover {
          transform: scale(1.03);
          box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        }
        
        .action-button {
          opacity: 0;
          transform: translateY(10px);
          transition: all 200ms ease-out;
        }
        
        .card:hover .action-button {
          opacity: 1;
          transform: translateY(0);
        }
        
        .scanline::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.3), transparent);
          animation: scanline 180ms ease-out;
        }
        
        .ripple {
          position: absolute;
          border-radius: 50%;
          background: rgba(59, 130, 246, 0.4);
          transform: scale(0.8);
          animation: ripple 250ms ease-out;
          pointer-events: none;
        }
      `}</style>

      <div className="dashboard-container min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Sidebar */}
        <aside 
          ref={sidebarRef}
          className="sidebar fixed left-0 top-0 w-20 h-full bg-white shadow-lg z-40"
        >
          <div className="p-4">
            {/* Logo */}
            <div className="logo w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-8">
              <span className="text-white font-bold text-xl">H</span>
            </div>
            
            {/* Navigation */}
            <nav className="space-y-4">
              {[
                { icon: Home, label: 'Dashboard', active: activeSection === 'dashboard' },
                { icon: Folder, label: 'Projets', active: activeSection === 'projects' },
                { icon: Users, label: 'Équipe', active: activeSection === 'team' },
                { icon: BarChart3, label: 'Rapports', active: activeSection === 'reports' }
              ].map((item, index) => (
                <button
                  key={item.label}
                  data-stagger
                  className={`nav-icon w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-200 ${
                    item.active 
                      ? 'bg-blue-100 text-blue-600' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  onMouseEnter={() => handleSidebarHover(item.label)}
                  onClick={() => handleSectionChange(item.label.toLowerCase())}
                >
                  <item.icon className="w-5 h-5" />
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Topbar */}
        <header 
          ref={topbarRef}
          className="topbar fixed left-20 right-0 top-0 h-16 bg-white shadow-sm z-30 flex items-center justify-between px-6"
        >
          <div>
            <h1 className="text-xl font-semibold text-gray-900">
              {activeSection === 'dashboard' && 'Dashboard'}
              {activeSection === 'projects' && 'Projets'}
              {activeSection === 'team' && 'Équipe'}
              {activeSection === 'reports' && 'Rapports'}
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={handleNotificationClick}
                className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Bell className="w-5 h-5" />
                {notifications.filter(n => !n.read).length > 0 && (
                  <span className="notification-badge absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {notifications.filter(n => !n.read).length}
                  </span>
                )}
              </button>
              
              {/* Notifications dropdown */}
              {showNotifications && (
                <div className="absolute right-0 top-12 w-80 bg-white rounded-lg shadow-xl border z-50">
                  <div className="p-4 border-b">
                    <h3 className="font-semibold text-gray-900">Notifications</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map((notif, index) => (
                      <div
                        key={notif.id}
                        className={`notification-item p-4 border-b hover:bg-gray-50 transition-colors ${
                          !notif.read ? 'bg-blue-50' : ''
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <p className="text-sm text-gray-900">{notif.text}</p>
                          <span className="text-xs text-gray-500">{notif.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* User menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors"
              >
                <User className="w-4 h-4" />
              </button>
              
              {showUserMenu && (
                <div className="absolute right-0 top-12 w-48 bg-white rounded-lg shadow-xl border z-50">
                  <div className="p-2">
                    <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
                      Mon profil
                    </button>
                    <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
                      Paramètres
                    </button>
                    <hr className="my-2" />
                    <button className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded">
                      Déconnexion
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main 
          ref={mainContentRef}
          className="main-content ml-20 mt-16 p-6"
        >
          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {cards.map((card, index) => (
              <div
                key={card.id}
                ref={el => cardsRef.current[index] = el}
                className="card bg-white rounded-xl p-6 shadow-sm border hover:shadow-lg transition-all duration-200"
                onMouseEnter={() => handleCardHover(card.id)}
                onMouseLeave={() => handleCardLeave(card.id)}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    card.trend === 'up' ? 'bg-green-100 text-green-600' :
                    card.trend === 'down' ? 'bg-red-100 text-red-600' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    <card.icon className="w-6 h-6" />
                  </div>
                  <div className={`text-sm font-medium ${
                    card.trend === 'up' ? 'text-green-600' :
                    card.trend === 'down' ? 'text-red-600' :
                    'text-gray-500'
                  }`}>
                    {card.change > 0 ? '+' : ''}{card.change}
                  </div>
                </div>
                
                <div className="mb-2">
                  <div className="card-value text-2xl font-bold text-gray-900">
                    {card.value}
                  </div>
                  <div className="text-sm text-gray-600">{card.title}</div>
                </div>
                
                <div className="action-button absolute top-4 right-4">
                  <button className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center text-gray-600">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Content based on active section */}
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              {activeSection === 'dashboard' && 'Vue d\'ensemble'}
              {activeSection === 'projects' && 'Liste des projets'}
              {activeSection === 'team' && 'Membres de l\'équipe'}
              {activeSection === 'reports' && 'Rapports disponibles'}
            </h2>
            <p className="text-gray-600">
              Contenu de la section {activeSection}...
            </p>
          </div>
        </main>
      </div>
    </>
  );
};

export default DashboardFramePipeline;
