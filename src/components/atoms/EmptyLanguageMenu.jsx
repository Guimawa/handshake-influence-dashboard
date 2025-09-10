import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Globe, 
  Check,
  ChevronDown
} from 'lucide-react';

export function EmptyLanguageMenu({ 
  className = ""
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('fr');

  const languages = [
    { code: 'fr', name: 'Français', flag: '🇫🇷', disabled: true },
    { code: 'en', name: 'English', flag: '🇺🇸', disabled: true },
    { code: 'es', name: 'Español', flag: '🇪🇸', disabled: true },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪', disabled: true },
    { code: 'it', name: 'Italiano', flag: '🇮🇹', disabled: true }
  ];

  const currentLanguage = languages.find(lang => lang.code === selectedLanguage) || languages[0];

  const handleLanguageSelect = (languageCode) => {
    if (!languages.find(lang => lang.code === languageCode)?.disabled) {
      setSelectedLanguage(languageCode);
      setIsOpen(false);
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Trigger - Bouton globe */}
      <motion.button
        className="
          flex items-center gap-2 px-3 py-2 bg-[#232B3E] text-[#7DE3F4]
          rounded-lg border border-[#222C3B] hover:bg-[#2A3142] 
          transition-colors focus-visible:ring-2 focus-visible:ring-[#3B82F6]
          disabled:opacity-50 disabled:cursor-not-allowed
        "
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label="Sélectionner la langue"
        tabIndex={0}
        disabled={true}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm font-medium">
          {currentLanguage.flag} {currentLanguage.name}
        </span>
        <ChevronDown className={`w-3 h-3 transition-transform duration-120 ${isOpen ? 'rotate-180' : ''}`} />
      </motion.button>

      {/* Popover */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="
              absolute right-0 top-12 w-48 bg-[#232B3E] rounded-xl 
              shadow-xl border border-[#222C3B] z-50
            "
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.1, ease: [0.23, 1, 0.32, 1] }}
            role="menu"
            aria-orientation="vertical"
          >
            <div className="p-2">
              {languages.map((language) => (
                <motion.button
                  key={language.code}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left
                    transition-all duration-120
                    ${language.disabled 
                      ? 'opacity-50 cursor-not-allowed text-[#AAB7C6]' 
                      : 'text-[#F1F5F9] hover:bg-[#222C3B]'
                    }
                    ${selectedLanguage === language.code ? 'bg-[#3B82F6]/20' : ''}
                  `}
                  onClick={() => handleLanguageSelect(language.code)}
                  disabled={language.disabled}
                  role="menuitem"
                  tabIndex={language.disabled ? -1 : 0}
                  whileHover={!language.disabled ? { scale: 1.02 } : {}}
                  whileTap={!language.disabled ? { scale: 0.98 } : {}}
                >
                  <span className="text-lg">{language.flag}</span>
                  <span className="flex-1 text-sm font-medium">
                    {language.name}
                  </span>
                  {selectedLanguage === language.code && (
                    <Check className="w-4 h-4 text-[#7DE3F4]" />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Empty state message */}
            <motion.div
              className="px-3 py-2 border-t border-[#222C3B]"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.12, delay: 0.1 }}
            >
              <p className="text-xs text-[#AAB7C6] text-center">
                Aucune langue disponible
              </p>
            </motion.div>
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
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
    </div>
  );
}