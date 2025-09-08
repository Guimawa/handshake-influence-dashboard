import { useState } from 'react';
import { motion } from 'framer-motion';

const MemberAvatar = ({ 
  member = {},
  size = 'md', // sm, md, lg, xl
  showStatus = true,
  className = ""
}) => {
  const [imageError, setImageError] = useState(false);

  const {
    name = 'Utilisateur',
    avatar = null,
    status = 'offline', // online, offline, busy, away
    color = '#3B82F6'
  } = member;

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'w-8 h-8';
      case 'lg':
        return 'w-12 h-12';
      case 'xl':
        return 'w-16 h-16';
      default:
        return 'w-10 h-10';
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'online':
        return 'bg-[#22C55E]';
      case 'busy':
        return 'bg-[#EF4444]';
      case 'away':
        return 'bg-[#F7C873]';
      default:
        return 'bg-[#6B7280]';
    }
  };

  const getStatusLabel = () => {
    switch (status) {
      case 'online':
        return 'En ligne';
      case 'busy':
        return 'Occupé';
      case 'away':
        return 'Absent';
      default:
        return 'Hors ligne';
    }
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getTextSize = () => {
    switch (size) {
      case 'sm':
        return 'text-xs';
      case 'lg':
        return 'text-sm';
      case 'xl':
        return 'text-base';
      default:
        return 'text-xs';
    }
  };

  const getBadgeSize = () => {
    switch (size) {
      case 'sm':
        return 'w-2 h-2';
      case 'lg':
        return 'w-3 h-3';
      case 'xl':
        return 'w-4 h-4';
      default:
        return 'w-3 h-3';
    }
  };

  return (
    <motion.div
      className={`relative ${getSizeClasses()} rounded-full overflow-hidden bg-[#222C3B] 
                 flex items-center justify-center shadow-md ${className}`}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        duration: 0.09, 
        ease: [0.23, 1, 0.32, 1] 
      }}
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.12, ease: [0.23, 1, 0.32, 1] }
      }}
      title={name}
      tabIndex={0}
      role="button"
      aria-label={`Avatar de ${name}, ${getStatusLabel()}`}
    >
      {/* Image ou initiales */}
      {avatar && !imageError ? (
        <img
          src={avatar}
          alt={name}
          className="w-full h-full object-cover"
          onError={() => setImageError(true)}
        />
      ) : (
        <div
          className={`w-full h-full flex items-center justify-center font-bold ${getTextSize()}`}
          style={{ backgroundColor: color }}
        >
          {getInitials(name)}
        </div>
      )}

      {/* Badge de statut */}
      {showStatus && (
        <motion.span
          className={`absolute bottom-0 right-0 ${getBadgeSize()} rounded-full border-2 border-[#232B3E] 
                     ${getStatusColor()}`}
          aria-label={getStatusLabel()}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            duration: 0.2, 
            delay: 0.1,
            ease: [0.23, 1, 0.32, 1] 
          }}
        />
      )}
    </motion.div>
  );
};

export default MemberAvatar;
