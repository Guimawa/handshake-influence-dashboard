import { useState } from 'react';
import { motion } from 'framer-motion';

const QuickReactions = ({ 
  reactions = [],
  onReactionClick,
  maxReactions = 6,
  className = ""
}) => {
  const [localReactions, setLocalReactions] = useState(reactions);

  const defaultReactions = [
    { id: 'like', emoji: '👍', label: 'J\'aime', count: 0, active: false },
    { id: 'love', emoji: '❤️', label: 'J\'adore', count: 0, active: false },
    { id: 'laugh', emoji: '😂', label: 'Rire', count: 0, active: false },
    { id: 'wow', emoji: '😮', label: 'Wow', count: 0, active: false },
    { id: 'sad', emoji: '😢', label: 'Triste', count: 0, active: false },
    { id: 'angry', emoji: '😠', label: 'En colère', count: 0, active: false }
  ];

  const reactionsData = reactions.length > 0 ? reactions : defaultReactions;
  const displayedReactions = reactionsData.slice(0, maxReactions);

  const handleReactionClick = (reactionId) => {
    setLocalReactions(prev => {
      const updatedReactions = prev.map(reaction => {
        if (reaction.id === reactionId) {
          const newActive = !reaction.active;
          return {
            ...reaction,
            active: newActive,
            count: newActive ? reaction.count + 1 : Math.max(0, reaction.count - 1)
          };
        }
        return reaction;
      });
      
      onReactionClick?.(updatedReactions);
      return updatedReactions;
    });
  };

  const getReactionStyle = (reaction) => {
    if (reaction.active) {
      return 'bg-[#3B82F6] text-white border-[#3B82F6] shadow-lg';
    }
    return 'bg-[#232B3E] text-[#AAB7C6] border-[#3B82F6] hover:bg-[#3B82F6] hover:text-white';
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {displayedReactions.map((reaction, index) => (
        <motion.button
          key={reaction.id}
          className={`
            flex items-center gap-1 px-3 py-2 rounded-full border-2 transition-all duration-120
            focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:outline-none
            ${getReactionStyle(reaction)}
          `}
          onClick={() => handleReactionClick(reaction.id)}
          aria-label={`${reaction.label} (${reaction.count})`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            duration: 0.2, 
            delay: index * 0.05,
            ease: [0.23, 1, 0.32, 1] 
          }}
          whileHover={{ 
            scale: 1.05,
            transition: { duration: 0.12, ease: [0.23, 1, 0.32, 1] }
          }}
          whileTap={{ 
            scale: 0.95,
            transition: { duration: 0.08, ease: [0.23, 1, 0.32, 1] }
          }}
        >
          {/* Emoji */}
          <motion.span
            className="text-lg"
            animate={reaction.active ? { 
              scale: [1, 1.2, 1],
              rotate: [0, 5, -5, 0]
            } : {}}
            transition={{ 
              duration: 0.3, 
              ease: [0.23, 1, 0.32, 1] 
            }}
          >
            {reaction.emoji}
          </motion.span>

          {/* Compteur */}
          {reaction.count > 0 && (
            <motion.span
              className="text-sm font-semibold min-w-[1.2rem] text-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ 
                duration: 0.2, 
                ease: [0.23, 1, 0.32, 1] 
              }}
            >
              {reaction.count}
            </motion.span>
          )}
        </motion.button>
      ))}

      {/* Bouton "Plus" si il y a plus de réactions */}
      {reactionsData.length > maxReactions && (
        <motion.button
          className="flex items-center gap-1 px-3 py-2 rounded-full border-2 border-[#3B82F6] 
                     bg-[#232B3E] text-[#AAB7C6] hover:bg-[#3B82F6] hover:text-white 
                     transition-all duration-120 focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
          aria-label="Voir plus de réactions"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            duration: 0.2, 
            delay: displayedReactions.length * 0.05,
            ease: [0.23, 1, 0.32, 1] 
          }}
          whileHover={{ 
            scale: 1.05,
            transition: { duration: 0.12, ease: [0.23, 1, 0.32, 1] }
          }}
          whileTap={{ 
            scale: 0.95,
            transition: { duration: 0.08, ease: [0.23, 1, 0.32, 1] }
          }}
        >
          <span className="text-lg">+</span>
          <span className="text-sm font-semibold">
            {reactionsData.length - maxReactions}
          </span>
        </motion.button>
      )}
    </div>
  );
};

export default QuickReactions;
