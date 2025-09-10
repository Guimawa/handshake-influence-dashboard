import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const QuickAddModal = ({ 
  isOpen = false,
  onClose,
  onAdd,
  type = 'node', // node, edge, project
  className = ""
}) => {
  const [formData, setFormData] = useState({
    label: '',
    type: 'default',
    color: '#3B82F6',
    description: ''
  });
  const [selectedColor, setSelectedColor] = useState('#3B82F6');
  const modalRef = useRef(null);
  const firstInputRef = useRef(null);

  const colorPalette = [
    { name: 'Bleu', value: '#3B82F6' },
    { name: 'Cyan', value: '#7DE3F4' },
    { name: 'Rose', value: '#F69AC1' },
    { name: 'Orange', value: '#F7C873' },
    { name: 'Jaune', value: '#F6E58D' },
    { name: 'Vert', value: '#10B981' },
    { name: 'Rouge', value: '#EF4444' },
    { name: 'Violet', value: '#8B5CF6' }
  ];

  const typeOptions = {
    node: [
      { value: 'person', label: 'Personne' },
      { value: 'organization', label: 'Organisation' },
      { value: 'project', label: 'Projet' },
      { value: 'event', label: 'Événement' }
    ],
    edge: [
      { value: 'collaboration', label: 'Collaboration' },
      { value: 'influence', label: 'Influence' },
      { value: 'partnership', label: 'Partenariat' },
      { value: 'competition', label: 'Concurrence' }
    ],
    project: [
      { value: 'web', label: 'Application Web' },
      { value: 'mobile', label: 'Application Mobile' },
      { value: 'desktop', label: 'Application Desktop' },
      { value: 'api', label: 'API' }
    ]
  };

  useEffect(() => {
    if (isOpen) {
      // Reset form
      setFormData({
        label: '',
        type: 'default',
        color: '#3B82F6',
        description: ''
      });
      setSelectedColor('#3B82F6');
      
      // Focus sur le premier input
      setTimeout(() => {
        firstInputRef.current?.focus();
      }, 200);
    }
  }, [isOpen]);

  // Focus trap
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose?.();
        return;
      }

      if (event.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement?.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement?.focus();
          }
        }
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.label.trim()) {
      onAdd?.({
        ...formData,
        color: selectedColor,
        id: Date.now()
      });
      onClose?.();
    }
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    setFormData(prev => ({ ...prev, color }));
  };

  const getTitle = () => {
    switch (type) {
      case 'node': return 'Ajouter un Node';
      case 'edge': return 'Ajouter une Connexion';
      case 'project': return 'Nouveau Projet';
      default: return 'Ajouter un Élément';
    }
  };

  const getPreviewContent = () => {
    switch (type) {
      case 'node':
        return (
          <div className="flex items-center justify-center w-16 h-16 rounded-full shadow-lg" style={{ backgroundColor: selectedColor }}>
            <span className="text-white font-bold text-lg">
              {formData.label.charAt(0).toUpperCase() || 'N'}
            </span>
          </div>
        );
      case 'edge':
        return (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#3B82F6]"></div>
            <div 
              className="w-12 h-1 rounded-full" 
              style={{ backgroundColor: selectedColor }}
            ></div>
            <div className="w-8 h-8 rounded-full bg-[#7DE3F4]"></div>
          </div>
        );
      case 'project':
        return (
          <div className="w-16 h-12 bg-[#232B3E] rounded-lg border-2 flex items-center justify-center" style={{ borderColor: selectedColor }}>
            <span className="text-[#F1F5F9] font-bold text-sm">
              {formData.label.charAt(0).toUpperCase() || 'P'}
            </span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/60 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            ref={modalRef}
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg bg-[#232B3E] rounded-2xl shadow-2xl px-8 py-10 
                       flex flex-col gap-6 transform -translate-x-1/2 -translate-y-1/2"
            role="dialog"
            aria-modal="true"
            aria-label={getTitle()}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ 
              duration: 0.14, 
              ease: [0.23, 1, 0.32, 1] 
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#F1F5F9]">
                {getTitle()}
              </h2>
              <motion.button
                className="w-9 h-9 rounded-full flex items-center justify-center text-[#AAB7C6] 
                           hover:bg-[#222C3B] hover:text-white transition-colors
                           focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
                onClick={onClose}
                aria-label="Fermer la modale"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
                  <path 
                    stroke="currentColor" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M6 18L18 6M6 6l12 12" 
                  />
                </svg>
              </motion.button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {/* Label */}
              <div>
                <label className="block text-sm font-medium text-[#F1F5F9] mb-2">
                  Nom *
                </label>
                <input
                  ref={firstInputRef}
                  type="text"
                  className="w-full px-4 py-3 bg-[#181E29] border border-[#3B82F6] rounded-xl text-[#F1F5F9] 
                           focus:outline-none focus:ring-2 focus:ring-[#3B82F6] transition-all duration-120"
                  placeholder="Entrez le nom"
                  value={formData.label}
                  onChange={(e) => setFormData(prev => ({ ...prev, label: e.target.value }))}
                  required
                />
              </div>

              {/* Type */}
              <div>
                <label className="block text-sm font-medium text-[#F1F5F9] mb-2">
                  Type
                </label>
                <select
                  className="w-full px-4 py-3 bg-[#181E29] border border-[#3B82F6] rounded-xl text-[#F1F5F9] 
                           focus:outline-none focus:ring-2 focus:ring-[#3B82F6] transition-all duration-120"
                  value={formData.type}
                  onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                >
                  {typeOptions[type]?.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Couleur */}
              <div>
                <label className="block text-sm font-medium text-[#F1F5F9] mb-2">
                  Couleur
                </label>
                <div className="flex flex-wrap gap-3">
                  {colorPalette.map((color) => (
                    <motion.button
                      key={color.value}
                      type="button"
                      className={`w-10 h-10 rounded-full border-2 transition-all duration-120
                                 ${selectedColor === color.value 
                                   ? 'border-white scale-110' 
                                   : 'border-[#3B82F6] hover:scale-105'
                                 }`}
                      style={{ backgroundColor: color.value }}
                      onClick={() => handleColorSelect(color.value)}
                      aria-label={`Sélectionner la couleur ${color.name}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    />
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-[#F1F5F9] mb-2">
                  Description
                </label>
                <textarea
                  className="w-full px-4 py-3 bg-[#181E29] border border-[#3B82F6] rounded-xl text-[#F1F5F9] 
                           focus:outline-none focus:ring-2 focus:ring-[#3B82F6] transition-all duration-120 resize-none"
                  rows="3"
                  placeholder="Description optionnelle"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>

              {/* Preview */}
              <div className="flex items-center justify-center p-4 bg-[#181E29] rounded-xl">
                <div className="text-center">
                  <div className="text-sm text-[#AAB7C6] mb-2">Aperçu</div>
                  {getPreviewContent()}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 justify-end">
                <motion.button
                  type="button"
                  className="px-6 py-3 rounded-xl bg-[#222C3B] text-[#AAB7C6] font-semibold 
                           hover:bg-[#3B82F6] hover:text-white transition-all duration-120
                           focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
                  onClick={onClose}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Annuler
                </motion.button>
                <motion.button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-[#3B82F6] text-white font-semibold 
                           hover:bg-[#2563eb] transition-all duration-120
                           focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Ajouter
                </motion.button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default QuickAddModal;
