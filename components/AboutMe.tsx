import React, { useState, useEffect, useRef } from 'react';
import { profileImage } from '../assets/profile.ts';

const logEntries = [
    { type: 'command', text: '> LOAD PERSONAL_LOG --USER=KABRANE.M.ACHRAF', speed: 30, pause: 200 },
    { type: 'response', text: '... ACCESSING MEMORY CORE ...', speed: 40, pause: 300 },
    { type: 'response', text: '... DECRYPTING FILES ... SUCCESS ...', speed: 40, pause: 300 },
    { type: 'command', text: '> RENDER_USER_AVATAR.JPG --profile=KABRANE', speed: 30, pause: 500, action: 'showImage' },
    { type: 'response', text: '... RENDERING LOG ENTRIES ...', speed: 40, pause: 500 },
    { type: 'divider', text: '----------------------------------------', speed: 10, pause: 200 },
    { 
        type: 'log',
        timestamp: '2024-07-22T10:00:00Z',
        title: 'LOG_ENTRY_PROFILE',
        color: 'var(--primary-accent)',
        body: "A valedictorian junior software developer and data analyst, driven by a passion for Artificial Intelligence and full-stack development. I thrive on translating complex problems into elegant, efficient, and intelligent software solutions.",
        speed: 15,
    },
    { 
        type: 'log',
        timestamp: '2024-07-22T10:01:30Z',
        title: 'LOG_ENTRY_ARCHITECT',
        color: 'var(--architect-color)',
        body: "I construct robust, full-stack applications from database to deployment. My expertise includes REST/GraphQL APIs, secure authentication (JWT/OAuth2), and diverse databases (SQL & NoSQL). I leverage tools like Node.js, Python, Docker, and CI/CD to build and deploy scalable systems.",
        speed: 15,
    },
    { 
        type: 'log',
        timestamp: '2024-07-22T10:02:45Z',
        title: 'LOG_ENTRY_ARTIST',
        color: 'var(--artist-color)',
        body: "User experience is paramount. I utilize modern frameworks like React and TypeScript to build responsive and intuitive interfaces. My focus on web application design ensures that the end-product is not only functional but also engaging and accessible.",
        speed: 15,
    },
    { 
        type: 'log',
        timestamp: '2024-07-22T10:04:12Z',
        title: 'LOG_ENTRY_ANALYST',
        color: 'var(--analyst-color)',
        body: "I uncover insights from data. Using Python's data science stack (Pandas, NumPy, scikit-learn), I preprocess information, build machine learning models, and create interactive visualizations. My work on a deepfake detection application demonstrates my commitment to applying AI to real-world challenges.",
        speed: 15,
    },
    { type: 'command', text: '> END_OF_LOG', speed: 30 },
];

const useTypingEffect = (entry: any, onFinished: () => void) => {
    const [displayedText, setDisplayedText] = useState('');
    const [isTyping, setIsTyping] = useState(true);
    const text = entry.body || entry.text;
    const speed = entry.speed;

    useEffect(() => {
        setDisplayedText('');
        setIsTyping(true);
        let i = 0;
        const intervalId = setInterval(() => {
            if (i < text.length) {
                setDisplayedText(text.substring(0, i + 1));
                i++;
            } else {
                clearInterval(intervalId);
                setIsTyping(false);
                setTimeout(onFinished, entry.pause ?? 800);
            }
        }, speed);

        return () => clearInterval(intervalId);
    }, [text, speed, onFinished, entry.pause]);

    return { typedText: displayedText, isTyping };
};

const LogLine: React.FC<{ entry: any; onFinished: () => void; }> = ({ entry, onFinished }) => {
    const { typedText, isTyping } = useTypingEffect(entry, onFinished);
    const cursor = <span style={{ animation: 'blinker 1s step-end infinite', marginLeft: '2px', backgroundColor: 'currentColor', display: 'inline-block', width: '0.5em', height: '1em' }}></span>;

    switch(entry.type) {
        case 'command':
            return <p style={{color: 'var(--text-color)', margin: 0}}>{typedText}{isTyping && cursor}</p>;
        case 'response':
            return <p style={{color: 'var(--text-color)', opacity: 0.7, paddingLeft: '1rem', margin: 0}}>{typedText}{isTyping && cursor}</p>;
        case 'divider':
            return <p style={{color: 'var(--border-color)', margin: 0}}>{typedText}{isTyping && cursor}</p>;
        case 'log':
            return (
                <div style={{ margin: '1rem 0' }}>
                    <p style={{ margin: 0, color: 'var(--text-color)', opacity: 0.6 }}>{`[${entry.timestamp}]`}</p>
                    <h3 style={{ margin: '0.25rem 0 0.5rem 0', color: entry.color, fontWeight: 500 }}>{entry.title}</h3>
                    <p style={{ margin: 0, lineHeight: 1.7, color: 'var(--text-color)', opacity: 0.9, maxWidth: '70ch' }}>
                        {typedText}
                        {isTyping && cursor}
                    </p>
                </div>
            )
        default: return null;
    }
}


