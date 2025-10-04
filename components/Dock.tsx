import React from 'react';
import { View } from '../types.ts';
import { ArchitectIcon, ArtistIcon, AnalystIcon, UserIcon } from './icons.tsx';

interface DockProps {
  currentView: View;
  setView: (view: View) => void;
}

const HomeIcon: React.FC = () => (
    <svg viewBox="0 0 24 24" style={{width: '24px', height: '24px', stroke: 'currentColor', strokeWidth: 1.5, fill: 'none'}}>
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        <polyline points="9 22 9 12 15 12 15 22"></polyline>
    </svg>
);


export const Dock: React.FC<DockProps> = ({ currentView, setView }) => {
  const navItems = [
    { id: 'hub', icon: <HomeIcon />, label: 'Hub' },
    { id: 'about', icon: <UserIcon />, label: 'About' },
    { id: 'architect', icon: <ArchitectIcon />, label: 'Architect' },
    { id: 'artist', icon: <ArtistIcon />, label: 'Artist' },
    { id: 'analyst', icon: <AnalystIcon />, label: 'Analyst' },
  ];

  const itemStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.25rem',
    background: 'none',
    border: 'none',
    color: 'var(--text-color)',
    cursor: 'pointer',
    padding: '0.5rem 1rem',
    fontSize: '0.7rem',
    textTransform: 'uppercase',
    opacity: 0.6,
    transition: 'opacity 0.2s, color 0.2s',
    position: 'relative',
  };

  const activeItemStyle: React.CSSProperties = {
    ...itemStyle,
    opacity: 1,
    color: 'var(--primary-accent)',
  };
  
  const handleClick = (view: View) => {
    setView(view);
  };

  return (
    <nav 
      className="main-dock"
      style={{
        position: 'fixed',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'fit-content',
        backgroundColor: 'rgba(1, 4, 9, 0.8)',
        backdropFilter: 'blur(10px)',
        border: '1px solid var(--border-color)',
        borderBottom: 'none',
        borderTopLeftRadius: '8px',
        borderTopRightRadius: '8px',
        padding: '0.5rem 1rem',
        display: 'flex',
        gap: '1rem',
        zIndex: 1000,
        animation: 'fadeIn 1s 0.5s backwards',
      }}
    >
      {navItems.map(item => (
        <button 
          key={item.id} 
          style={currentView === item.id ? activeItemStyle : itemStyle}
          onClick={() => handleClick(item.id as View)}
          className="glitch-text-hover"
        >
          {item.icon}
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  );
};