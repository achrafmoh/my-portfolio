import React from 'react';
import { View } from '../types.ts';

interface SystemPanelProps {
    currentView: View;
}

export const SystemPanel: React.FC<SystemPanelProps> = ({ currentView }) => {
    return (
        <div 
            className="system-panel"
            style={{
                position: 'fixed',
                top: '1.5rem',
                left: '1.5rem',
                zIndex: 1000,
                fontFamily: 'var(--font-family)',
                textTransform: 'uppercase',
                animation: 'fadeIn 1s 0.5s backwards',
                color: 'var(--text-color)',
                opacity: 0.8,
            }}
        >
            <h1 style={{fontSize: '1rem', margin: 0, fontWeight: 500}}>Athenaeum OS</h1>
            <p style={{fontSize: '0.8rem', margin: '0.25rem 0 0 0', color: 'var(--primary-accent)'}}>{`// ${currentView}`}</p>
        </div>
    );
};