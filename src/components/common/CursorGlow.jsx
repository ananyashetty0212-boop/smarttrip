import React, { useEffect, useState } from 'react';

export const CursorGlow = () => {
  const [pos, setPos] = useState({ x: -500, y: -500 });
  const [ripples, setRipples] = useState([]);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch capability
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouchDevice(true);
    }

    const handleMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    const handleTouchStart = (e) => {
      const touch = e.touches[0];
      if (touch) {
        const id = Date.now();
        setRipples(prev => [...prev, { id, x: touch.clientX, y: touch.clientY }]);
        setTimeout(() => {
          setRipples(prev => prev.filter(r => r.id !== id));
        }, 650);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchstart', handleTouchStart);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleTouchStart);
    };
  }, []);

  return (
    <>
      {/* Desktop Mouse Pointer Glow Layer */}
      {!isTouchDevice && (
        <div 
          className="cursor-glow-pointer"
          style={{
            left: `${pos.x}px`,
            top: `${pos.y}px`
          }}
        />
      )}

      {/* Mobile Touch Ripple Effects */}
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="touch-ripple-effect"
          style={{
            left: `${ripple.x - 30}px`,
            top: `${ripple.y - 30}px`,
            width: '60px',
            height: '60px'
          }}
        />
      ))}
    </>
  );
};
