import { useState } from 'react';

const BottomNavigation = ({ 
  items = [],
  activeItem = 0,
  onItemClick,
  className = ""
}) => {
  const [hoveredItem, setHoveredItem] = useState(null);

  const defaultItems = [
    {
      label: 'Dashboard',
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z" />
        </svg>
      ),
      href: '#'
    },
    {
      label: 'Demo',
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      href: '#'
    },
    {
      label: 'UI',
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v0a2 2 0 01-2 2H6a2 2 0 01-2-2v0zM14 6a2 2 0 012-2h2a2 2 0 012 2v0a2 2 0 01-2 2h-2a2 2 0 01-2-2v0zM4 16a2 2 0 012-2h2a2 2 0 012 2v0a2 2 0 01-2 2H6a2 2 0 01-2-2v0zM14 16a2 2 0 012-2h2a2 2 0 012 2v0a2 2 0 01-2 2h-2a2 2 0 01-2-2v0z" />
        </svg>
      ),
      href: '#'
    },
    {
      label: 'Interact',
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
        </svg>
      ),
      href: '#'
    },
    {
      label: 'Features',
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      href: '#'
    },
    {
      label: 'Nav',
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      ),
      href: '#'
    },
    {
      label: 'Interact',
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
        </svg>
      ),
      href: '#'
    },
    {
      label: 'Comp',
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v0a2 2 0 01-2 2H6a2 2 0 01-2-2v0zM14 6a2 2 0 012-2h2a2 2 0 012 2v0a2 2 0 01-2 2h-2a2 2 0 01-2-2v0zM4 16a2 2 0 012-2h2a2 2 0 012 2v0a2 2 0 01-2 2H6a2 2 0 01-2-2v0zM14 16a2 2 0 012-2h2a2 2 0 012 2v0a2 2 0 01-2 2h-2a2 2 0 01-2-2v0z" />
        </svg>
      ),
      href: '#'
    },
    {
      label: 'Network',
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
        </svg>
      ),
      href: '#'
    },
    {
      label: 'Empty',
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      href: '#'
    },
    {
      label: 'Final',
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      href: '#'
    },
    {
      label: 'Solar',
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
        </svg>
      ),
      href: '#'
    }
  ];

  const navigationItems = items.length > 0 ? items : defaultItems;

  const handleItemClick = (index, item) => {
    if (onItemClick) {
      onItemClick(index, item);
    } else if (item.href) {
      // Navigation par défaut
      window.location.href = item.href;
    }
  };

  return (
    <nav 
      className={`md:hidden fixed bottom-0 left-0 w-full h-16 bg-[#232B3E] flex items-center justify-around z-40 shadow-panel border-t border-[#222C3B] ${className}`}
      role="navigation"
      aria-label="Navigation principale mobile"
    >
      {navigationItems.map((item, index) => {
        const isActive = index === activeItem;
        const isHovered = hoveredItem === index;
        
        return (
          <button
            key={index}
            onClick={() => handleItemClick(index, item)}
            onMouseEnter={() => setHoveredItem(index)}
            onMouseLeave={() => setHoveredItem(null)}
            className={`flex flex-col items-center transition-all duration-90 ease-[cubic-bezier(0.23,1,0.32,1)]
                       focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:outline-none
                       ${isActive || isHovered 
                         ? 'text-[#3B82F6] scale-108' 
                         : 'text-[#AAB7C6] hover:text-[#3B82F6] hover:scale-108'
                       }`}
            aria-label={`${item.label}${isActive ? ' (page actuelle)' : ''}`}
            aria-current={isActive ? 'page' : undefined}
            tabIndex={0}
          >
            {/* Icône */}
            <div className={`transition-transform duration-90 ${isHovered ? 'scale-110' : ''}`}>
              {item.icon}
            </div>
            
            {/* Label */}
            <span className={`text-xs font-medium mt-1 transition-all duration-90 ${
              isActive ? 'text-[#3B82F6]' : 'text-[#AAB7C6]'
            }`}>
              {item.label}
            </span>
            
            {/* Indicateur actif */}
            {isActive && (
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-[#3B82F6] rounded-full" />
            )}
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNavigation;
