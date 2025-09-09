import React from 'react';

/**
 * ZONE 2 - TOPBAR COMPOSANT MODULAIRE
 * Structure vide, prête pour modules futurs
 */

const Topbar = ({ 
  title = "Titre du dashboard",
  onNewProject,
  onNotificationClick,
  onProfileClick,
  notificationCount = 2,
  className = '',
  ...props 
}) => {
  return (
    <header 
      className={`bg-panel h-[70px] flex items-center px-8 sticky top-0 z-20 ${className}`}
      style={{ boxShadow: '0 1px 0 rgba(0,0,0,0.08)' }}
      role="banner"
      {...props}
    >
      <div className="flex-1 text-xl font-semibold text-textMain">{title}</div>
      
      {/* Burger menu pour mobile */}
      <button 
        className="burger-menu lg:hidden w-8 h-8 flex flex-col justify-center items-center gap-1 focus-visible:ring-2 focus-visible:ring-primary transition-all duration-120 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.04]"
        aria-label="Ouvrir le menu"
        tabIndex="0"
      >
        <span className="w-6 h-0.5 bg-textSub transition-all duration-200"></span>
        <span className="w-6 h-0.5 bg-textSub transition-all duration-200"></span>
        <span className="w-6 h-0.5 bg-textSub transition-all duration-200"></span>
      </button>
      
      <div className="actions hidden lg:flex items-center" style={{ gap: '32px' }}>
        <button
          className="btn-main relative rounded-xl bg-primary text-white font-semibold text-base shadow focus-visible:ring-2 focus-visible:ring-primary transition-all duration-120 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-accent hover:shadow-lg hover:scale-[1.03] active:scale-95"
          style={{ paddingTop: '12px', paddingBottom: '12px', paddingLeft: '24px', paddingRight: '24px' }}
          aria-label="Nouveau projet"
          tabIndex="0"
          onClick={onNewProject}
        >
          + Nouveau projet
        </button>
        
        <button
          className="notif-btn relative flex items-center focus-visible:ring-2 focus-visible:ring-primary transition-all duration-120 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.04]"
          aria-label="Notifications"
          tabIndex="0"
          onClick={onNotificationClick}
        >
          <svg className="text-2xl text-textSub" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span 
            className="badge absolute -top-1 -right-1 w-4 h-4 bg-danger text-xs text-white rounded-full flex items-center justify-center font-bold animate-pop-badge" 
            aria-live="polite"
          >
            {notificationCount}
          </span>
        </button>
        
        <div
          className="avatar w-10 h-10 rounded-full bg-background border-2 border-white flex items-center justify-center text-textSub text-lg font-bold shadow focus-visible:ring-2 focus-visible:ring-primary transition-all duration-120 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.04] hover:shadow-lg"
          tabIndex="0"
          aria-label="Profil utilisateur"
          aria-haspopup="menu"
          onClick={onProfileClick}
        >
          A
        </div>
      </div>
    </header>
  );
};

export default Topbar;
