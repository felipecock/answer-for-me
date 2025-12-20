import React from 'react';

interface ActionButtonProps {
  onClick: () => void;
  className?: string;
  children: React.ReactNode;
  ariaLabel: string;
  disabled?: boolean; // Added disabled prop
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  onClick,
  className,
  children,
  ariaLabel,
  disabled,
}) => {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      disabled={disabled} // Apply disabled prop
      className={`a4m__btn ${className}`}
    >
      {children}
    </button>
  );
};
