import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

export function SkeletonGrid({ 
  columns = 3,
  showEmptyState = false,
  className = ""
}) {
  const gridCols = {
    2: 'grid-cols-2',
    3: 'grid-cols-3', 
    4: 'grid-cols-4'
  };

  const skeletonCards = Array.from({ length: 6 }, (_, i) => i);

  if (showEmptyState) {
    return (
      <motion.div
        className={`
          flex flex-col items-center justify-center py-16 px-4
          ${className}
        `}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.12, ease: [0.23, 1, 0.32, 1] }}
      >
        <FileText className="text-6xl text-[#AAB7C6] mb-4" />
        <p className="text-lg text-[#AAB7C6] text-center">
          Aucune donnée à afficher
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={`
        grid gap-6 ${gridCols[columns] || 'grid-cols-3'}
        ${className}
      `}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.12, ease: [0.23, 1, 0.32, 1] }}
    >
      {skeletonCards.map((index) => (
        <motion.div
          key={index}
          className="
            bg-[#232B3E] rounded-2xl h-44 w-full
            animate-skeleton
          "
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            duration: 0.12, 
            delay: index * 0.05,
            ease: [0.23, 1, 0.32, 1] 
          }}
        />
      ))}
    </motion.div>
  );
}
