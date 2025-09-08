import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

const AvatarUploader = ({ 
  currentAvatar = null,
  onAvatarChange,
  size = 'large', // small, medium, large
  className = ""
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [preview, setPreview] = useState(currentAvatar);
  const fileInputRef = useRef(null);

  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'w-12 h-12';
      case 'medium':
        return 'w-16 h-16';
      default:
        return 'w-20 h-20';
    }
  };

  const handleFileSelect = (file) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newAvatar = e.target.result;
        setPreview(newAvatar);
        onAvatarChange?.(file, newAvatar);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragOver(false);
    
    const file = event.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDragOver(false);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleUpdate = () => {
    // Simulation de la mise à jour
    console.log('Avatar mis à jour');
  };

  return (
    <motion.div
      className={`flex flex-col items-center gap-2 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
    >
      {/* Label */}
      <label className="block text-[#AAB7C6] font-semibold mb-1">
        Avatar
      </label>

      {/* Zone d'upload */}
      <motion.div
        className={`
          ${getSizeClasses()} rounded-full bg-[#384356] border-2 flex items-center justify-center 
          relative group cursor-pointer transition-all duration-120
          ${isDragOver 
            ? 'border-[#3B82F6] scale-105' 
            : 'border-[#3B82F6] hover:border-[#7DE3F4]'
          }
        `}
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        whileHover={{ 
          scale: 1.05,
          transition: { duration: 0.12, ease: [0.23, 1, 0.32, 1] }
        }}
        whileTap={{ 
          scale: 0.95,
          transition: { duration: 0.08, ease: [0.23, 1, 0.32, 1] }
        }}
      >
        {/* Avatar actuel */}
        {preview ? (
          <img 
            src={preview} 
            alt="Votre avatar" 
            className="w-full h-full rounded-full object-cover" 
          />
        ) : (
          <div className="w-full h-full rounded-full bg-[#3B82F6] flex items-center justify-center text-white font-bold text-lg">
            U
          </div>
        )}

        {/* Input file caché */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="absolute inset-0 opacity-0 cursor-pointer"
          aria-label="Choisir un nouvel avatar"
          onChange={handleFileInputChange}
        />

        {/* Overlay au hover */}
        <motion.div
          className="absolute inset-0 bg-[#181E29]/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-120 rounded-full"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        >
          <motion.svg
            className="w-8 h-8 text-[#7DE3F4]"
            fill="none"
            viewBox="0 0 24 24"
            initial={{ scale: 0.8, opacity: 0 }}
            whileHover={{ 
              scale: 1,
              opacity: 1,
              transition: { duration: 0.2, ease: [0.23, 1, 0.32, 1] }
            }}
          >
            <path 
              stroke="currentColor" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M12 6v6m0 0v6m0-6h6m-6 0H6" 
            />
          </motion.svg>
        </motion.div>

        {/* Indicateur de drag */}
        {isDragOver && (
          <motion.div
            className="absolute inset-0 bg-[#3B82F6]/20 rounded-full border-2 border-dashed border-[#3B82F6]"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </motion.div>

      {/* Bouton de mise à jour */}
      <motion.button
        className="mt-2 px-4 py-2 bg-[#3B82F6] rounded-xl text-white font-semibold 
                   hover:bg-[#2563eb] transition-colors focus-visible:ring-2 focus-visible:ring-[#3B82F6]
                   focus-visible:outline-none"
        onClick={handleUpdate}
        whileHover={{ 
          scale: 1.02,
          transition: { duration: 0.12, ease: [0.23, 1, 0.32, 1] }
        }}
        whileTap={{ 
          scale: 0.98,
          transition: { duration: 0.08, ease: [0.23, 1, 0.32, 1] }
        }}
      >
        Mettre à jour
      </motion.button>
    </motion.div>
  );
};

export default AvatarUploader;
