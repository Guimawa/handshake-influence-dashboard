import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MemberAvatar from './MemberAvatar';

const AvatarGroup = ({ 
  members = [],
  maxVisible = 4,
  size = 'md',
  showTooltip = true,
  onMemberClick,
  onMoreClick,
  className = ""
}) => {
  const [hoveredMember, setHoveredMember] = useState(null);

  const defaultMembers = [
    { id: 1, name: 'Alice', avatar: null, status: 'online', color: '#3B82F6' },
    { id: 2, name: 'Bob', avatar: null, status: 'away', color: '#7DE3F4' },
    { id: 3, name: 'Charlie', avatar: null, status: 'offline', color: '#F69AC1' },
    { id: 4, name: 'Diana', avatar: null, status: 'busy', color: '#F7C873' },
    { id: 5, name: 'Eve', avatar: null, status: 'online', color: '#10B981' },
    { id: 6, name: 'Frank', avatar: null, status: 'offline', color: '#8B5CF6' }
  ];

  const membersData = members.length > 0 ? members : defaultMembers;
  const visibleMembers = membersData.slice(0, maxVisible);
  const remainingCount = Math.max(0, membersData.length - maxVisible);

  const handleMemberClick = (member) => {
    onMemberClick?.(member);
  };

  const handleMoreClick = () => {
    onMoreClick?.(membersData.slice(maxVisible));
  };

  const getOverlapOffset = () => {
    switch (size) {
      case 'sm':
        return '-space-x-2';
      case 'lg':
        return '-space-x-4';
      case 'xl':
        return '-space-x-5';
      default:
        return '-space-x-3';
    }
  };

  return (
    <div className={`flex ${getOverlapOffset()} ${className}`}>
      {/* Membres visibles */}
      {visibleMembers.map((member, index) => (
        <motion.div
          key={member.id}
          className="relative"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ 
            duration: 0.2, 
            delay: index * 0.05,
            ease: [0.23, 1, 0.32, 1] 
          }}
          whileHover={{ 
            scale: 1.1,
            zIndex: 10,
            transition: { duration: 0.12, ease: [0.23, 1, 0.32, 1] }
          }}
        >
          <MemberAvatar
            member={member}
            size={size}
            showStatus={true}
            className="cursor-pointer"
            onClick={() => handleMemberClick(member)}
          />
          
          {/* Tooltip */}
          {showTooltip && hoveredMember === member.id && (
            <motion.div
              className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 
                         bg-[#232B3E] text-[#F1F5F9] text-xs rounded shadow-lg whitespace-nowrap z-20"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.15, ease: [0.23, 1, 0.32, 1] }}
            >
              {member.name}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 
                              border-l-4 border-r-4 border-t-4 border-transparent border-t-[#232B3E]"></div>
            </motion.div>
          )}
        </motion.div>
      ))}

      {/* Badge "+X" pour les membres restants */}
      {remainingCount > 0 && (
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            duration: 0.2, 
            delay: visibleMembers.length * 0.05,
            ease: [0.23, 1, 0.32, 1] 
          }}
          whileHover={{ 
            scale: 1.1,
            zIndex: 10,
            transition: { duration: 0.12, ease: [0.23, 1, 0.32, 1] }
          }}
        >
          <motion.button
            className={`${size === 'sm' ? 'w-8 h-8' : size === 'lg' ? 'w-12 h-12' : size === 'xl' ? 'w-16 h-16' : 'w-10 h-10'} 
                       rounded-full bg-[#7DE3F4] text-[#232B3E] flex items-center justify-center font-bold 
                       border-2 border-[#232B3E] cursor-pointer transition-all duration-120
                       hover:bg-[#5DD5F4] focus-visible:ring-2 focus-visible:ring-[#3B82F6]`}
            onClick={handleMoreClick}
            aria-label={`${remainingCount} membres en plus`}
            onMouseEnter={() => setHoveredMember('more')}
            onMouseLeave={() => setHoveredMember(null)}
            whileTap={{ scale: 0.95 }}
          >
            <span className={`${size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-sm' : size === 'xl' ? 'text-base' : 'text-xs'}`}>
              +{remainingCount}
            </span>
          </motion.button>

          {/* Tooltip pour le badge "+X" */}
          {showTooltip && hoveredMember === 'more' && (
            <motion.div
              className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 
                         bg-[#232B3E] text-[#F1F5F9] text-xs rounded shadow-lg whitespace-nowrap z-20"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.15, ease: [0.23, 1, 0.32, 1] }}
            >
              {remainingCount} membre{remainingCount > 1 ? 's' : ''} en plus
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 
                              border-l-4 border-r-4 border-t-4 border-transparent border-t-[#232B3E]"></div>
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default AvatarGroup;
