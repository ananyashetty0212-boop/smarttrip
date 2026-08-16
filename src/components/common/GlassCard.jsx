import React from 'react';

export const GlassCard = ({ children, className = '', style = {}, hover = true, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`glass-panel ${hover ? 'glass-panel-hover' : ''} ${className}`}
      style={{
        padding: '1.5rem',
        cursor: onClick ? 'pointer' : 'default',
        ...style
      }}
    >
      {children}
    </div>
  );
};
