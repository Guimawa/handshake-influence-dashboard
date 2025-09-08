import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Home, 
  BarChart3, 
  Users, 
  FileText, 
  Code,
  Settings,
  User,
  Layers,
  MousePointer,
  Network,
  FolderOpen,
  HelpCircle
} from 'lucide-react';

export function Sidebar({ 
  collapsed = false, 
  onToggleCollapse,
  activeItem = 'dashboard',
  onItemClick,
  isMobile = false,
  isOpen = true,
  onClose,
  isEmpty = false // Nouveau prop pour empty state
}) {
  const [hoveredItem, setHoveredItem] = useState(null);

  // Navigation items selon spécifications exactes
  const navItems = [
    { 
      id: 'dashboard', 
      icon: Home, 
      label: 'Dashboard',
      ariaLabel: 'Dashboard'
    },
    { 
      id: 'analytics', 
      icon: BarChart3, 
      label: 'Analytics',
      ariaLabel: 'Analytics'
    },
    { 
      id: 'team', 
      icon: Users, 
      label: 'Team',
      ariaLabel: 'Team'
    },
    { 
      id: 'reports', 
      icon: FileText, 
      label: 'Reports',
      ariaLabel: 'Reports'
    },
    { 
      id: 'demo', 
      icon: Code, 
      label: 'Demo',
      ariaLabel: 'Démonstration des composants'
    },
    { 
      id: 'advanced-demo', 
      icon: Settings, 
      label: 'Advanced',
      ariaLabel: 'Démonstration des composants avancés'
    },
    { 
      id: 'ui-components', 
      icon: Layers, 
      label: 'UI Components',
      ariaLabel: 'Composants UI avancés (Modal, Toast, Skeleton)'
    },
    { 
      id: 'graph-interactions', 
      icon: MousePointer, 
      label: 'Interactions',
      ariaLabel: 'Interactions graphiques (Panel, Context Menu, Popover)'
    },
    { 
      id: 'advanced-features', 
      icon: Settings, 
      label: 'Features',
      ariaLabel: 'Fonctionnalités avancées (Heatmap, Export, Onboarding)'
    },
    { 
      id: 'navigation', 
      icon: MousePointer, 
      label: 'Navigation',
      ariaLabel: 'Navigation avancée (Breadcrumb, User Menu, Command Palette)'
    },
    { 
      id: 'interactions', 
      icon: Settings, 
      label: 'Interactions',
      ariaLabel: 'Interactions avancées (Filtres, Upload, Timeline, Réactions)'
    },
    { 
      id: 'components', 
      icon: Layers, 
      label: 'Components',
      ariaLabel: 'Composants avancés (Tags, Avatars, History, Settings)'
    },
    { 
      id: 'network-graph', 
      icon: Network, 
      label: 'Network',
      ariaLabel: 'Graphique réseau complet'
    },
    { 
      id: 'empty-components', 
      icon: Code, 
      label: 'Empty',
      ariaLabel: 'Composants vides (Zones 87-95)'
    },
    { 
      id: 'final-pages', 
      icon: Code, 
      label: 'Final',
      ariaLabel: 'Pages finales (Zones 96-105)'
    },
    { 
      id: 'solar-system', 
      icon: Network, 
      label: 'Solar',
      ariaLabel: 'Système Solaire (Zone 1) - Interface principale'
    }
  ];

  return (
    <>
      {/* Overlay mobile selon spécifications exactes */}
      {isMobile && isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/60 z-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.12, ease: [0.23, 1, 0.32, 1] }}
          onClick={onClose}
        />
      )}
      
      {/* Sidebar avec animations NANO-précises selon spécifications exactes */}
      <motion.aside
        className={`
          sidebar min-h-screen flex flex-col py-6
          ${isMobile 
            ? 'fixed left-0 top-0 h-full z-40' 
            : ''
          }
          ${isEmpty ? 'bg-[#212837]' : 'bg-[#232B3E]'}
          ${isMobile 
            ? 'w-[90px]' 
            : collapsed ? 'w-[72px]' : 'w-[240px]'
          }
          transition-all duration-300 ease-in-out
        `}
        role="navigation"
        aria-label="Barre de navigation principale"
        // Animations drawer mobile selon spécifications exactes
        initial={isMobile ? { x: '-100%', opacity: 0 } : false}
        animate={isMobile ? { 
          x: isOpen ? 0 : '-100%', 
          opacity: isOpen ? 1 : 0 
        } : false}
        transition={{ 
          duration: 0.18, 
          ease: [0.42, 0, 0.58, 1] 
        }}
      >
      {/* Logo selon spécifications exactes */}
      <div className="logo flex items-center justify-center mb-8">
        <span className="logo-circle bg-[#3B82F6] text-white font-bold text-2xl w-10 h-10 flex items-center justify-center rounded-full shadow-lg">
          H
        </span>
      </div>

      {/* Navigation menu avec gap 32px - ANIMATIONS NANO-PRÉCISES */}
      <nav className="menu flex-1 flex flex-col gap-8 items-center">
        {isEmpty ? (
          /* Empty state selon spécifications exactes */
          <motion.div
            className="flex flex-col items-center justify-center flex-1 text-center px-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.12, ease: [0.23, 1, 0.32, 1] }}
          >
            <FolderOpen className="text-4xl text-[#AAB7C6] mb-4" />
            <p className="text-sm text-[#AAB7C6] leading-relaxed">
              Aucun projet sélectionné
            </p>
          </motion.div>
        ) : (
          navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;
            
            return (
              <motion.button
                key={item.id}
                className={`
                  group flex flex-col items-center py-3 w-full rounded-full
                  transition-all duration-120 ease-[cubic-bezier(0.23,1,0.32,1)]
                  hover:bg-[#232B3E] hover:text-white focus-visible:ring-2 focus-visible:ring-[#3B82F6]
                  outline-none
                  ${isActive 
                    ? 'bg-[#3B82F6] text-white' 
                    : 'text-[#AAB7C6] bg-transparent'
                  }
                `}
                aria-label={item.ariaLabel}
                aria-current={isActive ? 'page' : undefined}
                tabIndex={0}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                onFocus={() => setHoveredItem(item.id)}
                onBlur={() => setHoveredItem(null)}
                onClick={() => {
                  if (onItemClick) onItemClick(item.id);
                }}
                // ANIMATIONS NANO-PRÉCISES selon spécifications exactes
                whileHover={{ 
                  scale: 1.04,
                  transition: { 
                    duration: 0.12, 
                    ease: [0.23, 1, 0.32, 1] 
                  }
                }}
                whileTap={{ 
                  scale: 0.98,
                  transition: { 
                    duration: 0.08, 
                    ease: [0.23, 1, 0.32, 1] 
                  }
                }}
              >
                <Icon className="text-2xl mb-1 group-hover:text-white transition-colors duration-120" />
                {!collapsed && (
                  <span className="text-xs group-hover:text-white uppercase tracking-wider font-semibold transition-colors duration-120">
                    {item.label}
                  </span>
                )}
              </motion.button>
            );
          })
        )}
      </nav>

      {/* Footer avec animations NANO-précises */}
      <div className="sidebar-footer flex flex-col items-center gap-5 mt-auto mb-4">
        {/* Slot pour bouton paramètres ou aide selon spécifications exactes */}
        <motion.button 
          className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#232B3E] focus-visible:ring-2 focus-visible:ring-[#3B82F6] transition-all duration-120" 
          aria-label="Paramètres"
          tabIndex={0}
          whileHover={{ 
            scale: 1.04,
            transition: { 
              duration: 0.12, 
              ease: [0.23, 1, 0.32, 1] 
            }
          }}
          whileTap={{ 
            scale: 0.98,
            transition: { 
              duration: 0.08, 
              ease: [0.23, 1, 0.32, 1] 
            }
          }}
        >
          <Settings className="text-[#AAB7C6] w-5 h-5" />
        </motion.button>
        
        {/* Bouton aide selon spécifications exactes */}
        <motion.button 
          className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#232B3E] focus-visible:ring-2 focus-visible:ring-[#3B82F6] transition-all duration-120" 
          aria-label="Aide"
          tabIndex={0}
          whileHover={{ 
            scale: 1.04,
            transition: { 
              duration: 0.12, 
              ease: [0.23, 1, 0.32, 1] 
            }
          }}
          whileTap={{ 
            scale: 0.98,
            transition: { 
              duration: 0.08, 
              ease: [0.23, 1, 0.32, 1] 
            }
          }}
        >
          <HelpCircle className="text-[#AAB7C6] w-5 h-5" />
        </motion.button>
      </div>
      </motion.aside>
    </>
  );
}