export const AboutMe: React.FC = () => {
    const [visibleEntryIndex, setVisibleEntryIndex] = useState(0);
    const [isImageVisible, setIsImageVisible] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [visibleEntryIndex]);

    const handleLineFinished = () => {
        const currentEntry = logEntries[visibleEntryIndex];
        if (currentEntry.action === 'showImage') {
            setIsImageVisible(true);
        }

        if (visibleEntryIndex < logEntries.length - 1) {
            setVisibleEntryIndex(prev => prev + 1);
        }
    };
    
    const renderStaticLine = (entry: any) => {
        const text = entry.body || entry.text;
         switch(entry.type) {
            case 'command':
                return <p style={{color: 'var(--text-color)', margin: 0}}>{text}</p>;
            case 'response':
                return <p style={{color: 'var(--text-color)', opacity: 0.7, paddingLeft: '1rem', margin: 0}}>{text}</p>;
            case 'divider':
                return <p style={{color: 'var(--border-color)', margin: 0}}>{text}</p>;
            case 'log':
                return (
                    <div style={{ margin: '1rem 0' }}>
                        <p style={{ margin: 0, color: 'var(--text-color)', opacity: 0.6 }}>{`[${entry.timestamp}]`}</p>
                        <h3 style={{ margin: '0.25rem 0 0.5rem 0', color: entry.color, fontWeight: 500 }}>{entry.title}</h3>
                        <p style={{ margin: 0, lineHeight: 1.7, color: 'var(--text-color)', opacity: 0.9, maxWidth: '70ch' }}>{text}</p>
                    </div>
                )
            default: return null;
        }
    }

    return (
        <div className="about-me-container">
            <div className="about-me-log">
                <h1 style={{
                    fontSize: '1.25rem',
                    textTransform: 'uppercase',
                    fontWeight: 500,
                    color: 'var(--primary-accent)',
                    paddingBottom: '0.5rem',
                    borderBottom: '1px solid var(--border-color)',
                    flexShrink: 0,
                    textShadow: '0 0 5px var(--glow-color)',
                }}>
                    Personal Log // kabrane.m.achraf
                </h1>
                <div ref={scrollRef} style={{
                    flex: 1,
                    overflowY: 'auto',
                    paddingTop: '1rem',
                    fontSize: 'clamp(0.9rem, 1.5vw, 1rem)',
                    textShadow: '0 0 5px rgba(88, 166, 255, 0.3)',
                }}>
                    {logEntries.slice(0, visibleEntryIndex).map((entry, index) => (
                        <div key={index} style={{ marginBottom: '0.75rem'}}>
                           {renderStaticLine(entry)}
                        </div>
                    ))}
                     <div style={{ marginBottom: '0.75rem'}}>
                        <LogLine entry={logEntries[visibleEntryIndex]} onFinished={handleLineFinished} />
                     </div>
                </div>
            </div>

            <div className="about-me-image-container">
                {isImageVisible && (
                    <div style={{
                        position: 'relative',
                        animation: 'reveal-top-to-bottom 1s cubic-bezier(0.25, 1, 0.5, 1) forwards, hologram-flicker 3s 1s infinite',
                        width: '100%',
                        maxWidth: '350px',
                        aspectRatio: '1 / 1',
                    }}>
                        <div style={{
                            position: 'absolute',
                            inset: '-10px',
                            border: '1px solid var(--primary-accent)',
                            opacity: 0.3,
                            animation: 'hologram-flicker 2s infinite reverse'
                        }} />

                        <img src={profileImage} alt="Kabrane Mohamed Achraf" style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            filter: 'grayscale(50%) contrast(1.2) brightness(0.9)',
                            mixBlendMode: 'luminosity',
                            opacity: 0.8
                        }} />
                        
                        <div style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(var(--primary-accent), transparent)',
                            opacity: 0.3,
                        }} />
                        
                        <div style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(to bottom, transparent 98%, var(--primary-accent) 100%)',
                            backgroundSize: '100% 5px',
                            animation: 'scanline-glitch 5s linear infinite',
                        }} />
                    </div>
                )}
            </div>
            
            <style>{`
                @keyframes blinker {
                    50% { opacity: 0; }
                }
                @keyframes reveal-top-to-bottom {
                    from { 
                        clip-path: polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%);
                    }
                    to { 
                        clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
                    }
                }
                @keyframes hologram-flicker {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.95; }
                }
                @keyframes scanline-glitch {
                    0% { transform: translateY(0); }
                    10% { transform: translateY(5px); }
                    20% { transform: translateY(-5px); }
                    100% { transform: translateY(0); }
                }
            `}</style>
        </div>
    );
};