/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#181E29", // Fond global
        panel: "#232B3E",      // Panels/sidebar/topbar
        input: "#222C3B",      // Inputs/search
        primary: "#3B82F6",    // Bleu bouton/tab actif
        accent: "#2563eb",     // Bleu hover bouton/tab
        textMain: "#F1F5F9",   // Texte principal
        textSub: "#AAB7C6",    // Sous-titre/placeholder
        border: "#222C3B",     // Borders/tabs
        danger: "#EF4444",     // Badge notif
        success: "#22C55E",    // (pour plus tard)
      },
      borderRadius: {
        'xl': '1.25rem',  // ~20px
        '2xl': '1.5rem',  // ~24px
        'full': '9999px',
      },
      boxShadow: {
        'panel': '0 6px 24px 0 rgba(30, 41, 59, 0.24)', // panels/cards
        'focus': '0 0 0 3px #3B82F6', // focus rings
      },
      spacing: {
        '18': '4.5rem',   // 72px
        '22': '5.5rem',   // 88px
        '26': '6.5rem',   // 104px
        '30': '7.5rem',   // 120px
        '34': '8.5rem',   // 136px
        '38': '9.5rem',   // 152px
        '42': '10.5rem',  // 168px
        '46': '11.5rem',  // 184px
        '50': '12.5rem',  // 200px
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
    },
  },
  plugins: [],
}
