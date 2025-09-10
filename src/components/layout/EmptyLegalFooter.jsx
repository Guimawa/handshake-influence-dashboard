import { motion } from 'framer-motion';
import { 
  FileText, 
  Shield, 
  Cookie,
  ExternalLink
} from 'lucide-react';

export function EmptyLegalFooter({ 
  className = ""
}) {
  const currentYear = new Date().getFullYear();

  const legalLinks = [
    {
      id: 'mentions',
      label: 'Mentions légales',
      icon: FileText,
      href: '#',
      disabled: true
    },
    {
      id: 'privacy',
      label: 'Politique de confidentialité',
      icon: Shield,
      href: '#',
      disabled: true
    },
    {
      id: 'cookies',
      label: 'Cookies',
      icon: Cookie,
      href: '#',
      disabled: true
    },
    {
      id: 'terms',
      label: 'Conditions d\'utilisation',
      icon: FileText,
      href: '#',
      disabled: true
    }
  ];

  return (
    <motion.footer
      className={`
        bg-[#212837] py-3 px-4 md:px-8 text-xs
        ${className}
      `}
      role="contentinfo"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.12, ease: [0.23, 1, 0.32, 1] }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <motion.div
            className="text-[#AAB7C6]"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.12, delay: 0.1 }}
          >
            © {currentYear} Chef. Tous droits réservés.
          </motion.div>

          {/* Liens légaux */}
          <motion.nav
            className="flex flex-wrap items-center gap-4 md:gap-6"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.12, delay: 0.2 }}
            role="navigation"
            aria-label="Liens légaux"
          >
            {legalLinks.map((link) => {
              const Icon = link.icon;
              return (
                <motion.a
                  key={link.id}
                  href={link.href}
                  className={`
                    flex items-center gap-1 text-[#AAB7C6] 
                    hover:text-white transition-colors duration-120
                    focus:outline-none focus:ring-2 focus:ring-[#3B82F6] rounded
                    ${link.disabled ? 'opacity-50 cursor-not-allowed' : ''}
                  `}
                  aria-disabled={link.disabled}
                  tabIndex={link.disabled ? -1 : 0}
                  whileHover={!link.disabled ? { scale: 1.05 } : {}}
                  whileTap={!link.disabled ? { scale: 0.95 } : {}}
                >
                  <Icon className="w-3 h-3" />
                  <span>{link.label}</span>
                  {!link.disabled && <ExternalLink className="w-3 h-3" />}
                </motion.a>
              );
            })}
          </motion.nav>
        </div>

        {/* Ligne de séparation */}
        <motion.div
          className="mt-4 pt-4 border-t border-[#222C3B]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.12, delay: 0.3 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-2 text-[#AAB7C6]">
            <p className="text-xs">
              Version 1.0.0 - Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
            </p>
            <p className="text-xs">
              Conformité RGPD en cours de développement
            </p>
          </div>
        </motion.div>

        {/* Empty state message */}
        <motion.div
          className="mt-4 text-center"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.12, delay: 0.4 }}
        >
          <p className="text-xs text-[#AAB7C6]">
            Aucun contenu légal disponible pour le moment
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
}
