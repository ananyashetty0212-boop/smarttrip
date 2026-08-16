import React from 'react';

export const Badge = ({ children, variant = 'cyan', className = '', style = {} }) => {
  const variantClass = `badge-${variant}`;
  return (
    <span className={`badge ${variantClass} ${className}`} style={style}>
      {children}
    </span>
  );
};
