import React, { createContext, useContext, useReducer, useEffect } from 'react';

/**
 * Animation Context - Gère l'état global des animations et transitions
 * Suit la timeline ms par ms selon les directives
 */

// État initial
const initialState = {
  // Phase 1 - Initialisation
  isInitialized: false,
  preloadComplete: false,
  
  // Phase 2 - Rendu
  currentPhase: 'initialization', // initialization, rendering, micro-interactions, actions, ux-tuning
  timeline: {
    t0: false, // Premier paint blanc
    t10: false, // Sidebar logo fade-in
    t22: false, // Icône #1 dashboard
    t34: false, // Icône #2 projects
    t46: false, // Icône #3 team
    t58: false, // Icône #4 reports
    t70: false, // Topbar fade-in
    t85: false, // Main content cards
    t100: false, // Avatars bounce
    t120: false, // Micro-interactions ready
  },
  
  // Phase 3 - Micro-interactions
  hoverStates: {
    sidebar: {},
    topbar: {},
    cards: {},
    buttons: {}
  },
  
  // Phase 4 - Actions/Modales
  modals: {
    newProject: {
      isOpen: false,
      isAnimating: false,
      formState: 'idle', // idle, validating, submitting, success, error
      fields: {
        name: { value: '', isValid: false, isTouched: false },
        description: { value: '', isValid: false, isTouched: false },
        category: { value: '', isValid: false, isTouched: false }
      }
    }
  },
  
  // Phase 5 - UX Fine Tuning
  idleMode: false,
  wakeUpPulse: false,
  performanceMode: 'normal', // normal, fast, slow
  
  // Notifications/Toasts
  toasts: [],
  
  // Layout state
  layout: {
    devicePixelRatio: 1,
    textScale: 1,
    densityScale: 1,
    isHighDPI: false,
    isMobile: false,
    isTablet: false,
    isDesktop: false
  }
};

// Actions
const ANIMATION_ACTIONS = {
  // Phase 1
  SET_INITIALIZED: 'SET_INITIALIZED',
  SET_PRELOAD_COMPLETE: 'SET_PRELOAD_COMPLETE',
  
  // Phase 2
  SET_PHASE: 'SET_PHASE',
  UPDATE_TIMELINE: 'UPDATE_TIMELINE',
  
  // Phase 3
  SET_HOVER_STATE: 'SET_HOVER_STATE',
  CLEAR_HOVER_STATE: 'CLEAR_HOVER_STATE',
  
  // Phase 4
  OPEN_MODAL: 'OPEN_MODAL',
  CLOSE_MODAL: 'CLOSE_MODAL',
  UPDATE_FORM_FIELD: 'UPDATE_FORM_FIELD',
  VALIDATE_FORM: 'VALIDATE_FORM',
  SUBMIT_FORM: 'SUBMIT_FORM',
  
  // Phase 5
  SET_IDLE_MODE: 'SET_IDLE_MODE',
  TRIGGER_WAKE_UP: 'TRIGGER_WAKE_UP',
  SET_PERFORMANCE_MODE: 'SET_PERFORMANCE_MODE',
  
  // Notifications
  ADD_TOAST: 'ADD_TOAST',
  REMOVE_TOAST: 'REMOVE_TOAST',
  
  // Layout
  UPDATE_LAYOUT: 'UPDATE_LAYOUT'
};

