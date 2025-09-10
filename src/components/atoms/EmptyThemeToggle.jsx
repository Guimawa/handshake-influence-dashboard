import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sun, 
  Moon,
  Monitor
} from 'lucide-react';

export function EmptyThemeToggle({ 
  className = "",
  onThemeChange
}) {
  const [currentTheme, setCurrentTheme] = useState('light'); // Light inactif au départ
  const [isAnimating, setIsAnimating] = useState(false);

  const themes = [
    { id: 'light', label: 'Clair', icon: Sun, disabled: true },
    { id: 'dark', label: 'Sombre', icon: Moon, disabled: true },
    { id: 'system', label: 'Système', icon: Monitor, disabled: true }
  ];

  const currentThemeData = themes.find(theme => theme.id === currentTheme) || themes[0];

  const handleThemeChange = (themeId) => {
    if (isAnimating) return;
    
    const theme = themes.find(t => t.id === themeId);
    if (theme && !theme.disabled) {
      setIsAnimating(true);
      
      // Animation de transition
      setTimeout(() => {
        setCurrentTheme(themeId);
        onThemeChange?.(themeId);
        setIsAnimating(false);
      }, 120);
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Toggle principal */}
      <motion.button
        className="
          relative w-16 h-8 bg-[#232B3E] rounded-full border-2 border-[#222C3B]
          flex items-center p-1 transition-colors duration-120
          focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:ring-offset-2
          disabled:opacity-50 disabled:cursor-not-allowed
        "
        onClick={() => handleThemeChange('dark')}
        disabled={true}
        role="switch"
        aria-checked={currentTheme === 'dark'}
        aria-label="Basculer le thème"
        tabIndex={0}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Curseur du toggle */}
        <motion.div
          className="
            w-6 h-6 bg-[#AAB7C6] rounded-full flex items-center justify-center
            shadow-lg
          "
          animate={{
            x: currentTheme === 'dark' ? 28 : 0,
            backgroundColor: currentTheme === 'dark' ? '#3B82F6' : '#AAB7C6'
          }}
          transition={{
            duration: 0.12,
            ease: [0.23, 1, 0.32, 1]
          }}
        >
          {currentTheme === 'dark' ? (
            <Moon className="w-3 h-3 text-white" />
          ) : (
            <Sun className="w-3 h-3 text-white" />
          )}
        </motion.div>

        {/* Icônes de fond */}
        <div className="absolute inset-0 flex items-center justify-between px-2 pointer-events-none">
          <Sun className={`w-3 h-3 transition-colors duration-120 ${
            currentTheme === 'light' ? 'text-[#F59E0B]' : 'text-[#AAB7C6]'
          }`} />
          <Moon className={`w-3 h-3 transition-colors duration-120 ${
            currentTheme === 'dark' ? 'text-[#3B82F6]' : 'text-[#AAB7C6]'
          }`} />
        </div>
      </motion.button>

      {/* Indicateur de thème actuel */}
      <motion.div
        className="mt-2 text-center"
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.12, delay: 0.1 }}
      >
        <p className="text-xs text-[#AAB7C6]">
          {currentThemeData.label}
        </p>
      </motion.div>

      {/* Animation de transition */}
      {isAnimating && (
        <motion.div
          className="
            absolute inset-0 bg-gradient-to-r from-[#3B82F6] to-[#7DE3F4] 
            rounded-full opacity-20
          "
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1.2, opacity: 0.3 }}
          exit={{ scale: 1.5, opacity: 0 }}
          transition={{ duration: 0.12, ease: [0.23, 1, 0.32, 1] }}
        />
      )}

      {/* Empty state message */}
      <motion.div
        className="mt-4 p-2 bg-[#222C3B] rounded-lg text-center"
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.12, delay: 0.2 }}
      >
        <p className="text-xs text-[#AAB7C6]">
          Aucun thème disponible
        </p>
      </motion.div>
    </div>
  );
}
