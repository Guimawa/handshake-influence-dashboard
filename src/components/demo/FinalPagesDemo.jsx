import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  LogIn, 
  AlertTriangle, 
  Settings, 
  FileText, 
  Loader2, 
  Play, 
  Globe, 
  Clock, 
  UserPlus, 
  Sun,
  Eye,
  EyeOff
} from 'lucide-react';

// Import des composants
import EmptyLoginPage from '../pages/EmptyLoginPage';
import EmptyErrorPage from '../pages/EmptyErrorPage';
import EmptySettingsPage from '../pages/EmptySettingsPage';
import { EmptyLegalFooter } from '../layout/EmptyLegalFooter';
import EmptySplashPage from '../pages/EmptySplashPage';
import { EmptyTourGuide } from '../atoms/EmptyTourGuide';
import { EmptyLanguageMenu } from '../atoms/EmptyLanguageMenu';
import { EmptyHistoryPanel } from '../atoms/EmptyHistoryPanel';
import { EmptyInvitePanel } from '../atoms/EmptyInvitePanel';
import { EmptyThemeToggle } from '../atoms/EmptyThemeToggle';

export default function FinalPagesDemo() {
  const [activeDemo, setActiveDemo] = useState('login');
  const [showTour, setShowTour] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showInvite, setShowInvite] = useState(false);
  const [showSplash, setShowSplash] = useState(false);

  const demos = [
    { id: 'login', label: 'Login', icon: LogIn, page: true },
    { id: 'error', label: '404/500', icon: AlertTriangle, page: true },
    { id: 'settings', label: 'Settings', icon: Settings, page: true },
    { id: 'footer', label: 'Footer Legal', icon: FileText, component: true },
    { id: 'splash', label: 'Splash/Loading', icon: Loader2, modal: true },
    { id: 'tour', label: 'Tour Guidé', icon: Play, modal: true },
    { id: 'language', label: 'Menu Langue', icon: Globe, component: true },
    { id: 'history', label: 'Panel Historique', icon: Clock, panel: true },
    { id: 'invite', label: 'Panel Inviter', icon: UserPlus, modal: true },
    { id: 'theme', label: 'Theme Toggle', icon: Sun, component: true }
  ];

  const handleGoHome = () => {
    console.log('Retour à l\'accueil');
  };

  const handleRetry = () => {
    console.log('Réessayer');
  };

  const handleTourComplete = () => {
    setShowTour(false);
    console.log('Tour terminé');
  };

  const handleSplashComplete = () => {
    setShowSplash(false);
    console.log('Splash terminé');
  };

  return (
    <div className="min-h-screen bg-[#181E29] text-[#F1F5F9]">
      {/* Header avec navigation */}
      <header className="bg-[#232B3E] border-b border-[#222C3B] p-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-[#F1F5F9] mb-4">
            Démonstration Pages Finales (Zones 96-105)
          </h1>
          
          {/* Navigation des démos */}
          <div className="flex flex-wrap gap-2">
            {demos.map((demo) => {
              const Icon = demo.icon;
              return (
                <motion.button
                  key={demo.id}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
                    transition-all duration-120
                    ${activeDemo === demo.id 
                      ? 'bg-[#3B82F6] text-white' 
                      : 'bg-[#222C3B] text-[#AAB7C6] hover:bg-[#2A3142] hover:text-white'
                    }
                  `}
                  onClick={() => setActiveDemo(demo.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon className="w-4 h-4" />
                  {demo.label}
                </motion.button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="max-w-7xl mx-auto p-6">
        <motion.div
          key={activeDemo}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.12, ease: [0.23, 1, 0.32, 1] }}
          className="space-y-6"
        >
          {/* ZONE 96 : Page de Login */}
          {activeDemo === 'login' && (
            <div className="space-y-6">
              <div className="bg-[#232B3E] rounded-xl p-6">
                <h2 className="text-xl font-semibold text-[#F1F5F9] mb-4">
                  ZONE 96 : Page de Login
                </h2>
                <p className="text-[#AAB7C6] mb-6">
                  Dégradé #212837→#232B3E, card centrale, champs vides, bouton désactivé.
                </p>
                
                <div className="bg-[#181E29] rounded-xl p-4 min-h-96">
                  <EmptyLoginPage />
                </div>
              </div>
            </div>
          )}

          {/* ZONE 97 : Pages 404/500 */}
          {activeDemo === 'error' && (
            <div className="space-y-6">
              <div className="bg-[#232B3E] rounded-xl p-6">
                <h2 className="text-xl font-semibold text-[#F1F5F9] mb-4">
                  ZONE 97 : Pages 404/500
                </h2>
                <p className="text-[#AAB7C6] mb-6">
                  Fond #232B3E, icône, texte, bouton retour.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-[#181E29] rounded-xl p-4 min-h-96">
                    <h3 className="text-lg font-semibold text-[#F1F5F9] mb-4">Page 404</h3>
                    <EmptyErrorPage 
                      type="404" 
                      onGoHome={handleGoHome}
                    />
                  </div>
                  
                  <div className="bg-[#181E29] rounded-xl p-4 min-h-96">
                    <h3 className="text-lg font-semibold text-[#F1F5F9] mb-4">Page 500</h3>
                    <EmptyErrorPage 
                      type="500" 
                      onGoHome={handleGoHome}
                      onRetry={handleRetry}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ZONE 98 : Page Settings */}
          {activeDemo === 'settings' && (
            <div className="space-y-6">
              <div className="bg-[#232B3E] rounded-xl p-6">
                <h2 className="text-xl font-semibold text-[#F1F5F9] mb-4">
                  ZONE 98 : Page Settings
                </h2>
                <p className="text-[#AAB7C6] mb-6">
                  Panel #232B3E, options vides disabled, empty state.
                </p>
                
                <div className="bg-[#181E29] rounded-xl p-4 min-h-96">
                  <EmptySettingsPage />
                </div>
              </div>
            </div>
          )}

          {/* ZONE 99 : Footer Legal */}
          {activeDemo === 'footer' && (
            <div className="space-y-6">
              <div className="bg-[#232B3E] rounded-xl p-6">
                <h2 className="text-xl font-semibold text-[#F1F5F9] mb-4">
                  ZONE 99 : Footer Legal/RGPD/Liens
                </h2>
                <p className="text-[#AAB7C6] mb-6">
                  Fond #212837, liens vides, responsive.
                </p>
                
                <div className="bg-[#181E29] rounded-xl p-4 min-h-32">
                  <EmptyLegalFooter />
                </div>
              </div>
            </div>
          )}

          {/* ZONE 100 : Page Splash/Loading */}
          {activeDemo === 'splash' && (
            <div className="space-y-6">
              <div className="bg-[#232B3E] rounded-xl p-6">
                <h2 className="text-xl font-semibold text-[#F1F5F9] mb-4">
                  ZONE 100 : Page Splash/Loading
                </h2>
                <p className="text-[#AAB7C6] mb-6">
                  Fond #212837, logo animé, texte chargement, a11y.
                </p>
                
                <motion.button
                  className="px-6 py-3 bg-[#3B82F6] text-white rounded-lg font-medium"
                  onClick={() => setShowSplash(true)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Afficher Splash Screen
                </motion.button>
                
                {showSplash && (
                  <EmptySplashPage onComplete={handleSplashComplete} />
                )}
              </div>
            </div>
          )}

          {/* ZONE 101 : Tour Guidé */}
          {activeDemo === 'tour' && (
            <div className="space-y-6">
              <div className="bg-[#232B3E] rounded-xl p-6">
                <h2 className="text-xl font-semibold text-[#F1F5F9] mb-4">
                  ZONE 101 : Tour Guidé Onboarding
                </h2>
                <p className="text-[#AAB7C6] mb-6">
                  Overlay, card, étapes vides, boutons désactivés.
                </p>
                
                <motion.button
                  className="px-6 py-3 bg-[#3B82F6] text-white rounded-lg font-medium"
                  onClick={() => setShowTour(true)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Démarrer le Tour Guidé
                </motion.button>
                
                <EmptyTourGuide 
                  isVisible={showTour}
                  onClose={() => setShowTour(false)}
                  onComplete={handleTourComplete}
                />
              </div>
            </div>
          )}

          {/* ZONE 102 : Menu Langue */}
          {activeDemo === 'language' && (
            <div className="space-y-6">
              <div className="bg-[#232B3E] rounded-xl p-6">
                <h2 className="text-xl font-semibold text-[#F1F5F9] mb-4">
                  ZONE 102 : Menu Langue
                </h2>
                <p className="text-[#AAB7C6] mb-6">
                  Bouton globe, popover langues vides, disabled.
                </p>
                
                <div className="flex justify-center">
                  <EmptyLanguageMenu />
                </div>
              </div>
            </div>
          )}

          {/* ZONE 103 : Panel Historique */}
          {activeDemo === 'history' && (
            <div className="space-y-6">
              <div className="bg-[#232B3E] rounded-xl p-6">
                <h2 className="text-xl font-semibold text-[#F1F5F9] mb-4">
                  ZONE 103 : Panel Historique
                </h2>
                <p className="text-[#AAB7C6] mb-6">
                  Panel droit #232B3E, logs vides, empty message.
                </p>
                
                <motion.button
                  className="px-6 py-3 bg-[#3B82F6] text-white rounded-lg font-medium"
                  onClick={() => setShowHistory(!showHistory)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {showHistory ? 'Masquer' : 'Afficher'} Panel Historique
                </motion.button>
                
                <EmptyHistoryPanel 
                  isVisible={showHistory}
                  onClose={() => setShowHistory(false)}
                />
              </div>
            </div>
          )}

          {/* ZONE 104 : Panel Inviter */}
          {activeDemo === 'invite' && (
            <div className="space-y-6">
              <div className="bg-[#232B3E] rounded-xl p-6">
                <h2 className="text-xl font-semibold text-[#F1F5F9] mb-4">
                  ZONE 104 : Panel Inviter/Collaborateur
                </h2>
                <p className="text-[#AAB7C6] mb-6">
                  Bouton désactivé, modal, input vide.
                </p>
                
                <motion.button
                  className="px-6 py-3 bg-[#3B82F6] text-white rounded-lg font-medium"
                  onClick={() => setShowInvite(true)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Afficher Panel Inviter
                </motion.button>
                
                <EmptyInvitePanel 
                  isVisible={showInvite}
                  onClose={() => setShowInvite(false)}
                />
              </div>
            </div>
          )}

          {/* ZONE 105 : Theme Toggle */}
          {activeDemo === 'theme' && (
            <div className="space-y-6">
              <div className="bg-[#232B3E] rounded-xl p-6">
                <h2 className="text-xl font-semibold text-[#F1F5F9] mb-4">
                  ZONE 105 : Dark/Light Mode Toggle
                </h2>
                <p className="text-[#AAB7C6] mb-6">
                  Bouton sun/moon, état Light inactif, anim switch.
                </p>
                
                <div className="flex justify-center">
                  <EmptyThemeToggle />
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}
