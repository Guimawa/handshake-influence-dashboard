import React, { useState } from 'react';
import { Plus, X, Trash2, Edit3 } from 'lucide-react';

const EmptyInfluenceRanking3D = () => {
  const [rankings, setRankings] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [newPerson, setNewPerson] = useState({
    name: '',
    score: 50,
    category: 'finance'
  });

  const categories = [
    'finance', 'tech', 'government', 'ngo', 'research', 'energy', 'investment'
  ];

  const handleAddPerson = (e) => {
    e.preventDefault();
    if (!newPerson.name.trim()) return;

    const person = {
      id: Date.now(),
      rank: rankings.length + 1,
      name: newPerson.name,
      score: parseInt(newPerson.score),
      category: newPerson.category,
      change: '0'
    };

    const updatedRankings = [...rankings, person].sort((a, b) => b.score - a.score);
    
    // Recalculer les rangs
    updatedRankings.forEach((item, index) => {
      item.rank = index + 1;
    });

    setRankings(updatedRankings);
    setNewPerson({ name: '', score: 50, category: 'finance' });
    setShowAddForm(false);
  };

  const handleDeletePerson = (id) => {
    const updatedRankings = rankings.filter(p => p.id !== id);
    
    // Recalculer les rangs
    updatedRankings.forEach((item, index) => {
      item.rank = index + 1;
    });
    
    setRankings(updatedRankings);
  };

  const handleEditScore = (id, newScore) => {
    const updatedRankings = rankings.map(person => 
      person.id === id ? { ...person, score: parseInt(newScore) } : person
    ).sort((a, b) => b.score - a.score);
    
    // Recalculer les rangs
    updatedRankings.forEach((item, index) => {
      item.rank = index + 1;
    });
    
    setRankings(updatedRankings);
    setEditingItem(null);
  };

  const getChangeColor = (change) => {
    if (change.startsWith('+')) return 'text-green-400';
    if (change.startsWith('-')) return 'text-red-400';
    return 'text-gray-400';
  };

  const getCategoryColor = (category) => {
    const colors = {
      finance: '#3B82F6',
      tech: '#8B5CF6',
      government: '#EF4444',
      ngo: '#10B981',
      research: '#F59E0B',
      energy: '#84CC16',
      investment: '#EC4899'
    };
    return colors[category] || '#6B7280';
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-white">Classement d'influence 3D</h3>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors"
        >
          <Plus size={16} />
        </button>
      </div>

      {/* Add Person Form */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-700 w-80">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white font-semibold">Ajouter une personne</h3>
              <button
                onClick={() => setShowAddForm(false)}
                className="text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleAddPerson} className="space-y-4">
              <div>
                <label className="block text-gray-400 text-sm mb-1">Nom</label>
                <input
                  type="text"
                  value={newPerson.name}
                  onChange={(e) => setNewPerson({...newPerson, name: e.target.value})}
                  className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                  placeholder="Nom de la personne"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-400 text-sm mb-1">Score d'influence</label>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={newPerson.score}
                  onChange={(e) => setNewPerson({...newPerson, score: e.target.value})}
                  className="w-full"
                />
                <span className="text-gray-400 text-xs">{newPerson.score}/100</span>
              </div>
              
              <div>
                <label className="block text-gray-400 text-sm mb-1">Catégorie</label>
                <select
                  value={newPerson.category}
                  onChange={(e) => setNewPerson({...newPerson, category: e.target.value})}
                  className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
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

      {/* Rankings List with 3D Effect */}
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {rankings.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full border-2 border-dashed border-gray-600 flex items-center justify-center">
              <Plus size={20} />
            </div>
            <p className="text-sm">Aucune personne dans le classement 3D</p>
            <p className="text-xs mt-1">Cliquez sur + pour ajouter</p>
          </div>
        ) : (
          rankings.map((person, index) => (
            <div
              key={person.id}
              className="relative group"
              style={{
                transform: `translateZ(${index * 2}px)`,
                perspective: '1000px'
              }}
            >
              <div className="flex items-center justify-between p-3 hover:bg-gray-800 rounded-lg transition-all duration-300 group-hover:shadow-lg group-hover:shadow-blue-500/20 group-hover:scale-105">
                <div className="flex items-center flex-1">
                  <span className="text-gray-400 text-sm w-8">{person.rank}.</span>
                  <div className="flex items-center ml-2 flex-1">
                    <div 
                      className="w-2 h-2 rounded-full mr-2" 
                      style={{ backgroundColor: getCategoryColor(person.category) }}
                    ></div>
                    <span className="text-white">{person.name}</span>
                    <span className="text-xs text-gray-500 ml-2">({person.category})</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  {editingItem === person.id ? (
                    <input
                      type="number"
                      min="1"
                      max="100"
                      defaultValue={person.score}
                      className="w-16 bg-gray-800 border border-gray-700 rounded px-2 py-1 text-white text-sm"
                      onBlur={(e) => handleEditScore(person.id, e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleEditScore(person.id, e.target.value);
                        }
                      }}
                      autoFocus
                    />
                  ) : (
                    <span 
                      className="text-gray-400 text-sm cursor-pointer hover:text-white"
                      onClick={() => setEditingItem(person.id)}
                    >
                      {person.score}
                    </span>
                  )}
                  
                  <span className={`text-xs ${getChangeColor(person.change)}`}>
                    {person.change !== '0' ? person.change : '—'}
                  </span>
                  
                  <button
                    onClick={() => handleDeletePerson(person.id)}
                    className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 transition-opacity"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                {/* Barre de score 3D */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700 rounded-b-lg overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
                    style={{ width: `${person.score}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      
      {rankings.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-700">
          <p className="text-xs text-gray-400">
            Total: {rankings.length} personne{rankings.length > 1 ? 's' : ''} • 
            Cliquez sur un score pour le modifier • Effet 3D activé
          </p>
        </div>
      )}
    </div>
  );
};

export default EmptyInfluenceRanking3D;
