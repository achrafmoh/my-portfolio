import React, { useRef, useMemo } from 'react';
import { Project } from '../types.ts';

interface ProjectCardProps {
  project: Project;
  onSelect: () => void;
}

const colors: { [key: string]: string } = {
  architect: 'var(--architect-color)',
  artist: 'var(--artist-color)',
  analyst: 'var(--analyst-color)',
};

const DataVizThumbnail: React.FC<{ projectType: Project['projectType'] }> = ({ projectType }) => {
    const viz = useMemo(() => {
        if (projectType === 'personal-finance-dashboard') {
            return (
                <svg width="100%" height="100%" viewBox="0 0 100 100">
                    <g className="hologram-group" style={{ transform: 'rotateX(60deg) translateY(20px)'}}>
                        <circle cx="50" cy="50" r="40" fill="none" stroke="var(--analyst-color)" strokeOpacity="0.1" strokeWidth="4"/>
                        <circle className="flickering-circle" cx="50" cy="50" r="40" fill="none" stroke="var(--analyst-color)" strokeWidth="4" strokeDasharray="100 251.2" strokeDashoffset="0"/>
                        <circle className="flickering-circle" cx="50" cy="50" r="30" fill="none" stroke="var(--analyst-color)" strokeWidth="2" strokeDasharray="60 188.4" strokeDashoffset="50" style={{ animationDelay: '0.5s' }}/>
                    </g>
                </svg>
            );
        }
        if (projectType === 'sales-performance-dashboard') {
            return (
                <svg width="100%" height="100%" viewBox="0 0 100 100">
                    <path d="M0 20 H100 M0 40 H100 M0 60 H100 M0 80 H100" className="grid" />
                    <rect className="bar-1" x="15" y="40" width="15" height="50" fill="var(--analyst-color)" fillOpacity="0.8"/>
                    <rect className="bar-2" x="42" y="20" width="15" height="70" fill="var(--analyst-color)" fillOpacity="0.8"/>
                    <rect className="bar-3" x="70" y="50" width="15" height="40" fill="var(--analyst-color)" fillOpacity="0.8"/>
                    <path className="flowing-line" d="M 0,60 C 20,40 40,80 60,60 S 80,20 100,30" stroke="var(--analyst-color)" strokeWidth="2" fill="none" />
                </svg>
            );
        }
        return null;
    }, [projectType]);

    return <div className="data-viz-thumbnail">{viz}</div>;
};

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect }) => {
    const [isHovered, setIsHovered] = React.useState(false);
    const cardRef = useRef<HTMLDivElement>(null);
    
    const primaryTag = project.tags[0];
    const accentColor = colors[primaryTag] || 'var(--primary-accent)';

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const { left, top, width, height } = cardRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;

      cardRef.current.style.setProperty('--x', `${-x * 10}px`);
      cardRef.current.style.setProperty('--y', `${-y * 10}px`);
      cardRef.current.style.setProperty('--rotateX', `${y * 5}deg`);
      cardRef.current.style.setProperty('--rotateY', `${-x * 5}deg`);
    };
    
    const handleMouseLeave = () => {
      setIsHovered(false);
      if (!cardRef.current) return;
      cardRef.current.style.setProperty('--x', `0px`);
      cardRef.current.style.setProperty('--y', `0px`);
      cardRef.current.style.setProperty('--rotateX', `0deg`);
      cardRef.current.style.setProperty('--rotateY', `0deg`);
    };

    const cardStyle: React.CSSProperties = {
        position: 'relative',
        minHeight: '350px',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid var(--border-color)',
        borderRadius: '8px',
        overflow: 'hidden',
        cursor: 'pointer',
        backgroundColor: 'rgba(1, 4, 9, 0.5)',
        backdropFilter: 'blur(5px)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        transform: `perspective(1000px) rotateX(var(--rotateX, 0)) rotateY(var(--rotateY, 0)) scale(${isHovered ? 1.03 : 1})`,
        boxShadow: isHovered ? `0 0 20px ${accentColor}33` : 'none',
    };

    const imageStyle: React.CSSProperties = {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        transition: 'transform 0.4s ease',
        transform: `translateX(var(--x, 0)) translateY(var(--y, 0)) scale(${isHovered ? 1.1 : 1})`,
    };

    const handleClick = () => {
        onSelect();
    };

    return (
        <div 
            ref={cardRef}
            style={cardStyle} 
            onClick={handleClick}
            onMouseEnter={() => {
              setIsHovered(true);
            }}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
        >
            <div style={{ aspectRatio: '16 / 9', overflow: 'hidden' }}>
                {project.tags.includes('analyst') && project.projectType ? (
                    <DataVizThumbnail projectType={project.projectType} />
                ) : (
                    <img src={project.image} alt={project.title} style={imageStyle} />
                )}
            </div>
            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: '1 1 0' }}>
                <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', fontWeight: 500, color: accentColor, animation: isHovered ? 'text-glitch 0.3s steps(1) infinite' : 'none' }}>{project.title}</h3>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-color)', opacity: 0.8, lineHeight: 1.6, flex: 1 }}>{project.description}</p>
            </div>
            {/* Glow border on hover */}
            <div style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '8px',
                boxShadow: `inset 0 0 10px ${accentColor}`,
                opacity: isHovered ? 0.6 : 0,
                transition: 'opacity 0.3s ease',
            }}/>
        </div>
    );
};