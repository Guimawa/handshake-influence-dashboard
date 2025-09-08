import React, { useState, useRef, useEffect } from 'react';
import { Plus, X, Check, AlertCircle } from 'lucide-react';

const AddProjectButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: 'project'
  });
  const [errors, setErrors] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  const buttonRef = useRef(null);
  const firstInputRef = useRef(null);
  const rippleRef = useRef(null);

  // Phase 1: Hover effects avec timeline précise
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Phase 2: Click avec ripple effect
  const handleMouseDown = (e) => {
    setIsActive(true);
    createRipple(e);
  };

  const handleMouseUp = () => {
    setIsActive(false);
  };

  const createRipple = (e) => {
    if (rippleRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      const ripple = document.createElement('span');
      ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(59, 130, 246, 0.4);
        transform: scale(0.8);
        animation: ripple 250ms ease-out;
        left: ${x}px;
        top: ${y}px;
        width: ${size}px;
        height: ${size}px;
        pointer-events: none;
      `;
      
      rippleRef.current.appendChild(ripple);
      
      setTimeout(() => {
        if (ripple.parentNode) {
          ripple.parentNode.removeChild(ripple);
        }
      }, 250);
    }
  };

  // Phase 3: Modal management
  const handleClick = () => {
    setShowModal(true);
    setErrors({});
    setFormData({ name: '', description: '', type: 'project' });
  };

  const closeModal = () => {
    setShowModal(false);
    setErrors({});
    setFormData({ name: '', description: '', type: 'project' });
  };

  // Phase 4: Form validation avec feedback en temps réel
  const validateField = (name, value) => {
    const newErrors = { ...errors };
    
    switch (name) {
      case 'name':
        if (!value.trim()) {
          newErrors.name = 'Le nom est requis';
        } else if (value.length < 3) {
          newErrors.name = 'Le nom doit contenir au moins 3 caractères';
        } else {
          delete newErrors.name;
        }
        break;
      case 'description':
        if (value.length > 200) {
          newErrors.description = 'La description ne peut pas dépasser 200 caractères';
        } else {
          delete newErrors.description;
        }
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Validation en temps réel avec délai
    setTimeout(() => {
      validateField(name, value);
    }, 100);
  };

  // Phase 5: Submit avec loading et feedback
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation finale
    const isNameValid = validateField('name', formData.name);
    const isDescValid = validateField('description', formData.description);
    
    if (!isNameValid || !isDescValid) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulation API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Succès
      setToastMessage('Projet créé avec succès !');
      setToastType('success');
      setShowToast(true);
      closeModal();
      
      // Auto-hide toast
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
      
    } catch (error) {
      // Erreur
      setToastMessage('Erreur lors de la création du projet');
      setToastType('error');
      setShowToast(true);
      
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } finally {
      setIsLoading(false);
    }
  };

  // Focus sur le premier input quand la modal s'ouvre
  useEffect(() => {
    if (showModal && firstInputRef.current) {
      setTimeout(() => {
        firstInputRef.current.focus();
      }, 100);
    }
  }, [showModal]);

  // Gestion des touches clavier
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && showModal) {
        closeModal();
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showModal]);

  return (
    <>
      {/* CSS pour les animations */}
      <style jsx>{`
        @keyframes ripple {
          to {
            transform: scale(2.2);
            opacity: 0;
          }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
          20%, 40%, 60%, 80% { transform: translateX(2px); }
        }
        
        @keyframes scanline {
          0% { left: -100%; }
          100% { left: 100%; }
        }
        
        .shake {
          animation: shake 0.4s ease-in-out;
        }
        
        .scanline::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.3), transparent);
          animation: scanline 180ms ease-out;
        }
      `}</style>

      {/* Bouton principal */}
      <button
        ref={buttonRef}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        disabled={isLoading}
        className={`
          relative overflow-hidden px-6 py-3 rounded-lg font-medium text-sm
          transition-all duration-200 ease-out
          ${isHovered 
            ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25 scale-105' 
            : 'bg-blue-500 text-white shadow-md'
          }
          ${isActive ? 'scale-95' : ''}
          ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          focus:outline-none focus:ring-4 focus:ring-blue-300/50
          hover:shadow-xl hover:shadow-blue-600/30
        `}
        style={{
          transition: 'all 90ms cubic-bezier(0.23, 1, 0.32, 1)',
          boxShadow: isHovered 
            ? '0 6px 16px rgba(54, 162, 248, 0.2)' 
            : '0 1px 4px rgba(36, 145, 1, 0.1)'
        }}
        role="button"
        tabIndex="0"
        aria-label="Créer un nouveau projet"
      >
        {/* Scanline effect au hover */}
        {isHovered && <div className="scanline" />}
        
        {/* Ripple container */}
        <div ref={rippleRef} className="absolute inset-0 pointer-events-none" />
        
        {/* Contenu du bouton */}
        <div className="flex items-center space-x-2 relative z-10">
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Nouveau projet</span>
        </div>
        
        {/* Loading spinner */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-blue-600 rounded-lg">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop avec blur */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeModal}
            style={{
              animation: 'fadeIn 120ms ease-out'
            }}
          />
          
          {/* Modal panel */}
          <div 
            className="relative bg-white rounded-xl shadow-2xl w-full max-w-md mx-4"
            style={{
              animation: 'slideDown 120ms cubic-bezier(0.23, 1, 0.32, 1)'
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Nouveau projet</h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Nom du projet */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom du projet *
                </label>
                <div className="relative">
                  <input
                    ref={firstInputRef}
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`
                      w-full px-3 py-2 border rounded-lg focus:outline-none transition-all duration-120
                      ${errors.name 
                        ? 'border-red-500 focus:border-red-500 shake' 
                        : 'border-gray-300 focus:border-blue-500'
                      }
                    `}
                    placeholder="Entrez le nom du projet"
                    aria-required="true"
                    aria-invalid={!!errors.name}
                  />
                  {!errors.name && formData.name && (
                    <Check className="absolute right-3 top-2.5 w-4 h-4 text-green-500" />
                  )}
                  {errors.name && (
                    <AlertCircle className="absolute right-3 top-2.5 w-4 h-4 text-red-500" />
                  )}
                </div>
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600" role="alert">
                    {errors.name}
                  </p>
                )}
              </div>
              
              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className={`
                    w-full px-3 py-2 border rounded-lg focus:outline-none transition-all duration-120
                    ${errors.description 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-gray-300 focus:border-blue-500'
                    }
                  `}
                  placeholder="Description du projet (optionnel)"
                  aria-invalid={!!errors.description}
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600" role="alert">
                    {errors.description}
                  </p>
                )}
                <p className="mt-1 text-xs text-gray-500">
                  {formData.description.length}/200 caractères
                </p>
              </div>
              
              {/* Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type de projet
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                >
                  <option value="project">Projet</option>
                  <option value="task">Tâche</option>
                  <option value="milestone">Jalon</option>
                </select>
              </div>
              
              {/* Actions */}
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={isLoading || Object.keys(errors).length > 0 || !formData.name.trim()}
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg transition-all duration-200 hover:scale-105 disabled:scale-100"
                >
                  {isLoading ? 'Création...' : 'Créer le projet'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast notification */}
      {showToast && (
        <div 
          className="fixed bottom-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg text-white max-w-sm"
          style={{
            backgroundColor: toastType === 'success' ? '#10b981' : '#ef4444',
            animation: 'slideInRight 300ms ease-out'
          }}
        >
          <div className="flex items-center space-x-2">
            {toastType === 'success' ? (
              <Check className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* CSS global pour les animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideDown {
          from { 
            transform: translateY(-48px); 
            opacity: 0; 
          }
          to { 
            transform: translateY(0); 
            opacity: 1; 
          }
        }
        
        @keyframes slideInRight {
          from { 
            transform: translateX(100%); 
            opacity: 0; 
          }
          to { 
            transform: translateX(0); 
            opacity: 1; 
          }
        }
      `}</style>
    </>
  );
};

export default AddProjectButton;
