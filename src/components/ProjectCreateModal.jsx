import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ProjectForm } from "./ProjectForm";
import { Modal } from "./ui/Modal";

export function ProjectCreateModal({ open, setOpen, returnFocusRef, onSuccess }) {
  const initialFocusRef = useRef();

  // Focus management
  useEffect(() => {
    if (open && initialFocusRef.current) {
      // Small delay to ensure modal is fully rendered
      const timer = setTimeout(() => {
        initialFocusRef.current.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [open]);

  const handleClose = () => {
    setOpen(false);
    // Return focus to trigger button after modal closes
    setTimeout(() => {
      if (returnFocusRef?.current) {
        returnFocusRef.current.focus();
      }
    }, 100);
  };

  const handleSuccess = (projectData) => {
    // Call parent success handler if provided
    if (onSuccess) {
      onSuccess(projectData);
    }
    // Close modal
    handleClose();
  };

  return (
    <Modal 
      open={open} 
      onClose={handleClose} 
      initialFocusRef={initialFocusRef}
      size="lg"
      className="max-w-2xl"
    >
      <ProjectForm 
        onSuccess={handleSuccess} 
        initialFocusRef={initialFocusRef}
      />
    </Modal>
  );
}
