import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ProjectCreateModal } from "./ProjectCreateModal";
import { Button } from "./ui/button-custom";
import { Plus, Sparkles } from "lucide-react";

export function ProjectCreateButton({ 
  className = "",
  onProjectCreated,
  variant = "default",
  size = "lg"
}) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef();

  const handleProjectCreated = (projectData) => {
    if (onProjectCreated) {
      onProjectCreated(projectData);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen(true);
    }
  };

  return (
    <>
      <motion.div
        className="relative"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button
          ref={btnRef}
          variant={variant}
          size={size}
          className={`
            flex items-center gap-2 relative overflow-hidden
            ${variant === "default" 
              ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl" 
              : ""
            }
            ${className}
          `}
          onClick={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          aria-label="Créer un nouveau projet"
          aria-describedby="project-button-description"
        >
          {/* Animated plus icon */}
          <motion.div
            className="relative"
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <Plus className="w-5 h-5" />
          </motion.div>
          
          {/* Button text */}
          <span className="hidden sm:inline font-semibold">
            Nouveau projet
          </span>
          
          {/* Sparkle effect on hover */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="absolute top-1 right-1"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0, 1, 0]
              }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 2
              }}
            >
              <Sparkles className="w-3 h-3 text-yellow-300" />
            </motion.div>
          </motion.div>
          
          {/* Ripple effect */}
          <motion.div
            className="absolute inset-0 bg-white/20 rounded-xl"
            initial={{ scale: 0, opacity: 0 }}
            whileTap={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
        </Button>
        
        {/* Hidden description for screen readers */}
        <div id="project-button-description" className="sr-only">
          Cliquez pour ouvrir le formulaire de création de projet
        </div>
      </motion.div>

      {/* Modal */}
      {open && (
        <ProjectCreateModal 
          open={open} 
          setOpen={setOpen} 
          returnFocusRef={btnRef}
          onSuccess={handleProjectCreated}
        />
      )}
    </>
  );
}

// Variants for different use cases
export const ProjectCreateButtonFloating = ({ className = "", ...props }) => (
  <motion.div
    className={`fixed bottom-6 right-6 z-40 ${className}`}
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ 
      type: "spring", 
      stiffness: 300, 
      damping: 30 
    }}
  >
    <ProjectCreateButton
      variant="default"
      size="lg"
      className="rounded-full shadow-2xl"
      {...props}
    />
  </motion.div>
);

export const ProjectCreateButtonCompact = ({ className = "", ...props }) => (
  <ProjectCreateButton
    variant="default"
    size="sm"
    className={`rounded-lg ${className}`}
    {...props}
  />
);
