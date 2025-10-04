import React, { useState, useCallback } from 'react';
import { MailIcon, LinkedinIcon, GithubIcon, XIcon } from './icons.tsx';

export const CommsLink: React.FC = () => {
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [emailCopied, setEmailCopied] = useState(false);

    const handleOpen = () => {
        setIsClosing(false);
        setIsPanelOpen(true);
    };

    const handleClose = useCallback(() => {
        setIsClosing(true);
        setTimeout(() => {
            setIsPanelOpen(false);
            setEmailCopied(false); // Reset copied state on close
        }, 500); // Match animation duration
    }, []);

    const handleCopyEmail = useCallback(() => {
        navigator.clipboard.writeText('kabrane.achraf@gmail.com').then(() => {
            setEmailCopied(true);
            setTimeout(() => setEmailCopied(false), 2000); // Reset after 2 seconds
        });
    }, []);

    const ContactItem: React.FC<{
        href?: string;
        onClick?: () => void;
        icon: React.ReactNode;
        label: string;
        isCopied?: boolean;
    }> = ({ href, onClick, icon, label, isCopied = false }) => {
        const content = (
            <>
                {icon}
                <span>{isCopied ? 'Copied! ✓' : label}</span>
            </>
        );

        if (href) {
            return (
                <a href={href} target="_blank" rel="noopener noreferrer" className="contact-item">
                    {content}
                </a>
            );
        }
        
        return (
            <button onClick={onClick} className={`contact-item ${isCopied ? 'copied' : ''}`}>
                {content}
            </button>
        )
    };

    return (
        <>
            <button className="comms-link-trigger" onClick={handleOpen}>
                // INITIATE COMMS
            </button>

            {isPanelOpen && (
                <div 
                    className="comms-panel-overlay"
                    style={{ animation: isClosing ? 'fadeOut 0.3s forwards' : 'fadeIn 0.3s forwards' }}
                    onClick={handleClose}
                >
                    <div 
                        className="comms-panel"
                        style={{ animation: isClosing ? 'slideOutToLeft 0.5s ease-in forwards' : 'slideInFromLeft 0.5s ease-out forwards' }}
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside panel
                    >
                        <header className="comms-panel-header">
                            <div>
                                <h2 className="comms-panel-title">Secure Comms Channel</h2>
                                <p className="comms-panel-subtitle">Kabrane.M.Achraf // Open for Transmission</p>
                            </div>
                            <button className="comms-close-btn" onClick={handleClose}>
                                <XIcon />
                            </button>
                        </header>
                        <div className="comms-panel-body">
                            <p className="comms-intro-text">Have a project, a question, or an opportunity? I'm always open to discussing new ideas and collaborations. Let's connect and build something extraordinary.</p>
                            <div className="contact-grid">
                                <ContactItem
                                    onClick={handleCopyEmail}
                                    icon={<MailIcon />}
                                    label="kabrane.achraf@gmail.com"
                                    isCopied={emailCopied}
                                />
                                <ContactItem
                                    href="https://www.linkedin.com/in/kabrane-mohamed-achraf-b167b5378/"
                                    icon={<LinkedinIcon />}
                                    label="View LinkedIn Profile"
                                />
                                <ContactItem
                                    href="https://github.com/achrafmoh"
                                    icon={<GithubIcon />}
                                    label="Explore GitHub Repos"
                                />
                            </div>
                            <div className="comms-panel-footer">
                                STATUS: Awaiting your signal...
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};