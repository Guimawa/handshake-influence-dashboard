import { useState } from 'react';
import Table from '../atoms/Table';
import Stepper from '../atoms/Stepper';
import Breadcrumb from '../atoms/Breadcrumb';
import Tag from '../atoms/Tag';
import Chart from '../atoms/Chart';
import { Card } from '../atoms/Card';
import { Input } from '../atoms/Input';
import { Spinner } from '../atoms/Spinner';

const ComponentsDemo = () => {
  const [inputValue, setInputValue] = useState('');
  const [showSpinner, setShowSpinner] = useState(false);

  // Données pour la table
  const tableColumns = [
    { key: 'name', label: 'Nom' },
    { key: 'status', label: 'Statut' },
    { key: 'score', label: 'Score' }
  ];

  const tableData = []; // Empty state

  // Étapes pour le stepper
  const steps = [
    { label: 'Configuration' },
    { label: 'Déploiement' },
    { label: 'Validation' },
    { label: 'Finalisation' }
  ];

  // Items pour le breadcrumb
  const breadcrumbItems = [
    { label: 'Dashboard', href: '#' },
    { label: 'Projets', href: '#' },
    { label: 'Détails', isCurrent: true }
  ];

  // Tags de démonstration
  const tags = [
    { label: 'React', variant: 'info' },
    { label: 'TypeScript', variant: 'default' },
    { label: 'Success', variant: 'success' },
    { label: 'Warning', variant: 'warning' },
    { label: 'Error', variant: 'error' }
  ];

  const handleTagRemove = (tagLabel) => {
    console.log(`Tag ${tagLabel} supprimé`);
  };

  const handleTagClick = (tagLabel) => {
    console.log(`Tag ${tagLabel} cliqué`);
  };

  const handleStepperClick = (stepIndex) => {
    console.log(`Étape ${stepIndex + 1} cliquée`);
  };

  const toggleSpinner = () => {
    setShowSpinner(!showSpinner);
  };

  return (
    <div className="p-8 space-y-8 bg-[#181E29] min-h-screen">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Titre */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#F1F5F9] mb-2">
            Démonstration des Composants Atomiques
          </h1>
          <p className="text-[#AAB7C6]">
            Zones 19-25 : Composants selon spécifications exactes
          </p>
        </div>

        {/* ZONE 20 : TABLE */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-[#F1F5F9]">ZONE 20 : Table/Liste Atomique</h2>
          <Table 
            columns={tableColumns}
            data={tableData}
            emptyMessage="Aucun élément à afficher"
            stickyHeader={true}
            hoverable={true}
          />
        </section>

        {/* ZONE 21 : STEPPER */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-[#F1F5F9]">ZONE 21 : Stepper/Barre de Progression</h2>
          <Stepper 
            steps={steps}
            currentStep={1}
            completedSteps={[0]}
            onStepClick={handleStepperClick}
            className="max-w-2xl"
          />
        </section>

        {/* ZONE 22 : BREADCRUMB */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-[#F1F5F9]">ZONE 22 : Breadcrumb/Fil d'Ariane</h2>
          <Breadcrumb 
            items={breadcrumbItems}
            separator="/"
            maxItems={5}
            showHome={true}
          />
        </section>

        {/* ZONE 23 : TAGS */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-[#F1F5F9]">ZONE 23 : Tags/Badges</h2>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <Tag
                key={index}
                variant={tag.variant}
                size="md"
                removable={index < 3}
                onRemove={() => handleTagRemove(tag.label)}
                onClick={() => handleTagClick(tag.label)}
              >
                {tag.label}
              </Tag>
            ))}
          </div>
        </section>

        {/* ZONE 24 : CHART */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-[#F1F5F9]">ZONE 24 : Graph/Chart</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Chart 
              type="empty"
              title="Graphique en Barres"
              emptyMessage="Aucune donnée disponible"
              height={200}
            />
            <Chart 
              type="empty"
              title="Graphique en Ligne"
              emptyMessage="Données en cours de chargement"
              height={200}
            />
          </div>
        </section>

        {/* ZONE 16 : CARD ATOMIQUE */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-[#F1F5F9]">ZONE 16 : Card Atomique</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card 
              title="Projet Alpha"
              subtitle="En cours de développement"
              avatar="A"
              action="Voir"
              onActionClick={() => console.log('Action cliquée')}
            />
            <Card 
              title="Projet Beta"
              subtitle="Prêt pour déploiement"
              avatar="B"
              action="Déployer"
              onActionClick={() => console.log('Déploiement')}
            />
            <Card 
              title="Projet Gamma"
              subtitle="En attente de validation"
              avatar="G"
              action="Valider"
              onActionClick={() => console.log('Validation')}
            />
          </div>
        </section>

        {/* ZONE 17 : INPUT */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-[#F1F5F9]">ZONE 17 : Champs de Formulaire</h2>
          <div className="max-w-md space-y-4">
            <Input
              label="Nom du projet"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Entrez le nom du projet"
              required
            />
            <Input
              label="Description"
              placeholder="Description du projet"
              type="textarea"
            />
            <Input
              label="Email"
              type="email"
              placeholder="votre@email.com"
              error="Format d'email invalide"
            />
          </div>
        </section>

        {/* ZONE 18 : SPINNER */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-[#F1F5F9]">ZONE 18 : Spinner/Loader</h2>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleSpinner}
              className="px-4 py-2 bg-[#3B82F6] text-white rounded-lg hover:bg-[#2563eb] transition-colors"
            >
              {showSpinner ? 'Arrêter' : 'Démarrer'} le spinner
            </button>
            {showSpinner && <Spinner size="md" />}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#232B3E] rounded-xl p-6 text-center">
              <Spinner size="sm" />
              <p className="text-[#AAB7C6] mt-2">Petit spinner</p>
            </div>
            <div className="bg-[#232B3E] rounded-xl p-6 text-center">
              <Spinner size="md" />
              <p className="text-[#AAB7C6] mt-2">Spinner moyen</p>
            </div>
            <div className="bg-[#232B3E] rounded-xl p-6 text-center">
              <Spinner size="lg" />
              <p className="text-[#AAB7C6] mt-2">Grand spinner</p>
            </div>
          </div>
        </section>

        {/* ZONE 19 : NOTIFICATION MENU */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-[#F1F5F9]">ZONE 19 : Menu Notifications</h2>
          <div className="bg-[#232B3E] rounded-xl p-6">
            <p className="text-[#AAB7C6] mb-4">
              Le menu de notifications est intégré dans la Topbar. 
              Cliquez sur l'icône cloche en haut à droite pour le tester.
            </p>
            <div className="text-sm text-[#AAB7C6]">
              <p>• Badge animé avec pop effect (180ms)</p>
              <p>• Menu dropdown avec slide-down (120ms)</p>
              <p>• Focus trap et fermeture ESC</p>
              <p>• Accessibilité ARIA complète</p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default ComponentsDemo;
