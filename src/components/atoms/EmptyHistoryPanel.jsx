import { motion } from 'framer-motion';
import { 
  Clock, 
  User, 
  Settings, 
  FileText,
  Trash2,
  RefreshCw
} from 'lucide-react';

export function EmptyHistoryPanel({ 
  isVisible = false,
  onClose,
  className = ""
}) {
  const historyActions = [
    {
      id: 'action-1',
      type: 'create',
      user: 'Utilisateur',
      action: 'Action effectuée',
      timestamp: 'Il y a 2 minutes',
      icon: FileText,
      disabled: true
    },
    {
      id: 'action-2', 
      type: 'update',
      user: 'Utilisateur',
      action: 'Modification apportée',
      timestamp: 'Il y a 5 minutes',
      icon: Settings,
      disabled: true
    },
    {
      id: 'action-3',
      type: 'delete',
      user: 'Utilisateur', 
      action: 'Suppression effectuée',
      timestamp: 'Il y a 10 minutes',
      icon: Trash2,
      disabled: true
    }
  ];

  const getActionColor = (type) => {
    switch (type) {
      case 'create': return 'text-[#22C55E]';
      case 'update': return 'text-[#3B82F6]';
      case 'delete': return 'text-[#EF4444]';
      default: return 'text-[#AAB7C6]';
    }
  };

  return (
    <motion.div
      className={`
        fixed right-0 top-0 h-full w-80 bg-[#232B3E] 
        border-l border-[#7DE3F4] rounded-l-2xl shadow-2xl z-50
        flex flex-col
        ${isVisible ? 'translate-x-0' : 'translate-x-full'}
        transition-transform duration-120 ease-[cubic-bezier(0.23,1,0.32,1)]
        ${className}
      `}
      initial={{ x: '100%' }}
      animate={{ x: isVisible ? 0 : '100%' }}
      transition={{ duration: 0.12, ease: [0.23, 1, 0.32, 1] }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-[#222C3B]">
        <div className="flex items-center gap-3">
          <Clock className="w-6 h-6 text-[#7DE3F4]" />
          <h2 className="text-xl font-semibold text-[#F1F5F9]">
            Historique
          </h2>
        </div>
        
        <motion.button
          className="
            p-2 text-[#AAB7C6] hover:text-white 
            transition-colors focus-visible:ring-2 focus-visible:ring-[#3B82F6] 
            rounded-lg
          "
          onClick={onClose}
          aria-label="Fermer l'historique"
          tabIndex={0}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <RefreshCw className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Contenu principal */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* Actions d'historique vides */}
        <div className="space-y-4">
          {historyActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <motion.div
                key={action.id}
                className={`
                  p-4 bg-[#222C3B] rounded-lg border border-[#222C3B]
                  transition-all duration-120
                  ${action.disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#2A3142]'}
                `}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.12, delay: index * 0.05 }}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    <Icon className={`w-4 h-4 ${getActionColor(action.type)}`} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <User className="w-3 h-3 text-[#AAB7C6]" />
                      <span className="text-sm font-medium text-[#F1F5F9]">
                        {action.user}
                      </span>
                    </div>
                    
                    <p className="text-sm text-[#AAB7C6] mb-2">
                      {action.action}
                    </p>
                    
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#AAB7C6]" />
                      <span className="text-xs text-[#AAB7C6]">
                        {action.timestamp}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Empty state */}
        <motion.div
          className="text-center py-12"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.12, delay: 0.3 }}
        >
          <Clock className="w-12 h-12 text-[#AAB7C6] mx-auto mb-4" />
          <h3 className="text-lg font-medium text-[#F1F5F9] mb-2">
            Aucune action à afficher
          </h3>
          <p className="text-[#AAB7C6] text-sm">
            L'historique des actions sera disponible prochainement
          </p>
        </motion.div>
      </div>

      {/* Footer avec actions */}
      <div className="p-6 border-t border-[#222C3B]">
        <div className="flex gap-3">
          <motion.button
            className="
              flex-1 flex items-center justify-center gap-2 py-2 px-4
              bg-[#222C3B] text-[#AAB7C6] rounded-lg
              hover:bg-[#2A3142] hover:text-white transition-colors
              focus-visible:ring-2 focus-visible:ring-[#3B82F6]
              disabled:opacity-50 disabled:cursor-not-allowed
            "
            disabled
            tabIndex={0}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <RefreshCw className="w-4 h-4" />
            <span className="text-sm">Actualiser</span>
          </motion.button>

          <motion.button
            className="
              flex-1 flex items-center justify-center gap-2 py-2 px-4
              bg-[#3B82F6] text-white rounded-lg
              hover:bg-[#2563eb] transition-colors
              focus-visible:ring-2 focus-visible:ring-[#3B82F6]
              disabled:opacity-50 disabled:cursor-not-allowed
            "
            disabled
            tabIndex={0}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Trash2 className="w-4 h-4" />
            <span className="text-sm">Effacer</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}