import { useState } from 'react';
import { motion } from 'framer-motion';

const InteractiveTimeline = ({ 
  events = [],
  orientation = 'vertical', // vertical, horizontal
  className = ""
}) => {
  const [hoveredEvent, setHoveredEvent] = useState(null);

  const defaultEvents = [
    {
      id: 1,
      title: 'Phase de Conception',
      description: 'Définition des spécifications et architecture du projet',
      date: '2024-01-15',
      status: 'completed',
      color: '#3B82F6'
    },
    {
      id: 2,
      title: 'Développement Initial',
      description: 'Implémentation des fonctionnalités de base',
      date: '2024-02-01',
      status: 'completed',
      color: '#7DE3F4'
    },
    {
      id: 3,
      title: 'Tests et Validation',
      description: 'Phase de tests intensifs et correction des bugs',
      date: '2024-03-15',
      status: 'current',
      color: '#F7C873'
    },
    {
      id: 4,
      title: 'Déploiement',
      description: 'Mise en production et monitoring',
      date: '2024-04-01',
      status: 'upcoming',
      color: '#F69AC1'
    },
    {
      id: 5,
      title: 'Optimisation',
      description: 'Amélioration des performances et nouvelles fonctionnalités',
      date: '2024-05-01',
      status: 'upcoming',
      color: '#F6E58D'
    }
  ];

  const eventsData = events.length > 0 ? events : defaultEvents;

  const getStatusBadge = (status) => {
    const statusConfig = {
      completed: { 
        label: 'Terminé', 
        bgColor: 'bg-[#3B82F6]', 
        textColor: 'text-white' 
      },
      current: { 
        label: 'En cours', 
        bgColor: 'bg-[#F7C873]', 
        textColor: 'text-[#212837]' 
      },
      upcoming: { 
        label: 'À venir', 
        bgColor: 'bg-[#F6E58D]', 
        textColor: 'text-[#212837]' 
      }
    };

    const config = statusConfig[status] || statusConfig.upcoming;
    
    return (
      <span className={`absolute top-3 right-6 px-2 py-1 rounded text-xs font-semibold ${config.bgColor} ${config.textColor}`}>
        {config.label}
      </span>
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  if (orientation === 'horizontal') {
    return (
      <div className={`overflow-x-auto ${className}`}>
        <div className="flex items-center gap-8 py-8 min-w-max">
          {eventsData.map((event, index) => (
            <motion.div
              key={event.id}
              className="relative flex-shrink-0 group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.2, 
                delay: index * 0.1,
                ease: [0.23, 1, 0.32, 1] 
              }}
            >
              {/* Ligne de connexion */}
              {index < eventsData.length - 1 && (
                <div 
                  className="absolute top-6 left-full w-8 h-0.5 bg-[#3B82F6] z-0"
                  style={{ transform: 'translateX(-50%)' }}
                />
              )}

              {/* Bulle de l'événement */}
              <motion.div
                className="relative w-12 h-12 bg-[#3B82F6] rounded-full shadow-lg z-10 cursor-pointer"
                style={{ backgroundColor: event.color }}
                whileHover={{ 
                  scale: 1.1, 
                  boxShadow: '0 8px 25px rgba(59, 130, 246, 0.4)',
                  transition: { duration: 0.1, ease: [0.23, 1, 0.32, 1] }
                }}
                onMouseEnter={() => setHoveredEvent(event.id)}
                onMouseLeave={() => setHoveredEvent(null)}
              />

              {/* Card de l'événement */}
              <motion.div
                className="absolute top-16 left-1/2 transform -translate-x-1/2 w-64 bg-[#232B3E] rounded-xl p-4 shadow-panel
                           opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto
                           transition-all duration-200 z-20"
                initial={{ opacity: 0, y: 10 }}
                whileHover={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
              >
                <div className="text-[#7DE3F4] font-bold text-sm mb-1">
                  {event.title}
                </div>
                <div className="text-[#AAB7C6] text-xs mb-2">
                  {event.description}
                </div>
                <div className="text-[#AAB7C6] text-xs">
                  {formatDate(event.date)}
                </div>
                {getStatusBadge(event.status)}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <ul 
      className={`relative border-l-2 border-[#3B82F6] pl-8 py-8 flex flex-col gap-8 ${className}`}
      role="list"
    >
      {eventsData.map((event, index) => (
        <motion.li
          key={event.id}
          className="relative group"
          role="listitem"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.2, 
            delay: index * 0.05,
            ease: [0.23, 1, 0.32, 1] 
          }}
        >
          {/* Bulle de l'événement */}
          <motion.div
            className="absolute -left-5 top-0 w-4 h-4 rounded-full shadow-lg cursor-pointer z-10"
            style={{ backgroundColor: event.color }}
            whileHover={{ 
              scale: 1.1, 
              boxShadow: '0 4px 15px rgba(59, 130, 246, 0.4)',
              transition: { duration: 0.1, ease: [0.23, 1, 0.32, 1] }
            }}
            onMouseEnter={() => setHoveredEvent(event.id)}
            onMouseLeave={() => setHoveredEvent(null)}
          />

          {/* Card de l'événement */}
          <motion.div
            className="bg-[#232B3E] rounded-xl p-6 shadow-panel text-[#AAB7C6] group-hover:bg-[#222C3B] 
                       transition-all duration-120 cursor-pointer"
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.12, ease: [0.23, 1, 0.32, 1] }
            }}
            whileTap={{ 
              scale: 0.98,
              transition: { duration: 0.08, ease: [0.23, 1, 0.32, 1] }
            }}
          >
            <div className="font-bold text-[#7DE3F4] mb-1 text-lg">
              {event.title}
            </div>
            <div className="text-sm mb-2 leading-relaxed">
              {event.description}
            </div>
            <div className="text-xs text-[#AAB7C6] mb-4">
              {formatDate(event.date)}
            </div>
            
            {/* Badge de statut */}
            {getStatusBadge(event.status)}
          </motion.div>
        </motion.li>
      ))}
    </ul>
  );
};

export default InteractiveTimeline;
