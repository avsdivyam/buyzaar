import React from 'react';
import { Button as BootstrapButton } from 'react-bootstrap';

const Button = ({
  children,
  onClick,
  variant = 'primary',
  size = null,
  disabled = false,
  type = 'button',
  className = '',
  as = null,
  to = null,
  ...props
}) => {
  // Map our size values to Bootstrap's
  const getSize = () => {
    if (size === 'small') return 'sm';
    if (size === 'large') return 'lg';
    return null;
  };

  // Map our variant values to Bootstrap's
  const getVariant = () => {
    if (variant === 'outline') return 'outline-primary';
    return variant;
  };

  return (
    <BootstrapButton
      type={type}
      variant={getVariant()}
      size={getSize()}
      disabled={disabled}
      onClick={onClick}
      className={className}
      as={as}
      to={to}
      {...props}
    >
      {children}
    </BootstrapButton>
  );
};

export default Button;