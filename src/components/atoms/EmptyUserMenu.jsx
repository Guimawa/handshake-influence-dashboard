import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, LogIn, ChevronDown } from 'lucide-react';

export function EmptyUserMenu({ 
  className = ""
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      {/* Trigger - Icône avatar grisé */}
      <motion.button
        className="
          flex items-center gap-2 p-2 text-[#AAB7C6] hover:text-white
          transition-colors focus-visible:ring-2 focus-visible:ring-[#3B82F6] 
          rounded-lg
        "
        onClick={handleToggle}
        aria-label="Menu utilisateur"
        tabIndex={0}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="w-8 h-8 rounded-full bg-[#181E29] border-2 border-[#AAB7C6] flex items-center justify-center">
          <User className="w-4 h-4" />
        </div>
        <ChevronDown className={`w-4 h-4 transition-transform duration-120 ${isOpen ? 'rotate-180' : ''}`} />
      </motion.button>

      {/* Popover */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="
              absolute right-0 top-12 w-64 bg-[#232B3E] rounded-xl 
              shadow-xl border border-[#3B82F6] z-50
            "
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.12, ease: [0.23, 1, 0.32, 1] }}
            role="menu"
            aria-orientation="vertical"
          >
            {/* Header */}
            <div className="p-4 border-b border-[#222C3B]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#181E29] border-2 border-[#AAB7C6] flex items-center justify-center">
                  <User className="w-5 h-5 text-[#AAB7C6]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#F1F5F9]">
                    Aucun utilisateur connecté
                  </p>
                  <p className="text-xs text-[#AAB7C6]">
                    Connectez-vous pour continuer
                  </p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-2">
              <motion.button
                className="
                  w-full flex items-center gap-3 px-3 py-2 text-sm text-[#AAB7C6] 
                  hover:bg-[#222C3B] rounded-lg transition-colors
                  focus-visible:ring-2 focus-visible:ring-[#3B82F6]
                  disabled:opacity-50 disabled:cursor-not-allowed
                "
                disabled
                tabIndex={0}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <LogIn className="w-4 h-4" />
                <span>Se connecter</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay pour fermer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
