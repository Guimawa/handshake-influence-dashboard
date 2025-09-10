import { motion } from 'framer-motion';

const Breadcrumb = ({ 
  items = [],
  separator = "chevron",
  className = ""
}) => {
  const getSeparator = () => {
    switch (separator) {
      case 'slash':
        return '/';
      case 'arrow':
        return '→';
      case 'dot':
        return '•';
      default:
        return (
          <svg className="w-4 h-4 text-[#AAB7C6] mx-1" aria-hidden="true" fill="none" viewBox="0 0 24 24">
            <path 
              stroke="currentColor" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M9 5l7 7-7 7" 
            />
          </svg>
        );
    }
  };

  if (items.length === 0) return null;

  return (
    <motion.nav
      className={`flex items-center gap-2 text-[#AAB7C6] text-sm ${className}`}
      aria-label="Fil d'Ariane"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.08, ease: [0.23, 1, 0.32, 1] }}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const isActive = item.active || isLast;

        return (
          <motion.div
            key={item.id || index}
            className="flex items-center gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.08, 
              delay: index * 0.05,
              ease: [0.23, 1, 0.32, 1] 
            }}
          >
            {index > 0 && (
              <span className="text-[#AAB7C6]">
                {getSeparator()}
              </span>
            )}

            {isActive ? (
              <span 
                className="font-bold text-white"
                aria-current="page"
              >
                {item.label}
              </span>
            ) : (
              <motion.a
                href={item.href || '#'}
                className="hover:text-[#3B82F6] transition-colors duration-120 relative
                           focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:outline-none
                           rounded px-1 py-0.5"
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.12, ease: [0.23, 1, 0.32, 1] }
                }}
                whileTap={{ 
                  scale: 0.98,
                  transition: { duration: 0.08, ease: [0.23, 1, 0.32, 1] }
                }}
                onMouseEnter={(e) => {
                  // Ajouter underline subtile au hover
                  e.target.style.textDecoration = 'underline';
                  e.target.style.textDecorationThickness = '1px';
                  e.target.style.textUnderlineOffset = '2px';
                }}
                onMouseLeave={(e) => {
                  e.target.style.textDecoration = 'none';
                }}
              >
                {item.label}
              </motion.a>
            )}
          </motion.div>
        );
      })}
    </motion.nav>
  );
};

export default Breadcrumb;