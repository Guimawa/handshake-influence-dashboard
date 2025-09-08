import { useState } from 'react';
import Modal from '../atoms/Modal';
import Toast from '../atoms/Toast';
import ToastContainer from '../atoms/ToastContainer';
import Skeleton from '../atoms/Skeleton';
import ContextMenu from '../atoms/ContextMenu';
import Popover from '../atoms/Popover';
import Stepper from '../atoms/Stepper';

const AdvancedUIComponentsDemo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [showSkeleton, setShowSkeleton] = useState(false);

  // Données pour le stepper
  const steps = [
    { label: 'Configuration' },
    { label: 'Déploiement' },
    { label: 'Validation' },
    { label: 'Finalisation' }
  ];

  // Items pour le context menu
  const contextMenuItems = [
    { id: 1, label: 'Renommer', icon: '✏️' },
    { id: 2, label: 'Dupliquer', icon: '📋' },
    { id: 3, label: 'Supprimer', icon: '🗑️', danger: true }
  ];

  const handleContextMenu = (event) => {
    event.preventDefault();
    setContextMenuPosition({ x: event.clientX, y: event.clientY });
    setIsContextMenuOpen(true);
  };

  const handleContextMenuItemClick = (item) => {
    console.log('Action context menu:', item.label);
  };

  const addToast = (type, title, message) => {
    const newToast = {
      id: Date.now(),
      type,
      title,
      message,
      duration: 5000
    };
    setToasts(prev => [...prev, newToast]);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const handleSkeletonToggle = () => {
    setShowSkeleton(!showSkeleton);
  };

  return (
    <div className="p-8 space-y-8 bg-[#181E29] min-h-screen">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Titre */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#F1F5F9] mb-2">
            Composants UI Avancés
          </h1>
          <p className="text-[#AAB7C6]">
            Zones 38-42 : Modal, Toast, Skeleton, ContextMenu, Popover
          </p>
        </div>

        {/* ZONE 38 : MODAL */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-[#F1F5F9]">ZONE 38 : Modal Avancée</h2>
          <div className="flex gap-4">
            <button
              className="px-4 py-2 bg-[#3B82F6] text-white rounded-lg hover:bg-[#2563eb] transition-colors"
              onClick={() => setIsModalOpen(true)}
            >
              Ouvrir Modal
            </button>
          </div>
          
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Modal de Démonstration"
            size="lg"
            footer={
              <>
                <button
                  className="px-4 py-2 rounded-xl bg-[#222C3B] text-[#AAB7C6] hover:bg-[#3B82F6] hover:text-white transition"
                  onClick={() => setIsModalOpen(false)}
                >
                  Annuler
                </button>
                <button
                  className="px-4 py-2 rounded-xl bg-[#3B82F6] text-white font-semibold hover:bg-[#2563eb] transition"
                  onClick={() => setIsModalOpen(false)}
                >
                  Continuer
                </button>
              </>
            }
          >
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#F1F5F9]">Contenu de la Modal</h3>
              <p className="text-[#AAB7C6]">
                Ceci est un exemple de modal avec toutes les fonctionnalités :
                focus trap, fermeture ESC, overlay click, animations.
              </p>
              
              {/* Stepper dans la modal */}
              <div className="mt-6">
                <Stepper 
                  steps={steps}
                  currentStep={1}
                  completedSteps={[0]}
                  className="max-w-md"
                />
              </div>
            </div>
          </Modal>
        </section>

        {/* ZONE 39 : TOASTS */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-[#F1F5F9]">ZONE 39 : Toasts</h2>
          <div className="flex flex-wrap gap-2">
            <button
              className="px-4 py-2 bg-[#10B981] text-white rounded-lg hover:bg-[#059669] transition-colors"
              onClick={() => addToast('success', 'Succès !', 'Action réalisée avec succès')}
            >
              Toast Succès
            </button>
            <button
              className="px-4 py-2 bg-[#EF4444] text-white rounded-lg hover:bg-[#DC2626] transition-colors"
              onClick={() => addToast('error', 'Erreur !', 'Une erreur est survenue')}
            >
              Toast Erreur
            </button>
            <button
              className="px-4 py-2 bg-[#F59E0B] text-white rounded-lg hover:bg-[#D97706] transition-colors"
              onClick={() => addToast('warning', 'Attention !', 'Veuillez vérifier vos données')}
            >
              Toast Warning
            </button>
            <button
              className="px-4 py-2 bg-[#3B82F6] text-white rounded-lg hover:bg-[#2563eb] transition-colors"
              onClick={() => addToast('info', 'Information', 'Nouvelle information disponible')}
            >
              Toast Info
            </button>
          </div>
        </section>

        {/* ZONE 40 : SKELETON LOADER */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-[#F1F5F9]">ZONE 40 : Skeleton Loader</h2>
          <div className="space-y-4">
            <button
              className="px-4 py-2 bg-[#3B82F6] text-white rounded-lg hover:bg-[#2563eb] transition-colors"
              onClick={handleSkeletonToggle}
            >
              {showSkeleton ? 'Masquer' : 'Afficher'} Skeleton
            </button>
            
            {showSkeleton ? (
              <div className="space-y-4">
                <Skeleton lines={3} height="1rem" />
                <Skeleton variant="card" height="200px" width="100%" />
                <div className="flex gap-4">
                  <Skeleton variant="circle" height="60px" width="60px" />
                  <div className="flex-1 space-y-2">
                    <Skeleton height="1.5rem" width="60%" />
                    <Skeleton height="1rem" width="40%" />
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-[#232B3E] rounded-xl p-6">
                <h3 className="text-lg font-semibold text-[#F1F5F9] mb-2">Contenu chargé</h3>
                <p className="text-[#AAB7C6]">Le contenu est maintenant visible.</p>
              </div>
            )}
          </div>
        </section>

        {/* ZONE 41 : CONTEXT MENU */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-[#F1F5F9]">ZONE 41 : Context Menu</h2>
          <div className="bg-[#232B3E] rounded-xl p-8 text-center">
            <p className="text-[#AAB7C6] mb-4">
              Clic droit sur cette zone pour ouvrir le menu contextuel
            </p>
            <div
              className="w-full h-32 bg-[#222C3B] rounded-lg flex items-center justify-center cursor-pointer
                         hover:bg-[#3B82F6] hover:text-white transition-colors"
              onContextMenu={handleContextMenu}
            >
              Zone cliquable (clic droit)
            </div>
          </div>
        </section>

        {/* ZONE 42 : POPOVER */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-[#F1F5F9]">ZONE 42 : Popover</h2>
          <div className="flex flex-wrap gap-4">
            <Popover
              isOpen={isPopoverOpen}
              onClose={() => setIsPopoverOpen(false)}
              title="Détail du Node"
              content="Ceci est un popover avec des informations détaillées sur le node sélectionné."
              placement="top"
              trigger={
                <button
                  className="px-4 py-2 bg-[#3B82F6] text-white rounded-lg hover:bg-[#2563eb] transition-colors"
                  onClick={() => setIsPopoverOpen(!isPopoverOpen)}
                >
                  Toggle Popover
                </button>
              }
            />
          </div>
        </section>

        {/* Toast Container */}
        <ToastContainer 
          toasts={toasts}
          onRemove={removeToast}
          position="bottom-right"
          maxToasts={5}
        />

        {/* Context Menu */}
        <ContextMenu
          isOpen={isContextMenuOpen}
          onClose={() => setIsContextMenuOpen(false)}
          position={contextMenuPosition}
          items={contextMenuItems}
          onItemClick={handleContextMenuItemClick}
        />

      </div>
    </div>
  );
};

export default AdvancedUIComponentsDemo;
