import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Bell, 
  User, 
  Plus,
  ChevronRight
} from 'lucide-react';
import NotificationMenu from '../atoms/NotificationMenu';

export function Topbar({ 
  title = "Dashboard",
  onToggleSidebar,
  showMobileMenu = false,
  notifications = [],
  onNewProject,
  onNotificationClick,
  onUserMenuClick,
  isMobile = false
}) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
    if (onNotificationClick) onNotificationClick();
  };

  const handleUserMenuClick = () => {
    setShowUserMenu(!showUserMenu);
    if (onUserMenuClick) onUserMenuClick();
  };

  return (
    <header
      className={`
        topbar bg-[#232B3E] h-[70px] flex items-center shadow-sm sticky top-0 z-20
        ${isMobile ? 'px-4' : 'px-8'}
      `}
      role="banner"
    >
      {/* Zone gauche avec titre */}
      <div className="flex-1 text-xl font-semibold text-[#F1F5F9]">
        {title}
      </div>

      {/* Zone droite avec actions */}
      <div className="actions flex items-center gap-8">
        {/* Bouton mobile pour sidebar */}
        {showMobileMenu && (
          <button
            className="md:hidden p-2 text-[#AAB7C6] hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-[#3B82F6] rounded-lg"
            onClick={onToggleSidebar}
            aria-label="Toggle sidebar"
            tabIndex={0}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}

        {/* Bouton principal "Nouveau projet" avec animations NANO-précises selon spécifications exactes */}
        <motion.button
          className={`
            relative rounded-xl bg-[#3B82F6] text-white font-semibold text-base shadow focus-visible:ring-2 ring-[#3B82F6] transition-all duration-120
            ${isMobile ? 'px-4 py-2' : 'px-6 py-2'}
          `}
          aria-label="Nouveau projet"
          tabIndex={0}
          onClick={onNewProject}
          // ANIMATIONS NANO-PRÉCISES selon spécifications exactes
          whileHover={{ 
            scale: 1.03,
            backgroundColor: '#2563eb',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            transition: { 
              duration: 0.12, 
              ease: [0.23, 1, 0.32, 1] 
            }
          }}
          whileTap={{ 
            scale: 0.97,
            transition: { 
              duration: 0.06, 
              ease: [0.23, 1, 0.32, 1] 
            }
          }}
        >
          <div className="flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span className={isMobile ? 'hidden' : 'block'}>Nouveau projet</span>
          </div>
        </motion.button>

        {/* Menu notifications avec composant atomique */}
        <NotificationMenu />

        {/* Avatar utilisateur avec animations NANO-précises */}
        <div className="relative">
          <motion.div
            className="w-10 h-10 rounded-full bg-[#181E29] border-2 border-white flex items-center justify-center text-[#AAB7C6] text-lg font-bold shadow"
            tabIndex={0}
            aria-label="Profil utilisateur"
            role="button"
            onClick={handleUserMenuClick}
            // ANIMATIONS NANO-PRÉCISES selon spécifications exactes
            whileHover={{ 
              scale: 1.04,
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
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
            A
          </motion.div>

          {/* Dropdown utilisateur */}
          {showUserMenu && (
            <div className="absolute right-0 top-12 w-48 bg-[#232B3E] rounded-xl shadow-xl border border-[#222C3B] z-50">
              <div className="p-2">
                <button className="w-full text-left px-3 py-2 text-sm text-white hover:bg-[#222C3B] rounded-lg transition-colors">
                  Profile
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-white hover:bg-[#222C3B] rounded-lg transition-colors">
                  Settings
                </button>
                <hr className="my-2 border-[#222C3B]" />
                <button className="w-full text-left px-3 py-2 text-sm text-[#EF4444] hover:bg-[#EF4444]/10 rounded-lg transition-colors">
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
