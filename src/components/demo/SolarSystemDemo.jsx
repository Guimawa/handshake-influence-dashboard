import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Settings,
  Info,
  Zap
} from 'lucide-react';
import { SolarSystem } from '../solar-system/SolarSystem';

export default function SolarSystemDemo() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [showInfo, setShowInfo] = useState(false);
  const [satelliteCount, setSatelliteCount] = useState(0);

  const handleOpenDetailPanel = (bubble) => {
    console.log('Panel détail ouvert pour:', bubble);
  };

  const handleAddSatellites = () => {
    setSatelliteCount(prev => Math.min(prev + 2, 8));
  };

  const handleReset = () => {
    setSatelliteCount(0);
  };

  return (
    <div className="min-h-screen bg-[#181E29] text-[#F1F5F9]">
      {/* Header avec contrôles */}
      <header className="bg-[#232B3E] border-b border-[#222C3B] p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[#F1F5F9] mb-2">
                Système Solaire - Zone 1
              </h1>
              <p className="text-[#AAB7C6]">
                Interface système solaire selon cahier des charges ultra précis
              </p>
            </div>

            {/* Contrôles */}
            <div className="flex items-center gap-4">
              <motion.button
                className="
                  flex items-center gap-2 px-4 py-2 bg-[#3B82F6] text-white
                  rounded-lg font-medium hover:bg-[#2563eb] transition-colors
                  focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:ring-offset-2
                "
                onClick={handleAddSatellites}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Zap className="w-4 h-4" />
                Ajouter Satellites
              </motion.button>

              <motion.button
                className="
                  flex items-center gap-2 px-4 py-2 bg-[#222C3B] text-[#AAB7C6]
                  rounded-lg font-medium hover:bg-[#2A3142] hover:text-white transition-colors
                  focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:ring-offset-2
                "
                onClick={handleReset}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </motion.button>

              <motion.button
                className="
                  flex items-center gap-2 px-4 py-2 bg-[#222C3B] text-[#AAB7C6]
                  rounded-lg font-medium hover:bg-[#2A3142] hover:text-white transition-colors
                  focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:ring-offset-2
                "
                onClick={() => setShowInfo(!showInfo)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Info className="w-4 h-4" />
                Info
              </motion.button>
            </div>
          </div>

          {/* Informations techniques */}
          <motion.div
            className="mt-4 p-4 bg-[#222C3B] rounded-lg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ 
              opacity: showInfo ? 1 : 0, 
              height: showInfo ? 'auto' : 0 
            }}
            transition={{ duration: 0.2 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <h4 className="font-semibold text-[#F1F5F9] mb-2">Palette Couleurs</h4>
                <ul className="space-y-1 text-[#AAB7C6]">
                  <li>• Fond: #181A20 → #212837</li>
                  <li>• Bulle: #46B8EA → #15203A</li>
                  <li>• Satellites: 6 couleurs exactes</li>
                  <li>• Traits: #4EE2EC</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-[#F1F5F9] mb-2">Animations</h4>
                <ul className="space-y-1 text-[#AAB7C6]">
                  <li>• Pulse principal: 2.4s</li>
                  <li>• Satellites: 1.8s + rotation</li>
                  <li>• Apparition: 60ms décalé</li>
                  <li>• Hover: 120ms ease-out</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-[#F1F5F9] mb-2">Interactions</h4>
                <ul className="space-y-1 text-[#AAB7C6]">
                  <li>• Double-clic: déployer</li>
                  <li>• Hover: bouton +</li>
                  <li>• Clic satellite: panel</li>
                  <li>• ESC: fermer panel</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Zone principale - Système Solaire */}
      <main className="relative w-full h-screen overflow-hidden">
        <SolarSystem 
          isMobile={false}
          onOpenDetailPanel={handleOpenDetailPanel}
        />

        {/* Overlay de démonstration */}
        <div className="absolute top-4 left-4 z-10">
          <motion.div
            className="bg-[#232B3E] rounded-lg p-4 shadow-lg border border-[#222C3B]"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-lg font-semibold text-[#F1F5F9] mb-2">
              Instructions
            </h3>
            <ul className="text-sm text-[#AAB7C6] space-y-1">
              <li>• Double-clic bulle centrale</li>
              <li>• Hover pour bouton +</li>
              <li>• Clic satellite → panel</li>
              <li>• ESC pour fermer</li>
            </ul>
          </motion.div>
        </div>

        {/* Compteur satellites */}
        <div className="absolute top-4 right-4 z-10">
          <motion.div
            className="bg-[#232B3E] rounded-lg p-4 shadow-lg border border-[#222C3B]"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-[#46B8EA] mb-1">
                {satelliteCount}
              </div>
              <div className="text-sm text-[#AAB7C6]">
                Satellites
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
