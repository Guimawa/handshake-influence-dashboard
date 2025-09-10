import React from 'react';

const InfluenceRankingExact = () => {
  const rankings = [
    { rank: 1, name: 'Michael Melton', score: 56, change: '+2' },
    { rank: 2, name: 'Christopher Hill', score: 53, change: '-2' },
    { rank: 3, name: 'Jessica Puckett', score: 50, change: '+2' },
    { rank: 4, name: 'Matthew Song', score: 48, change: '+1' },
    { rank: 5, name: 'Ashley Hamilton', score: 46, change: '-0' },
    { rank: 6, name: 'Jennifer Bender', score: 43, change: '+1' },
    { rank: 7, name: 'Joshua Wagner', score: 40, change: '-0' },
    { rank: 8, name: 'Amanda McLaughlin', score: 38, change: '+1' },
    { rank: 9, name: 'Daniel McNamara', score: 34, change: '-2' },
    { rank: 10, name: 'David Raynor', score: 32, change: '-0' },
    { rank: 11, name: 'James Moon', score: 29, change: '-2' },
    { rank: 12, name: 'Robert Woodard', score: 25, change: '+1' },
    { rank: 13, name: 'John Desai', score: 26, change: '-1' },
    { rank: 14, name: 'Joseph Wallace', score: 24, change: '-0' },
    { rank: 15, name: 'Andrew Lawrence', score: 22, change: '-1' },
    { rank: 16, name: 'Ryan Griffin', score: 20, change: '+1' }
  ];

  const getChangeColor = (change) => {
    if (change.startsWith('+')) return 'text-green-400';
    if (change.startsWith('-')) return 'text-red-400';
    return 'text-gray-400';
  };

  const getChangeIcon = (change) => {
    if (change.startsWith('+')) return '↑';
    if (change.startsWith('-')) return '↓';
    return '—';
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-white">Influence ranking</h3>
        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <span>15</span>
        </div>
      </div>

      <div className="space-y-1 max-h-96 overflow-y-auto">
        {rankings.map((person) => (
          <div
            key={person.rank}
            className="flex items-center justify-between p-3 hover:bg-gray-800/50 rounded-lg transition-colors cursor-pointer group"
          >
            <div className="flex items-center flex-1">
              <span className="text-gray-400 text-sm w-6 font-mono">{person.rank}.</span>
              <span className="text-white ml-2 text-sm">{person.name}</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-gray-300 text-sm font-medium">{person.score}</span>
              <div className="flex items-center space-x-1">
                <span className={`text-xs ${getChangeColor(person.change)}`}>
                  {getChangeIcon(person.change)}
                </span>
                <span className={`text-xs ${getChangeColor(person.change)}`}>
                  {person.change}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-700">
        <p className="text-xs text-gray-400">
          Total: {rankings.length} influencers • Real-time updates
        </p>
      </div>
    </div>
  );
};

export default InfluenceRankingExact;
