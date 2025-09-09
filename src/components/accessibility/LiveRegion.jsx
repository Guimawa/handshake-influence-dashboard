import React, { useEffect, useState } from 'react';

/**
 * Composant LiveRegion pour l'accessibilité
 * Gère les annonces pour les lecteurs d'écran
 */

const LiveRegion = ({ 
  type = 'polite', // 'polite' ou 'assertive'
  className = '',
  children 
}) => {
  const [announcements, setAnnouncements] = useState([]);

  // Ajouter une annonce
  const announce = (message, priority = 'polite') => {
    const id = Date.now();
    setAnnouncements(prev => [...prev, { id, message, priority }]);
    
    // Supprimer l'annonce après 5 secondes
    setTimeout(() => {
      setAnnouncements(prev => prev.filter(announcement => announcement.id !== id));
    }, 5000);
  };

  // Exposer la fonction announce via ref
  React.useImperativeHandle(React.forwardRef(() => null), () => ({
    announce
  }));

  return (
    <div
      className={`sr-only ${className}`}
      aria-live={type}
      aria-atomic="true"
      role="status"
    >
      {announcements.map(announcement => (
        <div key={announcement.id}>
          {announcement.message}
        </div>
      ))}
      {children}
    </div>
  );
};

export default LiveRegion;
