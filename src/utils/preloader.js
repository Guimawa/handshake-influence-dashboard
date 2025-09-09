/**
 * Preloader System - Précharge les SVG/icônes, fonts en local storage
 * pour instantanéité des animations
 */

class Preloader {
  constructor() {
    this.loadedAssets = new Set();
    this.loadingPromises = new Map();
    this.cssVariables = new Map();
  }

  /**
   * Précharge un SVG et le stocke en local storage
   */
  async preloadSVG(url, id) {
    if (this.loadedAssets.has(id)) {
      return Promise.resolve();
    }

    if (this.loadingPromises.has(id)) {
      return this.loadingPromises.get(id);
    }

    const promise = fetch(url)
      .then(response => response.text())
      .then(svgText => {
        // Stockage en local storage
        localStorage.setItem(`svg_${id}`, svgText);
        this.loadedAssets.add(id);
        return svgText;
      })
      .catch(error => {
        console.warn(`Failed to preload SVG ${id}:`, error);
        this.loadedAssets.delete(id);
        throw error;
      });

    this.loadingPromises.set(id, promise);
    return promise;
  }

  /**
   * Précharge une font et la stocke en local storage
   */
  async preloadFont(fontFamily, fontUrl) {
    const id = `font_${fontFamily}`;
    
    if (this.loadedAssets.has(id)) {
      return Promise.resolve();
    }

    if (this.loadingPromises.has(id)) {
      return this.loadingPromises.get(id);
    }

    const promise = new Promise((resolve, reject) => {
      const fontFace = new FontFace(fontFamily, `url(${fontUrl})`);
      
      fontFace.load().then(loadedFont => {
        document.fonts.add(loadedFont);
        localStorage.setItem(id, 'loaded');
        this.loadedAssets.add(id);
        resolve(loadedFont);
      }).catch(error => {
        console.warn(`Failed to preload font ${fontFamily}:`, error);
        reject(error);
      });
    });

    this.loadingPromises.set(id, promise);
    return promise;
  }

  /**
   * Pré-calcul des gradients et box-shadows
   */
  precalculateStyles() {
    // Pré-calcul des gradients
    const gradients = {
      'primary-gradient': 'linear-gradient(135deg, #2563eb 0%, #36a2f8 100%)',
      'card-gradient': 'linear-gradient(135deg, #232B3E 0%, #1a1f2e 100%)',
      'sidebar-gradient': 'linear-gradient(180deg, #232B3E 0%, #1e2532 100%)',
      'button-gradient': 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
      'scanline-gradient': 'linear-gradient(90deg, transparent 0%, rgba(59, 130, 246, 0.3) 50%, transparent 100%)'
    };

    // Pré-calcul des box-shadows
    const shadows = {
      'card-shadow': '0 4px 20px rgba(36, 145, 255, 0.1)',
      'button-shadow': '0 2px 8px rgba(36, 145, 255, 0.2)',
      'modal-shadow': '0 20px 40px rgba(0, 0, 0, 0.3)',
      'glow-shadow': '0 0 20px rgba(59, 130, 246, 0.4)',
      'hover-shadow': '0 8px 32px rgba(36, 145, 255, 0.15)'
    };

    // Stockage en CSS variables
    Object.entries(gradients).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--gradient-${key}`, value);
      this.cssVariables.set(key, value);
    });

    Object.entries(shadows).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--shadow-${key}`, value);
      this.cssVariables.set(key, value);
    });
  }

  /**
   * Génère les CSS variables pour les delays et durations
   */
  generateAnimationVariables() {
    const baseDelays = {
      sidebar: [10, 22, 34, 46, 58, 70, 82, 94],
      topbar: [15, 23, 31, 39],
      cards: [70, 85, 100, 115],
      modals: [20, 35, 50, 65]
    };

    const durations = {
      fast: 80,
      normal: 120,
      slow: 200,
      spring: 300
    };

    const easings = {
      easeOut: 'cubic-bezier(0.23, 1, 0.32, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
    };

    // Génération des variables CSS
    Object.entries(baseDelays).forEach(([category, delays]) => {
      delays.forEach((delay, index) => {
        document.documentElement.style.setProperty(
          `--delay-${category}-${index + 1}`,
          `${delay}ms`
        );
      });
    });

    Object.entries(durations).forEach(([name, duration]) => {
      document.documentElement.style.setProperty(
        `--duration-${name}`,
        `${duration}ms`
      );
    });

    Object.entries(easings).forEach(([name, easing]) => {
      document.documentElement.style.setProperty(
        `--easing-${name}`,
        easing
      );
    });
  }

  /**
   * Initialise le préchargement complet
   */
  async initialize() {
    try {
      // Pré-calcul des styles
      this.precalculateStyles();
      this.generateAnimationVariables();

      // Préchargement des SVG essentiels
      const svgAssets = [
        { url: '/icons/dashboard.svg', id: 'dashboard' },
        { url: '/icons/projects.svg', id: 'projects' },
        { url: '/icons/team.svg', id: 'team' },
        { url: '/icons/reports.svg', id: 'reports' },
        { url: '/icons/notifications.svg', id: 'notifications' },
        { url: '/icons/settings.svg', id: 'settings' },
        { url: '/icons/search.svg', id: 'search' },
        { url: '/icons/plus.svg', id: 'plus' }
      ];

      // Préchargement des fonts
      const fontAssets = [
        { family: 'Inter', url: '/fonts/inter-regular.woff2' },
        { family: 'Inter', url: '/fonts/inter-medium.woff2' },
        { family: 'Inter', url: '/fonts/inter-bold.woff2' }
      ];

      // Préchargement parallèle
      const svgPromises = svgAssets.map(asset => 
        this.preloadSVG(asset.url, asset.id).catch(() => {})
      );
      
      const fontPromises = fontAssets.map(asset => 
        this.preloadFont(asset.family, asset.url).catch(() => {})
      );

      await Promise.allSettled([...svgPromises, ...fontPromises]);

      console.log('Preloader initialized successfully');
      return true;
    } catch (error) {
      console.error('Preloader initialization failed:', error);
      return false;
    }
  }

  /**
   * Récupère un SVG préchargé
   */
  getSVG(id) {
    return localStorage.getItem(`svg_${id}`);
  }

  /**
   * Vérifie si un asset est chargé
   */
  isLoaded(id) {
    return this.loadedAssets.has(id);
  }

  /**
   * Nettoie le cache
   */
  clearCache() {
    this.loadedAssets.clear();
    this.loadingPromises.clear();
    
    // Nettoyage du local storage
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('svg_') || key.startsWith('font_')) {
        localStorage.removeItem(key);
      }
    });
  }
}

// Instance singleton
export const preloader = new Preloader();
export default preloader;
