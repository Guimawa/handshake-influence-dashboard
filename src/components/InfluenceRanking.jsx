import React from 'react';

const InfluenceRanking = () => {
  const rankings = [
    { rank: 1, name: 'Michael Melton', score: 95, change: '+2' },
    { rank: 2, name: 'Christopher Hill', score: 89, change: '-1' },
    { rank: 3, name: 'Jessica Puckett', score: 87, change: '+3' },
    { rank: 4, name: 'Matthew Song', score: 84, change: '0' },
    { rank: 5, name: 'Ashley Hamilton', score: 82, change: '+1' },
    { rank: 6, name: 'Jennifer Bender', score: 79, change: '-2' },
    { rank: 7, name: 'Joshua Wagner', score: 76, change: '+4' },
    { rank: 8, name: 'Amanda McLaughlin', score: 74, change: '0' },
    { rank: 9, name: 'Daniel McNamara', score: 71, change: '-1' },
    { rank: 10, name: 'David Raynor', score: 69, change: '+2' },
    { rank: 11, name: 'James Moon', score: 67, change: '-3' },
    { rank: 12, name: 'Robert Woodard', score: 65, change: '+1' },
    { rank: 13, name: 'John Desai', score: 63, change: '0' },
    { rank: 14, name: 'Joseph Wallace', score: 61, change: '+5' },
    { rank: 15, name: 'Andrew Lawrence', score: 59, change: '-1' },
  ];

  const getChangeColor = (change) => {
    if (change.startsWith('+')) return 'text-green-400';
    if (change.startsWith('-')) return 'text-red-400';
    return 'text-gray-400';
  };

  return (
    <div className="w-full">
      <h3 className="text-xl font-bold mb-4 text-white">Influence ranking</h3>
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {rankings.map((person) => (
          <div
            key={person.rank}
            className="flex items-center justify-between p-2 hover:bg-gray-800 rounded-lg transition-colors cursor-pointer"
          >
            <div className="flex items-center">
              <span className="text-gray-400 text-sm w-6">{person.rank}.</span>
              <span className="text-white ml-2">{person.name}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-gray-400 text-sm">{person.score}</span>
              <span className={`text-xs ${getChangeColor(person.change)}`}>
                {person.change !== '0' ? person.change : '—'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfluenceRanking;

