import React, { useState, useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text, Sphere, Line, Environment } from '@react-three/drei';
import * as THREE from 'three';

// Composant pour une sphère 3D interactive
function Node3D({ position, color, size, label, isSelected, onClick, onHover, isCentral = false }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      // Animation de pulsation pour le nœud central
      if (isCentral) {
        meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 3) * 0.1);
      } else {
        meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.05);
      }
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
          emissiveIntensity={isCentral ? 0.3 : 0.2}
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Effet de halo */}
      <mesh scale={[1.3, 1.3, 1.3]}>
        <sphereGeometry args={[size, 16, 16]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={hovered ? 0.4 : (isCentral ? 0.2 : 0.1)}
        />
      </mesh>

      {/* Label 3D */}
      {label && (
        <Text
          position={[0, size + 0.8, 0]}
          fontSize={0.2}
          color="white"
          anchorX="center"
          anchorY="middle"
          maxWidth={4}
        >
          {label}
        </Text>
      )}

      {/* Indicateur de sélection */}
      {isSelected && (
        <mesh>
          <ringGeometry args={[size + 0.3, size + 0.6, 32]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.8}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
    </group>
  );
}

// Composant pour une connexion 3D
function Connection3D({ from, to, color = "#60A5FA", isHighlighted = false }) {
  const points = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(from.x, from.y, from.z),
      new THREE.Vector3(
        (from.x + to.x) / 2,
        (from.y + to.y) / 2 + 0.8,
        (from.z + to.z) / 2
      ),
      new THREE.Vector3(to.x, to.y, to.z)
    ]);
    return curve.getPoints(50);
  }, [from, to]);

  return (
    <Line
      points={points}
      color={isHighlighted ? "#3B82F6" : color}
      lineWidth={isHighlighted ? 4 : 2}
      transparent
      opacity={isHighlighted ? 0.9 : 0.6}
    />
  );
}

// Composant principal du graphique 3D
function NetworkGraph3DScene({ nodes, connections, onNodeClick, selectedNode, onTopicClick, selectedTopic }) {
  const { camera } = useThree();

  // Position de la caméra pour une vue optimale
  React.useEffect(() => {
    camera.position.set(8, 6, 8);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  return (
    <>
      {/* Éclairage */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={1.2} />
      <pointLight position={[-10, -10, -5]} color="#3B82F6" intensity={0.8} />
      <pointLight position={[0, 5, 0]} color="#60A5FA" intensity={0.5} />

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
          isCentral={node.isCentral}
          onClick={() => onNodeClick(node)}
        />
      ))}

      {/* Connexions */}
      {connections.map((connection, index) => {
        const fromNode = nodes.find(n => n.id === connection.from);
        const toNode = nodes.find(n => n.id === connection.to);
        if (!fromNode || !toNode) return null;

        const isHighlighted = selectedTopic && connection.topic === selectedTopic;

        return (
          <Connection3D
            key={index}
            from={{ x: fromNode.x, y: fromNode.y, z: fromNode.z }}
            to={{ x: toNode.x, y: toNode.y, z: toNode.z }}
            color={connection.color || "#60A5FA"}
            isHighlighted={isHighlighted}
          />
        );
      })}
    </>
  );
}

