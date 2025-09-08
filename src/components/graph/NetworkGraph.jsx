import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NodeBubble from '../atoms/NodeBubble';
import Edge from '../atoms/Edge';

const NetworkGraph = ({ 
  data = { nodes: [], edges: [] },
  onNodeClick,
  onNodeAdd,
  onNodeRemove,
  onNodeDrag,
  className = "",
  width = 800,
  height = 600,
  isLoading = false
}) => {
  const [selectedNode, setSelectedNode] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [draggedNode, setDraggedNode] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const svgRef = useRef(null);
  const containerRef = useRef(null);

  // Positionnement force-directed simplifié
  const getNodePosition = useCallback((node, index) => {
    if (node.x && node.y) return { x: node.x, y: node.y };
    
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) * 0.3;
    
    if (node.group === 'main') {
      return { x: centerX, y: centerY };
    }
    
    // Layout orbital autour du centre
    const angle = (index * 2 * Math.PI) / Math.max(data.nodes.length - 1, 1);
    const distance = radius + (Math.random() - 0.5) * 50; // Légère variation
    
    return {
      x: centerX + Math.cos(angle) * distance,
      y: centerY + Math.sin(angle) * distance
    };
  }, [data.nodes.length, width, height]);

  const handleNodeClick = (node) => {
    setSelectedNode(selectedNode === node?.id ? null : node?.id);
    onNodeClick?.(node);
  };

  const handleNodeHover = (node) => {
    setHoveredNode(node?.id);
  };

  const handleNodeLeave = (node) => {
    setHoveredNode(null);
  };

  const handleDragStart = (node, event) => {
    setDraggedNode(node.id);
    setIsDragging(true);
    
    const rect = svgRef.current.getBoundingClientRect();
    const nodePos = getNodePosition(node, data.nodes.findIndex(n => n.id === node.id));
    
    setDragOffset({
      x: event.clientX - rect.left - nodePos.x,
      y: event.clientY - rect.top - nodePos.y
    });
  };

  const handleDragEnd = (node) => {
    setDraggedNode(null);
    setIsDragging(false);
    setDragOffset({ x: 0, y: 0 });
  };

  const handleMouseMove = useCallback((event) => {
    if (draggedNode && svgRef.current) {
      const rect = svgRef.current.getBoundingClientRect();
      const newX = event.clientX - rect.left - dragOffset.x;
      const newY = event.clientY - rect.top - dragOffset.y;
      
      onNodeDrag?.(draggedNode, { x: newX, y: newY });
    }
  }, [draggedNode, dragOffset, onNodeDrag]);

  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      handleDragEnd(null);
    }
  }, [isDragging]);

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      setSelectedNode(null);
      setHoveredNode(null);
    }
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('keydown', handleKeyDown);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // Loader/Skeleton selon spécifications
  if (isLoading) {
    return (
      <div className={`bg-[#212837] rounded-xl p-10 min-h-[${height}px] flex items-center justify-center ${className}`}>
        <div className="relative w-full h-full">
          {/* Nodes fantômes */}
          {[1, 2, 3, 4, 5].map((i) => (
            <motion.div
              key={i}
              className="absolute w-12 h-12 bg-[#384356] rounded-full opacity-35"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 2) * 20}%`
              }}
              animate={{
                opacity: [0.35, 0.6, 0.35],
                scale: [1, 1.05, 1]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.1
              }}
            />
          ))}
          
          {/* Edges fantômes */}
          <svg className="absolute inset-0 w-full h-full">
            {[1, 2, 3].map((i) => (
              <motion.line
                key={i}
                x1={`${20 + i * 15}%`}
                y1="30%"
                x2={`${20 + (i + 1) * 15}%`}
                y2="50%"
                stroke="#384356"
                strokeWidth="2"
                strokeDasharray="5,5"
                opacity="0.35"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: i * 0.2 }}
              />
            ))}
          </svg>
        </div>
      </div>
    );
  }

  // Empty state selon spécifications exactes
  if (data.nodes.length === 0) {
    return (
      <div className={`bg-[#212837] rounded-xl p-10 min-h-[${height}px] flex items-center justify-center relative ${className}`}>
        {/* Halo subtil selon spécifications */}
        <div 
          className="absolute inset-0 opacity-15"
          style={{
            background: `radial-gradient(circle at center, rgba(125, 227, 244, 0.15) 0%, transparent 70%)`
          }}
        />
        
        <motion.div
          className="text-center relative z-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.16, ease: [0.23, 1, 0.32, 1] }}
        >
          {/* Icône chart centrale selon spécifications */}
          <div className="w-16 h-16 bg-[#7DE3F4] bg-opacity-18 rounded-full flex items-center justify-center mb-4 mx-auto">
            <svg className="w-8 h-8 text-[#7DE3F4] opacity-70" fill="none" viewBox="0 0 24 24">
              <path 
                stroke="currentColor" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </div>
          
          <h3 className="text-[#F1F5F9] text-lg font-semibold mb-2">Aucun node</h3>
          <p className="text-[#AAB7C6] text-base mb-4">Ajoutez-en un pour commencer</p>
          
          {onNodeAdd && (
            <motion.button
              className="px-6 py-2 rounded-xl bg-[#3B82F6] text-white font-semibold shadow hover:bg-[#2563eb] transition-all duration-120"
              onClick={onNodeAdd}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Ajouter un node
            </motion.button>
          )}
        </motion.div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className={`relative bg-[#212837] rounded-xl overflow-hidden ${className}`}
      style={{ width, height }}
    >
      {/* Halo subtil autour de la bulle centrale selon spécifications */}
      <div 
        className="absolute inset-0 opacity-15"
        style={{
          background: `radial-gradient(circle at center, rgba(125, 227, 244, 0.15) 0%, transparent 70%)`
        }}
      />
      
      <svg
        ref={svgRef}
        width={width}
        height={height}
        className="w-full h-full relative z-10"
      >
        {/* Edges */}
        {data.edges.map((edge, index) => {
          const sourceNode = data.nodes.find(n => n.id === edge.source);
          const targetNode = data.nodes.find(n => n.id === edge.target);
          
          if (!sourceNode || !targetNode) return null;
          
          const sourcePos = getNodePosition(sourceNode, data.nodes.findIndex(n => n.id === sourceNode.id));
          const targetPos = getNodePosition(targetNode, data.nodes.findIndex(n => n.id === targetNode.id));
          
          const isHighlighted = selectedNode === edge.source || selectedNode === edge.target || 
                               hoveredNode === edge.source || hoveredNode === edge.target;
          
          return (
            <Edge
              key={index}
              edge={edge}
              sourcePos={sourcePos}
              targetPos={targetPos}
              isHighlighted={isHighlighted}
              isHovered={hoveredNode === edge.source || hoveredNode === edge.target}
            />
          );
        })}
      </svg>

      {/* Nodes */}
      <AnimatePresence>
        {data.nodes.map((node, index) => {
          const position = getNodePosition(node, index);
          const isSelected = selectedNode === node.id;
          const isHovered = hoveredNode === node.id;
          const isDragged = draggedNode === node.id;
          
          return (
            <NodeBubble
              key={node.id}
              node={node}
              isSelected={isSelected}
              isHovered={isHovered}
              isDragged={isDragged}
              onSelect={handleNodeClick}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              onHover={handleNodeHover}
              onLeave={handleNodeLeave}
              style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
                transform: 'translate(-50%, -50%)'
              }}
            />
          );
        })}
      </AnimatePresence>

      {/* Bouton d'ajout selon spécifications */}
      {onNodeAdd && (
        <motion.button
          className="absolute top-4 right-4 w-12 h-12 bg-[#3B82F6] text-white rounded-full shadow-lg 
                     hover:bg-[#2563eb] focus-visible:ring-2 focus-visible:ring-[#3B82F6] 
                     transition-all duration-120 z-20"
          onClick={onNodeAdd}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Ajouter un node"
        >
          <svg className="w-6 h-6 mx-auto" fill="none" viewBox="0 0 24 24">
            <path 
              stroke="currentColor" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M12 6v6m0 0v6m0-6h6m-6 0H6" 
            />
          </svg>
        </motion.button>
      )}
    </div>
  );
};

export default NetworkGraph;