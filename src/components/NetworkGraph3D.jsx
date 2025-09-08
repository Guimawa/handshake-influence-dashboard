import React, { useState, useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text, Sphere, Line, Environment } from '@react-three/drei';
import { Plus, X, Edit3, Trash2 } from 'lucide-react';
import * as THREE from 'three';

// Composant pour une sphère 3D interactive
function Node3D({ position, color, size, label, isSelected, onClick, onHover }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      // Animation de pulsation subtile
      meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.05);
      
      // Rotation lente
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group position={position}>
      {/* Sphère principale */}
      <mesh
        ref={meshRef}
        onClick={onClick}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          onHover?.(true);
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHovered(false);
          onHover?.(false);
        }}
      >
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.2}
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Effet de halo */}
      <mesh scale={[1.2, 1.2, 1.2]}>
        <sphereGeometry args={[size, 16, 16]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={hovered ? 0.3 : 0.1}
        />
      </mesh>

      {/* Label 3D */}
      {label && (
        <Text
          position={[0, size + 0.5, 0]}
          fontSize={0.3}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {label}
        </Text>
      )}

      {/* Indicateur de sélection */}
      {isSelected && (
        <mesh>
          <ringGeometry args={[size + 0.2, size + 0.4, 32]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.6}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
    </group>
  );
}

// Composant pour une connexion 3D
function Connection3D({ from, to, color = "#374151" }) {
  const points = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(from.x, from.y, from.z),
      new THREE.Vector3(
        (from.x + to.x) / 2,
        (from.y + to.y) / 2 + 0.5,
        (from.z + to.z) / 2
      ),
      new THREE.Vector3(to.x, to.y, to.z)
    ]);
    return curve.getPoints(50);
  }, [from, to]);

  return (
    <Line
      points={points}
      color={color}
      lineWidth={2}
      transparent
      opacity={0.6}
    />
  );
}

// Composant principal du graphique 3D
function NetworkGraph3DScene({ nodes, connections, onNodeClick, selectedNode }) {
  const { camera } = useThree();

  // Position de la caméra pour une vue optimale
  React.useEffect(() => {
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  return (
    <>
      {/* Éclairage */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} color="#3B82F6" intensity={0.5} />

      {/* Environnement */}
      <Environment preset="night" />

      {/* Nœuds */}
      {nodes.map((node) => (
        <Node3D
          key={node.id}
          position={[node.x, node.y, node.z]}
          color={node.color}
          size={node.size}
          label={node.label}
          isSelected={selectedNode?.id === node.id}
          onClick={() => onNodeClick(node)}
        />
      ))}

      {/* Connexions */}
      {connections.map((connection, index) => {
        const fromNode = nodes.find(n => n.id === connection.from);
        const toNode = nodes.find(n => n.id === connection.to);
        if (!fromNode || !toNode) return null;

        return (
          <Connection3D
            key={index}
            from={{ x: fromNode.x, y: fromNode.y, z: fromNode.z }}
            to={{ x: toNode.x, y: toNode.y, z: toNode.z }}
            color={connection.color || "#374151"}
          />
        );
      })}
    </>
  );
}

const EmptyNetworkGraph3D = () => {
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
    size: 0.3
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
      x: (Math.random() - 0.5) * 8,
      y: (Math.random() - 0.5) * 6,
      z: (Math.random() - 0.5) * 8,
      ...newNode,
      size: parseFloat(newNode.size)
    };

    setNodes([...nodes, node]);
    setNewNode({ label: '', category: 'finance', color: '#3B82F6', size: 0.3 });
    setShowAddForm(false);
  };

  const handleNodeClick = (node) => {
    if (isConnecting) {
      if (!connectingFrom) {
        setConnectingFrom(node);
      } else if (connectingFrom.id !== node.id) {
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
          <span className="text-sm">Ajouter une sphère</span>
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
            {connectingFrom ? 'Cliquez sur une autre sphère pour connecter' : 'Cliquez sur une sphère pour commencer'}
          </span>
        )}
      </div>

      {/* Canvas 3D */}
      <Canvas
        camera={{ position: [5, 5, 5], fov: 60 }}
        style={{ background: 'transparent' }}
      >
        <NetworkGraph3DScene
          nodes={nodes}
          connections={connections}
          onNodeClick={handleNodeClick}
          selectedNode={selectedNode}
        />
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={3}
          maxDistance={20}
        />
      </Canvas>

      {/* Add Node Form */}
      {showAddForm && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-700 w-80">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white font-semibold">Ajouter une nouvelle sphère 3D</h3>
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
                  min="0.1"
                  max="0.8"
                  step="0.1"
                  value={newNode.size}
                  onChange={(e) => setNewNode({...newNode, size: e.target.value})}
                  className="w-full"
                />
                <span className="text-gray-400 text-xs">{newNode.size}</span>
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

      {/* Empty state */}
      {nodes.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center text-gray-400">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full border-2 border-dashed border-gray-600 flex items-center justify-center">
              <Plus size={24} />
            </div>
            <p className="text-lg font-medium mb-2">Graphique réseau 3D vide</p>
            <p className="text-sm">Cliquez sur "Ajouter une sphère" pour commencer</p>
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
            <span className="text-xs text-gray-400">Taille: {selectedNode.size}</span>
          </div>
        </div>
      )}
      
      {/* Instructions */}
      <div className="absolute bottom-4 left-4 text-gray-400 text-sm">
        <p>Graphique réseau 3D interactif</p>
        <p className="text-xs mt-1">
          {nodes.length > 0 ? 'Cliquez sur les sphères pour les sélectionner • Utilisez la souris pour naviguer' : 'Commencez par ajouter des sphères'}
        </p>
      </div>
    </div>
  );
};

export default EmptyNetworkGraph3D;
