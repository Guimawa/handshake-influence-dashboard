import React from 'react';

/**
 * ZONE 1 - SIDEBAR COMPOSANT MODULAIRE
 * Structure vide, prête pour modules futurs
 */

const Sidebar = ({ 
  activeItem = 'dashboard',
  onItemClick,
  className = '',
  ...props 
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z' },
    { id: 'projects', label: 'Projects', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
    { id: 'team', label: 'Team', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
    { id: 'reports', label: 'Reports', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' }
  ];

  return (
    <aside 
      className={`bg-panel min-h-screen w-[90px] lg:w-[90px] flex flex-col py-6 ${className}`}
      role="navigation"
      aria-label="Barre de navigation principale"
      {...props}
    >
      {/* Logo */}
      <div className="logo flex items-center justify-center mb-6" style={{ marginTop: '24px' }}>
        <span className="logo-circle bg-primary text-white font-bold text-2xl w-10 h-10 flex items-center justify-center rounded-full shadow-lg">
          H
        </span>
      </div>
      
      {/* Navigation */}
      <nav className="menu flex-1 flex flex-col items-center" style={{ gap: '32px' }}>
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item group flex flex-col items-center w-full rounded-xl hover:bg-input focus-visible:ring-2 focus-visible:ring-primary transition-all duration-120 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.04] outline-none ${
              activeItem === item.id 
                ? 'bg-primary text-white border-l-4 border-primary' 
                : 'text-textSub hover:text-white'
            }`}
            style={{ paddingTop: '12px', paddingBottom: '16px' }}
            aria-label={item.label}
            aria-current={activeItem === item.id ? 'page' : undefined}
            tabIndex="0"
            onClick={() => onItemClick?.(item.id)}
          >
            <svg 
              className={`icon text-2xl transition ${
                activeItem === item.id ? 'text-white' : 'text-textSub group-hover:text-white'
              }`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
            </svg>
            <span className={`label text-xs mt-1 group-hover:text-white uppercase tracking-wider font-semibold ${
              activeItem === item.id ? 'text-white' : 'text-textSub'
            }`}>
              {item.label}
            </span>
          </button>
        ))}
      </nav>
      
      {/* Footer */}
      <div className="sidebar-footer flex flex-col items-center mt-auto mb-4" style={{ gap: '16px' }}>
        <div 
          className="avatar w-10 h-10 rounded-full bg-background border-2 border-white shadow" 
          tabIndex="0" 
          aria-label="Profil utilisateur"
        />
        <button 
          className="settings w-10 h-10 rounded-full flex items-center justify-center hover:bg-input focus-visible:ring-2 focus-visible:ring-primary transition-all duration-120 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.04] outline-none" 
          aria-label="Paramètres"
          tabIndex="0"
        >
          <svg className="text-textSub w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
