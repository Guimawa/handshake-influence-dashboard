import { useState } from 'react';
import { motion } from 'framer-motion';

const ProjectList = ({ 
  projects = [],
  onProjectClick,
  onProjectAction,
  className = ""
}) => {
  const [hoveredRow, setHoveredRow] = useState(null);

  const defaultProjects = [
    {
      id: 1,
      name: "Jarvis UI",
      status: "active",
      lastModified: "Aujourd'hui",
      description: "Interface utilisateur pour le système Jarvis"
    },
    {
      id: 2,
      name: "Dashboard Analytics",
      status: "inactive",
      lastModified: "Hier",
      description: "Tableau de bord analytique"
    },
    {
      id: 3,
      name: "Mobile App",
      status: "pending",
      lastModified: "Il y a 2 jours",
      description: "Application mobile native"
    }
  ];

  const projectsData = projects.length > 0 ? projects : defaultProjects;

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return {
          bg: 'bg-[#7DE3F4]',
          text: 'text-[#232B3E]',
          label: 'Actif'
        };
      case 'inactive':
        return {
          bg: 'bg-[#AAB7C6]',
          text: 'text-[#232B3E]',
          label: 'Inactif'
        };
      case 'pending':
        return {
          bg: 'bg-[#F7C873]',
          text: 'text-[#232B3E]',
          label: 'En attente'
        };
      default:
        return {
          bg: 'bg-[#384356]',
          text: 'text-[#AAB7C6]',
          label: 'Inconnu'
        };
    }
  };

  const handleProjectClick = (project) => {
    onProjectClick?.(project);
  };

  const handleActionClick = (project, action) => {
    onProjectAction?.(project, action);
  };

  return (
    <motion.div
      className={`bg-[#232B3E] rounded-2xl shadow-panel p-6 overflow-auto ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
    >
      <table className="w-full text-left" role="table">
        <thead>
          <tr className="text-[#AAB7C6] uppercase text-xs tracking-wide border-b border-[#384356]">
            <th className="py-2 font-semibold">Nom</th>
            <th className="py-2 font-semibold">Statut</th>
            <th className="py-2 font-semibold">Dernière modif.</th>
            <th className="py-2 font-semibold w-12"></th>
          </tr>
        </thead>
        <tbody>
          {projectsData.map((project, index) => {
            const statusBadge = getStatusBadge(project.status);
            const isHovered = hoveredRow === project.id;

            return (
              <motion.tr
                key={project.id}
                className={`
                  border-b border-[#384356] transition-all duration-120 cursor-pointer
                  ${isHovered ? 'bg-[#222C3B]' : ''}
                `}
                onMouseEnter={() => setHoveredRow(project.id)}
                onMouseLeave={() => setHoveredRow(null)}
                onClick={() => handleProjectClick(project)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.15, 
                  delay: index * 0.04,
                  ease: [0.23, 1, 0.32, 1] 
                }}
                whileHover={{ 
                  scale: 1.01,
                  transition: { duration: 0.12, ease: [0.23, 1, 0.32, 1] }
                }}
              >
                {/* Nom du projet */}
                <td className="py-3">
                  <div className="flex flex-col">
                    <span className={`font-semibold transition-colors duration-120 ${
                      isHovered ? 'text-[#3B82F6]' : 'text-[#F1F5F9]'
                    }`}>
                      {project.name}
                    </span>
                    {project.description && (
                      <span className="text-xs text-[#AAB7C6] mt-1">
                        {project.description}
                      </span>
                    )}
                  </div>
                </td>

                {/* Statut */}
                <td className="py-3">
                  <motion.span
                    className={`inline-block ${statusBadge.bg} ${statusBadge.text} px-3 py-1 rounded-full font-semibold text-xs`}
                    whileHover={{ 
                      scale: 1.05,
                      transition: { duration: 0.08, ease: [0.23, 1, 0.32, 1] }
                    }}
                  >
                    {statusBadge.label}
                  </motion.span>
                </td>

                {/* Dernière modification */}
                <td className="py-3 text-[#AAB7C6]">
                  {project.lastModified}
                </td>

                {/* Actions */}
                <td className="py-3">
                  <motion.button
                    className="p-2 rounded-lg hover:bg-[#3B82F6] focus-visible:ring-2 focus-visible:ring-[#3B82F6] 
                               transition-all duration-120 group"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleActionClick(project, 'menu');
                    }}
                    whileHover={{ 
                      scale: 1.06,
                      transition: { duration: 0.08, ease: [0.23, 1, 0.32, 1] }
                    }}
                    whileTap={{ 
                      scale: 0.95,
                      transition: { duration: 0.06, ease: [0.23, 1, 0.32, 1] }
                    }}
                    aria-label={`Actions pour ${project.name}`}
                  >
                    <svg 
                      className={`w-5 h-5 transition-colors duration-120 ${
                        isHovered ? 'text-white' : 'text-[#AAB7C6]'
                      }`} 
                      fill="none" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        stroke="currentColor" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" 
                      />
                    </svg>
                  </motion.button>
                </td>
              </motion.tr>
            );
          })}
        </tbody>
      </table>

      {/* Empty State */}
      {projectsData.length === 0 && (
        <motion.div
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-[#AAB7C6] text-lg mb-2">Aucun projet trouvé</div>
          <div className="text-[#AAB7C6] text-sm">Créez votre premier projet pour commencer</div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ProjectList;
