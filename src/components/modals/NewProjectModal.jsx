import React, { useState, useEffect, useRef } from 'react';
import { useAnimation } from '../../context/AnimationContext';

/**
 * PHASE 4 - Modal Nouveau Projet
 * Spécifications complètes selon les directives
 */

const NewProjectModal = ({ isOpen, onClose }) => {
  const { state, actions } = useAnimation();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const firstInputRef = useRef(null);
  const modalRef = useRef(null);

  // Focus sur le premier input à l'ouverture
  useEffect(() => {
    if (isOpen && firstInputRef.current) {
      setTimeout(() => {
        firstInputRef.current.focus();
      }, 100);
    }
  }, [isOpen]);

  // Gestion de la fermeture avec Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Validation en temps réel
  const validateField = (name, value) => {
    const newErrors = { ...errors };
    
    switch (name) {
      case 'name':
        if (!value.trim()) {
          newErrors.name = 'Le nom est requis';
        } else if (value.length < 3) {
          newErrors.name = 'Le nom doit faire au moins 3 caractères';
        } else {
          delete newErrors.name;
        }
        break;
      case 'description':
        if (value.length > 500) {
          newErrors.description = 'La description ne peut pas dépasser 500 caractères';
        } else {
          delete newErrors.description;
        }
        break;
      case 'category':
        if (!value) {
          newErrors.category = 'La catégorie est requise';
        } else {
          delete newErrors.category;
        }
        break;
      default:
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Gestion des changements de champs
  const handleFieldChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    validateField(name, value);
    
    // Dispatch action pour mise à jour du state
    actions.updateFormField('newProject', name, {
      value,
      isValid: !errors[name],
      isTouched: true
    });
  };

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation complète
    const isNameValid = validateField('name', formData.name);
    const isDescriptionValid = validateField('description', formData.description);
    const isCategoryValid = validateField('category', formData.category);
    
    if (!isNameValid || !isDescriptionValid || !isCategoryValid) {
      // Shake animation sur les champs en erreur
      Object.keys(errors).forEach(fieldName => {
        const field = document.querySelector(`[name="${fieldName}"]`);
        if (field) {
          field.classList.add('animate-shake');
          setTimeout(() => {
            field.classList.remove('animate-shake');
          }, 600);
        }
      });
      return;
    }

    setIsSubmitting(true);
    actions.submitForm('newProject');

    try {
      // Simulation API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Succès
      actions.addToast({
        type: 'success',
        message: 'Projet créé avec succès !',
        duration: 3000
      });
      
      onClose();
      
      // Reset form
      setFormData({ name: '', description: '', category: '' });
      setErrors({});
      
    } catch (error) {
      actions.addToast({
        type: 'error',
        message: 'Erreur lors de la création du projet',
        duration: 5000
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div 
        ref={modalRef}
        className="relative bg-[#232B3E] rounded-2xl p-8 w-full max-w-md mx-4 shadow-2xl animate-modal-slide-down"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 id="modal-title" className="text-2xl font-bold text-[#F1F5F9]">
            Nouveau Projet
          </h2>
          <button
            onClick={onClose}
            className="text-[#AAB7C6] hover:text-[#F1F5F9] transition-colors"
            aria-label="Fermer la modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nom du projet */}
          <div className="space-y-2">
            <label htmlFor="project-name" className="block text-sm font-medium text-[#F1F5F9]">
              Nom du projet *
            </label>
            <input
              ref={firstInputRef}
              id="project-name"
              name="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleFieldChange('name', e.target.value)}
              className={`w-full px-4 py-3 bg-[#222C3B] border rounded-xl text-[#F1F5F9] placeholder-[#AAB7C6] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] transition-all ${
                errors.name ? 'border-red-500 focus:ring-red-500' : 'border-transparent'
              }`}
              placeholder="Entrez le nom du projet"
              aria-required="true"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
            {errors.name && (
              <p id="name-error" className="text-red-400 text-sm animate-shake">
                {errors.name}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label htmlFor="project-description" className="block text-sm font-medium text-[#F1F5F9]">
              Description
            </label>
            <textarea
              id="project-description"
              name="description"
              value={formData.description}
              onChange={(e) => handleFieldChange('description', e.target.value)}
              className={`w-full px-4 py-3 bg-[#222C3B] border rounded-xl text-[#F1F5F9] placeholder-[#AAB7C6] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] transition-all resize-none ${
                errors.description ? 'border-red-500 focus:ring-red-500' : 'border-transparent'
              }`}
              placeholder="Décrivez votre projet..."
              rows="3"
              aria-invalid={!!errors.description}
              aria-describedby={errors.description ? 'description-error' : undefined}
            />
            {errors.description && (
              <p id="description-error" className="text-red-400 text-sm animate-shake">
                {errors.description}
              </p>
            )}
          </div>

          {/* Catégorie */}
          <div className="space-y-2">
            <label htmlFor="project-category" className="block text-sm font-medium text-[#F1F5F9]">
              Catégorie *
            </label>
            <select
              id="project-category"
              name="category"
              value={formData.category}
              onChange={(e) => handleFieldChange('category', e.target.value)}
              className={`w-full px-4 py-3 bg-[#222C3B] border rounded-xl text-[#F1F5F9] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] transition-all ${
                errors.category ? 'border-red-500 focus:ring-red-500' : 'border-transparent'
              }`}
              aria-required="true"
              aria-invalid={!!errors.category}
              aria-describedby={errors.category ? 'category-error' : undefined}
            >
              <option value="">Sélectionnez une catégorie</option>
              <option value="web">Développement Web</option>
              <option value="mobile">Application Mobile</option>
              <option value="desktop">Application Desktop</option>
              <option value="api">API & Backend</option>
              <option value="other">Autre</option>
            </select>
            {errors.category && (
              <p id="category-error" className="text-red-400 text-sm animate-shake">
                {errors.category}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-[#222C3B] text-[#AAB7C6] rounded-xl font-medium hover:bg-[#1a1f2e] hover:text-[#F1F5F9] transition-all focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isSubmitting || Object.keys(errors).length > 0}
              className="flex-1 px-6 py-3 bg-[#3B82F6] text-white rounded-xl font-medium hover:bg-[#2563eb] disabled:opacity-50 disabled:cursor-not-allowed transition-all focus:outline-none focus:ring-2 focus:ring-[#3B82F6] hover:scale-105 active:scale-95"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Création...
                </span>
              ) : (
                'Créer le projet'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewProjectModal;
