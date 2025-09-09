import React, { useState, useRef } from 'react';

/**
 * Composant Button Atomique
 * Spécifications complètes selon les directives PHASE 4-5
 */

const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  onClick,
  onMouseEnter,
  onMouseLeave,
  className = '',
  type = 'button',
  ariaLabel,
  ariaDescribedBy,
  ...props
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const [ripple, setRipple] = useState(null);
  const buttonRef = useRef(null);

  // Variants de style
  const variants = {
    primary: 'bg-[#3B82F6] text-white hover:bg-[#2563eb] focus:ring-[#3B82F6]',
    secondary: 'bg-[#222C3B] text-[#AAB7C6] hover:bg-[#1a1f2e] hover:text-[#F1F5F9] focus:ring-[#3B82F6]',
    danger: 'bg-[#EF4444] text-white hover:bg-[#DC2626] focus:ring-[#EF4444]',
    ghost: 'bg-transparent text-[#AAB7C6] hover:bg-[#222C3B] hover:text-[#F1F5F9] focus:ring-[#3B82F6]',
    success: 'bg-[#10B981] text-white hover:bg-[#059669] focus:ring-[#10B981]'
  };

  // Tailles
  const sizes = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg',
    xl: 'px-8 py-4 text-xl'
  };

  // Gestion du ripple effect
  const handleMouseDown = (e) => {
    if (disabled || loading) return;
    
    setIsPressed(true);
    
    // Calcul de la position du ripple
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setRipple({ x, y });
    
    // Reset après animation
    setTimeout(() => {
      setRipple(null);
      setIsPressed(false);
    }, 600);
  };

  const handleMouseUp = () => {
    setIsPressed(false);
  };

  const handleClick = (e) => {
    if (disabled || loading) {
      e.preventDefault();
      return;
    }
    
    if (onClick) {
      onClick(e);
    }
  };

  // Classes de base
  const baseClasses = `
    relative overflow-hidden rounded-xl font-semibold
    transition-all duration-150 ease-out
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    active:scale-95 hover:scale-105
    ${isPressed ? 'scale-95' : ''}
  `;

  const variantClasses = variants[variant] || variants.primary;
  const sizeClasses = sizes[size] || sizes.medium;

  return (
    <button
      ref={buttonRef}
      type={type}
      disabled={disabled || loading}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      aria-pressed={isPressed}
      {...props}
    >
      {/* Ripple effect */}
      {ripple && (
        <span
          className="absolute pointer-events-none animate-ripple"
          style={{
            left: ripple.x - 10,
            top: ripple.y - 10,
            width: 20,
            height: 20,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.3)',
            transform: 'scale(0)',
            animation: 'ripple 0.6s ease-out'
          }}
        />
      )}

      {/* Contenu du bouton */}
      <span className="relative flex items-center justify-center gap-2">
        {loading && (
          <svg 
            className="animate-spin h-4 w-4" 
            fill="none" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            />
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </span>

      {/* Focus ring personnalisé */}
      <span 
        className="absolute inset-0 rounded-xl ring-2 ring-transparent focus-within:ring-current focus-within:ring-opacity-50"
        aria-hidden="true"
      />
    </button>
  );
};

export default Button;