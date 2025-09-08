import { useState } from 'react';
import { motion } from 'framer-motion';

const QuickSettings = ({ 
  settings = {},
  onSettingsChange,
  className = ""
}) => {
  const [localSettings, setLocalSettings] = useState({
    heatmapEnabled: false,
    nodeOpacity: 80,
    mainView: 'graph',
    autoSave: true,
    notifications: true,
    darkMode: true,
    ...settings
  });

  const handleSettingChange = (key, value) => {
    const newSettings = { ...localSettings, [key]: value };
    setLocalSettings(newSettings);
    onSettingsChange?.(newSettings);
  };

  const settingConfigs = [
    {
      key: 'heatmapEnabled',
      label: 'Activer la heatmap',
      type: 'toggle',
      description: 'Afficher la carte de chaleur des interactions'
    },
    {
      key: 'nodeOpacity',
      label: 'Opacité des nodes',
      type: 'slider',
      description: 'Contrôler la transparence des éléments',
      min: 0,
      max: 100,
      unit: '%'
    },
    {
      key: 'mainView',
      label: 'Vue principale',
      type: 'select',
      description: 'Choisir l\'affichage par défaut',
      options: [
        { value: 'graph', label: 'Graphe' },
        { value: 'list', label: 'Liste' },
        { value: 'timeline', label: 'Timeline' },
        { value: 'grid', label: 'Grille' }
      ]
    },
    {
      key: 'autoSave',
      label: 'Sauvegarde automatique',
      type: 'toggle',
      description: 'Sauvegarder automatiquement les modifications'
    },
    {
      key: 'notifications',
      label: 'Notifications',
      type: 'toggle',
      description: 'Recevoir des notifications en temps réel'
    },
    {
      key: 'darkMode',
      label: 'Mode sombre',
      type: 'toggle',
      description: 'Utiliser le thème sombre'
    }
  ];

  const renderSetting = (config) => {
    switch (config.type) {
      case 'toggle':
        return (
          <motion.label
            key={config.key}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-[#222C3B] transition-colors duration-120 cursor-pointer"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <div className="flex-1">
              <span className="text-[#F1F5F9] font-semibold block">
                {config.label}
              </span>
              {config.description && (
                <span className="text-[#AAB7C6] text-sm">
                  {config.description}
                </span>
              )}
            </div>
            <div className="relative">
              <input
                type="checkbox"
                className="sr-only"
                checked={localSettings[config.key]}
                onChange={(e) => handleSettingChange(config.key, e.target.checked)}
                aria-label={config.label}
              />
              <motion.div
                className={`w-12 h-6 rounded-full transition-colors duration-200 ${
                  localSettings[config.key] ? 'bg-[#3B82F6]' : 'bg-[#384356]'
                }`}
                animate={{
                  backgroundColor: localSettings[config.key] ? '#3B82F6' : '#384356'
                }}
                transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
              >
                <motion.div
                  className="w-5 h-5 bg-white rounded-full shadow-md mt-0.5"
                  animate={{
                    x: localSettings[config.key] ? 24 : 2
                  }}
                  transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                />
              </motion.div>
            </div>
          </motion.label>
        );

      case 'slider':
        return (
          <motion.label
            key={config.key}
            className="flex flex-col gap-2 p-3 rounded-lg hover:bg-[#222C3B] transition-colors duration-120"
            whileHover={{ scale: 1.01 }}
          >
            <div className="flex items-center justify-between">
              <span className="text-[#F1F5F9] font-semibold">
                {config.label}
              </span>
              <span className="text-[#3B82F6] font-bold">
                {localSettings[config.key]}{config.unit || ''}
              </span>
            </div>
            {config.description && (
              <span className="text-[#AAB7C6] text-sm">
                {config.description}
              </span>
            )}
            <input
              type="range"
              min={config.min || 0}
              max={config.max || 100}
              value={localSettings[config.key]}
              onChange={(e) => handleSettingChange(config.key, parseInt(e.target.value))}
              className="w-full h-2 bg-[#384356] rounded-lg appearance-none cursor-pointer accent-[#3B82F6]"
              aria-label={`${config.label}: ${localSettings[config.key]}${config.unit || ''}`}
            />
          </motion.label>
        );

      case 'select':
        return (
          <motion.label
            key={config.key}
            className="flex flex-col gap-2 p-3 rounded-lg hover:bg-[#222C3B] transition-colors duration-120"
            whileHover={{ scale: 1.01 }}
          >
            <span className="text-[#F1F5F9] font-semibold">
              {config.label}
            </span>
            {config.description && (
              <span className="text-[#AAB7C6] text-sm">
                {config.description}
              </span>
            )}
            <select
              value={localSettings[config.key]}
              onChange={(e) => handleSettingChange(config.key, e.target.value)}
              className="bg-[#222C3B] text-[#AAB7C6] rounded-lg px-3 py-2 border border-[#3B82F6] 
                         focus:outline-none focus:ring-2 focus:ring-[#3B82F6] transition-all duration-120"
              aria-label={config.label}
            >
              {config.options?.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </motion.label>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div
      className={`bg-[#232B3E] rounded-xl shadow-panel p-6 max-w-md w-full flex flex-col gap-5 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <motion.div
          className="w-8 h-8 rounded-lg bg-[#3B82F6] flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
        >
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24">
            <path 
              stroke="currentColor" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" 
            />
            <path 
              stroke="currentColor" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
            />
          </svg>
        </motion.div>
        <h2 className="text-xl font-bold text-[#F1F5F9]">
          Paramètres Rapides
        </h2>
      </div>

      {/* Settings */}
      <div className="space-y-1">
        {settingConfigs.map((config, index) => (
          <motion.div
            key={config.key}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ 
              duration: 0.2, 
              delay: index * 0.05,
              ease: [0.23, 1, 0.32, 1] 
            }}
          >
            {renderSetting(config)}
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <motion.div
        className="pt-4 border-t border-[#222C3B] flex gap-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, delay: 0.3 }}
      >
        <motion.button
          className="flex-1 px-4 py-2 rounded-xl bg-[#3B82F6] text-white font-semibold 
                     hover:bg-[#2563eb] transition-colors duration-120
                     focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
          onClick={() => onSettingsChange?.(localSettings)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Appliquer
        </motion.button>
        <motion.button
          className="px-4 py-2 rounded-xl bg-[#222C3B] text-[#AAB7C6] font-semibold 
                     hover:bg-[#3B82F6] hover:text-white transition-colors duration-120
                     focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
          onClick={() => setLocalSettings(settings)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Reset
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default QuickSettings;
