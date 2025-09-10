import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sidebar } from '../layout/Sidebar';
import { EmptyTopbar } from '../layout/EmptyTopbar';
import { EmptyFooter } from '../layout/EmptyFooter';
import { OverlayDarken } from '../atoms/OverlayDarken';
import { SkeletonGrid } from '../atoms/SkeletonGrid';
import { EmptyConfirmPopup } from '../atoms/EmptyConfirmPopup';
import { EmptyHelpOverlay } from '../atoms/EmptyHelpOverlay';
import { EmptyUserMenu } from '../atoms/EmptyUserMenu';
import { WidgetSlot } from '../atoms/WidgetSlot';
import { 
  Play, 
  Square, 
  Grid3X3, 
  MessageSquare, 
  HelpCircle, 
  User, 
  Plus,
  Eye,
  EyeOff
} from 'lucide-react';

export default function EmptyComponentsDemo() {
  const [activeDemo, setActiveDemo] = useState('sidebar');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarEmpty, setSidebarEmpty] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showSkeletonEmpty, setShowSkeletonEmpty] = useState(false);
  const [skeletonColumns, setSkeletonColumns] = useState(3);

  const demos = [
    { id: 'sidebar', label: 'Sidebar Vide', icon: Square },
    { id: 'topbar', label: 'Header Vide', icon: Square },
    { id: 'footer', label: 'Footer Vide', icon: Square },
    { id: 'overlay', label: 'Overlay Darken', icon: Eye },
    { id: 'skeleton', label: 'Skeleton Grid', icon: Grid3X3 },
    { id: 'confirm', label: 'Popup Confirm', icon: MessageSquare },
    { id: 'help', label: 'Help Overlay', icon: HelpCircle },
    { id: 'user', label: 'Menu Utilisateur', icon: User },
    { id: 'widget', label: 'Widget Slot', icon: Plus }
  ];

  const handleAddWidget = () => {
    console.log('Ajouter un widget personnalisé');
  };

  return (
    <div className="min-h-screen bg-[#181E29] text-[#F1F5F9]">
      {/* Header avec navigation */}
      <header className="bg-[#232B3E] border-b border-[#222C3B] p-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-[#F1F5F9] mb-4">
            Démonstration Composants Vides (Zones 87-95)
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
          {/* ZONE 87 : Sidebar Vide */}
          {activeDemo === 'sidebar' && (
            <div className="space-y-6">
              <div className="bg-[#232B3E] rounded-xl p-6">
                <h2 className="text-xl font-semibold text-[#F1F5F9] mb-4">
                  ZONE 87 : Sidebar Vide
                </h2>
                <p className="text-[#AAB7C6] mb-6">
                  Sidebar avec structure et empty state. Fond #212837, largeur 72px/240px, 
                  boutons ronds, empty state avec icône + texte.
                </p>
                
                <div className="flex gap-4 mb-6">
                  <motion.button
                    className="px-4 py-2 bg-[#3B82F6] text-white rounded-lg text-sm font-medium"
                    onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {sidebarCollapsed ? 'Expand' : 'Collapse'}
                  </motion.button>
                  
                  <motion.button
                    className="px-4 py-2 bg-[#3B82F6] text-white rounded-lg text-sm font-medium"
                    onClick={() => setSidebarEmpty(!sidebarEmpty)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {sidebarEmpty ? 'Show Menu' : 'Show Empty'}
                  </motion.button>
                </div>

                <div className="flex gap-6">
                  <Sidebar 
                    collapsed={sidebarCollapsed}
                    isEmpty={sidebarEmpty}
                    isMobile={false}
                    isOpen={true}
                  />
                  
                  <div className="flex-1 bg-[#181E29] rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-[#F1F5F9] mb-2">
                      Contenu principal
                    </h3>
                    <p className="text-[#AAB7C6]">
                      Zone de contenu principal à côté de la sidebar.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ZONE 88 : Header Vide */}
          {activeDemo === 'topbar' && (
            <div className="space-y-6">
              <div className="bg-[#232B3E] rounded-xl p-6">
                <h2 className="text-xl font-semibold text-[#F1F5F9] mb-4">
                  ZONE 88 : Header/Topbar Vide
                </h2>
                <p className="text-[#AAB7C6] mb-6">
                  Header avec fond #232B3E, hauteur 64px, slots logo/titre/search/actions vides.
                </p>
                
                <EmptyTopbar isMobile={false} />
              </div>
            </div>
          )}

          {/* ZONE 89 : Footer Vide */}
          {activeDemo === 'footer' && (
            <div className="space-y-6">
              <div className="bg-[#232B3E] rounded-xl p-6">
                <h2 className="text-xl font-semibold text-[#F1F5F9] mb-4">
                  ZONE 89 : Footer Vide/Optionnel
                </h2>
                <p className="text-[#AAB7C6] mb-6">
                  Footer avec fond #212837, hauteur 44px, copyright, responsive sticky.
                </p>
                
                <div className="bg-[#181E29] rounded-xl p-6 min-h-96">
                  <h3 className="text-lg font-semibold text-[#F1F5F9] mb-2">
                    Contenu principal
                  </h3>
                  <p className="text-[#AAB7C6] mb-4">
                    Zone de contenu principal avec footer sticky en bas.
                  </p>
                  
                  <EmptyFooter isMobile={false} />
                </div>
              </div>
            </div>
          )}

          {/* ZONE 90 : Overlay Darken */}
          {activeDemo === 'overlay' && (
            <div className="space-y-6">
              <div className="bg-[#232B3E] rounded-xl p-6">
                <h2 className="text-xl font-semibold text-[#F1F5F9] mb-4">
                  ZONE 90 : Overlay Darken
                </h2>
                <p className="text-[#AAB7C6] mb-6">
                  Overlay fixed, inset-0, bg-black/70, fade 120ms, aria-hidden, ESC ferme.
                </p>
                
                <motion.button
                  className="px-6 py-3 bg-[#3B82F6] text-white rounded-lg font-medium"
                  onClick={() => setShowOverlay(true)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Afficher Overlay
                </motion.button>
                
                <OverlayDarken 
                  isVisible={showOverlay}
                  onClose={() => setShowOverlay(false)}
                />
              </div>
            </div>
          )}

          {/* ZONE 91 : Skeleton Grid */}
          {activeDemo === 'skeleton' && (
            <div className="space-y-6">
              <div className="bg-[#232B3E] rounded-xl p-6">
                <h2 className="text-xl font-semibold text-[#F1F5F9] mb-4">
                  ZONE 91 : Skeleton Card/Grid
                </h2>
                <p className="text-[#AAB7C6] mb-6">
                  Grid 2-4 colonnes, cards #232B3E, shimmer anim, empty state.
                </p>
                
                <div className="flex gap-4 mb-6">
                  <motion.button
                    className="px-4 py-2 bg-[#3B82F6] text-white rounded-lg text-sm font-medium"
                    onClick={() => setSkeletonColumns(2)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    2 Colonnes
                  </motion.button>
                  
                  <motion.button
                    className="px-4 py-2 bg-[#3B82F6] text-white rounded-lg text-sm font-medium"
                    onClick={() => setSkeletonColumns(3)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    3 Colonnes
                  </motion.button>
                  
                  <motion.button
                    className="px-4 py-2 bg-[#3B82F6] text-white rounded-lg text-sm font-medium"
                    onClick={() => setSkeletonColumns(4)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    4 Colonnes
                  </motion.button>
                  
                  <motion.button
                    className="px-4 py-2 bg-[#3B82F6] text-white rounded-lg text-sm font-medium"
                    onClick={() => setShowSkeletonEmpty(!showSkeletonEmpty)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {showSkeletonEmpty ? 'Show Skeleton' : 'Show Empty'}
                  </motion.button>
                </div>
                
                <SkeletonGrid 
                  columns={skeletonColumns}
                  showEmptyState={showSkeletonEmpty}
                />
              </div>
            </div>
          )}

          {/* ZONE 92 : Popup Confirm */}
          {activeDemo === 'confirm' && (
            <div className="space-y-6">
              <div className="bg-[#232B3E] rounded-xl p-6">
                <h2 className="text-xl font-semibold text-[#F1F5F9] mb-4">
                  ZONE 92 : Popup Confirm
                </h2>
                <p className="text-[#AAB7C6] mb-6">
                  Modale centrée, bg #232B3E, titre/texte, boutons désactivés.
                </p>
                
                <motion.button
                  className="px-6 py-3 bg-[#3B82F6] text-white rounded-lg font-medium"
                  onClick={() => setShowConfirm(true)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Afficher Popup Confirm
                </motion.button>
                
                <EmptyConfirmPopup 
                  isVisible={showConfirm}
                  onClose={() => setShowConfirm(false)}
                />
              </div>
            </div>
          )}

          {/* ZONE 93 : Help Overlay */}
          {activeDemo === 'help' && (
            <div className="space-y-6">
              <div className="bg-[#232B3E] rounded-xl p-6">
                <h2 className="text-xl font-semibold text-[#F1F5F9] mb-4">
                  ZONE 93 : Help Overlay
                </h2>
                <p className="text-[#AAB7C6] mb-6">
                  Overlay semi-transparent, card centrale, texte aide, bouton fermer.
                </p>
                
                <motion.button
                  className="px-6 py-3 bg-[#3B82F6] text-white rounded-lg font-medium"
                  onClick={() => setShowHelp(true)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Afficher Help Overlay
                </motion.button>
                
                <EmptyHelpOverlay 
                  isVisible={showHelp}
                  onClose={() => setShowHelp(false)}
                />
              </div>
            </div>
          )}

          {/* ZONE 94 : Menu Utilisateur */}
          {activeDemo === 'user' && (
            <div className="space-y-6">
              <div className="bg-[#232B3E] rounded-xl p-6">
                <h2 className="text-xl font-semibold text-[#F1F5F9] mb-4">
                  ZONE 94 : Mini Menu Utilisateur
                </h2>
                <p className="text-[#AAB7C6] mb-6">
                  Icône avatar grisé, popover, texte utilisateur, bouton connexion.
                </p>
                
                <div className="flex justify-center">
                  <EmptyUserMenu />
                </div>
              </div>
            </div>
          )}

          {/* ZONE 95 : Widget Slot */}
          {activeDemo === 'widget' && (
            <div className="space-y-6">
              <div className="bg-[#232B3E] rounded-xl p-6">
                <h2 className="text-xl font-semibold text-[#F1F5F9] mb-4">
                  ZONE 95 : Slot Widget Custom
                </h2>
                <p className="text-[#AAB7C6] mb-6">
                  Card slot #384356, border dashed #7DE3F4/40, texte placeholder.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <WidgetSlot onAddWidget={handleAddWidget} />
                  <WidgetSlot onAddWidget={handleAddWidget} />
                  <WidgetSlot onAddWidget={handleAddWidget} />
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}
