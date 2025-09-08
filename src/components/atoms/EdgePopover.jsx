import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EdgePopover = ({ 
  isOpen = false,
  onClose,
  edge = null,
  position = { x: 0, y: 0 },
  className = ""
}) => {
  const [isVisible, setIsVisible] = useState(isOpen);
  const popoverRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  // Fermeture en cliquant à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        onClose?.();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Fermeture avec ESC
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose?.();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!edge) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          ref={popoverRef}
          className={`
            absolute z-60 bg-[#232B3E] border border-[#3B82F6] rounded-xl shadow-lg 
            px-6 py-3 min-w-[160px] ${className}
          `}
          style={{
            left: position.x,
            top: position.y
          }}
          role="tooltip"
          id="popover-edge-1"
          initial={{ 
            opacity: 0, 
            scale: 0.96
          }}
          animate={{ 
            opacity: 1, 
            scale: 1.03
          }}
          exit={{ 
            opacity: 0, 
            scale: 0.96
          }}
          transition={{ 
            duration: 0.1, 
            ease: [0.23, 1, 0.32, 1] 
          }}
        >
          {/* Titre */}
          <div className="font-semibold text-white mb-1">
            {edge.label || 'Relation'}
          </div>
          
          {/* Contenu */}
          <div className="text-[#AAB7C6] text-sm space-y-1">
            <div>
              <span className="font-medium">Source:</span> {edge.sourceLabel || 'Node source'}
            </div>
            <div>
              <span className="font-medium">Cible:</span> {edge.targetLabel || 'Node cible'}
            </div>
            {edge.weight && (
              <div>
                <span className="font-medium">Poids:</span> {edge.weight}
              </div>
            )}
            {edge.type && (
              <div>
                <span className="font-medium">Type:</span> {edge.type}
              </div>
            )}
            {edge.createdAt && (
              <div>
                <span className="font-medium">Créé:</span> {new Date(edge.createdAt).toLocaleDateString()}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EdgePopover;
