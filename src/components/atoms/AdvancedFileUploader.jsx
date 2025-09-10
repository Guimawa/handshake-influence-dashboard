import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AdvancedFileUploader = ({ 
  onFilesChange,
  maxFiles = 10,
  acceptedTypes = ['image/*', 'application/pdf', 'text/*'],
  maxSize = 10 * 1024 * 1024, // 10MB
  className = ""
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const fileInputRef = useRef(null);

  const handleFileSelect = (selectedFiles) => {
    const newFiles = Array.from(selectedFiles).slice(0, maxFiles - files.length);
    
    const validFiles = newFiles.filter(file => {
      const isValidType = acceptedTypes.some(type => {
        if (type.endsWith('/*')) {
          return file.type.startsWith(type.slice(0, -1));
        }
        return file.type === type;
      });
      const isValidSize = file.size <= maxSize;
      return isValidType && isValidSize;
    });

    const filesWithPreview = validFiles.map(file => ({
      id: Date.now() + Math.random(),
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null,
      progress: 0,
      status: 'pending'
    }));

    setFiles(prev => [...prev, ...filesWithPreview]);
    onFilesChange?.(filesWithPreview);

    // Simuler l'upload progress
    filesWithPreview.forEach(fileObj => {
      simulateUpload(fileObj.id);
    });
  };

  const simulateUpload = (fileId) => {
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        const newProgress = (prev[fileId] || 0) + Math.random() * 20;
        if (newProgress >= 100) {
          clearInterval(interval);
          setFiles(prev => prev.map(f => 
            f.id === fileId ? { ...f, status: 'completed', progress: 100 } : f
          ));
          return { ...prev, [fileId]: 100 };
        }
        return { ...prev, [fileId]: newProgress };
      });
    }, 200);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragOver(false);
    const droppedFiles = event.dataTransfer.files;
    handleFileSelect(droppedFiles);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDragOver(false);
  };

  const handleFileInputChange = (event) => {
    const selectedFiles = event.target.files;
    handleFileSelect(selectedFiles);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = (fileId) => {
    setFiles(prev => {
      const updatedFiles = prev.filter(f => f.id !== fileId);
      onFilesChange?.(updatedFiles);
      return updatedFiles;
    });
    setUploadProgress(prev => {
      const newProgress = { ...prev };
      delete newProgress[fileId];
      return newProgress;
    });
  };

  const getFileIcon = (fileType) => {
    if (fileType.startsWith('image/')) {
      return (
        <svg className="w-5 h-5 text-[#7DE3F4]" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      );
    } else if (fileType === 'application/pdf') {
      return (
        <svg className="w-5 h-5 text-[#F69AC1]" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      );
    } else {
      return (
        <svg className="w-5 h-5 text-[#F7C873]" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      );
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Zone de drop */}
      <motion.div
        className={`
          flex flex-col items-center justify-center border-2 border-dashed rounded-2xl bg-[#232B3E] py-12 px-8 text-center shadow-panel 
          transition-all duration-120 cursor-pointer focus-within:ring-2 focus-within:ring-[#3B82F6]
          ${isDragOver 
            ? 'border-[#3B82F6] bg-[#222C3B] scale-103' 
            : 'border-[#3B82F6] hover:bg-[#222C3B]'
          }
        `}
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        whileHover={{ 
          scale: 1.01,
          transition: { duration: 0.12, ease: [0.23, 1, 0.32, 1] }
        }}
        whileTap={{ 
          scale: 0.99,
          transition: { duration: 0.08, ease: [0.23, 1, 0.32, 1] }
        }}
      >
        <motion.svg
          className="w-10 h-10 text-[#3B82F6] mb-3"
          fill="none"
          viewBox="0 0 24 24"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
        >
          <path 
            stroke="currentColor" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" 
          />
        </motion.svg>
        
        <span className="text-[#F1F5F9] text-lg font-semibold mb-1">
          Glissez-déposez vos fichiers ici
        </span>
        <span className="text-[#AAB7C6] text-sm mb-4">
          Ou cliquez pour parcourir
        </span>
        
        <input
          ref={fileInputRef}
          type="file"
          className="sr-only"
          multiple
          accept={acceptedTypes.join(',')}
          aria-label="Sélectionner un ou plusieurs fichiers"
          onChange={handleFileInputChange}
        />
      </motion.div>

      {/* Liste des fichiers */}
      {files.length > 0 && (
        <motion.ul
          className="flex flex-col gap-2 mt-6 w-full max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
        >
          <AnimatePresence>
            {files.map((fileObj, index) => (
              <motion.li
                key={fileObj.id}
                className="flex items-center gap-3 bg-[#222C3B] rounded-lg px-4 py-3 shadow"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ 
                  duration: 0.2, 
                  delay: index * 0.05,
                  ease: [0.23, 1, 0.32, 1] 
                }}
              >
                {/* Icône du fichier */}
                {getFileIcon(fileObj.type)}
                
                {/* Informations du fichier */}
                <div className="flex-1 min-w-0">
                  <div className="text-[#F1F5F9] font-medium truncate">
                    {fileObj.name}
                  </div>
                  <div className="text-[#AAB7C6] text-xs">
                    {formatFileSize(fileObj.size)}
                  </div>
                </div>

                {/* Barre de progression */}
                <div className="w-20 h-2 rounded-full bg-[#384356] overflow-hidden">
                  <motion.div
                    className="bg-[#7DE3F4] h-2 transition-all duration-100"
                    style={{ width: `${uploadProgress[fileObj.id] || 0}%` }}
                    initial={{ width: 0 }}
                    animate={{ width: `${uploadProgress[fileObj.id] || 0}%` }}
                    transition={{ duration: 0.1, ease: [0.23, 1, 0.32, 1] }}
                  />
                </div>

                {/* Bouton supprimer */}
                <motion.button
                  className="ml-2 text-[#AAB7C6] hover:text-[#EF4444] transition-colors duration-120
                             focus-visible:ring-2 focus-visible:ring-[#3B82F6] rounded p-1"
                  onClick={() => handleRemoveFile(fileObj.id)}
                  aria-label={`Supprimer ${fileObj.name}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <path 
                      stroke="currentColor" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d="M6 18L18 6M6 6l12 12" 
                    />
                  </svg>
                </motion.button>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      )}
    </div>
  );
};

export default AdvancedFileUploader;
