import { useState } from 'react';
import { motion } from 'framer-motion';

const Pagination = ({ 
  currentPage = 1,
  totalPages = 10,
  onPageChange,
  showPrevNext = true,
  maxVisiblePages = 5,
  className = ""
}) => {
  const [hoveredPage, setHoveredPage] = useState(null);

  const getVisiblePages = () => {
    const pages = [];
    const half = Math.floor(maxVisiblePages / 2);
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, start + maxVisiblePages - 1);

    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  const handlePageClick = (page) => {
    if (page !== currentPage && onPageChange) {
      onPageChange(page);
    }
  };

  const handlePrevClick = () => {
    if (currentPage > 1 && onPageChange) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages && onPageChange) {
      onPageChange(currentPage + 1);
    }
  };

  const visiblePages = getVisiblePages();
  const showStartEllipsis = visiblePages[0] > 1;
  const showEndEllipsis = visiblePages[visiblePages.length - 1] < totalPages;

  return (
    <nav 
      className={`flex items-center justify-center gap-2 py-4 ${className}`}
      aria-label="Pagination"
      role="navigation"
    >
      {/* Bouton Précédent */}
      {showPrevNext && (
        <motion.button
          className="w-10 h-10 flex items-center justify-center rounded-full bg-[#222C3B] text-[#AAB7C6] 
                     hover:bg-[#3B82F6] hover:text-white focus-visible:ring-2 focus-visible:ring-[#3B82F6] 
                     transition-all duration-90 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handlePrevClick}
          disabled={currentPage === 1}
          aria-label="Page précédente"
          whileHover={{ 
            scale: currentPage > 1 ? 1.08 : 1,
            transition: { duration: 0.09, ease: [0.23, 1, 0.32, 1] }
          }}
          whileTap={{ 
            scale: currentPage > 1 ? 0.95 : 1,
            transition: { duration: 0.06, ease: [0.23, 1, 0.32, 1] }
          }}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
            <path 
              stroke="currentColor" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M15 19l-7-7 7-7" 
            />
          </svg>
        </motion.button>
      )}

      {/* Première page */}
      {showStartEllipsis && (
        <>
          <motion.button
            className="w-10 h-10 flex items-center justify-center rounded-full bg-[#222C3B] text-[#AAB7C6] 
                       hover:bg-[#3B82F6] hover:text-white focus-visible:ring-2 focus-visible:ring-[#3B82F6] 
                       transition-all duration-90"
            onClick={() => handlePageClick(1)}
            aria-label="Page 1"
            whileHover={{ 
              scale: 1.08,
              transition: { duration: 0.09, ease: [0.23, 1, 0.32, 1] }
            }}
            whileTap={{ 
              scale: 0.95,
              transition: { duration: 0.06, ease: [0.23, 1, 0.32, 1] }
            }}
          >
            1
          </motion.button>
          <span className="text-[#AAB7C6] px-2">...</span>
        </>
      )}

      {/* Pages visibles */}
      {visiblePages.map((page) => {
        const isActive = page === currentPage;
        const isHovered = hoveredPage === page;
        
        return (
          <motion.button
            key={page}
            className={`
              w-10 h-10 flex items-center justify-center rounded-full font-bold transition-all duration-90
              focus-visible:ring-2 focus-visible:ring-[#3B82F6]
              ${isActive 
                ? 'bg-[#3B82F6] text-white shadow' 
                : 'bg-[#222C3B] text-[#AAB7C6] hover:bg-[#3B82F6] hover:text-white'
              }
            `}
            onClick={() => handlePageClick(page)}
            onMouseEnter={() => setHoveredPage(page)}
            onMouseLeave={() => setHoveredPage(null)}
            aria-label={`Page ${page}`}
            aria-current={isActive ? 'page' : undefined}
            whileHover={{ 
              scale: 1.08,
              transition: { duration: 0.09, ease: [0.23, 1, 0.32, 1] }
            }}
            whileTap={{ 
              scale: 0.95,
              transition: { duration: 0.06, ease: [0.23, 1, 0.32, 1] }
            }}
          >
            {page}
          </motion.button>
        );
      })}

      {/* Dernière page */}
      {showEndEllipsis && (
        <>
          <span className="text-[#AAB7C6] px-2">...</span>
          <motion.button
            className="w-10 h-10 flex items-center justify-center rounded-full bg-[#222C3B] text-[#AAB7C6] 
                       hover:bg-[#3B82F6] hover:text-white focus-visible:ring-2 focus-visible:ring-[#3B82F6] 
                       transition-all duration-90"
            onClick={() => handlePageClick(totalPages)}
            aria-label={`Page ${totalPages}`}
            whileHover={{ 
              scale: 1.08,
              transition: { duration: 0.09, ease: [0.23, 1, 0.32, 1] }
            }}
            whileTap={{ 
              scale: 0.95,
              transition: { duration: 0.06, ease: [0.23, 1, 0.32, 1] }
            }}
          >
            {totalPages}
          </motion.button>
        </>
      )}

      {/* Bouton Suivant */}
      {showPrevNext && (
        <motion.button
          className="w-10 h-10 flex items-center justify-center rounded-full bg-[#222C3B] text-[#AAB7C6] 
                     hover:bg-[#3B82F6] hover:text-white focus-visible:ring-2 focus-visible:ring-[#3B82F6] 
                     transition-all duration-90 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleNextClick}
          disabled={currentPage === totalPages}
          aria-label="Page suivante"
          whileHover={{ 
            scale: currentPage < totalPages ? 1.08 : 1,
            transition: { duration: 0.09, ease: [0.23, 1, 0.32, 1] }
          }}
          whileTap={{ 
            scale: currentPage < totalPages ? 0.95 : 1,
            transition: { duration: 0.06, ease: [0.23, 1, 0.32, 1] }
          }}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
            <path 
              stroke="currentColor" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M9 5l7 7-7 7" 
            />
          </svg>
        </motion.button>
      )}
    </nav>
  );
};

export default Pagination;
