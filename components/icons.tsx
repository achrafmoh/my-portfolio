import React from 'react';

const iconStyle: React.CSSProperties = {
  width: '20px',
  height: '20px',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  fill: 'none',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

export const ArchitectIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" style={iconStyle}>
    <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
    <path d="M2 17l10 5 10-5"></path>
    <path d="M2 12l10 5 10-5"></path>
  </svg>
);

export const ArtistIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" style={iconStyle}>
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);

export const AnalystIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" style={iconStyle}>
    <polyline points="3 3 3 21 21 21"></polyline>
    <polyline points="4 17 9 12 14 15 20 9"></polyline>
  </svg>
);

export const UserIcon: React.FC = () => (
    <svg viewBox="0 0 24 24" style={{...iconStyle, width: '22px', height: '22px'}}>
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
    </svg>
);

export const XIcon: React.FC = () => (
    <svg viewBox="0 0 24 24" style={{...iconStyle, width: '24px', height: '24px'}}>
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);

export const ExternalLinkIcon: React.FC = () => (
    <svg viewBox="0 0 24 24" style={{...iconStyle, width: '18px', height: '18px'}}>
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
        <polyline points="15 3 21 3 21 9"></polyline>
        <line x1="10" y1="14" x2="21" y2="3"></line>
    </svg>
);

export const CodeIcon: React.FC = () => (
    <svg viewBox="0 0 24 24" style={{...iconStyle, width: '18px', height: '18px'}}>
        <polyline points="16 18 22 12 16 6"></polyline>
        <polyline points="8 6 2 12 8 18"></polyline>
    </svg>
);

export const MailIcon: React.FC = () => (
    <svg viewBox="0 0 24 24" style={iconStyle}>
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
        <polyline points="22,6 12,13 2,6"></polyline>
    </svg>
);

export const LinkedinIcon: React.FC = () => (
    <svg viewBox="0 0 24 24" style={iconStyle}>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
        <rect x="2" y="9" width="4" height="12"></rect>
        <circle cx="4" cy="4" r="2"></circle>
    </svg>
);

export const GithubIcon: React.FC = () => (
    <svg viewBox="0 0 24 24" style={iconStyle}>
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
    </svg>
);

export const CopyIcon: React.FC = () => (
    <svg viewBox="0 0 24 24" style={iconStyle}>
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
    </svg>
);