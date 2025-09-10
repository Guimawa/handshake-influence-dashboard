import { useState } from 'react';
import TagInput from '../atoms/TagInput';
import MemberAvatar from '../atoms/MemberAvatar';
import ActionHistory from '../atoms/ActionHistory';
import AvatarGroup from '../atoms/AvatarGroup';
import QuickSettings from '../atoms/QuickSettings';
import { motion } from 'framer-motion';

const AdvancedComponentsDemo = () => {
  const [tags, setTags] = useState(['React', 'TypeScript', 'Dashboard']);
  const [settings, setSettings] = useState({
    heatmapEnabled: true,
    nodeOpacity: 80,
    mainView: 'graph',
    autoSave: true,
    notifications: false,
    darkMode: true
  });

  const members = [
    { id: 1, name: 'Alice Johnson', avatar: null, status: 'online', color: '#3B82F6' },
    { id: 2, name: 'Bob Smith', avatar: null, status: 'away', color: '#7DE3F4' },
    { id: 3, name: 'Charlie Brown', avatar: null, status: 'offline', color: '#F69AC1' },
    { id: 4, name: 'Diana Prince', avatar: null, status: 'busy', color: '#F7C873' },
    { id: 5, name: 'Eve Wilson', avatar: null, status: 'online', color: '#10B981' },
    { id: 6, name: 'Frank Miller', avatar: null, status: 'offline', color: '#8B5CF6' },
    { id: 7, name: 'Grace Lee', avatar: null, status: 'online', color: '#EF4444' }
  ];

  const handleTagsChange = (newTags) => {
    setTags(newTags);
    console.log('Tags mis à jour:', newTags);
  };

  const handleSettingsChange = (newSettings) => {
    setSettings(newSettings);
    console.log('Paramètres mis à jour:', newSettings);
  };

  const handleMemberClick = (member) => {
    console.log('Membre cliqué:', member);
  };

  const handleMoreClick = (remainingMembers) => {
    console.log('Membres restants:', remainingMembers);
  };

  const handleUndo = (action) => {
    console.log('Action annulée:', action);
  };

  const handleRedo = (action) => {
    console.log('Action rétablie:', action);
  };

  return (
    <div className="p-8 space-y-8 bg-[#181E29] min-h-screen">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Titre */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#F1F5F9] mb-2">
            Composants Avancés
          </h1>
          <p className="text-[#AAB7C6]">
            Zones 71-75 : Tag Input, Member Avatar, Action History, Avatar Group, Quick Settings
          </p>
        </div>

        {/* Tag Input */}
        <div className="bg-[#232B3E] rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-[#F1F5F9] mb-4">
            ZONE 71 : Tag Input (Ajout de tags, autocomplete, animations)
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-[#7DE3F4] mb-3">Tag Input avec suggestions</h3>
              <TagInput
                tags={tags}
                onTagsChange={handleTagsChange}
                maxTags={8}
                placeholder="Ajouter des technologies..."
              />
            </div>
            <div>
              <h3 className="text-lg font-medium text-[#7DE3F4] mb-3">Tags actuels</h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-[#3B82F6] text-white rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Member Avatar */}
        <div className="bg-[#232B3E] rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-[#F1F5F9] mb-4">
            ZONE 72 : Mini-Avatar Member (Cercle, initiales, badge état)
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-[#7DE3F4] mb-3">Tailles différentes</h3>
              <div className="flex items-center gap-4">
                <MemberAvatar member={members[0]} size="sm" />
                <MemberAvatar member={members[1]} size="md" />
                <MemberAvatar member={members[2]} size="lg" />
                <MemberAvatar member={members[3]} size="xl" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-[#7DE3F4] mb-3">Statuts différents</h3>
              <div className="flex items-center gap-4">
                <MemberAvatar member={{...members[0], status: 'online'}} />
                <MemberAvatar member={{...members[1], status: 'away'}} />
                <MemberAvatar member={{...members[2], status: 'busy'}} />
                <MemberAvatar member={{...members[3], status: 'offline'}} />
              </div>
            </div>
          </div>
        </div>

        {/* Action History */}
        <div className="bg-[#232B3E] rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-[#F1F5F9] mb-4">
            ZONE 73 : Panel Historique d'Actions (Logs, undo, redo)
          </h2>
          <div className="flex justify-center">
            <ActionHistory
              onUndo={handleUndo}
              onRedo={handleRedo}
            />
          </div>
        </div>

        {/* Avatar Group */}
        <div className="bg-[#232B3E] rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-[#F1F5F9] mb-4">
            ZONE 74 : Avatar Group (Membres, stack, badge plus)
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-[#7DE3F4] mb-3">Groupe de 4 membres</h3>
              <AvatarGroup
                members={members.slice(0, 4)}
                maxVisible={4}
                size="md"
                onMemberClick={handleMemberClick}
                onMoreClick={handleMoreClick}
              />
            </div>
            <div>
              <h3 className="text-lg font-medium text-[#7DE3F4] mb-3">Groupe avec overflow</h3>
              <AvatarGroup
                members={members}
                maxVisible={3}
                size="lg"
                onMemberClick={handleMemberClick}
                onMoreClick={handleMoreClick}
              />
            </div>
            <div>
              <h3 className="text-lg font-medium text-[#7DE3F4] mb-3">Petite taille</h3>
              <AvatarGroup
                members={members.slice(0, 6)}
                maxVisible={5}
                size="sm"
                onMemberClick={handleMemberClick}
                onMoreClick={handleMoreClick}
              />
            </div>
          </div>
        </div>

        {/* Quick Settings */}
        <div className="bg-[#232B3E] rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-[#F1F5F9] mb-4">
            ZONE 75 : Panel Paramètres Rapides (Toggle, select, slider)
          </h2>
          <div className="flex justify-center">
            <QuickSettings
              settings={settings}
              onSettingsChange={handleSettingsChange}
            />
          </div>
        </div>

        {/* Exemple d'intégration */}
        <div className="bg-[#232B3E] rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-[#F1F5F9] mb-4">
            Exemple d'Intégration
          </h2>
          <div className="space-y-6">
            <div className="bg-[#181E29] rounded-xl p-6">
              <h3 className="text-lg font-medium text-[#7DE3F4] mb-4">Post avec réactions et membres</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MemberAvatar member={members[0]} size="md" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold text-[#F1F5F9]">{members[0].name}</span>
                      <span className="text-[#AAB7C6] text-sm">il y a 2h</span>
                    </div>
                    <p className="text-[#AAB7C6] mb-3">
                      Nouvelle fonctionnalité disponible ! Testez les composants avancés et donnez votre avis.
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-[#AAB7C6] text-sm">Membres impliqués:</span>
                        <AvatarGroup
                          members={members.slice(0, 3)}
                          maxVisible={3}
                          size="sm"
                          onMemberClick={handleMemberClick}
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[#AAB7C6] text-sm">Tags:</span>
                        <div className="flex gap-1">
                          {['feature', 'update'].map((tag, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-[#3B82F6] text-white rounded-full text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdvancedComponentsDemo;