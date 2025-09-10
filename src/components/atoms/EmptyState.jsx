import { motion } from 'framer-motion';

const EmptyState = ({ 
  icon,
  title = "Aucune donnée",
  description = "Essayez de modifier vos filtres ou d'ajouter un élément.",
  action,
  actionLabel = "Créer un élément",
  onActionClick,
  className = "",
  size = "md" // sm, md, lg
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return {
          icon: 'w-8 h-8',
          title: 'text-base',
          description: 'text-sm',
          button: 'px-4 py-2 text-sm'
        };
      case 'lg':
        return {
          icon: 'w-20 h-20',
          title: 'text-xl',
          description: 'text-lg',
          button: 'px-8 py-3 text-lg'
        };
      default:
        return {
          icon: 'w-14 h-14',
          title: 'text-lg',
          description: 'text-base',
          button: 'px-6 py-2 text-base'
        };
    }
  };

  const sizeClasses = getSizeClasses();

  const defaultIcon = (
    <svg className={`${sizeClasses.icon} text-[#3B82F6] opacity-70`} fill="none" viewBox="0 0 24 24">
      <path 
        stroke="currentColor" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth="2" 
        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
      />
    </svg>
  );

  return (
    <motion.div 
      className={`flex flex-col items-center justify-center py-12 gap-4 text-center ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.18, 
        ease: [0.23, 1, 0.32, 1] 
      }}
    >
      {/* Icône */}
      <motion.div
        className="mb-2"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          duration: 0.2, 
          delay: 0.1,
          ease: [0.23, 1, 0.32, 1] 
        }}
      >
        {icon || defaultIcon}
      </motion.div>

      {/* Titre */}
      <motion.h2 
        className={`text-[#F1F5F9] font-bold ${sizeClasses.title}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.15, 
          delay: 0.15,
          ease: [0.23, 1, 0.32, 1] 
        }}
      >
        {title}
      </motion.h2>

      {/* Description */}
      <motion.p 
        className={`text-[#AAB7C6] ${sizeClasses.description} max-w-md`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.15, 
          delay: 0.2,
          ease: [0.23, 1, 0.32, 1] 
        }}
      >
        {description}
      </motion.p>

      {/* Action */}
      {action && (
        <motion.button
          className={`mt-4 ${sizeClasses.button} rounded-xl bg-[#3B82F6] text-white font-semibold shadow 
                     hover:bg-[#2563eb] transition-all duration-120 focus-visible:ring-2 focus-visible:ring-[#3B82F6]`}
          onClick={onActionClick}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.15, 
            delay: 0.25,
            ease: [0.23, 1, 0.32, 1] 
          }}
          whileHover={{ 
            scale: 1.03,
            transition: { duration: 0.12, ease: [0.23, 1, 0.32, 1] }
          }}
          whileTap={{ 
            scale: 0.98,
            transition: { duration: 0.08, ease: [0.23, 1, 0.32, 1] }
          }}
          aria-label={actionLabel}
        >
          {action}
        </motion.button>
      )}
    </motion.div>
  );
};

export default EmptyState;
