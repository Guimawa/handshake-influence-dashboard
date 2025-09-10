import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, X } from 'lucide-react';

export function EmptyHelpOverlay({ 
  isVisible = false,
  onClose
}) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.12, ease: [0.23, 1, 0.32, 1] }}
          onClick={onClose}
        >
          <motion.div
            className="
              bg-[#232B3E] rounded-2xl shadow-xl max-w-2xl w-full
              border border-[#222C3B]
            "
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.12, ease: [0.23, 1, 0.32, 1] }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="help-title"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-10 border-b border-[#222C3B]">
              <div className="flex items-center gap-4">
                <HelpCircle className="text-[#3B82F6] w-8 h-8" />
                <h2 
                  id="help-title"
                  className="text-2xl font-bold text-[#F1F5F9]"
                >
                  Aide
                </h2>
              </div>
              
              <motion.button
                className="
                  p-2 text-[#AAB7C6] hover:text-white 
                  transition-colors focus-visible:ring-2 focus-visible:ring-[#3B82F6] 
                  rounded-lg
                "
                onClick={onClose}
                aria-label="Fermer l'aide"
                tabIndex={0}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Content */}
            <div className="p-10">
              <div className="text-center">
                <HelpCircle className="text-6xl text-[#AAB7C6] mx-auto mb-6" />
                <h3 className="text-xl font-semibold text-[#F1F5F9] mb-4">
                  Aide non disponible
                </h3>
                <p className="text-[#AAB7C6] leading-relaxed">
                  Le système d'aide est temporairement indisponible. 
                  Veuillez réessayer plus tard ou contacter le support technique.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
