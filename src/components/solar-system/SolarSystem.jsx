import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, FileText, Folder, Image } from 'lucide-react';
import { DetailPanel } from './DetailPanel';

export function SolarSystem({ 
  isMobile = false,
  onOpenDetailPanel
}) {
  const [satellites, setSatellites] = useState([]);
  const [showAddButton, setShowAddButton] = useState(false);
  const [isMainBubbleHovered, setIsMainBubbleHovered] = useState(false);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [selectedBubble, setSelectedBubble] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const mainBubbleRef = useRef(null);
  const containerRef = useRef(null);

  // Palette exacte selon cahier des charges
  const satelliteColors = [
    '#4EE2EC', // Cyan vif
    '#B276F9', // Violet doux
    '#FFE570', // Jaune pale
    '#F687C9', // Rose clair
    '#5773FF', // Bleu moyen
    '#FFD3A5', // Orange pastel
  ];

  // Génération des satellites selon spécifications
  const generateSatellites = (count) => {
    const newSatellites = [];
    const maxVisible = 8;
    const visibleCount = Math.min(count, maxVisible);
    const radius = Math.min(180 + (visibleCount - 2) * 15, 290); // 180px à 290px selon nombre
    const angleStep = (2 * Math.PI) / visibleCount;
    
    for (let i = 0; i < visibleCount; i++) {
      const angle = i * angleStep;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      
      newSatellites.push({
        id: `satellite-${i}`,
        x,
        y,
        color: satelliteColors[i % satelliteColors.length],
        label: `Projet ${i + 1}`,
        delay: i * 60, // 60ms de retard par bulle
        rotation: (Math.random() - 0.5) * 12, // ±6° rotation aléatoire
        isLastVisible: i === visibleCount - 1 && count > maxVisible,
        hiddenCount: count > maxVisible ? count - maxVisible : 0
      });
    }
    
    return newSatellites;
  };

  // Gestion du double-clic sur bulle principale selon cahier des charges
  const handleMainBubbleDoubleClick = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    // Génération de 2-8 satellites selon spécifications
    const newCount = Math.min(satellites.length + 2, 8);
    const newSatellites = generateSatellites(newCount);
    
    setSatellites(newSatellites);
    
    // Animation terminée après le délai de la dernière bulle + 200ms
    setTimeout(() => {
      setIsAnimating(false);
    }, newSatellites.length * 60 + 200);
  };

  // Gestion du clic sur satellite
  const handleSatelliteClick = (satellite) => {
    setSelectedBubble(satellite);
    setShowDetailPanel(true);
    if (onOpenDetailPanel) onOpenDetailPanel(satellite);
  };

  // Gestion de la fermeture du panel
  const handleClosePanel = () => {
    setShowDetailPanel(false);
    setSelectedBubble(null);
  };

  // Gestion du clic sur bouton +
  const handleAddClick = (e) => {
    e.stopPropagation();
    // Logique d'ajout de nouveau projet
    console.log('Ajouter nouveau projet');
  };

  // Gestion ESC
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        handleClosePanel();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center overflow-hidden"
      style={{
        background: 'radial-gradient(circle, #181A20 0%, #212837 100%)',
        minHeight: '75vh',
        paddingTop: '7vh',
        paddingBottom: '7vh'
      }}
    >
      {/* Texture grain overlay */}
      <div 
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          pointerEvents: 'none'
        }}
      />

      {/* Zone active centrale (cloud) */}
      <div 
        className="relative flex items-center justify-center"
        style={{
          width: '70%',
          height: '75%',
          maxWidth: '70vw',
          maxHeight: '75vh'
        }}
      >
        {/* Bulle principale */}
        <motion.div
          ref={mainBubbleRef}
          className="relative cursor-pointer select-none"
          style={{
            width: isMobile ? '104px' : '192px',
            height: isMobile ? '104px' : '192px',
          }}
          onDoubleClick={handleMainBubbleDoubleClick}
          onMouseEnter={() => {
            setIsMainBubbleHovered(true);
            setShowAddButton(true);
          }}
          onMouseLeave={() => {
            setIsMainBubbleHovered(false);
            setShowAddButton(false);
          }}
          onFocus={() => {
            setIsMainBubbleHovered(true);
            setShowAddButton(true);
          }}
          onBlur={() => {
            setIsMainBubbleHovered(false);
            setShowAddButton(false);
          }}
          role="button"
          tabIndex={0}
          aria-label="Bulle principale - Double-clic pour déployer les satellites"
          // Animation idle pulse
          animate={{
            scale: [1, 1.04, 1],
          }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            ease: [0.56, 0.04, 0.24, 1]
          }}
          whileHover={{
            scale: 1.06,
            transition: { duration: 0.12, ease: 'easeOut' }
          }}
          whileTap={{
            scale: 0.98,
            transition: { duration: 0.08 }
          }}
        >
          {/* Glow externe */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: '#46B8EA',
              opacity: isMainBubbleHovered ? 0.49 : 0.24, // +25% au hover
              filter: 'blur(38px)',
              transform: 'scale(1)'
            }}
            animate={{
              opacity: isMainBubbleHovered ? 0.49 : [0.24, 0.26, 0.24],
            }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              ease: [0.56, 0.04, 0.24, 1]
            }}
          />

          {/* Bulle principale */}
          <div
            className="relative w-full h-full rounded-full flex items-center justify-center"
            style={{
              background: 'radial-gradient(circle, #46B8EA 0%, #15203A 100%)',
              boxShadow: '0 8px 28px rgba(0, 0, 0, 0.18)'
            }}
          >
            {/* Texte */}
            <span
              className="text-white font-bold text-center"
              style={{
                fontSize: isMobile ? '0.875rem' : '1.25rem',
                letterSpacing: '0.01em',
                textShadow: '0 2px 12px rgba(0, 0, 0, 0.6)',
                fontFamily: 'Inter, sans-serif'
              }}
            >
              Projet
            </span>
          </div>

          {/* Bouton + en overlay */}
          <AnimatePresence>
            {showAddButton && (
              <motion.button
                className="absolute -top-6 -right-6 w-11 h-11 rounded-full flex items-center justify-center border-2 focus:outline-none focus:ring-2 focus:ring-[#7DE3F4]"
                style={{
                  background: 'rgba(35, 43, 62, 0.8)',
                  borderColor: '#46B8EA',
                  boxShadow: '0 2px 12px rgba(70, 184, 234, 0.27)'
                }}
                onClick={handleAddClick}
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.6, opacity: 0 }}
                transition={{ duration: 0.09, ease: 'easeOut' }}
                aria-label="Ajouter un nouveau projet"
                tabIndex={0}
              >
                <Plus className="w-6 h-6 text-white" />
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Satellites */}
        <AnimatePresence>
          {satellites.map((satellite, index) => (
            <motion.div
              key={satellite.id}
              className="absolute cursor-pointer select-none"
              style={{
                left: '50%',
                top: '50%',
                transform: `translate(-50%, -50%) translate(${satellite.x}px, ${satellite.y}px)`,
                width: isMobile ? '52px' : '96px',
                height: isMobile ? '52px' : '96px',
              }}
              initial={{ 
                scale: 0.5, 
                opacity: 0,
                x: 0,
                y: 0
              }}
              animate={{ 
                scale: [1, 1.05, 1], 
                opacity: 1,
                x: satellite.x,
                y: satellite.y,
                rotate: [satellite.rotation, satellite.rotation + 3, satellite.rotation - 3, satellite.rotation]
              }}
              exit={{ 
                scale: 0.5, 
                opacity: 0 
              }}
              transition={{
                delay: satellite.delay / 1000,
                duration: 0.2,
                ease: 'easeOut',
                scale: {
                  duration: 1.8,
                  repeat: Infinity,
                  ease: [0.6, 0.14, 0.19, 1]
                },
                rotate: {
                  duration: 2,
                  repeat: Infinity,
                  ease: 'ease-in-out'
                }
              }}
              onClick={() => handleSatelliteClick(satellite)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = `translate(-50%, -50%) translate(${satellite.x}px, ${satellite.y}px) scale(1.09)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = `translate(-50%, -50%) translate(${satellite.x}px, ${satellite.y}px) scale(1)`;
              }}
              role="button"
              tabIndex={0}
              aria-label={`Satellite ${satellite.label} - Cliquer pour ouvrir`}
            >
              {/* Glow satellite */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: satellite.color,
                  opacity: 0.15,
                  filter: 'blur(20px)',
                  transform: 'scale(1.2)'
                }}
              />

              {/* Bulle satellite */}
              <div
                className="relative w-full h-full rounded-full flex items-center justify-center"
                style={{
                  background: `radial-gradient(circle, ${satellite.color} 0%, ${satellite.color}DD 100%)`,
                  boxShadow: `0 4px 16px ${satellite.color}44`
                }}
              >
                {/* Texte satellite */}
                <span
                  className="text-white font-semibold text-center"
                  style={{
                    fontSize: isMobile ? '0.75rem' : '1.05rem',
                    textShadow: '0 1px 6px rgba(0, 0, 0, 0.5)',
                    fontFamily: 'Inter, sans-serif'
                  }}
                >
                  {satellite.label}
                </span>
              </div>

              {/* Bouton + pour sous-bulle ou badge +X */}
              {satellite.isLastVisible && satellite.hiddenCount > 0 ? (
                <motion.div
                  className="absolute -top-6 -right-6 w-7 h-7 rounded-full flex items-center justify-center border-2"
                  style={{
                    background: 'rgba(35, 43, 62, 0.9)',
                    borderColor: satellite.color,
                    boxShadow: `0 2px 8px ${satellite.color}44`
                  }}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: satellite.delay / 1000 + 0.1 }}
                >
                  <span className="text-white text-xs font-bold">
                    +{satellite.hiddenCount}
                  </span>
                </motion.div>
              ) : (
                <motion.button
                  className="absolute -top-6 -right-6 w-7 h-7 rounded-full flex items-center justify-center border-2 focus:outline-none focus:ring-2 focus:ring-[#7DE3F4]"
                  style={{
                    background: 'rgba(35, 43, 62, 0.8)',
                    borderColor: satellite.color,
                    boxShadow: `0 2px 8px ${satellite.color}44`
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log(`Ajouter sous-projet à ${satellite.label}`);
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={`Ajouter un sous-projet à ${satellite.label}`}
                  tabIndex={0}
                >
                  <Plus className="w-4 h-4 text-white" />
                </motion.button>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Traits de liaison */}
        <svg
          className="absolute inset-0 pointer-events-none"
          style={{ width: '100%', height: '100%' }}
        >
          {satellites.map((satellite, index) => (
            <motion.line
              key={`line-${satellite.id}`}
              x1="50%"
              y1="50%"
              x2={`${50 + (satellite.x / 10)}%`}
              y2={`${50 + (satellite.y / 10)}%`}
              stroke="#4EE2EC"
              strokeWidth={isMobile ? 2 : 3}
              style={{
                filter: 'drop-shadow(0 0 6px #4EE2EC99)'
              }}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                delay: satellite.delay / 1000,
                duration: 0.3,
                ease: 'easeOut'
              }}
            />
          ))}
        </svg>
      </div>

      {/* Panel de détail ZONE 2 - Ultra précis selon cahier des charges */}
      <DetailPanel
        isOpen={showDetailPanel}
        onClose={handleClosePanel}
        selectedBubble={selectedBubble}
        isMobile={isMobile}
      />
    </div>
  );
}
