import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

const FileUploader = ({ 
  onFileSelect,
  accept = "*/*",
  multiple = false,
  maxSize = 10 * 1024 * 1024, // 10MB
  className = "",
  disabled = false
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (files) => {
    const fileArray = Array.from(files);
    const validFiles = fileArray.filter(file => file.size <= maxSize);
    
    if (validFiles.length > 0) {
      onFileSelect?.(multiple ? validFiles : validFiles[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    if (!disabled) {
      setIsDragOver(true);
    }
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    if (!disabled) {
      const files = e.dataTransfer.files;
      handleFileSelect(files);
    }
  };

  const handleClick = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileInputChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <motion.div
      className={`
        flex flex-col items-center justify-center border-2 border-dashed border-[#3B82F6] rounded-2xl 
        bg-[#232B3E] py-12 px-8 text-center shadow-panel transition-all duration-120 cursor-pointer
        focus-within:ring-2 focus-within:ring-[#3B82F6] focus-within:outline-none
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      tabIndex={disabled ? -1 : 0}
      role="button"
      aria-label="Zone de téléchargement de fichiers"
      animate={{
        backgroundColor: isHovered || isFocused || isDragOver ? '#222C3B' : '#232B3E',
        borderColor: isDragOver ? '#60A5FA' : '#3B82F6',
        scale: isDragOver ? 1.02 : 1,
        boxShadow: isHovered || isFocused 
          ? '0 4px 20px rgba(59, 130, 246, 0.15)' 
          : '0 2px 8px rgba(0, 0, 0, 0.1)'
      }}
      transition={{ duration: 0.12, ease: [0.23, 1, 0.32, 1] }}
    >
      {/* Icône */}
      <motion.div
        className="mb-3"
        animate={{
          scale: isDragOver ? 1.1 : 1,
          color: isDragOver ? '#60A5FA' : '#3B82F6'
        }}
        transition={{ duration: 0.12 }}
      >
        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24">
          <path 
            stroke="currentColor" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" 
          />
        </svg>
      </motion.div>

      {/* Texte principal */}
      <motion.span 
        className="text-[#F1F5F9] text-lg font-semibold mb-1"
        animate={{
          color: isDragOver ? '#60A5FA' : '#F1F5F9'
        }}
        transition={{ duration: 0.12 }}
      >
        {isDragOver ? 'Déposez vos fichiers ici' : 'Glissez-déposez vos fichiers ici'}
      </motion.span>

      {/* Texte secondaire */}
      <span className="text-[#AAB7C6] text-sm mb-4">
        Ou cliquez pour parcourir
      </span>

      {/* Input caché */}
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleFileInputChange}
        className="sr-only"
        aria-label="Sélectionner un fichier"
        disabled={disabled}
      />

      {/* Feedback de taille */}
      <div className="text-xs text-[#AAB7C6]">
        Taille max: {Math.round(maxSize / (1024 * 1024))}MB
      </div>
    </motion.div>
  );
};

export default FileUploader;
