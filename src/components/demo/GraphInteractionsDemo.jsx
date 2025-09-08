import { useState, useRef } from 'react';
import DetailPanel from '../atoms/DetailPanel';
import EdgePopover from '../atoms/EdgePopover';
import NodeContextMenu from '../atoms/NodeContextMenu';
import Popover from '../atoms/Popover';
import { motion } from 'framer-motion';

const GraphInteractionsDemo = () => {
  const [selectedNode, setSelectedNode] = useState(null);
  const [isDetailPanelOpen, setIsDetailPanelOpen] = useState(false);
  const [isEdgePopoverOpen, setIsEdgePopoverOpen] = useState(false);
  const [edgePopoverPosition, setEdgePopoverPosition] = useState({ x: 0, y: 0 });
  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
  const [contextMenuNode, setContextMenuNode] = useState(null);
  const [isNodePopoverOpen, setIsNodePopoverOpen] = useState(false);
  const [nodePopoverPosition, setNodePopoverPosition] = useState({ x: 0, y: 0 });
  const [nodePopoverNode, setNodePopoverNode] = useState(null);

  // Données de démonstration
  const nodes = [
    {
      id: 'node-1',
      label: 'Node Principal',
      type: 'Hub',
      color: '#7DE3F4',
      size: 48,
      group: 'Core',
      edges: [
        { targetLabel: 'Node A', weight: 0.8 },
        { targetLabel: 'Node B', weight: 0.6 }
      ],
      weight: 0.9,
      createdAt: '2024-01-15',
      description: 'Node central du réseau avec de nombreuses connexions.'
    },
    {
      id: 'node-2',
      label: 'Node A',
      type: 'Satellite',
      color: '#F69AC1',
      size: 36,
      group: 'Secondary',
      edges: [
        { targetLabel: 'Node Principal', weight: 0.8 }
      ],
      weight: 0.7,
      createdAt: '2024-01-16',
      description: 'Node satellite connecté au hub principal.'
    },
    {
      id: 'node-3',
      label: 'Node B',
      type: 'Leaf',
      color: '#F7C873',
      size: 32,
      group: 'Tertiary',
      edges: [
        { targetLabel: 'Node Principal', weight: 0.6 }
      ],
      weight: 0.5,
      createdAt: '2024-01-17',
      description: 'Node terminal avec connexion unique.'
    }
  ];

  const edges = [
    {
      id: 'edge-1',
      label: 'Connexion forte',
      sourceLabel: 'Node Principal',
      targetLabel: 'Node A',
      weight: 0.8,
      type: 'Strong',
      createdAt: '2024-01-15'
    },
    {
      id: 'edge-2',
      label: 'Connexion modérée',
      sourceLabel: 'Node Principal',
      targetLabel: 'Node B',
      weight: 0.6,
      type: 'Medium',
      createdAt: '2024-01-16'
    }
  ];

  const handleNodeClick = (node) => {
    setSelectedNode(node);
    setIsDetailPanelOpen(true);
  };

  const handleNodeRightClick = (event, node) => {
    event.preventDefault();
    setContextMenuNode(node);
    setContextMenuPosition({ x: event.clientX, y: event.clientY });
    setIsContextMenuOpen(true);
  };

  const handleNodeHover = (event, node) => {
    setNodePopoverNode(node);
    setNodePopoverPosition({ x: event.clientX, y: event.clientY });
    setIsNodePopoverOpen(true);
  };

  const handleNodeLeave = () => {
    setIsNodePopoverOpen(false);
  };

  const handleEdgeHover = (event, edge) => {
    setEdgePopoverPosition({ x: event.clientX, y: event.clientY });
    setIsEdgePopoverOpen(true);
  };

  const handleEdgeLeave = () => {
    setIsEdgePopoverOpen(false);
  };

  const handleContextMenuAction = (action, node) => {
    console.log(`Action ${action} sur node ${node.id}`);
    // Ici vous pouvez implémenter les actions réelles
  };

  const handleAddNode = () => {
    const newNode = {
      id: `node-${Date.now()}`,
      label: 'Nouveau Node',
      type: 'Custom',
      color: '#10B981',
      size: 36,
      group: 'New',
      edges: [],
      weight: 0.5,
      createdAt: new Date().toISOString(),
      description: 'Node nouvellement créé.'
    };
    console.log('Ajout du node:', newNode);
  };

  return (
    <div className="p-8 space-y-8 bg-[#181E29] min-h-screen">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Titre */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#F1F5F9] mb-2">
            Interactions Graphiques Avancées
          </h1>
          <p className="text-[#AAB7C6]">
            Panel de détail, Popovers, Context Menu, Interactions Node/Edge
          </p>
        </div>

        {/* Zone de démonstration du graphique */}
        <div className="bg-[#232B3E] rounded-2xl p-8 min-h-[600px] relative overflow-hidden">
          <h2 className="text-xl font-semibold text-[#F1F5F9] mb-6">
            Zone Graphique Interactive
          </h2>
          
          {/* Bouton d'ajout de node */}
          <motion.button
            className="absolute top-4 right-4 w-12 h-12 bg-[#3B82F6] text-white rounded-full 
                       flex items-center justify-center shadow-lg hover:bg-[#2563eb] transition-colors
                       focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
            onClick={handleAddNode}
            whileHover={{ 
              scale: 1.1,
              transition: { duration: 0.12, ease: [0.23, 1, 0.32, 1] }
            }}
            whileTap={{ 
              scale: 0.95,
              transition: { duration: 0.08, ease: [0.23, 1, 0.32, 1] }
            }}
            aria-label="Ajouter un nouveau node"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
              <path 
                stroke="currentColor" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M12 6v6m0 0v6m0-6h6m-6 0H6" 
              />
            </svg>
          </motion.button>

          {/* Instructions */}
          <div className="mb-6 p-4 bg-[#222C3B] rounded-lg">
            <h3 className="text-sm font-semibold text-[#F1F5F9] mb-2">Instructions :</h3>
            <ul className="text-sm text-[#AAB7C6] space-y-1">
              <li>• <strong>Clic gauche</strong> sur un node : Ouvrir le panel de détail</li>
              <li>• <strong>Clic droit</strong> sur un node : Menu contextuel</li>
              <li>• <strong>Hover</strong> sur un node : Popover d'information</li>
              <li>• <strong>Hover</strong> sur une edge : Popover de relation</li>
            </ul>
          </div>

          {/* Simulation du graphique */}
          <div className="relative w-full h-96 bg-[#181E29] rounded-xl border border-[#222C3B] overflow-hidden">
            
            {/* Edges (lignes de connexion) */}
            <svg className="absolute inset-0 w-full h-full">
              {edges.map((edge, index) => (
                <motion.line
                  key={edge.id}
                  x1="200"
                  y1="150"
                  x2={300 + index * 100}
                  y2="200"
                  stroke="rgba(145, 163, 193, 0.33)"
                  strokeWidth="2"
                  className="cursor-pointer"
                  onMouseEnter={(e) => handleEdgeHover(e, edge)}
                  onMouseLeave={handleEdgeLeave}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                />
              ))}
            </svg>

            {/* Nodes (bulles) */}
            {nodes.map((node, index) => (
              <motion.div
                key={node.id}
                className="absolute cursor-pointer select-none"
                style={{
                  left: 150 + index * 150,
                  top: 120 + index * 20,
                  width: node.size,
                  height: node.size
                }}
                onClick={() => handleNodeClick(node)}
                onContextMenu={(e) => handleNodeRightClick(e, node)}
                onMouseEnter={(e) => handleNodeHover(e, node)}
                onMouseLeave={handleNodeLeave}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.2,
                  ease: [0.23, 1, 0.32, 1]
                }}
                whileHover={{ 
                  scale: 1.1,
                  transition: { duration: 0.12, ease: [0.23, 1, 0.32, 1] }
                }}
                whileTap={{ 
                  scale: 0.95,
                  transition: { duration: 0.08, ease: [0.23, 1, 0.32, 1] }
                }}
              >
                <div
                  className="w-full h-full rounded-full flex items-center justify-center text-white font-bold text-sm
                             shadow-lg border-2 border-white/20"
                  style={{ 
                    background: node.color,
                    boxShadow: `0 4px 20px 0 ${node.color}40`
                  }}
                >
                  {node.label.charAt(0)}
                </div>
              </motion.div>
            ))}

            {/* Légende */}
            <div className="absolute bottom-4 left-4 bg-[#232B3E] rounded-lg p-3 border border-[#222C3B]">
              <h4 className="text-sm font-semibold text-[#F1F5F9] mb-2">Légende</h4>
              <div className="space-y-1 text-xs text-[#AAB7C6]">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#7DE3F4]" />
                  <span>Hub Principal</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#F69AC1]" />
                  <span>Node Satellite</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#F7C873]" />
                  <span>Node Terminal</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Composants de démonstration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Panel de détail */}
          <div className="bg-[#232B3E] rounded-xl p-6">
            <h3 className="text-lg font-semibold text-[#F1F5F9] mb-4">Panel de Détail</h3>
            <p className="text-[#AAB7C6] text-sm mb-4">
              Cliquez sur un node pour ouvrir le panel de détail avec toutes les informations.
            </p>
            <button
              className="px-4 py-2 bg-[#3B82F6] text-white rounded-lg hover:bg-[#2563eb] transition-colors"
              onClick={() => handleNodeClick(nodes[0])}
            >
              Ouvrir Panel
            </button>
          </div>

          {/* Context Menu */}
          <div className="bg-[#232B3E] rounded-xl p-6">
            <h3 className="text-lg font-semibold text-[#F1F5F9] mb-4">Menu Contextuel</h3>
            <p className="text-[#AAB7C6] text-sm mb-4">
              Clic droit sur un node pour afficher le menu contextuel avec les actions.
            </p>
            <button
              className="px-4 py-2 bg-[#3B82F6] text-white rounded-lg hover:bg-[#2563eb] transition-colors"
              onClick={(e) => handleNodeRightClick(e, nodes[0])}
            >
              Simuler Clic Droit
            </button>
          </div>
        </div>

        {/* Panel de détail */}
        <DetailPanel
          isOpen={isDetailPanelOpen}
          onClose={() => setIsDetailPanelOpen(false)}
          node={selectedNode}
        />

        {/* Edge Popover */}
        <EdgePopover
          isOpen={isEdgePopoverOpen}
          onClose={() => setIsEdgePopoverOpen(false)}
          edge={edges[0]}
          position={edgePopoverPosition}
        />

        {/* Node Context Menu */}
        <NodeContextMenu
          isOpen={isContextMenuOpen}
          onClose={() => setIsContextMenuOpen(false)}
          position={contextMenuPosition}
          node={contextMenuNode}
          onAction={handleContextMenuAction}
        />

        {/* Node Popover */}
        <Popover
          isOpen={isNodePopoverOpen}
          onClose={() => setIsNodePopoverOpen(false)}
          position={nodePopoverPosition}
          title={nodePopoverNode?.label || 'Node'}
          content={nodePopoverNode?.description || 'Informations du node'}
          placement="top"
        />

      </div>
    </div>
  );
};

export default GraphInteractionsDemo;
