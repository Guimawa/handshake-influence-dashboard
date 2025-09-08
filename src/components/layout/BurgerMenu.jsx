import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export function BurgerMenu({ 
  isOpen = false, 
  onToggle, 
  className = "" 
}) {
  return (
    <motion.button
      className={`
        md:hidden flex items-center justify-center w-12 h-12 rounded-full 
        hover:bg-[#222C3B] focus-visible:ring-2 focus-visible:ring-[#3B82F6] 
        transition-all duration-120 ${className}
      `}
      aria-label={isOpen ? "Fermer le menu latéral" : "Ouvrir le menu latéral"}
      tabIndex={0}
      onClick={onToggle}
      whileHover={{ 
        scale: 1.04,
        transition: { duration: 0.12, ease: [0.23, 1, 0.32, 1] }
      }}
      whileTap={{ 
        scale: 0.98,
        transition: { duration: 0.08, ease: [0.23, 1, 0.32, 1] }
      }}
    >
      <motion.div
        initial={false}
        animate={{ rotate: isOpen ? 90 : 0 }}
        transition={{ duration: 0.2 }}
      >
        {isOpen ? (
          <X className="w-7 h-7 text-[#AAB7C6] hover:text-white transition-colors" />
        ) : (
          <Menu className="w-7 h-7 text-[#AAB7C6] hover:text-white transition-colors" />
        )}
      </motion.div>
    </motion.button>
  );
}
