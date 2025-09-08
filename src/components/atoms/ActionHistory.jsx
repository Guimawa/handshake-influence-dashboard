import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ActionHistory = ({ 
  actions = [],
  onUndo,
  onRedo,
  maxActions = 50,
  className = ""
}) => {
  const [currentIndex, setCurrentIndex] = useState(actions.length - 1);

  const defaultActions = [
    {
      id: 1,
      type: 'add',
      description: 'Ajouté node "Utilisateur A"',
      timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 min ago
      icon: '➕',
      color: '#F7C873'
    },
    {
      id: 2,
      type: 'edit',
      description: 'Modifié la connexion entre A et B',
      timestamp: new Date(Date.now() - 10 * 60 * 1000), // 10 min ago
      icon: '✏️',
      color: '#3B82F6'
    },
    {
      id: 3,
      type: 'delete',
      description: 'Supprimé node "Ancien"',
      timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 min ago
      icon: '🗑️',
      color: '#EF4444'
    },
    {
      id: 4,
      type: 'move',
      description: 'Déplacé node vers le centre',
      timestamp: new Date(Date.now() - 20 * 60 * 1000), // 20 min ago
      icon: '↔️',
      color: '#7DE3F4'
    },
    {
      id: 5,
      type: 'color',
      description: 'Changé la couleur du groupe',
      timestamp: new Date(Date.now() - 25 * 60 * 1000), // 25 min ago
      icon: '🎨',
      color: '#F69AC1'
    }
  ];

  const actionsData = actions.length > 0 ? actions : defaultActions;
  const displayActions = actionsData.slice(0, maxActions);

  const formatTime = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'À l\'instant';
    if (minutes < 60) return `${minutes}min`;
    if (hours < 24) return `${hours}h`;
    return `${days}j`;
  };

  const handleUndo = () => {
    if (currentIndex >= 0) {
      onUndo?.(displayActions[currentIndex]);
      setCurrentIndex(prev => Math.max(0, prev - 1));
    }
  };

  const handleRedo = () => {
    if (currentIndex < displayActions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      onRedo?.(displayActions[currentIndex + 1]);
    }
  };

  const handleActionUndo = (action) => {
    onUndo?.(action);
  };

  const canUndo = currentIndex >= 0;
  const canRedo = currentIndex < displayActions.length - 1;

  return (
    <motion.div
      className={`bg-[#232B3E] rounded-xl shadow-panel p-6 max-w-lg w-full ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
    >
      {/* Header */}
      <h2 className="font-bold text-[#7DE3F4] mb-3 text-lg">
        Historique des Actions
      </h2>

      {/* Liste des actions */}
      <ul 
        className="flex flex-col gap-2 max-h-64 overflow-auto"
        role="list"
      >
        <AnimatePresence>
          {displayActions.map((action, index) => (
            <motion.li
              key={action.id}
              className={`flex items-center gap-3 text-[#AAB7C6] text-sm p-2 rounded-lg transition-all duration-120
                         ${index <= currentIndex ? 'opacity-100' : 'opacity-50'}
                         hover:bg-[#222C3B]`}
              role="listitem"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ 
                duration: 0.2, 
                delay: index * 0.05,
                ease: [0.23, 1, 0.32, 1] 
              }}
            >
              {/* Icône de l'action */}
              <motion.span
                className="text-lg"
                style={{ color: action.color }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  duration: 0.3, 
                  delay: index * 0.05 + 0.1,
                  ease: [0.23, 1, 0.32, 1] 
                }}
              >
                {action.icon}
              </motion.span>

              {/* Description */}
              <span className="flex-1 truncate">
                {action.description}
              </span>

              {/* Timestamp */}
              <span className="text-xs text-[#AAB7C6]/60 ml-auto">
                {formatTime(action.timestamp)}
              </span>

              {/* Bouton undo individuel */}
              {index <= currentIndex && (
                <motion.button
                  className="ml-2 text-[#3B82F6] hover:text-[#EF4444] rounded p-1 transition-colors duration-120
                             focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:outline-none"
                  onClick={() => handleActionUndo(action)}
                  aria-label={`Annuler: ${action.description}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  ↶
                </motion.button>
              )}
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      {/* Actions globales */}
      <div className="flex gap-2 mt-4">
        <motion.button
          className={`px-4 py-2 rounded-xl font-semibold transition-all duration-120
                     ${canUndo 
                       ? 'bg-[#3B82F6] text-white hover:bg-[#2563eb]' 
                       : 'bg-[#222C3B] text-[#AAB7C6] cursor-not-allowed'
                     }`}
          onClick={handleUndo}
          disabled={!canUndo}
          aria-label="Annuler la dernière action"
          whileHover={canUndo ? { scale: 1.02 } : {}}
          whileTap={canUndo ? { scale: 0.98 } : {}}
        >
          Annuler
        </motion.button>
        
        <motion.button
          className={`px-4 py-2 rounded-xl font-semibold transition-all duration-120
                     ${canRedo 
                       ? 'bg-[#222C3B] text-[#AAB7C6] hover:bg-[#3B82F6] hover:text-white' 
                       : 'bg-[#222C3B] text-[#AAB7C6] cursor-not-allowed'
                     }`}
          onClick={handleRedo}
          disabled={!canRedo}
          aria-label="Rétablir la dernière action annulée"
          whileHover={canRedo ? { scale: 1.02 } : {}}
          whileTap={canRedo ? { scale: 0.98 } : {}}
        >
          Rétablir
        </motion.button>
      </div>

      {/* Indicateur de position */}
      <div className="mt-3 text-xs text-[#AAB7C6]/60 text-center">
        {currentIndex + 1} / {displayActions.length} actions
      </div>
    </motion.div>
  );
};

export default ActionHistory;
