import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DetailPanel = ({ 
  isOpen = false,
  onClose,
  node = null,
  className = ""
}) => {
  const [isVisible, setIsVisible] = useState(isOpen);
  const panelRef = useRef(null);
  const previousActiveElement = useRef(null);

  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement;
      setIsVisible(true);
      
      // Focus sur le titre à l'ouverture
      setTimeout(() => {
        const title = panelRef.current?.querySelector('h2');
        if (title) {
          title.focus();
        }
      }, 200);
    } else {
      setIsVisible(false);
      // Restaurer le focus
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    }
  }, [isOpen]);

  // Focus trap
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose?.();
        return;
      }

      if (event.key === 'Tab' && panelRef.current) {
        const focusableElements = panelRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement?.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement?.focus();
          }
        }
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleClose = () => {
    onClose?.();
  };

  const handleEdit = () => {
    console.log('Éditer le node:', node?.id);
  };

  const handleDelete = () => {
    console.log('Supprimer le node:', node?.id);
    onClose?.();
  };

  if (!node) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Overlay mobile */}
          <motion.div
            className="fixed inset-0 bg-black/60 z-30 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12, ease: [0.23, 1, 0.32, 1] }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.aside
            ref={panelRef}
            className={`
              fixed right-0 top-0 h-full w-[400px] max-w-full bg-[#232B3E] border-l-2 border-[#3B82F6] 
              shadow-2xl z-40 md:w-[400px] w-full ${className}
            `}
            role="region"
            aria-label="Détail du node"
            aria-live="polite"
            tabIndex="-1"
            initial={{ 
              x: '100%',
              opacity: 0.7
            }}
            animate={{ 
              x: 0,
              opacity: 1
            }}
            exit={{ 
              x: '100%',
              opacity: 0.7
            }}
            transition={{ 
              duration: 0.18, 
              ease: [0.23, 1, 0.32, 1] 
            }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-8 py-7 border-b border-[#222C3B] sticky top-0 bg-[#232B3E] z-10">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                style={{ 
                  background: node.color,
                  boxShadow: `0 2px 16px 0 ${node.color}40`
                }}
              >
                {node.label?.charAt(0)?.toUpperCase() || 'N'}
              </div>
              <h2 
                className="text-lg font-bold text-white truncate flex-1"
                tabIndex={0}
              >
                {node.label || 'Node sans nom'}
              </h2>
              <motion.button
                className="w-10 h-10 rounded-full flex items-center justify-center text-[#AAB7C6] 
                           hover:bg-[#222C3B] hover:text-white transition-all duration-90
                           focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
                onClick={handleClose}
                aria-label="Fermer le panel"
                whileHover={{ 
                  scale: 1.08,
                  transition: { duration: 0.09, ease: [0.23, 1, 0.32, 1] }
                }}
                whileTap={{ 
                  scale: 0.95,
                  transition: { duration: 0.06, ease: [0.23, 1, 0.32, 1] }
                }}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
                  <path 
                    stroke="currentColor" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M6 18L18 6M6 6l12 12" 
                  />
                </svg>
              </motion.button>
            </div>

            {/* Body */}
            <div className="flex flex-col gap-6 px-8 py-6 overflow-y-auto h-[calc(100vh-120px)]">
              {/* Stats du node */}
              <dl className="flex flex-col gap-3 text-[#AAB7C6]">
                <div className="flex gap-3">
                  <dt className="font-semibold w-32">Type</dt>
                  <dd className="text-white">{node.type || 'Non défini'}</dd>
                </div>
                <div className="flex gap-3">
                  <dt className="font-semibold w-32">Relations</dt>
                  <dd className="text-white">{node.edges?.length || 0}</dd>
                </div>
                <div className="flex gap-3">
                  <dt className="font-semibold w-32">Groupe</dt>
                  <dd className="text-white">{node.group || 'Par défaut'}</dd>
                </div>
                <div className="flex gap-3">
                  <dt className="font-semibold w-32">Taille</dt>
                  <dd className="text-white">{node.size || 36}px</dd>
                </div>
                {node.weight && (
                  <div className="flex gap-3">
                    <dt className="font-semibold w-32">Poids</dt>
                    <dd className="text-white">{node.weight}</dd>
                  </div>
                )}
                {node.createdAt && (
                  <div className="flex gap-3">
                    <dt className="font-semibold w-32">Créé le</dt>
                    <dd className="text-white">{new Date(node.createdAt).toLocaleDateString()}</dd>
                  </div>
                )}
              </dl>

              {/* Description */}
              {node.description && (
                <div className="mt-4">
                  <h3 className="text-sm font-semibold text-[#F1F5F9] mb-2">Description</h3>
                  <p className="text-[#AAB7C6] text-sm leading-relaxed">
                    {node.description}
                  </p>
                </div>
              )}

              {/* Relations */}
              {node.edges && node.edges.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-sm font-semibold text-[#F1F5F9] mb-3">Relations</h3>
                  <div className="space-y-2">
                    {node.edges.map((edge, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-[#222C3B] rounded-lg">
                        <div className="w-2 h-2 rounded-full bg-[#3B82F6]" />
                        <span className="text-[#AAB7C6] text-sm">{edge.targetLabel || `Relation ${index + 1}`}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-2 mt-6">
                <motion.button
                  className="px-4 py-2 rounded-xl bg-[#3B82F6] text-white font-semibold 
                             hover:bg-[#2563eb] transition-colors focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
                  onClick={handleEdit}
                  whileHover={{ 
                    scale: 1.02,
                    transition: { duration: 0.08, ease: [0.23, 1, 0.32, 1] }
                  }}
                  whileTap={{ 
                    scale: 0.98,
                    transition: { duration: 0.06, ease: [0.23, 1, 0.32, 1] }
                  }}
                >
                  Éditer
                </motion.button>
                <motion.button
                  className="px-4 py-2 rounded-xl bg-[#EF4444] text-white font-semibold 
                             hover:bg-[#dc2626] transition-colors focus-visible:ring-2 focus-visible:ring-[#EF4444]"
                  onClick={handleDelete}
                  whileHover={{ 
                    scale: 1.02,
                    transition: { duration: 0.08, ease: [0.23, 1, 0.32, 1] }
                  }}
                  whileTap={{ 
                    scale: 0.98,
                    transition: { duration: 0.06, ease: [0.23, 1, 0.32, 1] }
                  }}
                >
                  Supprimer
                </motion.button>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default DetailPanel;
