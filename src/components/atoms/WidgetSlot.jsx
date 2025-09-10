import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

export function WidgetSlot({ 
  className = "",
  onAddWidget
}) {
  return (
    <motion.div
      className={`
        bg-[#384356] border-2 border-dashed border-[#7DE3F4]/40 
        rounded-xl h-40 w-full flex flex-col items-center justify-center
        cursor-pointer hover:border-[#7DE3F4]/60 hover:bg-[#384356]/80
        transition-all duration-120 group
        ${className}
      `}
      onClick={onAddWidget}
      role="button"
      tabIndex={0}
      aria-label="Ajouter un widget personnalisé"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.1, ease: [0.23, 1, 0.32, 1] }}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.12, ease: [0.23, 1, 0.32, 1] }
      }}
      whileTap={{ 
        scale: 0.98,
        transition: { duration: 0.08, ease: [0.23, 1, 0.32, 1] }
      }}
    >
      <motion.div
        className="
          w-12 h-12 rounded-full bg-[#7DE3F4]/20 
          flex items-center justify-center mb-3
          group-hover:bg-[#7DE3F4]/30 transition-colors duration-120
        "
        whileHover={{ 
          scale: 1.1,
          transition: { duration: 0.12, ease: [0.23, 1, 0.32, 1] }
        }}
      >
        <Plus className="w-6 h-6 text-[#7DE3F4] group-hover:text-[#7DE3F4] transition-colors duration-120" />
      </motion.div>
      
      <p className="text-sm text-[#7DE3F4] font-medium group-hover:text-[#7DE3F4] transition-colors duration-120">
        Ajoutez un widget personnalisé
      </p>
    </motion.div>
  );
}
