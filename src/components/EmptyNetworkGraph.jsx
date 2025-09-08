import React, { useState } from 'react';
import { Plus, X, Edit3, Trash2 } from 'lucide-react';

const EmptyNetworkGraph = () => {
  const [nodes, setNodes] = useState([]);
  const [connections, setConnections] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedNode, setSelectedNode] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectingFrom, setConnectingFrom] = useState(null);

  const [newNode, setNewNode] = useState({
    label: '',
    category: 'finance',
    color: '#3B82F6',
    size: 30
  });

  const colors = [
    { name: 'Bleu', value: '#3B82F6' },
    { name: 'Vert', value: '#10B981' },
    { name: 'Orange', value: '#F59E0B' },
    { name: 'Rouge', value: '#EF4444' },
    { name: 'Violet', value: '#8B5CF6' },
    { name: 'Cyan', value: '#06B6D4' },
    { name: 'Rose', value: '#EC4899' },
    { name: 'Lime', value: '#84CC16' }
  ];

  const categories = [
    'finance', 'tech', 'government', 'ngo', 'research', 'energy', 'investment'
  ];

  const handleAddNode = (e) => {
    e.preventDefault();
    if (!newNode.label.trim()) return;

    const node = {
      id: Date.now(),
      x: Math.random() * 500 + 100,
      y: Math.random() * 300 + 50,
      ...newNode,
      size: parseInt(newNode.size)
    };

    setNodes([...nodes, node]);
    setNewNode({ label: '', category: 'finance', color: '#3B82F6', size: 30 });
    setShowAddForm(false);
  };

  const handleNodeClick = (node, event) => {
    event.stopPropagation();
    
    if (isConnecting) {
      if (!connectingFrom) {
        setConnectingFrom(node);
      } else if (connectingFrom.id !== node.id) {
        // Créer une connexion
        const newConnection = {
          id: Date.now(),
          from: connectingFrom.id,
          to: node.id,
          strength: 0.5
        };
        setConnections([...connections, newConnection]);
        setConnectingFrom(null);
        setIsConnecting(false);
      }
    } else {
      setSelectedNode(selectedNode?.id === node.id ? null : node);
    }
  };

  const handleDeleteNode = (nodeId) => {
    setNodes(nodes.filter(n => n.id !== nodeId));
    setConnections(connections.filter(c => c.from !== nodeId && c.to !== nodeId));
    setSelectedNode(null);
  };

  const handleDeleteConnection = (connectionId) => {
    setConnections(connections.filter(c => c.id !== connectionId));
  };

  const getNodeConnections = (nodeId) => {
    return connections.filter(conn => conn.from === nodeId || conn.to === nodeId);
  };

  return (
    <div className="relative w-full h-96 bg-gray-800/50 rounded-lg overflow-hidden border-2 border-dashed border-gray-600">
      {/* Toolbar */}
      <div className="absolute top-4 left-4 flex items-center space-x-2 z-10">
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors flex items-center space-x-2"
        >
          <Plus size={16} />
          <span className="text-sm">Ajouter une bulle</span>
        </button>
        
        <button
          onClick={() => {
            setIsConnecting(!isConnecting);
            setConnectingFrom(null);
          }}
          className={`${isConnecting ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-600 hover:bg-gray-700'} text-white p-2 rounded-lg transition-colors`}
        >
          <Edit3 size={16} />
        </button>

        {isConnecting && (
          <span className="text-xs text-green-400 bg-gray-800 px-2 py-1 rounded">
            {connectingFrom ? 'Cliquez sur une autre bulle pour connecter' : 'Cliquez sur une bulle pour commencer'}
          </span>
        )}
      </div>

      {/* Add Node Form */}
      {showAddForm && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-700 w-80">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white font-semibold">Ajouter une nouvelle bulle</h3>
              <button
                onClick={() => setShowAddForm(false)}
                className="text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleAddNode} className="space-y-4">
              <div>
                <label className="block text-gray-400 text-sm mb-1">Nom</label>
                <input
                  type="text"
                  value={newNode.label}
                  onChange={(e) => setNewNode({...newNode, label: e.target.value})}
                  className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                  placeholder="Nom de l'entité"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-400 text-sm mb-1">Catégorie</label>
                <select
                  value={newNode.category}
                  onChange={(e) => setNewNode({...newNode, category: e.target.value})}
                  className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-gray-400 text-sm mb-1">Couleur</label>
                <div className="grid grid-cols-4 gap-2">
                  {colors.map(color => (
                    <button
                      key={color.value}
                      type="button"
                      onClick={() => setNewNode({...newNode, color: color.value})}
                      className={`w-8 h-8 rounded-full border-2 ${newNode.color === color.value ? 'border-white' : 'border-gray-600'}`}
                      style={{ backgroundColor: color.value }}
                    />
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-gray-400 text-sm mb-1">Taille</label>
                <input
                  type="range"
                  min="15"
                  max="50"
                  value={newNode.size}
                  onChange={(e) => setNewNode({...newNode, size: e.target.value})}
                  className="w-full"
                />
                <span className="text-gray-400 text-xs">{newNode.size}px</span>
              </div>
              
              <div className="flex space-x-2">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition-colors"
                >
                  Ajouter
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 rounded transition-colors"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SVG Graph */}
      <svg className="w-full h-full">
        {/* Render connections */}
        {connections.map((connection) => {
          const fromNode = nodes.find(n => n.id === connection.from);
          const toNode = nodes.find(n => n.id === connection.to);
          if (!fromNode || !toNode) return null;
          
          return (
            <g key={connection.id}>
              <line
                x1={fromNode.x}
                y1={fromNode.y}
                x2={toNode.x}
                y2={toNode.y}
                stroke="#374151"
                strokeWidth="2"
                opacity="0.6"
                className="cursor-pointer hover:stroke-red-400"
                onClick={() => handleDeleteConnection(connection.id)}
              />
            </g>
          );
        })}
        
        {/* Render nodes */}
        {nodes.map((node) => {
          const isSelected = selectedNode?.id === node.id;
          const isConnectingNode = connectingFrom?.id === node.id;
          
          return (
            <g key={node.id}>
              {/* Outer glow effect */}
              <circle
                cx={node.x}
                cy={node.y}
                r={node.size + 4}
                fill={node.color}
                opacity="0.1"
              />
              
              {/* Main node */}
              <circle
                cx={node.x}
                cy={node.y}
                r={node.size}
                fill={node.color}
                opacity={isConnectingNode ? "1" : "0.8"}
                className="hover:opacity-100 transition-all duration-300 cursor-pointer"
                stroke={isSelected ? "#ffffff" : isConnectingNode ? "#00ff00" : "none"}
                strokeWidth={isSelected || isConnectingNode ? "3" : "0"}
                onClick={(e) => handleNodeClick(node, e)}
              />
              
              {/* Node label */}
              <text
                x={node.x}
                y={node.y + node.size + 15}
                textAnchor="middle"
                className="text-xs fill-white font-medium pointer-events-none"
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Empty state */}
      {nodes.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-gray-400">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full border-2 border-dashed border-gray-600 flex items-center justify-center">
              <Plus size={24} />
            </div>
            <p className="text-lg font-medium mb-2">Graphique réseau vide</p>
            <p className="text-sm">Cliquez sur "Ajouter une bulle" pour commencer</p>
          </div>
        </div>
      )}

      {/* Node details panel */}
      {selectedNode && (
        <div className="absolute top-4 right-4 bg-gray-900/90 backdrop-blur-sm rounded-lg p-4 border border-gray-700 max-w-xs">
          <div className="flex justify-between items-start mb-2">
            <h4 className="text-white font-semibold">{selectedNode.label}</h4>
            <button
              onClick={() => handleDeleteNode(selectedNode.id)}
              className="text-red-400 hover:text-red-300"
            >
              <Trash2 size={16} />
            </button>
          </div>
          <p className="text-gray-400 text-sm mb-2">Catégorie: {selectedNode.category}</p>
          <p className="text-gray-400 text-sm mb-2">
            Connexions: {getNodeConnections(selectedNode.id).length}
          </p>
          <div className="flex items-center space-x-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: selectedNode.color }}
            ></div>
            <span className="text-xs text-gray-400">Taille: {selectedNode.size}px</span>
          </div>
        </div>
      )}
      
      {/* Instructions */}
      <div className="absolute bottom-4 left-4 text-gray-400 text-sm">
        <p>Graphique réseau interactif</p>
        <p className="text-xs mt-1">
          {nodes.length > 0 ? 'Cliquez sur les bulles pour les sélectionner' : 'Commencez par ajouter des bulles'}
        </p>
      </div>
    </div>
  );
};

export default EmptyNetworkGraph;

