
import React from 'react';

interface ActionButtonProps {
  onClick: () => void;
  className?: string;
  children: React.ReactNode;
  ariaLabel: string;
  disabled?: boolean; // Added disabled prop
}

export const ActionButton: React.FC<ActionButtonProps> = ({ onClick, className, children, ariaLabel, disabled }) => {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      disabled={disabled} // Apply disabled prop
      className={`p-4 rounded-full transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {children}
    </button>
  );
};