const NetworkGraph3DExact = () => {
  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);

  // Nœuds du réseau basés sur les captures d'écran
  const nodes = useMemo(() => [
    // Nœud central UNCTAD
    {
      id: 'unctad',
      x: 0, y: 0, z: 0,
      size: 0.8,
      color: '#3B82F6',
      label: 'UNCTAD',
      isCentral: true
    },
    // Nœuds d'événements (gauche)
    {
      id: 'event1',
      x: -3, y: 2, z: -1,
      size: 0.3,
      color: '#10B981',
      label: 'Event 1'
    },
    {
      id: 'event2',
      x: -4, y: 1, z: 0,
      size: 0.25,
      color: '#10B981',
      label: 'Event 2'
    },
    {
      id: 'event3',
      x: -3.5, y: 0, z: 1,
      size: 0.3,
      color: '#10B981',
      label: 'Event 3'
    },
    {
      id: 'event4',
      x: -4, y: -1, z: -0.5,
      size: 0.25,
      color: '#10B981',
      label: 'Event 4'
    },
    // Nœuds d'influenceurs (droite)
    {
      id: 'influencer1',
      x: 3, y: 2, z: -1,
      size: 0.3,
      color: '#EF4444',
      label: 'Ryan Griffin'
    },
    {
      id: 'influencer2',
      x: 4, y: 1, z: 0,
      size: 0.25,
      color: '#F59E0B',
      label: 'Andrew Lawrence'
    },
    {
      id: 'influencer3',
      x: 3.5, y: 0, z: 1,
      size: 0.3,
      color: '#8B5CF6',
      label: 'Joseph Wallace'
    },
    {
      id: 'influencer4',
      x: 4, y: -1, z: -0.5,
      size: 0.25,
      color: '#06B6D4',
      label: 'John Desai'
    },
    {
      id: 'influencer5',
      x: 3, y: -2, z: 0.5,
      size: 0.3,
      color: '#EC4899',
      label: 'David Raynor'
    }
  ], []);

  // Connexions par topics
  const connections = useMemo(() => [
    { from: 'unctad', to: 'event1', topic: 'sustainable-business', color: '#60A5FA' },
    { from: 'unctad', to: 'event2', topic: 'international-frameworks', color: '#60A5FA' },
    { from: 'unctad', to: 'event3', topic: 'sustainable-finance', color: '#60A5FA' },
    { from: 'unctad', to: 'event4', topic: 'national-policy', color: '#60A5FA' },
    { from: 'unctad', to: 'influencer1', topic: 'sustainable-business', color: '#60A5FA' },
    { from: 'unctad', to: 'influencer2', topic: 'international-frameworks', color: '#60A5FA' },
    { from: 'unctad', to: 'influencer3', topic: 'sustainable-finance', color: '#60A5FA' },
    { from: 'unctad', to: 'influencer4', topic: 'national-policy', color: '#60A5FA' },
    { from: 'unctad', to: 'influencer5', topic: 'p3s-fin-partnership', color: '#3B82F6' }
  ], []);

  // Topics avec connexions
  const topics = [
    { id: 'sustainable-business', name: 'Sustainable Business Practices', connections: 8, color: '#10B981' },
    { id: 'international-frameworks', name: 'International Frameworks', connections: 24, color: '#3B82F6' },
    { id: 'sustainable-finance', name: 'Sustainable Finance', connections: 18, color: '#F59E0B' },
    { id: 'national-policy', name: 'National Policy', connections: 34, color: '#EF4444' },
    { id: 'p3s-fin-partnership', name: 'P3s and Fin Partnership', connections: 10, color: '#8B5CF6' },
    { id: 'cause-sector', name: 'Cause Sector', connections: 58, color: '#06B6D4' },
    { id: 'commodity-supply', name: 'Commodity Supply Chains', connections: 5, color: '#EC4899' },
    { id: 'support-sb', name: 'Support for SB', connections: 14, color: '#84CC16' },
    { id: 'private-sector', name: 'Private Sector', connections: 26, color: '#F97316' }
  ];

  const handleNodeClick = (node) => {
    setSelectedNode(selectedNode?.id === node.id ? null : node);
  };

  const handleTopicClick = (topic) => {
    setSelectedTopic(selectedTopic?.id === topic.id ? null : topic);
  };

  return (
    <div className="relative w-full h-96 bg-gray-800/50 rounded-lg overflow-hidden">
      {/* Canvas 3D */}
      <Canvas
        camera={{ position: [8, 6, 8], fov: 60 }}
        style={{ background: 'transparent' }}
      >
        <NetworkGraph3DScene
          nodes={nodes}
          connections={connections}
          onNodeClick={handleNodeClick}
          selectedNode={selectedNode}
          onTopicClick={handleTopicClick}
          selectedTopic={selectedTopic}
        />
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={5}
          maxDistance={20}
        />
      </Canvas>

      {/* Liste des topics à droite */}
      <div className="absolute top-4 right-4 bg-gray-900/90 backdrop-blur-sm rounded-lg p-4 border border-gray-700 max-w-xs">
        <h3 className="text-white font-semibold mb-4">Connections by topics</h3>
        <div className="space-y-2">
          {topics.map((topic) => (
            <div
              key={topic.id}
              className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer transition-all ${
                selectedTopic?.id === topic.id 
                  ? 'bg-blue-600/30 border border-blue-500' 
                  : 'hover:bg-gray-800/50'
              }`}
              onClick={() => handleTopicClick(topic)}
            >
              <div 
                className="w-3 h-3 rounded-full border-2 border-white"
                style={{ backgroundColor: topic.color }}
              ></div>
              <div className="flex-1">
                <p className="text-white text-sm">{topic.name}</p>
                <p className="text-gray-400 text-xs">{topic.connections} connections</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-4 left-4 text-gray-400 text-sm">
        <p>3D Network Visualization</p>
        <p className="text-xs mt-1">
          Click on spheres to select • Click on topics to highlight connections
        </p>
      </div>
    </div>
  );
};

export default NetworkGraph3DExact;
