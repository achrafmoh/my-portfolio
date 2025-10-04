import React, { useRef, useEffect } from 'react';

export const HolographicBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
        if (containerRef.current) {
            containerRef.current.style.setProperty('--mouse-x', `${event.clientX}px`);
            containerRef.current.style.setProperty('--mouse-y', `${event.clientY}px`);
        }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: -1,
      overflow: 'hidden',
      background: 'var(--background-color)',
    }}>
      {/* Grid */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(139, 148, 158, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(139, 148, 158, 0.1) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
        animation: 'grid-pan 120s linear infinite',
      }}></div>
      
      {/* Mouse Follow Glow */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `radial-gradient(circle 400px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(88, 166, 255, 0.1), transparent)`,
        transition: 'background 0.2s ease-out',
      }}/>
      
      {/* Scanline */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '100vh',
        background: 'linear-gradient(to bottom, transparent 0%, var(--primary-accent) 50%, transparent 100%)',
        opacity: 0.05,
        animation: 'scanline 10s linear infinite',
      }}></div>

      <style>{`
        @keyframes grid-pan {
          from { background-position: 0 0; }
          to { background-position: -2400px -2400px; }
        }
        @keyframes scanline {
            0% { transform: translateY(-50%); }
            100% { transform: translateY(50%); }
        }
      `}</style>
    </div>
  );
};