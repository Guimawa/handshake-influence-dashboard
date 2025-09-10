import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  UserPlus, 
  Mail, 
  X, 
  Send,
  Users,
  CheckCircle
} from 'lucide-react';

export function EmptyInvitePanel({ 
  isVisible = false,
  onClose
}) {
  const [email, setEmail] = useState('');
  const [isInviting, setIsInviting] = useState(false);

  const collaborators = [
    {
      id: 'collab-1',
      email: 'collaborateur@example.com',
      status: 'pending',
      disabled: true
    },
    {
      id: 'collab-2', 
      email: 'membre@example.com',
      status: 'accepted',
      disabled: true
    }
  ];

  const handleInvite = () => {
    if (email.trim()) {
      setIsInviting(true);
      // Simulation de l'invitation
      setTimeout(() => {
        setIsInviting(false);
        setEmail('');
      }, 2000);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-[#F59E0B]';
      case 'accepted': return 'text-[#22C55E]';
      case 'declined': return 'text-[#EF4444]';
      default: return 'text-[#AAB7C6]';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return 'En attente';
      case 'accepted': return 'Accepté';
      case 'declined': return 'Refusé';
      default: return 'Inconnu';
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.12, ease: [0.23, 1, 0.32, 1] }}
          onClick={onClose}
        >
          <motion.div
            className="
              bg-[#232B3E] rounded-xl shadow-2xl p-8 w-full max-w-md
              border border-[#222C3B]
            "
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.12, ease: [0.23, 1, 0.32, 1] }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="invite-title"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <UserPlus className="w-6 h-6 text-[#3B82F6]" />
                <h2 id="invite-title" className="text-xl font-semibold text-[#F1F5F9]">
                  Inviter un collaborateur
                </h2>
              </div>
              
              <motion.button
                className="
                  p-2 text-[#AAB7C6] hover:text-white 
                  transition-colors focus-visible:ring-2 focus-visible:ring-[#3B82F6] 
                  rounded-lg
                "
                onClick={onClose}
                aria-label="Fermer"
                tabIndex={0}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Formulaire d'invitation */}
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleInvite(); }}>
              <div>
                <label 
                  htmlFor="email" 
                  className="block text-sm font-medium text-[#F1F5F9] mb-2"
                >
                  Adresse email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#AAB7C6] w-4 h-4" />
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="collaborateur@example.com"
                    className="
                      w-full pl-10 pr-4 py-3 bg-[#222C3B] border border-[#222C3B] 
                      rounded-lg text-[#F1F5F9] placeholder-[#AAB7C6]
                      focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent
                      transition-all duration-120
                    "
                    disabled
                    aria-describedby="email-help"
                  />
                </div>
                <p id="email-help" className="text-xs text-[#AAB7C6] mt-1">
                  Champ désactivé - Aucun collaborateur à ajouter
                </p>
              </div>

              <motion.button
                type="submit"
                className="
                  w-full flex items-center justify-center gap-2 py-3 px-4
                  bg-[#3B82F6] text-white font-semibold rounded-lg
                  hover:bg-[#2563eb] transition-colors
                  focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:ring-offset-2
                  disabled:opacity-50 disabled:cursor-not-allowed
                "
                disabled
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isInviting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Envoi en cours...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Envoyer l'invitation</span>
                  </>
                )}
              </motion.button>
            </form>

            {/* Liste des collaborateurs existants */}
            <div className="mt-8">
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-[#AAB7C6]" />
                <h3 className="text-lg font-medium text-[#F1F5F9]">
                  Collaborateurs
                </h3>
              </div>

              <div className="space-y-3">
                {collaborators.map((collab, index) => (
                  <motion.div
                    key={collab.id}
                    className={`
                      flex items-center justify-between p-3 bg-[#222C3B] rounded-lg
                      ${collab.disabled ? 'opacity-50' : ''}
                    `}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.12, delay: index * 0.05 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#3B82F6] rounded-full flex items-center justify-center">
                        <UserPlus className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[#F1F5F9]">
                          {collab.email}
                        </p>
                        <p className={`text-xs ${getStatusColor(collab.status)}`}>
                          {getStatusText(collab.status)}
                        </p>
                      </div>
                    </div>
                    
                    {collab.status === 'accepted' && (
                      <CheckCircle className="w-5 h-5 text-[#22C55E]" />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Empty state */}
            <motion.div
              className="mt-6 text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.12, delay: 0.3 }}
            >
              <Users className="w-8 h-8 text-[#AAB7C6] mx-auto mb-2" />
              <p className="text-sm text-[#AAB7C6]">
                Aucun collaborateur ajouté
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
