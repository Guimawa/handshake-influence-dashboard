import React, { useState, useEffect } from 'react';

const InteractiveNetworkGraph = () => {
  const [hoveredNode, setHoveredNode] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [animationFrame, setAnimationFrame] = useState(0);

  // Sample data for network nodes with more realistic positioning
  const nodes = [
    { id: 1, x: 350, y: 200, size: 45, color: '#3B82F6', label: 'Central Authority', category: 'government' },
    { id: 2, x: 200, y: 120, size: 30, color: '#10B981', label: 'Green Finance Corp', category: 'finance' },
    { id: 3, x: 500, y: 100, size: 35, color: '#F59E0B', label: 'Sustainability Index', category: 'research' },
    { id: 4, x: 150, y: 280, size: 25, color: '#EF4444', label: 'Climate Action Fund', category: 'ngo' },
    { id: 5, x: 550, y: 250, size: 40, color: '#8B5CF6', label: 'ESG Analytics', category: 'tech' },
    { id: 6, x: 100, y: 200, size: 20, color: '#06B6D4', label: 'Carbon Credits Ltd', category: 'finance' },
    { id: 7, x: 400, y: 320, size: 28, color: '#F97316', label: 'Renewable Energy Co', category: 'energy' },
    { id: 8, x: 600, y: 150, size: 22, color: '#84CC16', label: 'Impact Investors', category: 'investment' },
    { id: 9, x: 120, y: 350, size: 18, color: '#EC4899', label: 'Green Bonds Agency', category: 'finance' },
    { id: 10, x: 580, y: 320, size: 26, color: '#6366F1', label: 'Sustainable Tech Hub', category: 'tech' },
  ];

  const connections = [
    { from: 1, to: 2, strength: 0.8 },
    { from: 1, to: 3, strength: 0.9 },
    { from: 1, to: 5, strength: 0.7 },
    { from: 2, to: 6, strength: 0.6 },
    { from: 3, to: 8, strength: 0.5 },
    { from: 4, to: 7, strength: 0.4 },
    { from: 5, to: 10, strength: 0.8 },
    { from: 1, to: 4, strength: 0.6 },
    { from: 7, to: 9, strength: 0.3 },
    { from: 8, to: 10, strength: 0.5 },
  ];

  // Animation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationFrame(prev => prev + 1);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const handleNodeClick = (node) => {
    setSelectedNode(selectedNode?.id === node.id ? null : node);
  };

  const getNodeConnections = (nodeId) => {
    return connections.filter(conn => conn.from === nodeId || conn.to === nodeId);
  };

  const isNodeConnected = (nodeId) => {
    if (!selectedNode) return false;
    return getNodeConnections(selectedNode.id).some(conn => 
      conn.from === nodeId || conn.to === nodeId
    );
  };

  return (
    <div className="relative w-full h-96 bg-gray-800/50 rounded-lg overflow-hidden">
      <svg className="w-full h-full">
        {/* Render connections */}
        {connections.map((connection, index) => {
          const fromNode = nodes.find(n => n.id === connection.from);
          const toNode = nodes.find(n => n.id === connection.to);
          const isHighlighted = selectedNode && (
            connection.from === selectedNode.id || connection.to === selectedNode.id
          );
          
          return (
            <line
              key={index}
              x1={fromNode.x}
              y1={fromNode.y}
              x2={toNode.x}
              y2={toNode.y}
              stroke={isHighlighted ? fromNode.color : "#374151"}
              strokeWidth={isHighlighted ? "2" : "1"}
              opacity={isHighlighted ? "0.8" : "0.3"}
              className="transition-all duration-300"
            />
          );
        })}
        
        {/* Render nodes */}
        {nodes.map((node) => {
          const isHovered = hoveredNode?.id === node.id;
          const isSelected = selectedNode?.id === node.id;
          const isConnected = isNodeConnected(node.id);
          const shouldHighlight = !selectedNode || isSelected || isConnected;
          
          return (
            <g key={node.id}>
              {/* Outer glow effect */}
              <circle
                cx={node.x}
                cy={node.y}
                r={node.size + (isHovered ? 8 : 4)}
                fill={node.color}
                opacity={isHovered ? "0.2" : "0.1"}
                className="transition-all duration-300"
              />
              
              {/* Main node */}
              <circle
                cx={node.x}
                cy={node.y}
                r={node.size + (isHovered ? 3 : 0)}
                fill={node.color}
                opacity={shouldHighlight ? "0.9" : "0.4"}
                className="hover:opacity-100 transition-all duration-300 cursor-pointer"
                onMouseEnter={() => setHoveredNode(node)}
                onMouseLeave={() => setHoveredNode(null)}
                onClick={() => handleNodeClick(node)}
              />
              
              {/* Pulse animation for selected node */}
              {isSelected && (
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={node.size + 10 + Math.sin(animationFrame * 0.3) * 5}
                  fill="none"
                  stroke={node.color}
                  strokeWidth="2"
                  opacity={0.6 - Math.sin(animationFrame * 0.3) * 0.3}
                  className="transition-opacity duration-100"
                />
              )}
              
              {/* Node label on hover */}
              {isHovered && (
                <g>
                  <rect
                    x={node.x - node.label.length * 3}
                    y={node.y - node.size - 25}
                    width={node.label.length * 6}
                    height="16"
                    fill="rgba(0, 0, 0, 0.8)"
                    rx="4"
                  />
                  <text
                    x={node.x}
                    y={node.y - node.size - 12}
                    textAnchor="middle"
                    className="text-xs fill-white font-medium"
                  >
                    {node.label}
                  </text>
                </g>
              )}
            </g>
          );
        })}
      </svg>
      
      {/* Node details panel */}
      {selectedNode && (
        <div className="absolute top-4 right-4 bg-gray-900/90 backdrop-blur-sm rounded-lg p-4 border border-gray-700 max-w-xs">
          <h4 className="text-white font-semibold mb-2">{selectedNode.label}</h4>
          <p className="text-gray-400 text-sm mb-2">Category: {selectedNode.category}</p>
          <p className="text-gray-400 text-sm mb-2">
            Connections: {getNodeConnections(selectedNode.id).length}
          </p>
          <div className="flex items-center space-x-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: selectedNode.color }}
            ></div>
            <span className="text-xs text-gray-400">Influence Score: {selectedNode.size + 50}</span>
          </div>
        </div>
      )}
      
      {/* Overlay text */}
      <div className="absolute bottom-4 left-4 text-gray-400 text-sm">
        <p>Network visualization of influence connections</p>
        <p className="text-xs mt-1">Click on nodes to explore connections</p>
      </div>
    </div>
  );
};

export default InteractiveNetworkGraph;

