import { useEffect, useState, useCallback } from 'react';

/**
 * Layout Observer Hook - Surveille la résolution, le device pixel ratio
 * Ajuste la densité et la taille du texte pour sharpness maximal
 */
export const useLayoutObserver = () => {
  const [layoutState, setLayoutState] = useState({
    devicePixelRatio: window.devicePixelRatio || 1,
    textScale: 1,
    densityScale: 1,
    isHighDPI: false,
    isMobile: false,
    isTablet: false,
    isDesktop: false
  });

  const updateLayoutState = useCallback(() => {
    const dpr = window.devicePixelRatio || 1;
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    // Calcul du scale de texte basé sur la résolution
    let textScale = 1;
    if (dpr >= 2) {
      textScale = 0.9; // Réduire légèrement sur écrans haute densité
    } else if (dpr >= 1.5) {
      textScale = 0.95;
    }
    
    // Calcul du scale de densité
    let densityScale = 1;
    if (width < 768) {
      densityScale = 0.9; // Mobile
    } else if (width < 1024) {
      densityScale = 0.95; // Tablet
    }
    
    setLayoutState({
      devicePixelRatio: dpr,
      textScale,
      densityScale,
      isHighDPI: dpr >= 2,
      isMobile: width < 768,
      isTablet: width >= 768 && width < 1024,
      isDesktop: width >= 1024
    });
  }, []);

  useEffect(() => {
    // Mise à jour initiale
    updateLayoutState();
    
    // Écoute des changements de résolution
    window.addEventListener('resize', updateLayoutState);
    window.addEventListener('orientationchange', updateLayoutState);
    
    // Écoute des changements de device pixel ratio
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(min-resolution: 2dppx)');
      mediaQuery.addEventListener('change', updateLayoutState);
    }
    
    return () => {
      window.removeEventListener('resize', updateLayoutState);
      window.removeEventListener('orientationchange', updateLayoutState);
      if (window.matchMedia) {
        const mediaQuery = window.matchMedia('(min-resolution: 2dppx)');
        mediaQuery.removeEventListener('change', updateLayoutState);
      }
    };
  }, [updateLayoutState]);

  return layoutState;
};

/**
 * Stagger Map Hook - Calcule les delays d'animation selon la position spatiale
 */
export const useStaggerMap = (elementRefs) => {
  const [staggerDelays, setStaggerDelays] = useState({});
  
  const calculateStaggerDelays = useCallback(() => {
    if (!elementRefs || elementRefs.length === 0) return;
    
    const delays = {};
    elementRefs.forEach((ref, index) => {
      if (ref && ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const baseDelay = 10; // ms
        const positionDelay = Math.floor(rect.top / 50) * 5; // Délai basé sur la position Y
        const indexDelay = index * 12; // Délai basé sur l'index
        
        delays[ref.current.id || `element-${index}`] = baseDelay + positionDelay + indexDelay;
      }
    });
    
    setStaggerDelays(delays);
  }, [elementRefs]);
  
  useEffect(() => {
    calculateStaggerDelays();
  }, [calculateStaggerDelays]);
  
  return staggerDelays;
};

/**
 * Idle Mode Hook - Gère le mode idle après 10 minutes d'inactivité
 */
export const useIdleMode = (idleTimeout = 600000) => { // 10 minutes par défaut
  const [isIdle, setIsIdle] = useState(false);
  const [lastActivity, setLastActivity] = useState(Date.now());
  
  const resetIdle = useCallback(() => {
    setLastActivity(Date.now());
    if (isIdle) {
      setIsIdle(false);
      // Wake-up pulse sur tous les composants
      document.body.classList.add('animate-wake-up-pulse');
      setTimeout(() => {
        document.body.classList.remove('animate-wake-up-pulse');
      }, 300);
    }
  }, [isIdle]);
  
  useEffect(() => {
    const checkIdle = () => {
      const now = Date.now();
      if (now - lastActivity > idleTimeout && !isIdle) {
        setIsIdle(true);
        document.body.classList.add('idle-mode');
      }
    };
    
    const interval = setInterval(checkIdle, 1000); // Vérifie chaque seconde
    
    return () => clearInterval(interval);
  }, [lastActivity, idleTimeout, isIdle]);
  
  useEffect(() => {
    // Écoute de l'activité utilisateur
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    
    events.forEach(event => {
      document.addEventListener(event, resetIdle, true);
    });
    
    return () => {
      events.forEach(event => {
        document.removeEventListener(event, resetIdle, true);
      });
    };
  }, [resetIdle]);
  
  return { isIdle, resetIdle };
};
