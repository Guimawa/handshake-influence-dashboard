import { useEffect, useRef, useCallback } from 'react';
import { useAnimation } from '../context/AnimationContext';

/**
 * Timeline Hook - Gère la timeline ms par ms selon les directives
 * T=0ms à T=300ms avec event loop détaillé
 */
export const useTimeline = () => {
  const { state, actions } = useAnimation();
  const timelineRef = useRef(null);
  const rafRef = useRef(null);
  
  // Timeline ms par ms selon les directives
  const timeline = {
    // T=0ms - Premier paint blanc pur
    0: () => {
      document.body.style.background = '#fff';
      actions.updateTimeline('t0', true);
    },
    
    // T=10ms - Logo fade-in
    10: () => {
      const logo = document.querySelector('.sidebar-logo');
      if (logo) {
        logo.classList.add('animate-logo-fade-in');
        actions.updateTimeline('t10', true);
      }
    },
    
    // T=22ms - Icône #1 dashboard
    22: () => {
      const dashboardIcon = document.querySelector('.sidebar-icon-dashboard');
      if (dashboardIcon) {
        dashboardIcon.style.animationDelay = '0ms';
        dashboardIcon.classList.add('animate-icon-slide-up');
        actions.updateTimeline('t22', true);
      }
    },
    
    // T=34ms - Icône #2 projects
    34: () => {
      const projectsIcon = document.querySelector('.sidebar-icon-projects');
      if (projectsIcon) {
        projectsIcon.style.animationDelay = '12ms';
        projectsIcon.classList.add('animate-icon-slide-up');
        actions.updateTimeline('t34', true);
      }
    },
    
    // T=46ms - Icône #3 team
    46: () => {
      const teamIcon = document.querySelector('.sidebar-icon-team');
      if (teamIcon) {
        teamIcon.style.animationDelay = '24ms';
        teamIcon.classList.add('animate-icon-slide-up');
        actions.updateTimeline('t46', true);
      }
    },
    
    // T=58ms - Icône #4 reports
    58: () => {
      const reportsIcon = document.querySelector('.sidebar-icon-reports');
      if (reportsIcon) {
        reportsIcon.style.animationDelay = '36ms';
        reportsIcon.classList.add('animate-icon-slide-up');
        actions.updateTimeline('t58', true);
      }
    },
    
    // T=70ms - Topbar fade-in
    70: () => {
      const topbar = document.querySelector('.topbar');
      if (topbar) {
        topbar.classList.add('animate-topbar-fade-in');
        actions.updateTimeline('t70', true);
      }
    },
    
    // T=85ms - Cards spring animation
    85: () => {
      const cards = document.querySelectorAll('.card');
      cards.forEach((card, index) => {
        const delay = index * 15; // Stagger de 15ms par card
        card.style.animationDelay = `${delay}ms`;
        
        if (index === 0) {
          card.classList.add('animate-card-spring-1');
        } else if (index === 1) {
          card.classList.add('animate-card-spring-2');
        } else {
          card.classList.add('animate-card-spring-3');
        }
      });
      actions.updateTimeline('t85', true);
    },
    
    // T=100ms - Avatars bounce
    100: () => {
      const avatars = document.querySelectorAll('.avatar');
      avatars.forEach((avatar, index) => {
        const delay = index * 8; // Stagger de 8ms par avatar
        avatar.style.animationDelay = `${delay}ms`;
        avatar.classList.add('animate-avatar-bounce');
      });
      actions.updateTimeline('t100', true);
    },
    
    // T=120ms - Micro-interactions ready
    120: () => {
      actions.setPhase('micro-interactions');
      actions.updateTimeline('t120', true);
      
      // Activation des hover states
      document.body.classList.add('micro-interactions-ready');
    },
    
    // T=150ms - Transition vers actions
    150: () => {
      actions.setPhase('actions');
    },
    
    // T=200ms - UX Fine Tuning ready
    200: () => {
      actions.setPhase('ux-tuning');
    }
  };
  
  // Exécution de la timeline
  const executeTimeline = useCallback(() => {
    if (!timelineRef.current) return;
    
    const startTime = performance.now();
    
    const executeFrame = (currentTime) => {
      const elapsed = currentTime - startTime;
      
      // Exécution des étapes de la timeline
      Object.entries(timeline).forEach(([time, callback]) => {
        const targetTime = parseInt(time);
        if (elapsed >= targetTime && !state.timeline[`t${targetTime}`]) {
          callback();
        }
      });
      
      // Continue jusqu'à ce que toutes les étapes soient terminées
      const allComplete = Object.values(state.timeline).every(complete => complete);
      if (!allComplete && elapsed < 300) {
        rafRef.current = requestAnimationFrame(executeFrame);
      } else {
        // Timeline terminée
        actions.setPhase('complete');
        document.body.classList.add('dashboard-ready');
        document.body.classList.remove('dashboard-initialization');
      }
    };
    
    rafRef.current = requestAnimationFrame(executeFrame);
  }, [state.timeline, actions]);
  
  // Démarrage de la timeline
  useEffect(() => {
    if (state.preloadComplete && !state.isInitialized) {
      // Phase 1 terminée, démarrage Phase 2
      actions.setInitialized();
      executeTimeline();
    }
  }, [state.preloadComplete, state.isInitialized, executeTimeline, actions]);
  
  // Nettoyage
  useEffect(() => {
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);
  
  return {
    timeline: state.timeline,
    currentPhase: state.currentPhase,
    isComplete: state.currentPhase === 'complete'
  };
};

/**
 * Hook pour les micro-interactions spécifiques
 */
export const useMicroInteractions = () => {
  const { state, actions } = useAnimation();
  
  // Sidebar hover
  const handleSidebarHover = useCallback((element, isHovering) => {
    if (state.currentPhase !== 'micro-interactions') return;
    
    actions.setHoverState('sidebar', element, isHovering);
    
    if (isHovering) {
      // Scale 1.0→1.12, glow, scanline
      const elementRef = document.querySelector(`.sidebar-icon-${element}`);
      if (elementRef) {
        elementRef.style.transform = 'scale(1.12)';
        elementRef.style.filter = 'drop-shadow(0 0 6px #aee7ff)';
        elementRef.classList.add('animate-scanline');
      }
    } else {
      // Reset
      const elementRef = document.querySelector(`.sidebar-icon-${element}`);
      if (elementRef) {
        elementRef.style.transform = 'scale(1)';
        elementRef.style.filter = 'none';
        elementRef.classList.remove('animate-scanline');
      }
      actions.clearHoverState('sidebar', element);
    }
  }, [state.currentPhase, actions]);
  
  // Notification bell pulse
  const handleNotificationPulse = useCallback(() => {
    if (state.currentPhase !== 'micro-interactions') return;
    
    const bell = document.querySelector('.notification-bell');
    if (bell) {
      bell.classList.add('animate-badge-pulse');
    }
  }, [state.currentPhase]);
  
  // Card hover
  const handleCardHover = useCallback((cardId, isHovering) => {
    if (state.currentPhase !== 'micro-interactions') return;
    
    actions.setHoverState('cards', cardId, isHovering);
    
    const card = document.querySelector(`.card-${cardId}`);
    if (card) {
      if (isHovering) {
        card.style.boxShadow = '0 8px 32px rgba(36, 145, 255, 0.15)';
        card.style.transform = 'scale(1.02)';
      } else {
        card.style.boxShadow = 'var(--shadow-card)';
        card.style.transform = 'scale(1)';
      }
    }
  }, [state.currentPhase, actions]);
  
  return {
    handleSidebarHover,
    handleNotificationPulse,
    handleCardHover,
    hoverStates: state.hoverStates
  };
};
