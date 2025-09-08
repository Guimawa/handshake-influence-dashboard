import React, { useState } from 'react';
import { Plus, X, TrendingUp, TrendingDown, Minus, Star, Users, BarChart3 } from 'lucide-react';

const InfluenceRanking2D = () => {
  const [rankings, setRankings] = useState([
    {
      id: 1,
      name: 'Michael Melton',
      score: 56,
      change: 2,
      changeType: 'up',
      prestige: 78,
      media: 45,
      innovation: 67,
      connections: 89,
      topics: ['Sustainable Business', 'International Frameworks'],
      avatar: 'MM'
    },
    {
      id: 2,
      name: 'Christopher Hill',
      score: 53,
      change: -2,
      changeType: 'down',
      prestige: 72,
      media: 38,
      innovation: 59,
      connections: 76,
      topics: ['Sustainable Finance', 'National Policy'],
      avatar: 'CH'
    },
    {
      id: 3,
      name: 'Jessica Puckett',
      score: 50,
      change: 2,
      changeType: 'up',
      prestige: 68,
      media: 42,
      innovation: 61,
      connections: 71,
      topics: ['P3s and Fin Partnership', 'Cause Sector'],
      avatar: 'JP'
    },
    {
      id: 4,
      name: 'Matthew Song',
      score: 48,
      change: 1,
      changeType: 'up',
      prestige: 65,
      media: 40,
      innovation: 58,
      connections: 68,
      topics: ['Commodity Supply Chains', 'Support for SB'],
      avatar: 'MS'
    },
    {
      id: 5,
      name: 'Ashley Hamilton',
      score: 46,
      change: 0,
      changeType: 'neutral',
      prestige: 62,
      media: 37,
      innovation: 55,
      connections: 64,
      topics: ['Private Sector', 'Sustainable Business'],
      avatar: 'AH'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingRanking, setEditingRanking] = useState(null);
  const [newRanking, setNewRanking] = useState({
    name: '',
    score: 0,
    prestige: 0,
    media: 0,
    innovation: 0,
    connections: 0,
    topics: []
  });

  const handleAddRanking = () => {
    if (newRanking.name.trim()) {
      const ranking = {
        id: Date.now(),
        ...newRanking,
        change: 0,
        changeType: 'neutral',
        avatar: newRanking.name.split(' ').map(n => n[0]).join('')
      };
      setRankings(prev => [...prev, ranking]);
      setNewRanking({
        name: '',
        score: 0,
        prestige: 0,
        media: 0,
        innovation: 0,
        connections: 0,
        topics: []
      });
      setShowAddForm(false);
    }
  };

  const handleEditRanking = (ranking) => {
    setEditingRanking(ranking);
    setNewRanking(ranking);
    setShowAddForm(true);
  };

  const handleUpdateRanking = () => {
    if (editingRanking) {
      setRankings(prev => prev.map(r => 
        r.id === editingRanking.id 
          ? { ...r, ...newRanking, avatar: newRanking.name.split(' ').map(n => n[0]).join('') }
          : r
      ));
      setEditingRanking(null);
      setNewRanking({
        name: '',
        score: 0,
        prestige: 0,
        media: 0,
        innovation: 0,
        connections: 0,
        topics: []
      });
      setShowAddForm(false);
    }
  };

  const handleDeleteRanking = (id) => {
    setRankings(prev => prev.filter(r => r.id !== id));
  };

  const getChangeIcon = (changeType) => {
    switch (changeType) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-400" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-400" />;
      default:
        return <Minus className="w-4 h-4 text-gray-400" />;
    }
  };

  const getChangeColor = (changeType) => {
    switch (changeType) {
      case 'up':
        return 'text-green-400';
      case 'down':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">Influence Ranking</h3>
          <p className="text-sm text-gray-400">National Policy</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="w-8 h-8 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center justify-center text-white transition-colors"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Statistiques globales */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center space-x-2 mb-2">
            <Users className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-gray-400">Total Influencers</span>
          </div>
          <div className="text-2xl font-bold text-white">{rankings.length}</div>
        </div>
        
        <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center space-x-2 mb-2">
            <BarChart3 className="w-4 h-4 text-green-400" />
            <span className="text-sm text-gray-400">Avg Score</span>
          </div>
          <div className="text-2xl font-bold text-white">
            {Math.round(rankings.reduce((acc, r) => acc + r.score, 0) / rankings.length)}
          </div>
        </div>
      </div>

      {/* Liste des classements */}
      <div className="flex-1 space-y-3 overflow-y-auto">
        {rankings.map((ranking, index) => (
          <div
            key={ranking.id}
            className="bg-gray-800/30 hover:bg-gray-800/50 rounded-lg p-4 border border-gray-700 transition-all duration-200 group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {ranking.avatar}
                </div>
                <div>
                  <h4 className="text-white font-medium">{ranking.name}</h4>
                  <p className="text-xs text-gray-400">#{index + 1} in ranking</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="text-right">
                  <div className="text-lg font-bold text-white">{ranking.score}</div>
                  <div className={`text-xs flex items-center space-x-1 ${getChangeColor(ranking.changeType)}`}>
                    {getChangeIcon(ranking.changeType)}
                    <span>{ranking.change > 0 ? `+${ranking.change}` : ranking.change}</span>
                  </div>
                </div>
                
                <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleEditRanking(ranking)}
                    className="w-6 h-6 bg-blue-600 hover:bg-blue-700 rounded flex items-center justify-center text-white text-xs"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDeleteRanking(ranking.id)}
                    className="w-6 h-6 bg-red-600 hover:bg-red-700 rounded flex items-center justify-center text-white text-xs"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>

            {/* Barre de progression */}
            <div className="mb-3">
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>Overall Score</span>
                <span>{ranking.score}/100</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-blue-400 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${ranking.score}%` }}
                />
              </div>
            </div>

            {/* Métriques détaillées */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-400">Prestige:</span>
                <span className="text-white">{ranking.prestige}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Media:</span>
                <span className="text-white">{ranking.media}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Innovation:</span>
                <span className="text-white">{ranking.innovation}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Connections:</span>
                <span className="text-white">{ranking.connections}</span>
              </div>
            </div>

            {/* Topics */}
            {ranking.topics.length > 0 && (
              <div className="mt-3">
                <div className="flex flex-wrap gap-1">
                  {ranking.topics.map((topic, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-blue-600/20 text-blue-400 text-xs rounded-full"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Formulaire d'ajout/édition */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-96 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-white">
                {editingRanking ? 'Edit Influencer' : 'Add New Influencer'}
              </h3>
              <button
                onClick={() => {
                  setShowAddForm(false);
                  setEditingRanking(null);
                  setNewRanking({
                    name: '',
                    score: 0,
                    prestige: 0,
                    media: 0,
                    innovation: 0,
                    connections: 0,
                    topics: []
                  });
                }}
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
                  value={newRanking.name}
                  onChange={(e) => setNewRanking(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  placeholder="Enter influencer name"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Score</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={newRanking.score}
                    onChange={(e) => setNewRanking(prev => ({ ...prev, score: parseInt(e.target.value) || 0 }))}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Prestige</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={newRanking.prestige}
                    onChange={(e) => setNewRanking(prev => ({ ...prev, prestige: parseInt(e.target.value) || 0 }))}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Media</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={newRanking.media}
                    onChange={(e) => setNewRanking(prev => ({ ...prev, media: parseInt(e.target.value) || 0 }))}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Innovation</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={newRanking.innovation}
                    onChange={(e) => setNewRanking(prev => ({ ...prev, innovation: parseInt(e.target.value) || 0 }))}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Connections</label>
                <input
                  type="number"
                  min="0"
                  value={newRanking.connections}
                  onChange={(e) => setNewRanking(prev => ({ ...prev, connections: parseInt(e.target.value) || 0 }))}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={editingRanking ? handleUpdateRanking : handleAddRanking}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors"
                >
                  {editingRanking ? 'Update' : 'Add'} Influencer
                </button>
                <button
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingRanking(null);
                    setNewRanking({
                      name: '',
                      score: 0,
                      prestige: 0,
                      media: 0,
                      innovation: 0,
                      connections: 0,
                      topics: []
                    });
                  }}
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

export default InfluenceRanking2D;
