import { motion } from 'framer-motion';
import { 
  Home, 
  RefreshCw, 
  AlertTriangle,
  Server
} from 'lucide-react';

export default function EmptyErrorPage({ 
  type = '404', // '404' ou '500'
  onGoHome,
  onRetry
}) {
  const is404 = type === '404';
  const is500 = type === '500';

  return (
    <motion.div
      className="
        min-h-screen flex items-center justify-center p-4
        bg-[#232B3E]
      "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.12, ease: [0.23, 1, 0.32, 1] }}
    >
      <motion.div
        className="text-center max-w-md mx-auto"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.12, ease: [0.23, 1, 0.32, 1] }}
      >
        {/* Icône/Illustration */}
        <motion.div
          className="mb-8"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            duration: 0.12, 
            delay: 0.1,
            ease: [0.23, 1, 0.32, 1] 
          }}
        >
          {is404 ? (
            <div className="relative">
              {/* Illustration 404 stylée */}
              <div className="text-8xl font-bold text-[#3B82F6] mb-4">
                4<span className="text-[#7DE3F4]">0</span>4
              </div>
              <div className="absolute -top-2 -right-2">
                <AlertTriangle className="w-12 h-12 text-[#EF4444] animate-bounce" />
              </div>
            </div>
          ) : (
            <div className="relative">
              {/* Illustration 500 stylée */}
              <div className="text-8xl font-bold text-[#3B82F6] mb-4">
                5<span className="text-[#7DE3F4]">0</span>0
              </div>
              <div className="absolute -top-2 -right-2">
                <Server className="w-12 h-12 text-[#EF4444] animate-pulse" />
              </div>
            </div>
          )}
        </motion.div>

        {/* Titre */}
        <motion.h1
          className="text-3xl font-bold text-[#F1F5F9] mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.12, delay: 0.2 }}
        >
          {is404 ? 'Page non trouvée' : 'Erreur serveur'}
        </motion.h1>

        {/* Description */}
        <motion.p
          className="text-[#AAB7C6] mb-8 leading-relaxed"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.12, delay: 0.3 }}
        >
          {is404 
            ? 'La page que vous recherchez n\'existe pas ou a été déplacée.'
            : 'Une erreur interne s\'est produite. Veuillez réessayer plus tard.'
          }
        </motion.p>

        {/* Actions */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.12, delay: 0.4 }}
        >
          {/* Bouton Retour accueil */}
          <motion.button
            className="
              flex items-center justify-center gap-2 px-6 py-3
              bg-[#3B82F6] text-white font-semibold rounded-lg
              hover:bg-[#2563eb] transition-colors
              focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:ring-offset-2
            "
            onClick={onGoHome}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.12 }}
          >
            <Home className="w-4 h-4" />
            <span>Retour accueil</span>
          </motion.button>

          {/* Bouton Retry (pour 500) */}
          {is500 && (
            <motion.button
              className="
                flex items-center justify-center gap-2 px-6 py-3
                bg-[#222C3B] text-[#F1F5F9] font-semibold rounded-lg
                border border-[#222C3B] hover:bg-[#2A3142] transition-colors
                focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:ring-offset-2
              "
              onClick={onRetry}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.12 }}
            >
              <RefreshCw className="w-4 h-4" />
              <span>Réessayer</span>
            </motion.button>
          )}
        </motion.div>

        {/* Empty state message */}
        <motion.div
          className="mt-8 p-4 bg-[#222C3B] rounded-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.12, delay: 0.5 }}
        >
          <p className="text-sm text-[#AAB7C6]">
            {is404 
              ? 'Aucune page disponible pour le moment'
              : 'Aucune solution disponible pour le moment'
            }
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
