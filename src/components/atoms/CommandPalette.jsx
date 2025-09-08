import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CommandPalette = ({ 
  isOpen = false,
  onClose,
  onCommand,
  commands = [],
  className = ""
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(isOpen);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setSearchTerm('');
      setSelectedIndex(0);
      
      // Focus sur l'input
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  // Fermeture avec ESC
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose?.();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const defaultCommands = [
    {
      id: 'open-project',
      label: 'Ouvrir le projet "Jarvis"',
      description: 'Ouvrir le projet Jarvis UI',
      icon: '📁',
      category: 'Projets'
    },
    {
      id: 'add-node',
      label: 'Ajouter un node',
      description: 'Créer un nouveau node dans le graphique',
      icon: '➕',
      category: 'Graphique'
    },
    {
      id: 'export-data',
      label: 'Exporter les données',
      description: 'Exporter le graphique en PNG/SVG',
      icon: '📤',
      category: 'Export'
    },
    {
      id: 'open-settings',
      label: 'Ouvrir les paramètres',
      description: 'Accéder aux paramètres de l\'application',
      icon: '⚙️',
      category: 'Système'
    },
    {
      id: 'help',
      label: 'Aide et support',
      description: 'Ouvrir la documentation',
      icon: '❓',
      category: 'Aide'
    }
  ];

  const allCommands = commands.length > 0 ? commands : defaultCommands;

  const filteredCommands = allCommands.filter(command =>
    command.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    command.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    command.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleKeyDown = (event) => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setSelectedIndex(prev => 
          prev < filteredCommands.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        event.preventDefault();
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : filteredCommands.length - 1
        );
        break;
      case 'Enter':
        event.preventDefault();
        if (filteredCommands[selectedIndex]) {
          handleCommandSelect(filteredCommands[selectedIndex]);
        }
        break;
    }
  };

  const handleCommandSelect = (command) => {
    onCommand?.(command);
    onClose?.();
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setSelectedIndex(0);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[99] bg-black/40 flex items-center justify-center"
          aria-modal="true"
          role="dialog"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            className={`bg-[#232B3E] rounded-2xl shadow-2xl w-full max-w-xl mx-auto p-7 flex flex-col gap-5 ${className}`}
            onClick={(e) => e.stopPropagation()}
            initial={{ 
              opacity: 0, 
              scale: 0.96,
              y: 20
            }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              y: 0
            }}
            exit={{ 
              opacity: 0, 
              scale: 0.96,
              y: 20
            }}
            transition={{ 
              duration: 0.12, 
              ease: [0.23, 1, 0.32, 1] 
            }}
          >
            {/* Input de recherche */}
            <input
              ref={inputRef}
              className="w-full bg-[#181E29] rounded-xl px-5 py-3 text-[#F1F5F9] font-semibold 
                         placeholder-[#AAB7C6] text-lg outline-none focus:ring-2 focus:ring-[#3B82F6]
                         transition-all duration-120"
              placeholder="Taper une commande ou rechercher…"
              aria-label="Recherche rapide"
              value={searchTerm}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />

            {/* Liste des commandes */}
            <div className="max-h-80 overflow-y-auto">
              <ul className="flex flex-col gap-2 mt-2" role="listbox" ref={listRef}>
                {filteredCommands.length > 0 ? (
                  filteredCommands.map((command, index) => (
                    <motion.li
                      key={command.id}
                      className={`
                        px-4 py-2 rounded-lg transition-all duration-120 cursor-pointer
                        ${index === selectedIndex 
                          ? 'bg-[#3B82F6] text-white' 
                          : 'bg-[#222C3B] text-[#AAB7C6] hover:bg-[#3B82F6] hover:text-white'
                        }
                      `}
                      onClick={() => handleCommandSelect(command)}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ 
                        duration: 0.1, 
                        delay: index * 0.05,
                        ease: [0.23, 1, 0.32, 1] 
                      }}
                      whileHover={{ 
                        scale: 1.01,
                        transition: { duration: 0.08, ease: [0.23, 1, 0.32, 1] }
                      }}
                      whileTap={{ 
                        scale: 0.99,
                        transition: { duration: 0.06, ease: [0.23, 1, 0.32, 1] }
                      }}
                      role="option"
                      aria-selected={index === selectedIndex}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{command.icon}</span>
                        <div className="flex-1">
                          <div className="font-medium">{command.label}</div>
                          <div className="text-xs opacity-80">{command.description}</div>
                        </div>
                        <span className="text-xs opacity-60">{command.category}</span>
                      </div>
                    </motion.li>
                  ))
                ) : (
                  <motion.div
                    className="text-center py-8 text-[#AAB7C6]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="text-lg mb-2">Aucune commande trouvée</div>
                    <div className="text-sm">Essayez un autre terme de recherche</div>
                  </motion.div>
                )}
              </ul>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between text-xs text-[#AAB7C6] pt-2 border-t border-[#222C3B]">
              <div className="flex items-center gap-4">
                <span>↑↓ Naviguer</span>
                <span>↵ Sélectionner</span>
                <span>Esc Fermer</span>
              </div>
              <div>
                {filteredCommands.length} résultat{filteredCommands.length !== 1 ? 's' : ''}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;