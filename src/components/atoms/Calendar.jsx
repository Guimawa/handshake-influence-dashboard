import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Calendar = ({ 
  events = [],
  onDateClick,
  onEventClick,
  className = ""
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [focusedDate, setFocusedDate] = useState(null);
  const calendarRef = useRef(null);

  const months = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  const weekDays = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = (firstDay.getDay() + 6) % 7; // Lundi = 0

    const days = [];
    
    // Jours du mois précédent
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const prevDate = new Date(year, month, -i);
      days.push({
        date: prevDate,
        isCurrentMonth: false,
        isToday: false,
        isSelected: false
      });
    }

    // Jours du mois courant
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isToday = date.toDateString() === new Date().toDateString();
      const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
      
      days.push({
        date,
        isCurrentMonth: true,
        isToday,
        isSelected
      });
    }

    // Jours du mois suivant pour compléter la grille
    const remainingDays = 42 - days.length; // 6 semaines * 7 jours
    for (let day = 1; day <= remainingDays; day++) {
      const nextDate = new Date(year, month + 1, day);
      days.push({
        date: nextDate,
        isCurrentMonth: false,
        isToday: false,
        isSelected: false
      });
    }

    return days;
  };

  const getEventsForDate = (date) => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.toDateString() === date.toDateString();
    });
  };

  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const handleDateClick = (day) => {
    if (day.isCurrentMonth) {
      setSelectedDate(day.date);
      onDateClick?.(day.date);
    }
  };

  const handleKeyDown = (event) => {
    if (!focusedDate) return;

    const days = getDaysInMonth(currentDate);
    const currentIndex = days.findIndex(day => 
      day.date.toDateString() === focusedDate.toDateString()
    );

    let newIndex = currentIndex;

    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        newIndex = Math.max(0, currentIndex - 1);
        break;
      case 'ArrowRight':
        event.preventDefault();
        newIndex = Math.min(days.length - 1, currentIndex + 1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        newIndex = Math.max(0, currentIndex - 7);
        break;
      case 'ArrowDown':
        event.preventDefault();
        newIndex = Math.min(days.length - 1, currentIndex + 7);
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (days[currentIndex].isCurrentMonth) {
          handleDateClick(days[currentIndex]);
        }
        break;
      case 'Home':
        event.preventDefault();
        newIndex = 0;
        break;
      case 'End':
        event.preventDefault();
        newIndex = days.length - 1;
        break;
    }

    if (newIndex !== currentIndex) {
      setFocusedDate(days[newIndex].date);
    }
  };

  useEffect(() => {
    const calendar = calendarRef.current;
    if (calendar) {
      calendar.addEventListener('keydown', handleKeyDown);
      return () => calendar.removeEventListener('keydown', handleKeyDown);
    }
  }, [focusedDate, currentDate]);

  const days = getDaysInMonth(currentDate);

  return (
    <motion.div
      ref={calendarRef}
      className={`bg-[#232B3E] rounded-2xl shadow-panel p-6 max-w-2xl mx-auto ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
      role="application"
      aria-label="Calendrier"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <motion.button
          className="text-[#3B82F6] hover:bg-[#222C3B] rounded p-2 transition-all duration-120
                     focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:outline-none"
          onClick={() => navigateMonth(-1)}
          aria-label="Mois précédent"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </motion.button>

        <h2 className="text-white font-bold text-lg">
          {months[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>

        <motion.button
          className="text-[#3B82F6] hover:bg-[#222C3B] rounded p-2 transition-all duration-120
                     focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:outline-none"
          onClick={() => navigateMonth(1)}
          aria-label="Mois suivant"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </motion.button>
      </div>

      {/* Calendar grid */}
      <table className="w-full text-center" role="grid">
        <thead>
          <tr>
            {weekDays.map(day => (
              <th key={day} className="text-[#AAB7C6] text-sm uppercase py-2">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 6 }, (_, weekIndex) => (
            <tr key={weekIndex}>
              {days.slice(weekIndex * 7, (weekIndex + 1) * 7).map((day, dayIndex) => {
                const dayEvents = getEventsForDate(day.date);
                const isFocused = focusedDate && day.date.toDateString() === focusedDate.toDateString();
                
                return (
                  <td key={dayIndex} className="relative p-2">
                    <motion.button
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-120
                                 focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:outline-none
                                 ${day.isCurrentMonth 
                                   ? 'bg-transparent hover:bg-[#7DE3F4] hover:text-[#212837]' 
                                   : 'text-[#AAB7C6] cursor-default'
                                 }
                                 ${day.isToday ? 'bg-[#3B82F6] text-white font-bold' : ''}
                                 ${day.isSelected ? 'bg-[#7DE3F4] text-[#212837] font-bold' : ''}
                                 ${isFocused ? 'ring-2 ring-[#3B82F6]' : ''}
                                `}
                      onClick={() => handleDateClick(day)}
                      onFocus={() => setFocusedDate(day.date)}
                      tabIndex={day.isCurrentMonth ? 0 : -1}
                      aria-label={`${day.date.getDate()} ${months[day.date.getMonth()]} ${day.date.getFullYear()}${
                        dayEvents.length > 0 ? `, ${dayEvents.length} événement${dayEvents.length > 1 ? 's' : ''}` : ''
                      }`}
                      aria-selected={day.isSelected}
                      whileHover={day.isCurrentMonth ? { scale: 1.1 } : {}}
                      whileTap={day.isCurrentMonth ? { scale: 0.95 } : {}}
                    >
                      {day.date.getDate()}
                    </motion.button>

                    {/* Event indicators */}
                    {dayEvents.length > 0 && (
                      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-1">
                        {dayEvents.slice(0, 3).map((event, eventIndex) => (
                          <motion.span
                            key={eventIndex}
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: event.color || '#F69AC1' }}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ 
                              duration: 0.2, 
                              delay: eventIndex * 0.05,
                              ease: [0.23, 1, 0.32, 1] 
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              onEventClick?.(event);
                            }}
                            title={event.title}
                          />
                        ))}
                        {dayEvents.length > 3 && (
                          <span className="w-2 h-2 rounded-full bg-[#AAB7C6] text-xs flex items-center justify-center text-[#232B3E] font-bold">
                            +
                          </span>
                        )}
                      </div>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Events list */}
      {selectedDate && (
        <motion.div
          className="mt-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
        >
          <h3 className="text-[#7DE3F4] font-semibold mb-3">
            Événements du {selectedDate.getDate()} {months[selectedDate.getMonth()]}
          </h3>
          <ul className="flex flex-col gap-2">
            {getEventsForDate(selectedDate).map((event, index) => (
              <motion.li
                key={index}
                className="flex items-center gap-3 text-[#AAB7C6] p-2 rounded-lg hover:bg-[#222C3B] cursor-pointer transition-colors duration-120"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                onClick={() => onEventClick?.(event)}
              >
                <span 
                  className="w-2 h-2 rounded-full" 
                  style={{ backgroundColor: event.color || '#F69AC1' }}
                />
                <span className="flex-1">{event.title}</span>
                <span className="text-xs text-[#AAB7C6]/60">
                  {event.time || ''}
                </span>
              </motion.li>
            ))}
            {getEventsForDate(selectedDate).length === 0 && (
              <li className="text-[#AAB7C6]/60 text-center py-4">
                Aucun événement ce jour
              </li>
            )}
          </ul>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Calendar;
