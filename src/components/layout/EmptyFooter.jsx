import { motion } from 'framer-motion';

export function EmptyFooter({ 
  isMobile = false 
}) {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      className="
        bg-[#212837] h-11 flex items-center justify-center
        text-sm text-[#AAB7C6] border-t border-[#222C3B]
        sticky bottom-0 z-10
        px-4 md:px-8
      "
      role="contentinfo"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.12, ease: [0.23, 1, 0.32, 1] }}
    >
      <div className="flex items-center gap-2">
        <span>© {currentYear} Chef. Tous droits réservés.</span>
        
        {/* Liens légaux selon spécifications exactes */}
        <div className="hidden md:flex items-center gap-4 ml-4">
          <a 
            href="#" 
            className="text-[#AAB7C6] hover:text-white transition-colors text-xs"
            aria-label="Mentions légales"
          >
            Mentions
          </a>
          <span className="text-[#AAB7C6] text-xs">•</span>
          <a 
            href="#" 
            className="text-[#AAB7C6] hover:text-white transition-colors text-xs"
            aria-label="Politique de confidentialité RGPD"
          >
            RGPD
          </a>
        </div>
      </div>
    </motion.footer>
  );
}
