import { motion } from 'framer-motion';

const Skeleton = ({ 
  width = "100%",
  height = "1rem",
  className = "",
  lines = 1,
  animated = true,
  variant = "default" // default, card, text, circle
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'card':
        return 'rounded-xl';
      case 'text':
        return 'rounded';
      case 'circle':
        return 'rounded-full';
      default:
        return 'rounded-xl';
    }
  };

  const getSkeletonStyle = () => {
    const baseStyle = {
      width: typeof width === 'number' ? `${width}px` : width,
      height: typeof height === 'number' ? `${height}px` : height,
    };

    if (variant === 'circle') {
      return {
        ...baseStyle,
        width: baseStyle.height, // Pour les cercles, width = height
      };
    }

    return baseStyle;
  };

  if (lines > 1) {
    return (
      <div className={`flex flex-col gap-2 ${className}`}>
        {Array.from({ length: lines }, (_, index) => (
          <motion.div
            key={index}
            className={`
              bg-[#384356] ${getVariantClasses()}
              ${animated ? 'animate-skeleton' : ''}
            `}
            style={getSkeletonStyle()}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ 
              duration: 0.08, 
              delay: index * 0.1,
              ease: [0.23, 1, 0.32, 1] 
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <motion.div
      className={`
        bg-[#384356] ${getVariantClasses()}
        ${animated ? 'animate-skeleton' : ''}
        ${className}
      `}
      style={getSkeletonStyle()}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ 
        duration: 0.08, 
        ease: [0.23, 1, 0.32, 1] 
      }}
      aria-busy="true"
      role="status"
      aria-label="Chargement..."
    >
      <span className="sr-only">Chargement...</span>
    </motion.div>
  );
};

export default Skeleton;
