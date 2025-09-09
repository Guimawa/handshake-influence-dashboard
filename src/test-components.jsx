import React from 'react';

// Test simple pour vérifier les classes Tailwind custom
const TestComponent = () => {
  return (
    <div className="bg-background text-textMain p-4">
      <div className="bg-panel text-textSub rounded-xl p-4">
        <h1 className="text-primary">Test des classes custom</h1>
        <p className="text-textSub">Ceci devrait être en gris</p>
        <button className="bg-primary text-white px-4 py-2 rounded-xl hover:bg-accent">
          Bouton test
        </button>
      </div>
    </div>
  );
};

export default TestComponent;