// Reducer
function animationReducer(state, action) {
  switch (action.type) {
    case ANIMATION_ACTIONS.SET_INITIALIZED:
      return {
        ...state,
        isInitialized: true
      };
      
    case ANIMATION_ACTIONS.SET_PRELOAD_COMPLETE:
      return {
        ...state,
        preloadComplete: true
      };
      
    case ANIMATION_ACTIONS.SET_PHASE:
      return {
        ...state,
        currentPhase: action.payload
      };
      
    case ANIMATION_ACTIONS.UPDATE_TIMELINE:
      return {
        ...state,
        timeline: {
          ...state.timeline,
          [action.payload.key]: action.payload.value
        }
      };
      
    case ANIMATION_ACTIONS.SET_HOVER_STATE:
      return {
        ...state,
        hoverStates: {
          ...state.hoverStates,
          [action.payload.component]: {
            ...state.hoverStates[action.payload.component],
            [action.payload.element]: action.payload.state
          }
        }
      };
      
    case ANIMATION_ACTIONS.CLEAR_HOVER_STATE:
      return {
        ...state,
        hoverStates: {
          ...state.hoverStates,
          [action.payload.component]: {
            ...state.hoverStates[action.payload.component],
            [action.payload.element]: false
          }
        }
      };
      
    case ANIMATION_ACTIONS.OPEN_MODAL:
      return {
        ...state,
        modals: {
          ...state.modals,
          [action.payload.modal]: {
            ...state.modals[action.payload.modal],
            isOpen: true,
            isAnimating: true
          }
        }
      };
      
    case ANIMATION_ACTIONS.CLOSE_MODAL:
      return {
        ...state,
        modals: {
          ...state.modals,
          [action.payload.modal]: {
            ...state.modals[action.payload.modal],
            isOpen: false,
            isAnimating: true
          }
        }
      };
      
    case ANIMATION_ACTIONS.UPDATE_FORM_FIELD:
      return {
        ...state,
        modals: {
          ...state.modals,
          [action.payload.modal]: {
            ...state.modals[action.payload.modal],
            fields: {
              ...state.modals[action.payload.modal].fields,
              [action.payload.field]: {
                ...state.modals[action.payload.modal].fields[action.payload.field],
                ...action.payload.updates
              }
            }
          }
        }
      };
      
    case ANIMATION_ACTIONS.VALIDATE_FORM:
      return {
        ...state,
        modals: {
          ...state.modals,
          [action.payload.modal]: {
            ...state.modals[action.payload.modal],
            formState: action.payload.state
          }
        }
      };
      
    case ANIMATION_ACTIONS.SUBMIT_FORM:
      return {
        ...state,
        modals: {
          ...state.modals,
          [action.payload.modal]: {
            ...state.modals[action.payload.modal],
            formState: 'submitting'
          }
        }
      };
      
    case ANIMATION_ACTIONS.SET_IDLE_MODE:
      return {
        ...state,
        idleMode: action.payload
      };
      
    case ANIMATION_ACTIONS.TRIGGER_WAKE_UP:
      return {
        ...state,
        wakeUpPulse: true,
        idleMode: false
      };
      
    case ANIMATION_ACTIONS.SET_PERFORMANCE_MODE:
      return {
        ...state,
        performanceMode: action.payload
      };
      
    case ANIMATION_ACTIONS.ADD_TOAST:
      return {
        ...state,
        toasts: [...state.toasts, { ...action.payload, id: Date.now() }]
      };
      
    case ANIMATION_ACTIONS.REMOVE_TOAST:
      return {
        ...state,
        toasts: state.toasts.filter(toast => toast.id !== action.payload)
      };
      
    case ANIMATION_ACTIONS.UPDATE_LAYOUT:
      return {
        ...state,
        layout: { ...state.layout, ...action.payload }
      };
      
    default:
      return state;
  }
}

// Context
const AnimationContext = createContext();

// Provider
export function AnimationProvider({ children }) {
  const [state, dispatch] = useReducer(animationReducer, initialState);
  
  // Actions creators
  const actions = {
    setInitialized: () => dispatch({ type: ANIMATION_ACTIONS.SET_INITIALIZED }),
    setPreloadComplete: () => dispatch({ type: ANIMATION_ACTIONS.SET_PRELOAD_COMPLETE }),
    setPhase: (phase) => dispatch({ type: ANIMATION_ACTIONS.SET_PHASE, payload: phase }),
    updateTimeline: (key, value) => dispatch({ 
      type: ANIMATION_ACTIONS.UPDATE_TIMELINE, 
      payload: { key, value } 
    }),
    setHoverState: (component, element, state) => dispatch({
      type: ANIMATION_ACTIONS.SET_HOVER_STATE,
      payload: { component, element, state }
    }),
    clearHoverState: (component, element) => dispatch({
      type: ANIMATION_ACTIONS.CLEAR_HOVER_STATE,
      payload: { component, element }
    }),
    openModal: (modal) => dispatch({ 
      type: ANIMATION_ACTIONS.OPEN_MODAL, 
      payload: { modal } 
    }),
    closeModal: (modal) => dispatch({ 
      type: ANIMATION_ACTIONS.CLOSE_MODAL, 
      payload: { modal } 
    }),
    updateFormField: (modal, field, updates) => dispatch({
      type: ANIMATION_ACTIONS.UPDATE_FORM_FIELD,
      payload: { modal, field, updates }
    }),
    validateForm: (modal, state) => dispatch({
      type: ANIMATION_ACTIONS.VALIDATE_FORM,
      payload: { modal, state }
    }),
    submitForm: (modal) => dispatch({
      type: ANIMATION_ACTIONS.SUBMIT_FORM,
      payload: { modal }
    }),
    setIdleMode: (idle) => dispatch({ 
      type: ANIMATION_ACTIONS.SET_IDLE_MODE, 
      payload: idle 
    }),
    triggerWakeUp: () => dispatch({ type: ANIMATION_ACTIONS.TRIGGER_WAKE_UP }),
    setPerformanceMode: (mode) => dispatch({ 
      type: ANIMATION_ACTIONS.SET_PERFORMANCE_MODE, 
      payload: mode 
    }),
    addToast: (toast) => dispatch({ 
      type: ANIMATION_ACTIONS.ADD_TOAST, 
      payload: toast 
    }),
    removeToast: (id) => dispatch({ 
      type: ANIMATION_ACTIONS.REMOVE_TOAST, 
      payload: id 
    }),
    updateLayout: (layout) => dispatch({
      type: ANIMATION_ACTIONS.UPDATE_LAYOUT,
      payload: layout
    })
  };
  
  return (
    <AnimationContext.Provider value={{ state, actions }}>
      {children}
    </AnimationContext.Provider>
  );
}

// Hook
export function useAnimation() {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error('useAnimation must be used within an AnimationProvider');
  }
  return context;
}

export default AnimationContext;
