import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const QuickSettingsPopup = ({ 
  settings = {},
  onSettingsChange,
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [localSettings, setLocalSettings] = useState(settings);
  const popupRef = useRef(null);
  const buttonRef = useRef(null);

  const defaultSettings = {
    theme: 'dark',
    language: 'fr',
    notifications: true,
    autoSave: true,
    compactMode: false,
    animations: true
  };

  const settingsData = { ...defaultSettings, ...settings };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target) &&
          buttonRef.current && !buttonRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleSettingChange = (key, value) => {
    const newSettings = { ...localSettings, [key]: value };
    setLocalSettings(newSettings);
    onSettingsChange?.(newSettings);
  };

  const handleApply = () => {
    onSettingsChange?.(localSettings);
    setIsOpen(false);
  };

  const handleReset = () => {
    setLocalSettings(settingsData);
  };

  return (
    <div className={`relative ${className}`}>
      {/* Trigger button */}
      <motion.button
        ref={buttonRef}
        className="fixed top-4 right-4 z-40 w-10 h-10 rounded-full bg-[#3B82F6] text-white 
                   hover:bg-[#2563eb] transition-all duration-120 flex items-center justify-center
                   focus-visible:ring-2 focus-visible:ring-[#7DE3F4] focus-visible:outline-none shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Paramètres rapides"
        aria-haspopup="true"
        aria-expanded={isOpen}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
        >
          <path 
            stroke="currentColor" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" 
          />
          <path 
            stroke="currentColor" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
          />
        </motion.svg>
      </motion.button>

      {/* Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={popupRef}
            className="fixed top-16 right-4 z-50 w-80 bg-[#232B3E] rounded-xl shadow-panel border border-[#3B82F6] p-4"
            initial={{ opacity: 0, scale: 0.9, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            transition={{ duration: 0.1, ease: [0.23, 1, 0.32, 1] }}
            role="dialog"
            aria-labelledby="settings-title"
          >
            <h3 id="settings-title" className="text-[#7DE3F4] font-bold text-lg mb-4">
              Paramètres Rapides
            </h3>

            <div className="space-y-4">
              {/* Theme */}
              <div className="flex items-center justify-between">
                <span className="text-[#F1F5F9] font-medium">Thème</span>
                <select
                  value={localSettings.theme}
                  onChange={(e) => handleSettingChange('theme', e.target.value)}
                  className="px-3 py-1 bg-[#181E29] border border-[#3B82F6] rounded-lg text-[#F1F5F9] text-sm
                             focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
                >
                  <option value="dark">Sombre</option>
                  <option value="light">Clair</option>
                  <option value="auto">Automatique</option>
                </select>
              </div>

              {/* Language */}
              <div className="flex items-center justify-between">
                <span className="text-[#F1F5F9] font-medium">Langue</span>
                <select
                  value={localSettings.language}
                  onChange={(e) => handleSettingChange('language', e.target.value)}
                  className="px-3 py-1 bg-[#181E29] border border-[#3B82F6] rounded-lg text-[#F1F5F9] text-sm
                             focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
                >
                  <option value="fr">Français</option>
                  <option value="en">English</option>
                  <option value="es">Español</option>
                </select>
              </div>

              {/* Notifications */}
              <div className="flex items-center justify-between">
                <span className="text-[#F1F5F9] font-medium">Notifications</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={localSettings.notifications}
                    onChange={(e) => handleSettingChange('notifications', e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`w-11 h-6 rounded-full transition-colors duration-200 ${
                    localSettings.notifications ? 'bg-[#3B82F6]' : 'bg-[#384356]'
                  }`}>
                    <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-200 ${
                      localSettings.notifications ? 'translate-x-5' : 'translate-x-0.5'
                    } mt-0.5`} />
                  </div>
                </label>
              </div>

              {/* Auto Save */}
              <div className="flex items-center justify-between">
                <span className="text-[#F1F5F9] font-medium">Sauvegarde auto</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={localSettings.autoSave}
                    onChange={(e) => handleSettingChange('autoSave', e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`w-11 h-6 rounded-full transition-colors duration-200 ${
                    localSettings.autoSave ? 'bg-[#3B82F6]' : 'bg-[#384356]'
                  }`}>
                    <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-200 ${
                      localSettings.autoSave ? 'translate-x-5' : 'translate-x-0.5'
                    } mt-0.5`} />
                  </div>
                </label>
              </div>

              {/* Compact Mode */}
              <div className="flex items-center justify-between">
                <span className="text-[#F1F5F9] font-medium">Mode compact</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={localSettings.compactMode}
                    onChange={(e) => handleSettingChange('compactMode', e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`w-11 h-6 rounded-full transition-colors duration-200 ${
                    localSettings.compactMode ? 'bg-[#3B82F6]' : 'bg-[#384356]'
                  }`}>
                    <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-200 ${
                      localSettings.compactMode ? 'translate-x-5' : 'translate-x-0.5'
                    } mt-0.5`} />
                  </div>
                </label>
              </div>

              {/* Animations */}
              <div className="flex items-center justify-between">
                <span className="text-[#F1F5F9] font-medium">Animations</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={localSettings.animations}
                    onChange={(e) => handleSettingChange('animations', e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`w-11 h-6 rounded-full transition-colors duration-200 ${
                    localSettings.animations ? 'bg-[#3B82F6]' : 'bg-[#384356]'
                  }`}>
                    <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-200 ${
                      localSettings.animations ? 'translate-x-5' : 'translate-x-0.5'
                    } mt-0.5`} />
                  </div>
                </label>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 mt-6 pt-4 border-t border-[#222C3B]">
              <motion.button
                className="flex-1 px-3 py-2 rounded-lg bg-[#222C3B] text-[#AAB7C6] text-sm font-medium
                           hover:bg-[#3B82F6] hover:text-white transition-colors duration-120"
                onClick={handleReset}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Reset
              </motion.button>
              <motion.button
                className="flex-1 px-3 py-2 rounded-lg bg-[#3B82F6] text-white text-sm font-medium
                           hover:bg-[#2563eb] transition-colors duration-120"
                onClick={handleApply}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Appliquer
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QuickSettingsPopup;
