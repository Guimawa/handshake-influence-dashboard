import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Globe,
  Save,
  RotateCcw
} from 'lucide-react';

export default function EmptySettingsPage() {
  const [activeTab, setActiveTab] = useState('general');

  const settingsTabs = [
    { id: 'general', label: 'Général', icon: Settings },
    { id: 'profile', label: 'Profil', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Sécurité', icon: Shield },
    { id: 'appearance', label: 'Apparence', icon: Palette },
    { id: 'language', label: 'Langue', icon: Globe }
  ];

  return (
    <motion.div
      className="min-h-screen bg-[#181E29] p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.12, ease: [0.23, 1, 0.32, 1] }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.12, ease: [0.23, 1, 0.32, 1] }}
        >
          <h1 className="text-3xl font-bold text-[#F1F5F9] mb-2">
            Paramètres
          </h1>
          <p className="text-[#AAB7C6]">
            Gérez vos préférences et configurations
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Navigation des onglets */}
          <motion.div
            className="lg:w-64"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.12, delay: 0.1 }}
          >
            <nav className="space-y-2" role="tablist">
              {settingsTabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                
                return (
                  <motion.button
                    key={tab.id}
                    className={`
                      w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left
                      transition-all duration-120
                      ${isActive 
                        ? 'bg-[#3B82F6] text-white' 
                        : 'text-[#AAB7C6] hover:bg-[#222C3B] hover:text-white'
                      }
                    `}
                    onClick={() => setActiveTab(tab.id)}
                    role="tab"
                    aria-selected={isActive}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </motion.button>
                );
              })}
            </nav>
          </motion.div>

          {/* Contenu principal */}
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.12, delay: 0.2 }}
          >
            <div className="bg-[#232B3E] rounded-xl shadow-lg p-8 border border-[#222C3B]">
              {/* Titre de l'onglet actif */}
              <div className="flex items-center gap-3 mb-8">
                {(() => {
                  const activeTabData = settingsTabs.find(tab => tab.id === activeTab);
                  const Icon = activeTabData?.icon || Settings;
                  return <Icon className="w-6 h-6 text-[#3B82F6]" />;
                })()}
                <h2 className="text-xl font-semibold text-[#F1F5F9]">
                  {settingsTabs.find(tab => tab.id === activeTab)?.label}
                </h2>
              </div>

              {/* Options vides selon l'onglet */}
              <div className="space-y-6">
                {/* Toggle options */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-[#222C3B] rounded-lg">
                    <div>
                      <h3 className="font-medium text-[#F1F5F9]">Option 1</h3>
                      <p className="text-sm text-[#AAB7C6]">Description de l'option</p>
                    </div>
                    <button
                      className="
                        w-12 h-6 bg-[#222C3B] rounded-full border-2 border-[#222C3B]
                        relative transition-colors duration-120
                        disabled:opacity-50 disabled:cursor-not-allowed
                      "
                      disabled
                      role="switch"
                      aria-checked="false"
                    >
                      <div className="w-5 h-5 bg-[#AAB7C6] rounded-full absolute top-0.5 left-0.5 transition-transform duration-120" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-[#222C3B] rounded-lg">
                    <div>
                      <h3 className="font-medium text-[#F1F5F9]">Option 2</h3>
                      <p className="text-sm text-[#AAB7C6]">Description de l'option</p>
                    </div>
                    <button
                      className="
                        w-12 h-6 bg-[#222C3B] rounded-full border-2 border-[#222C3B]
                        relative transition-colors duration-120
                        disabled:opacity-50 disabled:cursor-not-allowed
                      "
                      disabled
                      role="switch"
                      aria-checked="false"
                    >
                      <div className="w-5 h-5 bg-[#AAB7C6] rounded-full absolute top-0.5 left-0.5 transition-transform duration-120" />
                    </button>
                  </div>
                </div>

                {/* Select options */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#F1F5F9] mb-2">
                      Sélection
                    </label>
                    <select
                      className="
                        w-full p-3 bg-[#222C3B] border border-[#222C3B] rounded-lg
                        text-[#F1F5F9] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]
                        disabled:opacity-50 disabled:cursor-not-allowed
                      "
                      disabled
                    >
                      <option value="">Aucune option disponible</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#F1F5F9] mb-2">
                      Autre sélection
                    </label>
                    <select
                      className="
                        w-full p-3 bg-[#222C3B] border border-[#222C3B] rounded-lg
                        text-[#F1F5F9] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]
                        disabled:opacity-50 disabled:cursor-not-allowed
                      "
                      disabled
                    >
                      <option value="">Aucune option disponible</option>
                    </select>
                  </div>
                </div>

                {/* Input options */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#F1F5F9] mb-2">
                      Champ de texte
                    </label>
                    <input
                      type="text"
                      placeholder="Aucune valeur disponible"
                      className="
                        w-full p-3 bg-[#222C3B] border border-[#222C3B] rounded-lg
                        text-[#F1F5F9] placeholder-[#AAB7C6] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]
                        disabled:opacity-50 disabled:cursor-not-allowed
                      "
                      disabled
                    />
                  </div>
                </div>

                {/* Empty state */}
                <motion.div
                  className="text-center py-12"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.12, delay: 0.3 }}
                >
                  <Settings className="w-12 h-12 text-[#AAB7C6] mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-[#F1F5F9] mb-2">
                    Aucun paramètre modifiable pour l'instant
                  </h3>
                  <p className="text-[#AAB7C6]">
                    Les paramètres seront disponibles prochainement
                  </p>
                </motion.div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-[#222C3B]">
                <motion.button
                  className="
                    flex items-center gap-2 px-4 py-2 text-[#AAB7C6] 
                    hover:text-white transition-colors
                    focus:outline-none focus:ring-2 focus:ring-[#3B82F6] rounded
                    disabled:opacity-50 disabled:cursor-not-allowed
                  "
                  disabled
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Réinitialiser</span>
                </motion.button>

                <motion.button
                  className="
                    flex items-center gap-2 px-6 py-2 bg-[#3B82F6] text-white
                    font-semibold rounded-lg hover:bg-[#2563eb] transition-colors
                    focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:ring-offset-2
                    disabled:opacity-50 disabled:cursor-not-allowed
                  "
                  disabled
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Save className="w-4 h-4" />
                  <span>Enregistrer</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
