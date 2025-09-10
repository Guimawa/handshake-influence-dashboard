import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

const NodeBubble = ({ 
  node,
  isSelected = false,
  isHovered = false,
  isDragged = false,
  onSelect,
  onDragStart,
  onDragEnd,
  onHover,
  onLeave,
  className = ""
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const nodeRef = useRef(null);

  // Palette de couleurs exacte selon spécifications
  const getNodeColor = (node) => {
    if (node.color) return node.color;
    if (node.group === 'main') return '#7DE3F4';
    if (node.group === 'inactive') return '#384356';
    return '#F69AC1'; // Fallback
  };

  const getNodeSize = (node) => {
    return node.size || (node.group === 'main' ? 56 : 40);
  };

  const color = getNodeColor(node);
  const size = getNodeSize(node);

  const handleClick = (e) => {
    e.stopPropagation();
    onSelect?.(node);
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    onDragStart?.(node, e);
  };

  const handleMouseUp = () => {
    onDragEnd?.(node);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect?.(node);
    } else if (e.key === 'Escape') {
      onSelect?.(null);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    setShowTooltip(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setShowTooltip(false);
  };

  const handleMouseEnter = () => {
    onHover?.(node);
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    onLeave?.(node);
    setShowTooltip(false);
  };

  return (
    <>
      <motion.div
        ref={nodeRef}
        className={`
          node-bubble absolute flex items-center justify-center font-bold text-white
          cursor-grab select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]
          ${className}
        `}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          backgroundColor: color,
          borderRadius: '50%',
          fontSize: '0.98em',
          zIndex: isSelected ? 3 : isHovered ? 2 : 1,
          minWidth: '28px',
          minHeight: '28px'
        }}
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        tabIndex={0}
        role="button"
        aria-label={`Node: ${node.label}`}
        aria-describedby={showTooltip ? `tooltip-${node.id}` : undefined}
        // Animations selon spécifications exactes
        initial={{ 
          scale: 0.6, 
          opacity: 0 
        }}
        animate={{ 
          scale: isDragged ? 1.16 : isHovered ? 1.12 : 1,
          opacity: isDragged ? 0.95 : 1,
          boxShadow: isSelected 
            ? `0 4px 24px 0 ${color}60, 0 0 0 4px #3B82F6`
            : isHovered || isFocused
            ? `0 4px 20px 0 ${color}50, 0 0 0 2px #F1F5F9`
            : `0 2px 16px 0 ${color}40`,
          border: isSelected 
            ? '4px solid #3B82F6'
            : isHovered || isFocused
            ? '2px solid #F1F5F9'
            : 'none'
        }}
        exit={{ 
          scale: 0.7, 
          opacity: 0 
        }}
        transition={{ 
          duration: 0.18, 
          ease: [0.23, 1, 0.32, 1] 
        }}
        whileHover={{ 
          scale: 1.12,
          transition: { 
            duration: 0.12, 
            ease: [0.23, 1, 0.32, 1] 
          }
        }}
        whileTap={{ 
          scale: 1.16,
          transition: { 
            duration: 0.08, 
            ease: [0.23, 1, 0.32, 1] 
          }
        }}
      >
        <span className="truncate max-w-[90%] text-center text-white font-bold">
          {node.label}
        </span>
      </motion.div>

      {/* Tooltip */}
      {showTooltip && (
        <motion.div
          id={`tooltip-${node.id}`}
          className="absolute z-50 px-3 py-2 bg-[#232B3E] text-white text-sm rounded-lg shadow-lg pointer-events-none"
          style={{
            top: `${size + 10}px`,
            left: '50%',
            transform: 'translateX(-50%)',
            whiteSpace: 'nowrap'
          }}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1.03 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ 
            duration: 0.11, 
            ease: [0.23, 1, 0.32, 1] 
          }}
          role="tooltip"
          aria-live="polite"
        >
          {node.label}
          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-[#232B3E] rotate-45"></div>
        </motion.div>
      )}
    </>
  );
};

export default NodeBubble;
