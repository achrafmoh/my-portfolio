import React from 'react';

interface RoomIntroProps {
    title: string;
    description: string;
    accentColor: string;
}

export const RoomIntro: React.FC<RoomIntroProps> = ({ title, description, accentColor }) => {
    return (
        <div 
            className="room-intro"
            style={{ '--accent-color': accentColor } as React.CSSProperties}
        >
            <h1 className="room-title">{title}</h1>
            <p style={{ marginTop: '1rem', color: 'var(--text-color)', opacity: 0.8, lineHeight: 1.7, fontSize: '0.9rem' }}>
                {description}
            </p>
        </div>
    );
};