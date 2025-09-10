import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Loader2, 
  User,
  Sparkles
} from 'lucide-react';

export default function EmptySplashPage({ 
  onComplete,
  duration = 3000
}) {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulation du chargement
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsLoading(false);
          setTimeout(() => {
            onComplete?.();
          }, 500);
          return 100;
        }
        return prev + 2;
      });
    }, duration / 50);

    return () => clearInterval(interval);
  }, [duration, onComplete]);

  return (
    <motion.div
      className="
        fixed inset-0 bg-[#212837] flex items-center justify-center
        z-[9999]
      "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.12, ease: [0.23, 1, 0.32, 1] }}
      aria-busy="true"
      role="status"
      aria-live="polite"
    >
      <div className="text-center max-w-md mx-auto px-4">
        {/* Logo/Brand animé */}
        <motion.div
          className="mb-8"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            duration: 0.12, 
            ease: [0.23, 1, 0.32, 1] 
          }}
        >
          <motion.div
            className="
              w-20 h-20 bg-gradient-to-br from-[#3B82F6] to-[#7DE3F4] 
              rounded-2xl flex items-center justify-center mx-auto mb-4
              shadow-2xl
            "
            animate={{ 
              scale: [1, 1.05, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <User className="w-10 h-10 text-white" />
          </motion.div>

          {/* Effet shimmer */}
          <motion.div
            className="
              absolute inset-0 bg-gradient-to-r from-transparent 
              via-white/20 to-transparent rounded-2xl
            "
            animate={{
              x: ['-100%', '100%']
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>

        {/* Texte de chargement */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.12, delay: 0.2 }}
        >
          <h1 className="text-2xl font-bold text-[#F1F5F9] mb-2">
            Chargement du dashboard…
          </h1>
          <p className="text-[#AAB7C6] text-sm">
            Initialisation en cours
          </p>
        </motion.div>

        {/* Barre de progression */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.12, delay: 0.3 }}
        >
          <div className="w-full bg-[#222C3B] rounded-full h-2 overflow-hidden">
            <motion.div
              className="
                h-full bg-gradient-to-r from-[#3B82F6] to-[#7DE3F4] 
                rounded-full
              "
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </div>
          <div className="flex justify-between text-xs text-[#AAB7C6] mt-2">
            <span>Chargement...</span>
            <span>{progress}%</span>
          </div>
        </motion.div>

        {/* Indicateur de chargement */}
        <motion.div
          className="flex items-center justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.12, delay: 0.4 }}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 text-[#3B82F6] animate-spin" />
              <span className="text-[#AAB7C6] text-sm">
                Préparation de l'interface...
              </span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-[#7DE3F4] animate-pulse" />
              <span className="text-[#7DE3F4] text-sm font-medium">
                Prêt !
              </span>
            </>
          )}
        </motion.div>

        {/* Empty state message */}
        <motion.div
          className="mt-8 p-4 bg-[#222C3B] rounded-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.12, delay: 0.5 }}
        >
          <p className="text-xs text-[#AAB7C6]">
            Aucune donnée à charger pour le moment
          </p>
        </motion.div>
      </div>

      {/* Overlay de chargement global */}
      <motion.div
        className="
          absolute inset-0 bg-gradient-to-br from-[#212837] via-[#232B3E] to-[#212837]
          opacity-50
        "
        animate={{
          background: [
            'linear-gradient(135deg, #212837 0%, #232B3E 50%, #212837 100%)',
            'linear-gradient(135deg, #232B3E 0%, #212837 50%, #232B3E 100%)',
            'linear-gradient(135deg, #212837 0%, #232B3E 50%, #212837 100%)'
          ]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  );
}
