import React from 'react';

/**
 * Composant BottomNavigation
 * Zone 17 - NAVIGATION BOTTOM selon spécifications
 */

const BottomNavigation = ({ 
  activeItem = 'dashboard',
  onItemClick,
  className = ""
}) => {
  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
      )
    },
    {
      id: 'projects',
      label: 'Projects',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      )
    },
    {
      id: 'team',
      label: 'Team',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      )
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      )
    }
  ];

  return (
    <nav 
      className={`bottom-navigation fixed bottom-0 left-0 right-0 bg-[#232B3E] border-t border-[#222C3B] px-4 py-2 z-50 lg:hidden ${className}`}
      role="navigation"
      aria-label="Navigation mobile"
    >
      <div className="flex items-center justify-around">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200 ${
              activeItem === item.id
                ? 'text-[#3B82F6] bg-[#3B82F6]/10'
                : 'text-[#AAB7C6] hover:text-[#F1F5F9] hover:bg-[#222C3B]'
            }`}
            onClick={() => onItemClick && onItemClick(item.id)}
            aria-label={item.label}
            aria-current={activeItem === item.id ? 'page' : 'false'}
          >
            <svg 
              className="w-6 h-6 mb-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              {item.icon}
            </svg>
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default BottomNavigation;
