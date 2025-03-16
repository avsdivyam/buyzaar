import React from 'react';
import '../styles/global.css';

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'medium',
  disabled = false,
  type = 'button',
  className = '',
  ...props 
}) => {
  const buttonClass = `button ${variant} ${size} ${className} ${disabled ? 'disabled' : ''}`;
  
  return (
    <button
      type={type}
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;