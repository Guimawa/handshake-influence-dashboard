import { useState, useCallback } from 'react';
import NetworkGraph from '../graph/NetworkGraph';

const NetworkGraphDemo = () => {
  // Données d'exemple selon spécifications exactes
  const [graphData, setGraphData] = useState({
    nodes: [
      { 
        id: 1, 
        label: 'Central', 
        color: '#7DE3F4', 
        size: 56, 
        group: 'main',
        x: 400,
        y: 300
      },
      { 
        id: 2, 
        label: 'Finance', 
        color: '#F7C873', 
        size: 40, 
        group: 'secondary',
        x: 300,
        y: 200
      },
      { 
        id: 3, 
        label: 'Tech', 
        color: '#B1A6F7', 
        size: 40, 
        group: 'secondary',
        x: 500,
        y: 200
      },
      { 
        id: 4, 
        label: 'Marketing', 
        color: '#F69AC1', 
        size: 40, 
        group: 'secondary',
        x: 300,
        y: 400
      },
      { 
        id: 5, 
        label: 'Sales', 
        color: '#F6E58D', 
        size: 40, 
        group: 'secondary',
        x: 500,
        y: 400
      },
      { 
        id: 6, 
        label: 'HR', 
        color: '#88E2B0', 
        size: 35, 
        group: 'secondary',
        x: 200,
        y: 300
      },
      { 
        id: 7, 
        label: 'Legal', 
        color: '#F6BED8', 
        size: 35, 
        group: 'secondary',
        x: 600,
        y: 300
      },
      { 
        id: 8, 
        label: 'Inactive', 
        color: '#384356', 
        size: 30, 
        group: 'inactive',
        x: 400,
        y: 100
      }
    ],
    edges: [
      { source: 1, target: 2, weight: 1 },
      { source: 1, target: 3, weight: 1 },
      { source: 1, target: 4, weight: 1 },
      { source: 1, target: 5, weight: 1 },
      { source: 1, target: 6, weight: 1 },
      { source: 1, target: 7, weight: 1 },
      { source: 2, target: 4, weight: 0.5 },
      { source: 3, target: 5, weight: 0.5 },
      { source: 6, target: 7, weight: 0.3 }
    ]
  });

  const [isLoading, setIsLoading] = useState(false);
  const [selectedNode, setSelectedNode] = useState(null);

  const handleNodeClick = (node) => {
    console.log('Node cliqué:', node);
    setSelectedNode(node);
  };

  const handleNodeAdd = () => {
    const newNodeId = Math.max(...graphData.nodes.map(n => n.id)) + 1;
    const colors = ['#F69AC1', '#F7C873', '#B1A6F7', '#F6E58D', '#88E2B0', '#F6BED8', '#F6E596'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    const newNode = {
      id: newNodeId,
      label: `Node ${newNodeId}`,
      color: randomColor,
      size: 35,
      group: 'secondary',
      x: 400 + (Math.random() - 0.5) * 200,
      y: 300 + (Math.random() - 0.5) * 200
    };

    const newEdge = {
      source: 1, // Connecté au node central
      target: newNodeId,
      weight: 1
    };

    setGraphData(prev => ({
      nodes: [...prev.nodes, newNode],
      edges: [...prev.edges, newEdge]
    }));
  };

  const handleNodeRemove = (nodeId) => {
    setGraphData(prev => ({
      nodes: prev.nodes.filter(n => n.id !== nodeId),
      edges: prev.edges.filter(e => e.source !== nodeId && e.target !== nodeId)
    }));
    setSelectedNode(null);
  };

  const handleNodeDrag = (nodeId, newPosition) => {
    setGraphData(prev => ({
      ...prev,
      nodes: prev.nodes.map(n => 
        n.id === nodeId 
          ? { ...n, x: newPosition.x, y: newPosition.y }
          : n
      )
    }));
  };

  const handleLoadDemo = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const handleClearGraph = () => {
    setGraphData({ nodes: [], edges: [] });
    setSelectedNode(null);
  };

  return (
    <div className="p-8 space-y-8 bg-[#181E29] min-h-screen">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Titre */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#F1F5F9] mb-2">
            Graphique Réseau - Bulles Colorées
          </h1>
          <p className="text-[#AAB7C6]">
            Implémentation selon spécifications exactes avec palette de couleurs précise
          </p>
        </div>

        {/* Contrôles */}
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            className="px-4 py-2 bg-[#3B82F6] text-white rounded-lg hover:bg-[#2563eb] transition-colors"
            onClick={handleNodeAdd}
          >
            Ajouter un node
          </button>
          <button
            className="px-4 py-2 bg-[#10B981] text-white rounded-lg hover:bg-[#059669] transition-colors"
            onClick={handleLoadDemo}
          >
            Charger démo
          </button>
          <button
            className="px-4 py-2 bg-[#EF4444] text-white rounded-lg hover:bg-[#DC2626] transition-colors"
            onClick={handleClearGraph}
          >
            Vider le graphique
          </button>
        </div>

        {/* Graphique principal */}
        <div className="bg-[#232B3E] rounded-xl p-6">
          <NetworkGraph 
            data={graphData}
            onNodeClick={handleNodeClick}
            onNodeAdd={handleNodeAdd}
            onNodeRemove={handleNodeRemove}
            onNodeDrag={handleNodeDrag}
            width={800}
            height={500}
            isLoading={isLoading}
          />
        </div>

        {/* Informations sur le node sélectionné */}
        {selectedNode && (
          <div className="bg-[#232B3E] rounded-xl p-6">
            <h3 className="text-xl font-semibold text-[#F1F5F9] mb-4">
              Node Sélectionné
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-[#AAB7C6] mb-2">
                  <strong>ID:</strong> {selectedNode.id}
                </p>
                <p className="text-[#AAB7C6] mb-2">
                  <strong>Label:</strong> {selectedNode.label}
                </p>
                <p className="text-[#AAB7C6] mb-2">
                  <strong>Groupe:</strong> {selectedNode.group}
                </p>
              </div>
              <div>
                <p className="text-[#AAB7C6] mb-2">
                  <strong>Couleur:</strong> 
                  <span 
                    className="inline-block w-4 h-4 rounded-full ml-2"
                    style={{ backgroundColor: selectedNode.color }}
                  ></span>
                  {selectedNode.color}
                </p>
                <p className="text-[#AAB7C6] mb-2">
                  <strong>Taille:</strong> {selectedNode.size}px
                </p>
                <p className="text-[#AAB7C6] mb-2">
                  <strong>Position:</strong> ({Math.round(selectedNode.x)}, {Math.round(selectedNode.y)})
                </p>
              </div>
            </div>
            <button
              className="mt-4 px-4 py-2 bg-[#EF4444] text-white rounded-lg hover:bg-[#DC2626] transition-colors"
              onClick={() => handleNodeRemove(selectedNode.id)}
            >
              Supprimer ce node
            </button>
          </div>
        )}

        {/* Palette de couleurs */}
        <div className="bg-[#232B3E] rounded-xl p-6">
          <h3 className="text-xl font-semibold text-[#F1F5F9] mb-4">
            Palette de Couleurs Utilisée
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Central', color: '#7DE3F4' },
              { name: 'Rose', color: '#F69AC1' },
              { name: 'Orange', color: '#F7C873' },
              { name: 'Violet', color: '#B1A6F7' },
              { name: 'Jaune', color: '#F6E58D' },
              { name: 'Vert', color: '#88E2B0' },
              { name: 'Rose pâle', color: '#F6BED8' },
              { name: 'Jaune doré', color: '#F6E596' },
              { name: 'Inactif', color: '#384356' }
            ].map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div 
                  className="w-6 h-6 rounded-full border-2 border-white"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-[#AAB7C6] text-sm">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Spécifications techniques */}
        <div className="bg-[#232B3E] rounded-xl p-6">
          <h3 className="text-xl font-semibold text-[#F1F5F9] mb-4">
            Spécifications Techniques Implémentées
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-semibold text-[#3B82F6] mb-2">Animations</h4>
              <ul className="text-[#AAB7C6] space-y-1 text-sm">
                <li>• Apparition: scale 0.6→1, opacity 0→1, 180ms</li>
                <li>• Hover: scale 1→1.12, shadow accentuée</li>
                <li>• Sélection: border 4px #3B82F6, shadow</li>
                <li>• Drag: scale 1.16, opacity 0.95</li>
                <li>• Suppression: scale 1→0.7, opacity 1→0, 100ms</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-[#3B82F6] mb-2">Accessibilité</h4>
              <ul className="text-[#AAB7C6] space-y-1 text-sm">
                <li>• tabIndex=0, role="button"</li>
                <li>• aria-label sur chaque node</li>
                <li>• Navigation clavier (Tab/Enter/ESC)</li>
                <li>• Tooltip avec aria-describedby</li>
                <li>• Focus ring visible</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-[#3B82F6] mb-2">Interactions</h4>
              <ul className="text-[#AAB7C6] space-y-1 text-sm">
                <li>• Click pour sélectionner</li>
                <li>• Drag & drop avec feedback visuel</li>
                <li>• Hover pour tooltip</li>
                <li>• Bouton + pour ajouter</li>
                <li>• Bouton - pour supprimer</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-[#3B82F6] mb-2">Responsive</h4>
              <ul className="text-[#AAB7C6] space-y-1 text-sm">
                <li>• Taille min 28px mobile</li>
                <li>• Taille max 64px desktop</li>
                <li>• Police min 13px</li>
                <li>• Layout adaptatif</li>
                <li>• Touch-friendly sur mobile</li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default NetworkGraphDemo;
