import React, { useState, useRef, useEffect } from 'react';
import { RoomIntro } from './RoomIntro.tsx';
import { ArtistProjectCollection, Project } from '../types.ts';

interface ArtistRoomProps {
    projects: ArtistProjectCollection;
    onSelectProject: (project: Project) => void;
}

// A component for text-based "UI" projects.
const TextCardItem: React.FC<{ project: Project }> = ({ project }) => {
    const cardStyle: React.CSSProperties = {
        border: '1px solid var(--border-color)',
        borderRadius: '4px',
        padding: '1.5rem',
        backgroundColor: 'rgba(255, 0, 170, 0.05)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    };

    return (
        <div style={cardStyle}>
            <h3 style={{
                margin: '0 0 1rem 0',
                color: 'var(--artist-color)',
                fontSize: '1.1rem',
                fontWeight: 500,
                borderBottom: '1px solid var(--border-color)',
                paddingBottom: '0.75rem',
            }}>
                {`// ${project.title}`}
            </h3>
            <p style={{
                margin: 0,
                fontSize: '0.9rem',
                lineHeight: 1.7,
                opacity: 0.8,
            }}>
                {project.longDescription}
            </p>
        </div>
    );
};


// A self-contained component for each piece of artwork with lazy loading.
const ArtworkItem: React.FC<{ project: Project; onSelect?: () => void; }> = ({ project, onSelect }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isInView, setIsInView] = useState(false);
    const itemRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.disconnect(); // Disconnect once visible to avoid re-triggering
                }
            },
            { rootMargin: "0px 0px 200px 0px" } // Pre-load images 200px before they enter the viewport
        );

        const currentRef = itemRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);

    const isInteractive = !!onSelect;
    const itemClasses = `artwork-item ${!isInteractive ? 'non-interactive' : ''}`;

    return (
       <div 
           ref={itemRef}
           className="artist-project-grid-item" 
           onClick={isInteractive ? onSelect : undefined}
       >
           <div className={itemClasses}>
               {/* Actual Image */}
               <img 
                   src={isInView ? project.image : undefined} 
                   alt={project.title} 
                   className="artwork-image"
                   style={{ 
                       opacity: isLoaded ? 1 : 0, 
                       transition: 'opacity 0.4s ease' 
                   }}
                   onLoad={() => setIsLoaded(true)}
                   loading="lazy"
               />

               {/* Skeleton Loader Overlay */}
               {!isLoaded && (
                   <div 
                       className="skeleton-loader"
                       style={{
                           position: 'absolute',
                           inset: 0,
                           width: '100%',
                           height: '100%',
                       }}
                   />
               )}
           </div>
        </div>
    );
};

export const ArtistRoom: React.FC<ArtistRoomProps> = ({ projects, onSelectProject }) => {
    const categories = Object.keys(projects);
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);

    const projectsToShow = projects[selectedCategory] || [];

    // Check the render type of the first project in the category to decide the layout.
    const isTextCategory = projectsToShow.length > 0 && projectsToShow[0].renderType === 'text-card';
    const isSocialMediaCategory = selectedCategory === 'Social Media Posts';

    return (
        <>
            <RoomIntro 
                title="Artist Studio"
                description="A gallery of visual and interactive experiences. Select a category to explore creations in branding, social media, and interface design."
                accentColor="var(--artist-color)"
            />
            <div className="artist-room-container">
                <nav className="artist-category-nav">
                    {categories.map(category => (
                        <button 
                            key={category}
                            className={`artist-category-item ${selectedCategory === category ? 'active' : ''}`}
                            onClick={() => setSelectedCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                </nav>
                <main className={`artist-project-grid ${isTextCategory ? 'text-grid' : ''} ${isSocialMediaCategory ? 'social-media-grid' : ''}`}>
                    {projectsToShow.map(project => (
                        project.renderType === 'text-card' ? (
                            <TextCardItem key={project.title} project={project} />
                        ) : (
                            <ArtworkItem 
                               key={project.image}
                               project={project}
                               onSelect={isSocialMediaCategory ? undefined : () => onSelectProject(project)}
                            />
                        )
                    ))}
                </main>
            </div>
        </>
    );
};