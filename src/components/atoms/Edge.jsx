import { motion } from 'framer-motion';

const Edge = ({ 
  edge,
  sourcePos,
  targetPos,
  isHighlighted = false,
  isHovered = false,
  className = ""
}) => {
  // Couleurs exactes selon spécifications
  const normalStroke = 'rgba(145, 163, 193, 0.33)';
  const highlightStroke = '#3B82F6';
  const strokeWidth = isHighlighted ? 3 : 2;

  return (
    <motion.line
      x1={sourcePos.x}
      y1={sourcePos.y}
      x2={targetPos.x}
      y2={targetPos.y}
      stroke={isHighlighted ? highlightStroke : normalStroke}
      strokeWidth={strokeWidth}
      className={`transition-all duration-100 ${className}`}
      initial={{ 
        pathLength: 0, 
        opacity: 0 
      }}
      animate={{ 
        pathLength: 1, 
        opacity: 1 
      }}
      transition={{ 
        duration: 0.1, 
        ease: [0.23, 1, 0.32, 1] 
      }}
      style={{
        strokeLinecap: 'round',
        strokeLinejoin: 'round'
      }}
    />
  );
};

export default Edge;
