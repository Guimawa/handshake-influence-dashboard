import React, { useState, useRef, useEffect } from 'react';

/**
 * Composant NetworkGraph
 * Zone 16 - GRAPH/CHART selon spécifications
 */

const NetworkGraph = ({ 
  data = [],
  onNodeClick,
  onNodeHover,
  width = 400,
  height = 300,
  className = ""
}) => {
  const svgRef = useRef(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);

  // Mock data si aucune donnée fournie
  const mockData = data.length > 0 ? data : [
    { id: 1, x: 100, y: 100, label: 'Node 1', connections: [2, 3] },
    { id: 2, x: 200, y: 150, label: 'Node 2', connections: [1, 3] },
    { id: 3, x: 150, y: 200, label: 'Node 3', connections: [1, 2] }
  ];

  const handleNodeClick = (node) => {
    setSelectedNode(node);
    onNodeClick && onNodeClick(node);
  };

  const handleNodeHover = (node) => {
    setHoveredNode(node);
    onNodeHover && onNodeHover(node);
  };

  const handleNodeLeave = () => {
    setHoveredNode(null);
  };

  return (
    <div className={`network-graph bg-[#232B3E] rounded-xl p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-[#F1F5F9]">Network Graph</h3>
        <div className="flex gap-2">
          <button className="px-3 py-1 text-xs bg-[#222C3B] text-[#AAB7C6] rounded hover:bg-[#1a1f2e] transition-colors">
            Reset View
          </button>
          <button className="px-3 py-1 text-xs bg-[#3B82F6] text-white rounded hover:bg-[#2563eb] transition-colors">
            Fullscreen
          </button>
        </div>
      </div>
      
      <div className="relative">
        <svg
          ref={svgRef}
          width={width}
          height={height}
          className="w-full h-full border border-[#222C3B] rounded-lg"
          viewBox={`0 0 ${width} ${height}`}
        >
          {/* Background Grid */}
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#222C3B" strokeWidth="0.5" opacity="0.3"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {/* Connections */}
          {mockData.map(node => 
            node.connections?.map(connectionId => {
              const targetNode = mockData.find(n => n.id === connectionId);
              if (!targetNode) return null;
              
              return (
                <line
                  key={`${node.id}-${connectionId}`}
                  x1={node.x}
                  y1={node.y}
                  x2={targetNode.x}
                  y2={targetNode.y}
                  stroke="#3B82F6"
                  strokeWidth="2"
                  opacity="0.6"
                />
              );
            })
          )}
          
          {/* Nodes */}
          {mockData.map(node => (
            <g key={node.id}>
              <circle
                cx={node.x}
                cy={node.y}
                r={selectedNode?.id === node.id ? 12 : 8}
                fill={hoveredNode?.id === node.id ? "#2563eb" : "#3B82F6"}
                stroke={selectedNode?.id === node.id ? "#60A5FA" : "transparent"}
                strokeWidth="2"
                className="cursor-pointer transition-all duration-200 hover:scale-110"
                onClick={() => handleNodeClick(node)}
                onMouseEnter={() => handleNodeHover(node)}
                onMouseLeave={handleNodeLeave}
              />
              <text
                x={node.x}
                y={node.y + 25}
                textAnchor="middle"
                className="text-xs fill-[#F1F5F9] pointer-events-none"
              >
                {node.label}
              </text>
            </g>
          ))}
        </svg>
        
        {/* Tooltip */}
        {hoveredNode && (
          <div 
            className="absolute bg-[#181E29] text-[#F1F5F9] px-3 py-2 rounded-lg shadow-lg text-sm z-10 pointer-events-none"
            style={{
              left: hoveredNode.x + 20,
              top: hoveredNode.y - 10
            }}
          >
            <div className="font-medium">{hoveredNode.label}</div>
            <div className="text-xs text-[#AAB7C6]">
              {hoveredNode.connections?.length || 0} connexions
            </div>
          </div>
        )}
      </div>
      
      {/* Empty State */}
      {mockData.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-16 h-16 mb-4 text-[#AAB7C6]">
            <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m-6 3l6-3" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-[#F1F5F9] mb-2">
            Aucun graphique
          </h3>
          <p className="text-sm text-[#AAB7C6] mb-4">
            Aucune donnée à afficher pour le moment
          </p>
          <button className="px-4 py-2 bg-[#3B82F6] text-white text-sm rounded-lg hover:bg-[#2563eb] transition-colors">
            Charger des données
          </button>
        </div>
      )}
    </div>
  );
};

export default NetworkGraph;
