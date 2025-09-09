import React from 'react';

/**
 * Composant Switch
 * Zone 31 - SWITCH / TOGGLE ATOMIQUE selon spécifications exactes du fichier de référence
 * Ligne 6819 du fichier chat gpt dash v2 0.1.txt
 */

const Switch = ({ 
  checked = false,
  onChange,
  label = "Label toggle",
  disabled = false,
  className = ""
}) => {
  const handleChange = (e) => {
    if (!disabled && onChange) {
      onChange(e.target.checked);
    }
  };

  return (
    <label className={`inline-flex items-center cursor-pointer gap-3 select-none ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}>
      <span className="text-[#AAB7C6] text-base font-semibold">{label}</span>
      <input 
        type="checkbox" 
        className="sr-only peer" 
        aria-label="Activer/désactiver"
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
      />
      <span
        className={`w-10 h-6 bg-[#222C3B] rounded-full relative transition-all duration-120
                   after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:w-4 after:h-4 after:shadow
                   peer-checked:bg-[#3B82F6] peer-focus-visible:ring-2 peer-focus-visible:ring-[#3B82F6]
                   peer-checked:after:translate-x-4 after:transition-all after:duration-120`}
        aria-hidden="true"
      ></span>
    </label>
  );
};

export default Switch;