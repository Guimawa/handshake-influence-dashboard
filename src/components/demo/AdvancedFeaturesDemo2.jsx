import { useState } from 'react';
import StepByStepStepper from '../atoms/StepByStepStepper';
import SpeedDial from '../atoms/SpeedDial';
import Carousel from '../atoms/Carousel';
import QuickSettingsPopup from '../atoms/QuickSettingsPopup';
import GlobalLoader from '../atoms/GlobalLoader';
import Calendar from '../atoms/Calendar';
import ProgressBar from '../atoms/ProgressBar';
import { motion } from 'framer-motion';

const AdvancedFeaturesDemo2 = () => {
  const [isLoaderVisible, setIsLoaderVisible] = useState(false);
  const [loaderProgress, setLoaderProgress] = useState(null);
  const [settings, setSettings] = useState({
    theme: 'dark',
    language: 'fr',
    notifications: true,
    autoSave: true,
    compactMode: false,
    animations: true
  });

  const events = [
    {
      id: 1,
      title: 'Réunion équipe',
      date: new Date(2024, 8, 15), // 15 septembre
      time: '14:00',
      color: '#F69AC1'
    },
    {
      id: 2,
      title: 'Présentation client',
      date: new Date(2024, 8, 18), // 18 septembre
      time: '10:00',
      color: '#7DE3F4'
    },
    {
      id: 3,
      title: 'Formation technique',
      date: new Date(2024, 8, 22), // 22 septembre
      time: '09:00',
      color: '#F7C873'
    }
  ];

  const steps = [
    {
      id: 1,
      title: 'Informations personnelles',
      description: 'Renseignez vos informations de base',
      fields: [
        { name: 'firstName', label: 'Prénom', type: 'text', required: true },
        { name: 'lastName', label: 'Nom', type: 'text', required: true },
        { name: 'email', label: 'Email', type: 'email', required: true }
      ]
    },
    {
      id: 2,
      title: 'Préférences',
      description: 'Configurez vos préférences',
      fields: [
        { name: 'theme', label: 'Thème', type: 'select', options: ['Sombre', 'Clair'], required: true },
        { name: 'notifications', label: 'Recevoir les notifications', type: 'checkbox', required: false }
      ]
    },
    {
      id: 3,
      title: 'Confirmation',
      description: 'Validez votre inscription',
      fields: [
        { name: 'terms', label: 'J\'accepte les conditions d\'utilisation', type: 'checkbox', required: true }
      ]
    }
  ];

  const carouselSlides = [
    {
      id: 1,
      title: 'Bienvenue dans le Dashboard !',
      content: 'Découvrez toutes les fonctionnalités avancées de votre nouveau tableau de bord interactif.',
      image: null
    },
    {
      id: 2,
      title: 'Navigation intuitive',
      content: 'Utilisez la sidebar et la navigation mobile pour accéder rapidement à toutes les sections.',
      image: null
    },
    {
      id: 3,
      title: 'Interactions fluides',
      content: 'Cliquez, glissez et interagissez avec les éléments pour une expérience utilisateur optimale.',
      image: null
    },
    {
      id: 4,
      title: 'Personnalisation complète',
      content: 'Adaptez l\'interface selon vos préférences avec les paramètres avancés.',
      image: null
    }
  ];

  const handleStepChange = (stepIndex) => {
    console.log('Étape changée:', stepIndex);
  };

  const handleStepComplete = () => {
    console.log('Processus terminé !');
  };

  const handleSettingsChange = (newSettings) => {
    setSettings(newSettings);
    console.log('Paramètres mis à jour:', newSettings);
  };

  const handleDateClick = (date) => {
    console.log('Date cliquée:', date);
  };

  const handleEventClick = (event) => {
    console.log('Événement cliqué:', event);
  };

  const showLoader = (withProgress = false) => {
    setIsLoaderVisible(true);
    if (withProgress) {
      setLoaderProgress(0);
      // Simuler le chargement progressif
      const interval = setInterval(() => {
        setLoaderProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + Math.random() * 20;
        });
      }, 200);
    }
  };

  const hideLoader = () => {
    setIsLoaderVisible(false);
    setLoaderProgress(null);
  };

  return (
    <div className="p-8 space-y-8 bg-[#181E29] min-h-screen">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Titre */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#F1F5F9] mb-2">
            Fonctionnalités Avancées
          </h1>
          <p className="text-[#AAB7C6]">
            Zones 76-86 : Stepper, Speed Dial, Carousel, Settings, Loader, Calendar, Progress
          </p>
        </div>

        {/* Step-by-Step Stepper */}
        <div className="bg-[#232B3E] rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-[#F1F5F9] mb-4">
            ZONE 76 : Step-by-Step Stepper
          </h2>
          <StepByStepStepper
            steps={steps}
            onStepChange={handleStepChange}
            onComplete={handleStepComplete}
          />
        </div>

        {/* Speed Dial */}
        <div className="bg-[#232B3E] rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-[#F1F5F9] mb-4">
            ZONE 77 : Speed Dial (Floating Action Button)
          </h2>
          <div className="h-32 flex items-center justify-center">
            <p className="text-[#AAB7C6]">Le Speed Dial est positionné en bas à droite de l'écran</p>
          </div>
        </div>

        {/* Carousel */}
        <div className="bg-[#232B3E] rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-[#F1F5F9] mb-4">
            ZONE 78 : Carousel/Slider
          </h2>
          <Carousel
            slides={carouselSlides}
            autoPlay={true}
            autoPlayInterval={4000}
            showDots={true}
            showArrows={true}
          />
        </div>

        {/* Quick Settings Popup */}
        <div className="bg-[#232B3E] rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-[#F1F5F9] mb-4">
            ZONE 79 : Quick Settings Popup
          </h2>
          <div className="h-32 flex items-center justify-center">
            <p className="text-[#AAB7C6]">Le bouton de paramètres est positionné en haut à droite de l'écran</p>
          </div>
        </div>

        {/* Global Loader */}
        <div className="bg-[#232B3E] rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-[#F1F5F9] mb-4">
            ZONE 80 : Global Loader
          </h2>
          <div className="flex gap-4 justify-center">
            <button
              className="px-4 py-2 bg-[#3B82F6] text-white rounded-lg hover:bg-[#2563eb] transition-colors"
              onClick={() => showLoader(false)}
            >
              Loader Spinner
            </button>
            <button
              className="px-4 py-2 bg-[#7DE3F4] text-[#232B3E] rounded-lg hover:bg-[#5DD5F4] transition-colors"
              onClick={() => showLoader(true)}
            >
              Loader Progress
            </button>
            <button
              className="px-4 py-2 bg-[#EF4444] text-white rounded-lg hover:bg-[#dc2626] transition-colors"
              onClick={hideLoader}
            >
              Masquer Loader
            </button>
          </div>
        </div>

        {/* Calendar */}
        <div className="bg-[#232B3E] rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-[#F1F5F9] mb-4">
            ZONE 81 : Calendrier/Agenda
          </h2>
          <Calendar
            events={events}
            onDateClick={handleDateClick}
            onEventClick={handleEventClick}
          />
        </div>

        {/* Progress Bar */}
        <div className="bg-[#232B3E] rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-[#F1F5F9] mb-4">
            ZONE 82 : Progress/Loader Bar
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-[#7DE3F4] mb-3">Tailles différentes</h3>
              <div className="space-y-4">
                <ProgressBar progress={25} size="sm" />
                <ProgressBar progress={50} size="md" />
                <ProgressBar progress={75} size="lg" />
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-[#7DE3F4] mb-3">Couleurs différentes</h3>
              <div className="space-y-4">
                <ProgressBar progress={30} color="gradient" />
                <ProgressBar progress={60} color="blue" />
                <ProgressBar progress={90} color="green" />
                <ProgressBar progress={45} color="red" />
                <ProgressBar progress={80} color="custom" customColor="#F69AC1" />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-[#7DE3F4] mb-3">Animation de progression</h3>
              <div className="space-y-4">
                <ProgressBar progress={0} animated={true} />
                <ProgressBar progress={100} animated={true} />
              </div>
            </div>
          </div>
        </div>

        {/* Composants flottants */}
        <SpeedDial
          position="bottom-right"
        />

        <QuickSettingsPopup
          settings={settings}
          onSettingsChange={handleSettingsChange}
        />

        <GlobalLoader
          isVisible={isLoaderVisible}
          message={loaderProgress !== null ? "Chargement en cours..." : "Chargement..."}
          progress={loaderProgress}
          onComplete={() => {
            console.log('Chargement terminé !');
            setTimeout(() => hideLoader(), 1000);
          }}
        />

      </div>
    </div>
  );
};

export default AdvancedFeaturesDemo2;
