import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Edit3, 
  Plus, 
  FileText, 
  Folder, 
  Image, 
  Code, 
  Settings,
  MoreVertical,
  Check,
  AlertTriangle,
  Copy,
  Trash2,
  Move
} from 'lucide-react';

export function DetailPanel({ 
  isOpen = false,
  onClose,
  selectedBubble = null,
  isMobile = false
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState('');
  const [showContextMenu, setShowContextMenu] = useState(null);
  const [files, setFiles] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const inputRef = useRef(null);
  const contextMenuRef = useRef(null);

  // Données de démonstration pour les fichiers
  const demoFiles = [
    { id: 1, name: 'document.pdf', type: 'pdf', color: '#EF4444' },
    { id: 2, name: 'design.fig', type: 'design', color: '#8B5CF6' },
    { id: 3, name: 'code.js', type: 'code', color: '#10B981' },
    { id: 4, name: 'image.png', type: 'image', color: '#F59E0B' },
    { id: 5, name: 'folder', type: 'folder', color: '#3B82F6' }
  ];

  // Initialisation des fichiers
  useEffect(() => {
    if (selectedBubble) {
      setFiles(demoFiles);
      setEditValue(selectedBubble.label);
    }
  }, [selectedBubble]);

  // Focus sur input lors de l'édition
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  // Gestion ESC
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        if (showContextMenu) {
          setShowContextMenu(null);
        } else if (isEditing) {
          handleCancelEdit();
        } else {
          onClose();
        }
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [showContextMenu, isEditing, onClose]);

  // Fermer menu contextuel si clic dehors
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (contextMenuRef.current && !contextMenuRef.current.contains(e.target)) {
        setShowContextMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
    setEditValue(selectedBubble?.label || '');
  };

  const handleSaveEdit = () => {
    if (editValue.trim()) {
      setSuccess('Nom modifié avec succès');
      setTimeout(() => setSuccess(''), 2000);
      setIsEditing(false);
    } else {
      setError('Le nom ne peut pas être vide');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditValue(selectedBubble?.label || '');
    setError('');
  };

  const handleAddFile = () => {
    if (files.length < 10) { // Limite max
      const newFile = {
        id: Date.now(),
        name: `nouveau-fichier-${files.length + 1}`,
        type: 'file',
        color: '#6B7280'
      };
      setFiles([...files, newFile]);
    }
  };

  const handleContextMenu = (e, fileId) => {
    e.stopPropagation();
    setShowContextMenu(fileId);
  };

  const handleContextAction = (action, fileId) => {
    console.log(`${action} sur fichier ${fileId}`);
    setShowContextMenu(null);
  };

  const getFileIcon = (type) => {
    switch (type) {
      case 'pdf': return <FileText className="w-4 h-4" />;
      case 'design': return <Settings className="w-4 h-4" />;
      case 'code': return <Code className="w-4 h-4" />;
      case 'image': return <Image className="w-4 h-4" />;
      case 'folder': return <Folder className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getFileTypeColor = (type) => {
    switch (type) {
      case 'pdf': return '#EF4444';
      case 'design': return '#8B5CF6';
      case 'code': return '#10B981';
      case 'image': return '#F59E0B';
      case 'folder': return '#3B82F6';
      default: return '#6B7280';
    }
  };

  if (!isOpen || !selectedBubble) return null;

  return (
    <>
      {/* Overlay foncé très léger */}
      <motion.div
        className="fixed inset-0 bg-black/7 z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.18 }}
        onClick={onClose}
      />

      {/* Panel principal */}
      <motion.div
        className="fixed right-0 top-0 h-full z-50 flex flex-col"
        style={{
          width: isMobile ? 'calc(100vw - 16px)' : '460px',
          margin: isMobile ? '8px' : '0',
          background: 'linear-gradient(to bottom, #252C42 0%, #232B3E 50%, #212837 100%)',
          boxShadow: '-18px 0 36px 0 rgba(0, 0, 0, 0.1)'
        }}
        initial={{ x: '100vw', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: '100vw', opacity: 0 }}
        transition={{ 
          duration: 0.18, 
          ease: [0.5, 0, 0.15, 1],
          opacity: { delay: 0.02 }
        }}
      >
        {/* Header */}
        <div 
          className="flex items-center justify-between px-6 py-4 relative"
          style={{ 
            height: '64px',
            background: '#252C42'
          }}
        >
          {/* Titre avec édition inline */}
          <div className="flex-1 pr-4">
            {isEditing ? (
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSaveEdit();
                    if (e.key === 'Escape') handleCancelEdit();
                  }}
                  className="
                    bg-[#232B3E] border-2 border-[#7DE3F4] rounded-md px-2 py-1
                    text-white font-bold text-lg focus:outline-none focus:ring-2 focus:ring-[#7DE3F4]
                    transition-all duration-60
                  "
                  style={{ 
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '1.4rem',
                    fontWeight: 700
                  }}
                />
                <motion.button
                  className="w-6 h-6 rounded-full bg-[#10B981] flex items-center justify-center"
                  onClick={handleSaveEdit}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Check className="w-4 h-4 text-white" />
                </motion.button>
                <motion.button
                  className="w-6 h-6 rounded-full bg-[#6B7280] flex items-center justify-center"
                  onClick={handleCancelEdit}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-4 h-4 text-white" />
                </motion.button>
              </div>
            ) : (
              <div className="group relative">
                <h2 
                  className="text-white font-bold truncate"
                  style={{ 
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '1.4rem',
                    fontWeight: 700
                  }}
                >
                  {selectedBubble.label}
                </h2>
                <motion.button
                  className="absolute -right-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-120"
                  onClick={handleEdit}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Edit3 className="w-4 h-4 text-[#7DE3F4]" />
                </motion.button>
              </div>
            )}

            {/* Messages d'erreur/succès */}
            <AnimatePresence>
              {error && (
                <motion.div
                  className="flex items-center gap-2 mt-2 text-[#EB5757] text-sm"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <AlertTriangle className="w-4 h-4" />
                  {error}
                </motion.div>
              )}
              {success && (
                <motion.div
                  className="flex items-center gap-2 mt-2 text-[#27AE60] text-sm"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <Check className="w-4 h-4" />
                  {success}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bouton close */}
          <motion.button
            className="
              absolute top-3 right-4 w-9 h-9 rounded-full flex items-center justify-center
              bg-[#212837] border-2 border-[#384356] text-white
              hover:bg-[#232B3E] hover:border-[#46B8EA] transition-colors
              focus:outline-none focus:ring-2 focus:ring-[#7DE3F4]
            "
            onClick={onClose}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            initial={{ scale: 0.97, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.09 }}
            aria-label="Fermer le panel"
            tabIndex={0}
          >
            <X className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Body avec scroll */}
        <div className="flex-1 overflow-y-auto px-8 py-7">
          {/* Section résumé */}
          <div className="mb-5">
            <motion.div
              className="flex flex-wrap items-center gap-2 mb-4"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.08 }}
            >
              <span className="text-[#A3B1C6] text-sm">Tags:</span>
              {['dev', 'design', 'urgent'].map((tag, index) => (
                <motion.span
                  key={tag}
                  className="
                    inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
                    bg-[#232B3E] text-[#A3B1C6] border border-[#384356]
                  "
                  style={{ 
                    height: '22px',
                    minWidth: '38px'
                  }}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.08, 
                    delay: index * 0.036 
                  }}
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>
          </div>

          {/* Section fichiers */}
          <div className="space-y-3">
            {files.map((file, index) => (
              <motion.div
                key={file.id}
                className="
                  flex items-center gap-4 p-4 rounded-xl bg-[#212837] hover:bg-[#232B3E]
                  transition-all duration-90 hover:scale-[1.02] hover:shadow-lg
                  cursor-pointer group
                "
                style={{ height: '56px' }}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.08, 
                  delay: index * 0.036 
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Icône fichier */}
                <div 
                  className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ 
                    backgroundColor: `${getFileTypeColor(file.type)}20`,
                    color: getFileTypeColor(file.type)
                  }}
                >
                  {getFileIcon(file.type)}
                </div>

                {/* Nom fichier */}
                <div className="flex-1 min-w-0">
                  <h3 
                    className="text-white font-semibold truncate"
                    style={{ 
                      fontSize: '1.07rem',
                      fontWeight: 600
                    }}
                  >
                    {file.name}
                  </h3>
                </div>

                {/* Tag type */}
                <div 
                  className="px-2 py-1 rounded-full text-xs font-medium"
                  style={{ 
                    backgroundColor: `${getFileTypeColor(file.type)}20`,
                    color: getFileTypeColor(file.type)
                  }}
                >
                  {file.type}
                </div>

                {/* Menu contextuel */}
                <div className="relative">
                  <motion.button
                    className="
                      w-8 h-8 rounded-lg bg-[#252C42] flex items-center justify-center
                      opacity-0 group-hover:opacity-100 transition-opacity duration-90
                      hover:bg-[#384356] focus:outline-none focus:ring-2 focus:ring-[#7DE3F4]
                    "
                    onClick={(e) => handleContextMenu(e, file.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    tabIndex={0}
                  >
                    <MoreVertical className="w-4 h-4 text-[#A3B1C6]" />
                  </motion.button>

                  {/* Menu contextuel popover */}
                  <AnimatePresence>
                    {showContextMenu === file.id && (
                      <motion.div
                        ref={contextMenuRef}
                        className="
                          absolute right-0 top-full mt-3 w-48 bg-[#232B3E] border border-[#46B8EA55]
                          rounded-lg shadow-2xl z-50 overflow-hidden
                        "
                        style={{ 
                          boxShadow: '0 4px 32px rgba(0, 0, 0, 0.1)',
                          zIndex: 160
                        }}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ duration: 0.08 }}
                      >
                        {[
                          { icon: Edit3, label: 'Éditer', action: 'edit' },
                          { icon: Copy, label: 'Dupliquer', action: 'duplicate' },
                          { icon: Move, label: 'Déplacer', action: 'move' },
                          { icon: Trash2, label: 'Supprimer', action: 'delete', danger: true }
                        ].map((item, idx) => (
                          <motion.button
                            key={item.action}
                            className={`
                              w-full flex items-center gap-3 px-5 py-3 text-left
                              hover:bg-[#384356] transition-colors duration-90
                              ${item.danger ? 'text-[#EF4444]' : 'text-white'}
                            `}
                            onClick={() => handleContextAction(item.action, file.id)}
                            whileHover={{ x: 4 }}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ 
                              duration: 0.08, 
                              delay: idx * 0.02 
                            }}
                          >
                            <item.icon className="w-4 h-4" />
                            <span className="font-semibold text-sm">{item.label}</span>
                          </motion.button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bouton Ajouter ou Empty State */}
          {files.length === 0 ? (
            <motion.div
              className="flex flex-col items-center justify-center py-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.14 }}
            >
              <div className="w-12 h-12 rounded-full bg-[#384356] flex items-center justify-center mb-4">
                <Folder className="w-6 h-6 text-[#384356]" />
              </div>
              <p className="text-[#A3B1C6] text-base">
                Aucun élément pour ce projet
              </p>
            </motion.div>
          ) : (
            <motion.div className="mt-6">
              <motion.button
                className={`
                  w-full flex items-center justify-center gap-3 px-6 py-3 rounded-xl font-bold
                  transition-all duration-90 focus:outline-none focus:ring-2 focus:ring-[#7DE3F4]
                  ${files.length >= 10 
                    ? 'bg-[#384356] text-[#A3B1C6] cursor-not-allowed' 
                    : 'bg-[#46B8EA] text-white hover:bg-[#63C1F0] hover:scale-[1.05] hover:shadow-lg'
                  }
                `}
                style={{ 
                  height: '46px',
                  letterSpacing: '0.01em',
                  textTransform: 'uppercase'
                }}
                onClick={handleAddFile}
                disabled={files.length >= 10}
                whileHover={files.length < 10 ? { scale: 1.05 } : {}}
                whileTap={files.length < 10 ? { scale: 0.98 } : {}}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.08 }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.08 }}
                >
                  <Plus className="w-5 h-5" />
                </motion.div>
                + Ajouter
              </motion.button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </>
  );
}
