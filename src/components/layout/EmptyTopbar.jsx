import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search,
  Bell, 
  User, 
  Settings,
  Menu
} from 'lucide-react';

export function EmptyTopbar({ 
  isMobile = false,
  onToggleSidebar
}) {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <motion.header
      className="
        bg-[#232B3E] h-16 flex items-center shadow-sm sticky top-0 z-20
        border-b border-[#222C3B]
        px-4 md:px-8
      "
      role="banner"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.12, ease: [0.23, 1, 0.32, 1] }}
    >
      {/* Zone gauche - Logo slot (vide) */}
      <div className="flex items-center gap-4">
        {/* Bouton menu hamburger mobile */}
        {isMobile && (
          <motion.button
            className="p-2 text-[#AAB7C6] hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-[#3B82F6] rounded-lg"
            onClick={onToggleSidebar}
            aria-label="Toggle sidebar"
            tabIndex={0}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Menu className="w-5 h-5" />
          </motion.button>
        )}

        {/* Slot logo (vide selon spécifications) */}
        <div className="w-8 h-8 bg-[#3B82F6] rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">H</span>
        </div>

        {/* Slot titre (placeholder si vide) */}
        <h1 className="text-xl font-semibold text-[#F1F5F9]">
          Dashboard
        </h1>
      </div>

      {/* Zone centre - Search slot (vide) */}
      <div className="flex-1 flex justify-center">
        <motion.div
          className="relative w-full max-w-md"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.12, delay: 0.05 }}
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#AAB7C6] w-4 h-4" />
            <input
              type="text"
              placeholder="Rechercher..."
              className="
                w-full pl-10 pr-4 py-2 bg-[#222C3B] border border-[#222C3B] 
                rounded-lg text-[#F1F5F9] placeholder-[#AAB7C6]
                focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent
                transition-all duration-120
              "
              onFocus={() => setShowSearch(true)}
              onBlur={() => setShowSearch(false)}
            />
          </div>
        </motion.div>
      </div>

      {/* Zone droite - Actions slot (vides) */}
      <div className="flex items-center gap-4">
        {/* Slot notifications (vide) */}
        <motion.button
          className="
            relative p-2 text-[#AAB7C6] hover:text-white 
            transition-colors focus-visible:ring-2 focus-visible:ring-[#3B82F6] 
            rounded-lg
          "
          aria-label="Notifications"
          tabIndex={0}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Bell className="w-5 h-5" />
        </motion.button>

        {/* Slot avatar (vide) */}
        <motion.div
          className="
            w-8 h-8 rounded-full bg-[#181E29] border-2 border-white 
            flex items-center justify-center text-[#AAB7C6] text-sm font-bold
            cursor-pointer hover:bg-[#222C3B] transition-colors
            focus-visible:ring-2 focus-visible:ring-[#3B82F6]
          "
          tabIndex={0}
          role="button"
          aria-label="Profil utilisateur"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <User className="w-4 h-4" />
        </motion.div>

        {/* Slot settings (vide) */}
        <motion.button
          className="
            p-2 text-[#AAB7C6] hover:text-white 
            transition-colors focus-visible:ring-2 focus-visible:ring-[#3B82F6] 
            rounded-lg
          "
          aria-label="Paramètres"
          tabIndex={0}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Settings className="w-5 h-5" />
        </motion.button>
      </div>
    </motion.header>
  );
}
