import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { toastSuccess, toastError } from "./ui/Toast";

export function ProjectForm({ onSuccess, initialFocusRef, className = "" }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    priority: "medium"
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState({});

  const formRef = useRef(null);

  // Auto-focus on first input
  useEffect(() => {
    if (initialFocusRef?.current) {
      initialFocusRef.current.focus();
    }
  }, [initialFocusRef]);

  const validateField = (name, value) => {
    const newErrors = { ...errors };
    
    switch (name) {
      case 'name':
        if (!value.trim()) {
          newErrors.name = "Le nom du projet est requis";
        } else if (value.trim().length < 3) {
          newErrors.name = "Le nom doit contenir au moins 3 caractères";
        } else if (value.trim().length > 64) {
          newErrors.name = "Le nom ne peut pas dépasser 64 caractères";
        } else {
          delete newErrors.name;
        }
        break;
      case 'description':
        if (value.length > 200) {
          newErrors.description = "La description ne peut pas dépasser 200 caractères";
        } else {
          delete newErrors.description;
        }
        break;
      case 'category':
        if (!value.trim()) {
          newErrors.category = "Veuillez sélectionner une catégorie";
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Validate field on change if it has been touched
    if (touched[name]) {
      validateField(name, value);
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    
    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Mark all fields as touched
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(allTouched);

    // Validate all fields
    const isNameValid = validateField('name', formData.name);
    const isDescriptionValid = validateField('description', formData.description);
    const isCategoryValid = validateField('category', formData.category);

    if (!isNameValid || !isDescriptionValid || !isCategoryValid) {
      toastError("Veuillez corriger les erreurs dans le formulaire");
      return;
    }

    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate occasional API errors (10% chance)
      if (Math.random() < 0.1) {
        throw new Error("Erreur de connexion");
      }

      toastSuccess(`Projet "${formData.name}" créé avec succès !`);
      
      // Reset form
      setFormData({
        name: "",
        description: "",
        category: "",
        priority: "medium"
      });
      setTouched({});
      setErrors({});
      
      // Call success callback
      if (onSuccess) {
        onSuccess(formData);
      }
      
    } catch (error) {
      console.error("Erreur lors de la création du projet:", error);
      toastError(error.message || "Erreur lors de la création du projet");
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = formData.name.trim() && 
                     formData.category && 
                     !Object.keys(errors).length;

  return (
    <motion.form
      ref={formRef}
      onSubmit={handleSubmit}
      className={`space-y-6 ${className}`}
      aria-labelledby="project-form-title"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white" id="project-form-title">
        Créer un nouveau projet
      </h2>
      
      <div className="space-y-4">
        {/* Project Name */}
        <Input
          label="Nom du projet"
          name="name"
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.name && errors.name}
          required
          maxLength={64}
          placeholder="Ex: Mon nouveau projet"
          helperText={`${formData.name.length}/64 caractères`}
          ref={initialFocusRef}
        />

        {/* Category */}
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
            Catégorie <span className="text-red-500">*</span>
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`
              mt-1 block w-full px-4 py-3 rounded-lg border transition-all duration-200
              ${touched.category && errors.category
                ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                : "border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              }
              bg-white dark:bg-gray-800 text-gray-900 dark:text-white
              focus:outline-none
            `}
            aria-invalid={touched.category && !!errors.category}
            aria-describedby={touched.category && errors.category ? "category-error" : undefined}
          >
            <option value="">Sélectionner une catégorie</option>
            <option value="web">Développement Web</option>
            <option value="mobile">Application Mobile</option>
            <option value="desktop">Application Desktop</option>
            <option value="api">API & Backend</option>
            <option value="data">Data Science</option>
            <option value="ai">Intelligence Artificielle</option>
            <option value="other">Autre</option>
          </select>
          {touched.category && errors.category && (
            <motion.div
              id="category-error"
              className="text-xs text-red-600 dark:text-red-400 mt-1 flex items-center gap-1"
              role="alert"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.category}
            </motion.div>
          )}
        </div>

        {/* Priority */}
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
            Priorité
          </label>
          <div className="flex gap-2">
            {[
              { value: 'low', label: 'Basse', color: 'bg-green-100 text-green-800 border-green-200' },
              { value: 'medium', label: 'Moyenne', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
              { value: 'high', label: 'Haute', color: 'bg-red-100 text-red-800 border-red-200' }
            ].map((priority) => (
              <motion.label
                key={priority.value}
                className={`
                  flex-1 p-3 rounded-lg border-2 cursor-pointer transition-all duration-200
                  ${formData.priority === priority.value
                    ? `${priority.color} border-current`
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-600'
                  }
                `}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <input
                  type="radio"
                  name="priority"
                  value={priority.value}
                  checked={formData.priority === priority.value}
                  onChange={handleChange}
                  className="sr-only"
                />
                <span className="text-sm font-medium">{priority.label}</span>
              </motion.label>
            ))}
          </div>
        </div>

        {/* Description */}
        <Input
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.description && errors.description}
          maxLength={200}
          placeholder="Décrivez votre projet..."
          helperText={`${formData.description.length}/200 caractères`}
          multiline
          rows={3}
        />
      </div>

      {/* Error summary */}
      {Object.keys(errors).length > 0 && (
        <motion.div
          className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4"
          role="alert"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="flex items-start">
            <svg className="w-5 h-5 text-red-400 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <div>
              <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                Veuillez corriger les erreurs suivantes :
              </h3>
              <ul className="mt-1 text-sm text-red-700 dark:text-red-300 list-disc list-inside">
                {Object.values(errors).map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      )}

      {/* Actions */}
      <div className="flex gap-3 pt-4">
        <Button
          type="submit"
          className="flex-1"
          loading={loading}
          disabled={!isFormValid || loading}
          aria-disabled={!isFormValid || loading}
        >
          {loading ? "Création en cours..." : "Créer le projet"}
        </Button>
      </div>
    </motion.form>
  );
}
