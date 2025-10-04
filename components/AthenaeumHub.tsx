import React from 'react';
import { View } from '../types.ts';
import { ArchitectIcon, ArtistIcon, AnalystIcon } from './icons.tsx';

interface AthenaeumHubProps {
  setView: (view: View) => void;
  style?: React.CSSProperties;
}

const Portal: React.FC<{
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  onClick: () => void;
}> = ({ title, description, icon, color, onClick }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const handleClick = () => {
    onClick();
  }

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => {
        setIsHovered(true)
      }}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        border: '1px solid var(--border-color)',
        borderRadius: '8px',
        padding: '2rem',
        textAlign: 'center',
        cursor: 'pointer',
        transition: 'transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
        transform: isHovered ? 'translateY(-10px)' : 'translateY(0)',
        borderColor: isHovered ? color : 'var(--border-color)',
        boxShadow: isHovered ? `0 0 20px ${color}44, inset 0 0 10px ${color}22` : 'none',
        backgroundColor: 'rgba(1, 4, 9, 0.5)',
      }}
    >
      <div style={{ color, marginBottom: '1rem' }}>{icon}</div>
      <h2 style={{
        margin: '0 0 0.5rem 0',
        fontSize: '1.25rem',
        textTransform: 'uppercase',
        fontWeight: 600,
        color,
        transition: 'text-shadow 0.3s',
        textShadow: isHovered ? `0 0 10px ${color}` : 'none',
        animation: isHovered ? 'text-glitch 0.3s steps(1) infinite' : 'none',
      }}>{title}</h2>
      <p style={{ margin: 0, color: 'var(--text-color)', opacity: 0.7, fontSize: '0.9rem' }}>{description}</p>
    </div>
  );
};


export const AthenaeumHub: React.FC<AthenaeumHubProps> = ({ setView }) => {
  return (
    <>
      <div style={{textAlign: 'center', marginBottom: '4rem'}}>
        <h1 style={{fontSize: 'clamp(2rem, 5vw, 3rem)', margin: '0 0 0.5rem 0', fontWeight: 500}}>Welcome to the Athenaeum</h1>
        <p style={{fontSize: 'clamp(0.9rem, 2vw, 1.1rem)', maxWidth: '60ch', color: 'var(--text-color)', opacity: 0.7, margin: 'auto' }}>An interactive archive of projects. Select a discipline to explore.</p>
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '2rem',
        width: '100%',
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        <Portal 
            title="The Architect"
            description="Blueprints of scalable systems and robust backends."
            icon={<ArchitectIcon />}
            color="var(--architect-color)"
            onClick={() => setView('architect')}
        />
        <Portal 
            title="The Artist"
            description="Creations of visual appeal and interactive design."
            icon={<ArtistIcon />}
            color="var(--artist-color)"
            onClick={() => setView('artist')}
        />
        <Portal 
            title="The Analyst"
            description="Insights derived from data and algorithmic models."
            icon={<AnalystIcon />}
            color="var(--analyst-color)"
            onClick={() => setView('analyst')}
        />
      </div>
    </>
  );
};