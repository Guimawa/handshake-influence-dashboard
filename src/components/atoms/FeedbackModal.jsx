import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FeedbackModal = ({ 
  isOpen = false,
  onClose,
  onSubmit,
  className = ""
}) => {
  const [isVisible, setIsVisible] = useState(isOpen);
  const [formData, setFormData] = useState({
    type: 'bug',
    message: '',
    email: '',
    screenshot: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      
      // Focus sur le premier champ
      setTimeout(() => {
        const firstInput = modalRef.current?.querySelector('input, textarea, select');
        if (firstInput) {
          firstInput.focus();
        }
      }, 200);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  // Focus trap
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose?.();
        return;
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

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, screenshot: file }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulation de l'envoi
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      onSubmit?.(formData);
      
      // Reset form
      setFormData({
        type: 'bug',
        message: '',
        email: '',
        screenshot: null
      });
      
      onClose?.();
      
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    onClose?.();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/60 z-50"
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
            className={`
              fixed left-1/2 top-1/2 z-51 w-full max-w-md bg-[#232B3E] rounded-2xl shadow-2xl 
              p-6 transform -translate-x-1/2 -translate-y-1/2 ${className}
            `}
            role="dialog"
            aria-modal="true"
            aria-label="Signaler un problème"
            initial={{ 
              opacity: 0, 
              scale: 0.9,
              y: '-50%',
              x: '-50%'
            }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              y: '-50%',
              x: '-50%'
            }}
            exit={{ 
              opacity: 0, 
              scale: 0.9,
              y: '-50%',
              x: '-50%'
            }}
            transition={{ 
              duration: 0.2, 
              ease: [0.23, 1, 0.32, 1] 
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-[#F1F5F9]">
                Signaler un problème
              </h2>
              <button
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#AAB7C6] 
                           hover:bg-[#222C3B] hover:text-white transition-colors
                           focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
                onClick={handleClose}
                aria-label="Fermer le formulaire"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
                  <path 
                    stroke="currentColor" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M6 18L18 6M6 6l12 12" 
                  />
                </svg>
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Type de problème */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#F1F5F9]">
                  Type de problème
                </label>
                <select
                  className="w-full px-3 py-2 bg-[#222C3B] border border-[#3B82F6] rounded-lg 
                             text-[#F1F5F9] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
                  value={formData.type}
                  onChange={(e) => handleInputChange('type', e.target.value)}
                >
                  <option value="bug">Bug</option>
                  <option value="feature">Demande de fonctionnalité</option>
                  <option value="improvement">Amélioration</option>
                  <option value="other">Autre</option>
                </select>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#F1F5F9]">
                  Description
                </label>
                <textarea
                  className="w-full px-3 py-2 bg-[#222C3B] border border-[#3B82F6] rounded-lg 
                             text-[#F1F5F9] placeholder-[#AAB7C6] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]
                             resize-none"
                  rows="4"
                  placeholder="Décrivez le problème ou votre suggestion..."
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  required
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#F1F5F9]">
                  Email (optionnel)
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 bg-[#222C3B] border border-[#3B82F6] rounded-lg 
                             text-[#F1F5F9] placeholder-[#AAB7C6] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
                  placeholder="votre@email.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
              </div>

              {/* Screenshot */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#F1F5F9]">
                  Capture d'écran (optionnel)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full px-3 py-2 bg-[#222C3B] border border-[#3B82F6] rounded-lg 
                             text-[#F1F5F9] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
                  onChange={handleFileChange}
                />
                {formData.screenshot && (
                  <div className="text-xs text-[#AAB7C6]">
                    Fichier sélectionné: {formData.screenshot.name}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  className="flex-1 px-4 py-2 bg-[#222C3B] text-[#AAB7C6] rounded-lg 
                             hover:bg-[#3B82F6] hover:text-white transition-colors"
                  onClick={handleClose}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-[#3B82F6] text-white rounded-lg 
                             hover:bg-[#2563eb] transition-colors disabled:opacity-50"
                  disabled={isSubmitting || !formData.message.trim()}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Envoi...
                    </div>
                  ) : (
                    'Envoyer'
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default FeedbackModal;
