import { toast, Toaster } from "sonner";

export { toast, Toaster };

// Toast helper functions
export const toastSuccess = (message, options = {}) => {
  return toast.success(message, {
    duration: 4000,
    position: "bottom-right",
    ...options
  });
};

export const toastError = (message, options = {}) => {
  return toast.error(message, {
    duration: 6000,
    position: "bottom-right",
    ...options
  });
};

export const toastInfo = (message, options = {}) => {
  return toast.info(message, {
    duration: 4000,
    position: "bottom-right",
    ...options
  });
};

export const toastWarning = (message, options = {}) => {
  return toast.warning(message, {
    duration: 5000,
    position: "bottom-right",
    ...options
  });
};

// Custom toast component with animations
export const CustomToaster = () => {
  return (
    <Toaster
      position="bottom-right"
      richColors
      closeButton
      expand
      toastOptions={{
        style: {
          background: 'var(--toast-bg)',
          color: 'var(--toast-color)',
          border: '1px solid var(--toast-border)',
        },
        className: 'toast-custom',
        duration: 4000,
      }}
    />
  );
};
