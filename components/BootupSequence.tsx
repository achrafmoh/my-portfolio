import React, { useState, useEffect } from 'react';

const lines = [
  'ATHENAEUM OS v2.0 BOOTING...',
  'INITIATING MEMORY CHECK...',
  'MEMORY OK: 256TB HYPER-RAM',
  'LOADING CORE MODULES...',
  '  - ARCHITECT_CORE.DLL',
  '  - ARTIST_ENGINE.DLL',
  '  - ANALYST_MATRIX.DLL',
  'ALL MODULES LOADED.',
  'ESTABLISHING VISUAL INTERFACE...',
  'WELCOME, USER.',
];

const TypingLine: React.FC<{ text: string; onFinished: () => void; }> = ({ text, onFinished }) => {
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.substring(0, i + 1));
      i++;
      if (i > text.length) {
        clearInterval(interval);
        setTimeout(onFinished, 50 + Math.random() * 50);
      }
    }, 20 + Math.random() * 30);
    return () => clearInterval(interval);
  }, [text, onFinished]);
  
  return <p style={{ margin: 0 }}>{`> ${displayedText}`}<span style={{animation: 'blinker 1s step-end infinite'}}>{'█'}</span></p>;
};

export const BootupSequence: React.FC = () => {
    const [currentLine, setCurrentLine] = useState(0);

    const handleLineFinish = () => {
        setCurrentLine(prev => prev + 1);
    };

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            background: 'var(--background-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
        }}>
            <div style={{
                width: 'clamp(300px, 90vw, 800px)',
                fontFamily: 'var(--font-family)',
                fontSize: 'clamp(0.8rem, 2vw, 1rem)',
                color: 'var(--primary-accent)',
                textShadow: '0 0 5px var(--glow-color)',
            }}>
                {lines.slice(0, currentLine).map((line, i) => (
                    <p key={i} style={{ margin: 0 }}>{`> ${line}`}</p>
                ))}
                {currentLine < lines.length && (
                    <TypingLine text={lines[currentLine]} onFinished={handleLineFinish} />
                )}
            </div>
            <style>{`
                @keyframes blinker {
                    50% { opacity: 0; }
                }
            `}</style>
        </div>
    );
};