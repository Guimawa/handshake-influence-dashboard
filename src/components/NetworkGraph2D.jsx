import React, { useState, useRef, useEffect } from 'react';
import { Plus, X, Search, Filter } from 'lucide-react';

const NetworkGraph2D = () => {
  const [selectedNode, setSelectedNode] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('Network');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newNodeData, setNewNodeData] = useState({ name: '', type: 'influencer', connections: [] });

  // Données du réseau
  const [nodes, setNodes] = useState([
    {
      id: 'unctad',
      name: 'United Nations Conference on Trade and Development (UNCTAD)',
      type: 'organization',
      x: 400,
      y: 300,
      size: 80,
      color: '#2563eb',
      connections: ['sustainable-business', 'international-frameworks', 'sustainable-finance', 'national-policy']
    },
    {
      id: 'sustainable-business',
      name: 'Sustainable Business Practices',
      type: 'topic',
      x: 200,
      y: 150,
      size: 50,
      color: '#10b981',
      connections: ['unctad']
    },
    {
      id: 'international-frameworks',
      name: 'International Frameworks',
      type: 'topic',
      x: 200,
      y: 250,
      size: 50,
      color: '#10b981',
      connections: ['unctad']
    },
    {
      id: 'sustainable-finance',
      name: 'Sustainable Finance',
      type: 'topic',
      x: 200,
      y: 350,
      size: 50,
      color: '#10b981',
      connections: ['unctad']
    },
    {
      id: 'national-policy',
      name: 'National Policy',
      type: 'topic',
      x: 200,
      y: 450,
      size: 50,
      color: '#10b981',
      connections: ['unctad']
    },
    {
      id: 'david-raynor',
      name: 'DR David Raynor',
      type: 'influencer',
      x: 600,
      y: 200,
      size: 45,
      color: '#f59e0b',
      connections: ['unctad']
    },
    {
      id: 'matthew-song',
      name: 'Matthew Song',
      type: 'influencer',
      x: 600,
      y: 300,
      size: 40,
      color: '#ef4444',
      connections: ['unctad']
    },
    {
      id: 'jessica-puckett',
      name: 'Jessica Puckett',
      type: 'influencer',
      x: 600,
      y: 400,
      size: 40,
      color: '#8b5cf6',
      connections: ['unctad']
    }
  ]);

  const [connections, setConnections] = useState([
    { from: 'unctad', to: 'sustainable-business', strength: 0.8 },
    { from: 'unctad', to: 'international-frameworks', strength: 0.9 },
    { from: 'unctad', to: 'sustainable-finance', strength: 0.7 },
    { from: 'unctad', to: 'national-policy', strength: 0.95 },
    { from: 'unctad', to: 'david-raynor', strength: 0.6 },
    { from: 'unctad', to: 'matthew-song', strength: 0.5 },
    { from: 'unctad', to: 'jessica-puckett', strength: 0.4 }
  ]);

  const handleNodeClick = (node) => {
    setSelectedNode(node);
  };

  const handleNodeHover = (node) => {
    setHoveredNode(node);
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.1, 2));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.1, 0.5));
  };

  const handleAddNode = () => {
    if (newNodeData.name.trim()) {
      const newNode = {
        id: `node-${Date.now()}`,
        name: newNodeData.name,
        type: newNodeData.type,
        x: Math.random() * 400 + 100,
        y: Math.random() * 400 + 100,
        size: 35,
        color: newNodeData.type === 'influencer' ? '#f59e0b' : '#10b981',
        connections: []
      };
      setNodes(prev => [...prev, newNode]);
      setNewNodeData({ name: '', type: 'influencer', connections: [] });
      setShowAddForm(false);
    }
  };

  const filteredNodes = nodes.filter(node =>
    node.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full h-full relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg overflow-hidden">
      {/* Header avec contrôles */}
      <div className="absolute top-4 left-4 right-4 z-10 flex justify-between items-center">
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab('Network')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === 'Network'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Network
          </button>
          <button
            onClick={() => setActiveTab('Heatmap')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === 'Heatmap'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Heatmap
          </button>
        </div>

        <div className="flex items-center space-x-4">
          {/* Barre de recherche */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search nodes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-2 w-64 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
            />
            <Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
          </div>

          {/* Contrôles de zoom */}
          <div className="flex items-center space-x-2">
            <button
              onClick={handleZoomOut}
              className="w-8 h-8 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center text-white transition-colors"
            >
              −
            </button>
            <span className="text-sm text-gray-300 min-w-[3rem] text-center">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={handleZoomIn}
              className="w-8 h-8 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center text-white transition-colors"
            >
              +
            </button>
          </div>

          {/* Bouton d'ajout */}
          <button
            onClick={() => setShowAddForm(true)}
            className="w-8 h-8 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center justify-center text-white transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Zone de visualisation */}
      <div className="absolute inset-0 pt-16">
        <svg
          width="100%"
          height="100%"
          className="w-full h-full"
          style={{ transform: `scale(${zoom})` }}
        >
          {/* Connexions */}
          {connections.map((conn, index) => {
            const fromNode = nodes.find(n => n.id === conn.from);
            const toNode = nodes.find(n => n.id === conn.to);
            if (!fromNode || !toNode) return null;

            const isHighlighted = selectedNode && 
              (conn.from === selectedNode.id || conn.to === selectedNode.id);

            return (
              <line
                key={index}
                x1={fromNode.x}
                y1={fromNode.y}
                x2={toNode.x}
                y2={toNode.y}
                stroke={isHighlighted ? '#3b82f6' : '#6b7280'}
                strokeWidth={isHighlighted ? 3 : 1}
                opacity={isHighlighted ? 1 : 0.6}
                className="transition-all duration-300"
              />
            );
          })}

          {/* Nœuds */}
          {filteredNodes.map((node) => {
            const isSelected = selectedNode?.id === node.id;
            const isHovered = hoveredNode?.id === node.id;

            return (
              <g key={node.id}>
                {/* Ombre du nœud */}
                <circle
                  cx={node.x + 2}
                  cy={node.y + 2}
                  r={node.size / 2 + 4}
                  fill="rgba(0,0,0,0.3)"
                  className="transition-all duration-200"
                />
                
                {/* Nœud principal */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={node.size / 2}
                  fill={node.color}
                  stroke={isSelected ? '#ffffff' : isHovered ? '#fbbf24' : 'transparent'}
                  strokeWidth={isSelected ? 3 : isHovered ? 2 : 0}
                  className="cursor-pointer transition-all duration-200 hover:scale-110"
                  onClick={() => handleNodeClick(node)}
                  onMouseEnter={() => handleNodeHover(node)}
                  onMouseLeave={() => setHoveredNode(null)}
                  style={{
                    filter: isHovered ? 'drop-shadow(0 0 10px rgba(251, 191, 36, 0.5))' : 'none'
                  }}
                />

                {/* Texte du nœud */}
                <text
                  x={node.x}
                  y={node.y + 4}
                  textAnchor="middle"
                  fill="white"
                  fontSize="10"
                  fontWeight="bold"
                  className="pointer-events-none select-none"
                >
                  {node.name.length > 15 ? node.name.substring(0, 15) + '...' : node.name}
                </text>

                {/* Indicateur de type */}
                {node.type === 'influencer' && (
                  <circle
                    cx={node.x + node.size / 2 - 8}
                    cy={node.y - node.size / 2 + 8}
                    r="4"
                    fill="#ffffff"
                    className="pointer-events-none"
                  />
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Panel de détails */}
      {selectedNode && (
        <div className="absolute top-20 right-4 w-80 bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 border border-gray-700">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-bold text-white">{selectedNode.name}</h3>
            <button
              onClick={() => setSelectedNode(null)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-400">Type:</span>
              <span className="text-sm text-white capitalize">{selectedNode.type}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-400">Connections:</span>
              <span className="text-sm text-white">
                {connections.filter(c => c.from === selectedNode.id || c.to === selectedNode.id).length}
              </span>
            </div>

            {selectedNode.type === 'influencer' && (
              <div className="space-y-2">
                <div className="text-sm text-gray-400">Statistics:</div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-gray-700 rounded p-2">
                    <div className="text-xs text-gray-400">Overall</div>
                    <div className="text-lg font-bold text-green-400">64</div>
                  </div>
                  <div className="bg-gray-700 rounded p-2">
                    <div className="text-xs text-gray-400">Prestige</div>
                    <div className="text-lg font-bold text-blue-400">72</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Formulaire d'ajout */}
      {showAddForm && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-96">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-white">Add New Node</h3>
              <button
                onClick={() => setShowAddForm(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Name</label>
                <input
                  type="text"
                  value={newNodeData.name}
                  onChange={(e) => setNewNodeData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  placeholder="Enter node name"
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-2">Type</label>
                <select
                  value={newNodeData.type}
                  onChange={(e) => setNewNodeData(prev => ({ ...prev, type: e.target.value }))}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="influencer">Influencer</option>
                  <option value="topic">Topic</option>
                  <option value="organization">Organization</option>
                </select>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={handleAddNode}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors"
                >
                  Add Node
                </button>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NetworkGraph2D;
