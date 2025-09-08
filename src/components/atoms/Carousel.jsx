import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Carousel = ({ 
  slides = [],
  autoPlay = false,
  autoPlayInterval = 5000,
  showDots = true,
  showArrows = true,
  className = ""
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const carouselRef = useRef(null);
  const intervalRef = useRef(null);

  const defaultSlides = [
    {
      id: 1,
      title: 'Bienvenue !',
      content: 'Voici comment utiliser le dashboard…',
      image: null
    },
    {
      id: 2,
      title: 'Navigation',
      content: 'Utilisez la sidebar pour naviguer entre les sections',
      image: null
    },
    {
      id: 3,
      title: 'Interactions',
      content: 'Cliquez et glissez pour interagir avec les éléments',
      image: null
    },
    {
      id: 4,
      title: 'Personnalisation',
      content: 'Adaptez l\'interface selon vos préférences',
      image: null
    }
  ];

  const slidesData = slides.length > 0 ? slides : defaultSlides;

  useEffect(() => {
    if (autoPlay) {
      intervalRef.current = setInterval(() => {
        nextSlide();
      }, autoPlayInterval);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [autoPlay, autoPlayInterval]);

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(prev => (prev + 1) % slidesData.length);
    setTimeout(() => setIsTransitioning(false), 200);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(prev => (prev - 1 + slidesData.length) % slidesData.length);
    setTimeout(() => setIsTransitioning(false), 200);
  };

  const goToSlide = (index) => {
    if (isTransitioning || index === currentSlide) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 200);
  };

  const handleKeyDown = (event) => {
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        prevSlide();
        break;
      case 'ArrowRight':
        event.preventDefault();
        nextSlide();
        break;
      case 'Home':
        event.preventDefault();
        goToSlide(0);
        break;
      case 'End':
        event.preventDefault();
        goToSlide(slidesData.length - 1);
        break;
    }
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('keydown', handleKeyDown);
      return () => carousel.removeEventListener('keydown', handleKeyDown);
    }
  }, [currentSlide]);

  return (
    <div
      ref={carouselRef}
      className={`relative max-w-2xl mx-auto bg-[#232B3E] rounded-2xl shadow-panel p-8 flex flex-col gap-8 overflow-hidden ${className}`}
      role="region"
      aria-label="Carousel de présentation"
      tabIndex={0}
    >
      {/* Slides container */}
      <div className="relative overflow-hidden">
        <motion.div
          className="flex transition-transform duration-200"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          animate={{ x: -currentSlide * 100 + '%' }}
          transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
        >
          {slidesData.map((slide, index) => (
            <div key={slide.id} className="min-w-full flex-shrink-0">
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <h2 className="text-[#7DE3F4] font-bold text-xl mb-3">
                  {slide.title}
                </h2>
                <p className="text-[#AAB7C6] text-lg leading-relaxed">
                  {slide.content}
                </p>
                {slide.image && (
                  <div className="mt-6">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="mx-auto rounded-lg shadow-lg max-w-full h-48 object-cover"
                    />
                  </div>
                )}
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Dots indicator */}
      {showDots && (
        <div className="flex gap-2 justify-center mt-6" role="tablist">
          {slidesData.map((_, index) => (
            <motion.button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-120 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]
                         ${index === currentSlide 
                           ? 'bg-[#7DE3F4] scale-125' 
                           : 'bg-[#384356] hover:bg-[#AAB7C6]'
                         }`}
              onClick={() => goToSlide(index)}
              aria-label={`Aller à l'étape ${index + 1}`}
              role="tab"
              aria-selected={index === currentSlide}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      )}

      {/* Navigation arrows */}
      {showArrows && (
        <>
          <motion.button
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#222C3B] text-[#7DE3F4] 
                       hover:bg-[#3B82F6] hover:text-white transition-all duration-120 flex items-center justify-center
                       focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:outline-none"
            onClick={prevSlide}
            aria-label="Précédent"
            disabled={isTransitioning}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
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

          <motion.button
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#222C3B] text-[#7DE3F4] 
                       hover:bg-[#3B82F6] hover:text-white transition-all duration-120 flex items-center justify-center
                       focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:outline-none"
            onClick={nextSlide}
            aria-label="Suivant"
            disabled={isTransitioning}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
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
        </>
      )}

      {/* Slide counter */}
      <div className="text-center text-[#AAB7C6] text-sm">
        {currentSlide + 1} / {slidesData.length}
      </div>
    </div>
  );
};

export default Carousel;
