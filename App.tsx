import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { Project, View } from './types.ts';
import { architectProjects, artistProjects, analystProjects } from './data/projects.ts';
import { HolographicBackground } from './components/HolographicBackground.tsx';
import { BootupSequence } from './components/BootupSequence.tsx';
import { Dock } from './components/Dock.tsx';
import { SystemPanel } from './components/SystemPanel.tsx';
import { AthenaeumHub } from './components/AthenaeumHub.tsx';
import { ArchitectRoom } from './components/ArchitectRoom.tsx';
import { ArtistRoom } from './components/ArtistRoom.tsx';
import { AnalystRoom } from './components/AnalystRoom.tsx';
import { ProjectCard } from './components/ProjectCard.tsx';
import { ProjectViewer } from './components/ProjectViewer.tsx';
import { AboutMe } from './components/AboutMe.tsx';
import { CommsLink } from './components/CommsLink.tsx';

const App: React.FC = () => {
  const [booting, setBooting] = useState(true);
  const [currentView, setCurrentView] = useState<View>('hub');
  const [outgoingView, setOutgoingView] = useState<View | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const viewTransitionTimeoutRef = useRef<number | null>(null);

  const allProjects = useMemo(() => {
    return {
      architect: architectProjects,
      artist: artistProjects,
      analyst: analystProjects
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setBooting(false), 3000); // Duration of boot animation
    return () => clearTimeout(timer);
  }, []);
  
  // Cleanup timeout on component unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      if (viewTransitionTimeoutRef.current) {
        clearTimeout(viewTransitionTimeoutRef.current);
      }
    };
  }, []);

  const handleSetView = useCallback((newView: View) => {
    if (newView !== currentView) {
      // Clear any pending timeout to prevent race conditions on rapid navigation
      if (viewTransitionTimeoutRef.current) {
        clearTimeout(viewTransitionTimeoutRef.current);
      }
      setOutgoingView(currentView);
      setCurrentView(newView);
      viewTransitionTimeoutRef.current = window.setTimeout(() => {
        setOutgoingView(null);
        viewTransitionTimeoutRef.current = null;
      }, 600); // Match animation duration
    }
  }, [currentView]);

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
  };
  
  const handleCloseProject = () => {
    setSelectedProject(null);
  };

  const renderView = (view: View, isOutgoing: boolean) => {
    const animationClass = isOutgoing ? 'view-exiting' : 'view-entering';
    const key = isOutgoing ? `outgoing-${view}` : view;

    const componentMap: { [key in View]: React.ReactNode } = {
      architect: (
        <ArchitectRoom>
            {allProjects.architect.map(p => (
                <ProjectCard key={p.title} project={p} onSelect={() => handleSelectProject(p)} />
            ))}
        </ArchitectRoom>
      ),
      artist: (
        <ArtistRoom 
            projects={allProjects.artist} 
            onSelectProject={handleSelectProject}
        />
      ),
      analyst: (
        <AnalystRoom>
            {allProjects.analyst.map(p => (
                <ProjectCard key={p.title} project={p} onSelect={() => handleSelectProject(p)} />
            ))}
        </AnalystRoom>
      ),
      hub: <AthenaeumHub setView={handleSetView} />,
      about: <AboutMe />,
    };

    return (
        <div key={key} className={`view-container ${animationClass}`}>
            {componentMap[view]}
        </div>
    );
  };

  return (
    <>
      <HolographicBackground />
      {booting ? (
        <BootupSequence />
      ) : (
        <>
          <SystemPanel currentView={currentView} />
          {outgoingView && renderView(outgoingView, true)}
          {renderView(currentView, false)}
          <Dock currentView={currentView} setView={handleSetView} />
          <ProjectViewer project={selectedProject} onClose={handleCloseProject} />
          <CommsLink />
        </>
      )}
    </>
  );
};

export default App;