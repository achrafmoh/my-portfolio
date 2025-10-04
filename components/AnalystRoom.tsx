import React from 'react';
import { RoomIntro } from './RoomIntro.tsx';

interface AnalystRoomProps {
    children: React.ReactNode;
}

export const AnalystRoom: React.FC<AnalystRoomProps> = ({ children }) => {
    return (
        <>
            <RoomIntro 
                title="Analyst Matrix"
                description="An array of data-driven projects and analytical tools. From interactive dashboards to AI-powered insight generators, these projects demonstrate the power of transforming raw data into meaningful and actionable intelligence."
                accentColor="var(--analyst-color)"
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