import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';

export function EmptyConfirmPopup({ 
  isVisible = false,
  onClose,
  title = "Confirmer l'action",
  message = "Rien à afficher pour le moment"
}) {
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
              bg-[#232B3E] rounded-xl shadow-2xl max-w-xs w-full
              border border-[#222C3B]
            "
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.12, ease: [0.23, 1, 0.32, 1] }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirm-title"
            aria-describedby="confirm-message"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#222C3B]">
              <div className="flex items-center gap-3">
                <AlertTriangle className="text-[#AAB7C6] w-5 h-5" />
                <h3 
                  id="confirm-title"
                  className="text-lg font-semibold text-[#F1F5F9]"
                >
                  {title}
                </h3>
              </div>
              
              <motion.button
                className="
                  p-1 text-[#AAB7C6] hover:text-white 
                  transition-colors focus-visible:ring-2 focus-visible:ring-[#3B82F6] 
                  rounded-lg
                "
                onClick={onClose}
                aria-label="Fermer"
                tabIndex={0}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <X className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Content */}
            <div className="p-6">
              <p 
                id="confirm-message"
                className="text-[#AAB7C6] text-sm leading-relaxed mb-6"
              >
                {message}
              </p>

              {/* Actions */}
              <div className="flex gap-3 justify-end">
                <motion.button
                  className="
                    px-4 py-2 text-sm font-medium text-[#AAB7C6] 
                    bg-[#222C3B] rounded-lg border border-[#222C3B]
                    hover:bg-[#2A3142] transition-colors
                    focus-visible:ring-2 focus-visible:ring-[#3B82F6]
                    disabled:opacity-50 disabled:cursor-not-allowed
                  "
                  onClick={onClose}
                  disabled
                  tabIndex={0}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Annuler
                </motion.button>
                
                <motion.button
                  className="
                    px-4 py-2 text-sm font-medium text-white 
                    bg-[#3B82F6] rounded-lg
                    hover:bg-[#2563eb] transition-colors
                    focus-visible:ring-2 focus-visible:ring-[#3B82F6]
                    disabled:opacity-50 disabled:cursor-not-allowed
                  "
                  disabled
                  tabIndex={0}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Confirmer
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
