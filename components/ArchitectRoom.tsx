import React from 'react';
import { RoomIntro } from './RoomIntro.tsx';

interface ArchitectRoomProps {
    children: React.ReactNode;
}

export const ArchitectRoom: React.FC<ArchitectRoomProps> = ({ children }) => {
    return (
        <>
            <RoomIntro 
                title="Architect Domain"
                description="This section contains blueprints for robust digital infrastructures, from distributed cloud systems to high-throughput APIs. Each project represents a commitment to scalability, reliability, and performance."
                accentColor="var(--architect-color)"
            />
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '2rem',
                marginTop: '3rem',
            }}>
                {children}
            </div>
        </>
    );
};