import React from 'react';

const NetworkGraph = () => {
  // Sample data for network nodes
  const nodes = [
    { id: 1, x: 200, y: 150, size: 40, color: '#3B82F6', label: 'Central Node' },
    { id: 2, x: 100, y: 100, size: 25, color: '#10B981', label: 'Node 2' },
    { id: 3, x: 300, y: 80, size: 30, color: '#F59E0B', label: 'Node 3' },
    { id: 4, x: 150, y: 250, size: 20, color: '#EF4444', label: 'Node 4' },
    { id: 5, x: 350, y: 200, size: 35, color: '#8B5CF6', label: 'Node 5' },
    { id: 6, x: 80, y: 200, size: 15, color: '#06B6D4', label: 'Node 6' },
    { id: 7, x: 250, y: 300, size: 25, color: '#F97316', label: 'Node 7' },
    { id: 8, x: 400, y: 120, size: 20, color: '#84CC16', label: 'Node 8' },
    { id: 9, x: 120, y: 320, size: 18, color: '#EC4899', label: 'Node 9' },
    { id: 10, x: 380, y: 280, size: 22, color: '#6366F1', label: 'Node 10' },
  ];

  const connections = [
    { from: 1, to: 2 },
    { from: 1, to: 3 },
    { from: 1, to: 5 },
    { from: 2, to: 6 },
    { from: 3, to: 8 },
    { from: 4, to: 7 },
    { from: 5, to: 10 },
    { from: 1, to: 4 },
  ];

  return (
    <div className="relative w-full h-96 bg-gray-800 rounded-lg overflow-hidden">
      <svg className="w-full h-full">
        {/* Render connections */}
        {connections.map((connection, index) => {
          const fromNode = nodes.find(n => n.id === connection.from);
          const toNode = nodes.find(n => n.id === connection.to);
          return (
            <line
              key={index}
              x1={fromNode.x}
              y1={fromNode.y}
              x2={toNode.x}
              y2={toNode.y}
              stroke="#374151"
              strokeWidth="1"
              opacity="0.6"
            />
          );
        })}
        
        {/* Render nodes */}
        {nodes.map((node) => (
          <g key={node.id}>
            <circle
              cx={node.x}
              cy={node.y}
              r={node.size}
              fill={node.color}
              opacity="0.8"
              className="hover:opacity-100 transition-opacity cursor-pointer"
            />
            <circle
              cx={node.x}
              cy={node.y}
              r={node.size}
              fill="none"
              stroke={node.color}
              strokeWidth="2"
              opacity="0.3"
            />
          </g>
        ))}
      </svg>
      
      {/* Overlay text */}
      <div className="absolute bottom-4 left-4 text-gray-400 text-sm">
        Network visualization of influence connections
      </div>
    </div>
  );
};

export default NetworkGraph;

