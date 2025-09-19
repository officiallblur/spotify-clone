import React from 'react';

const ShareIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg 
        role="img" 
        height="20" 
        width="20" 
        aria-hidden="true" 
        viewBox="0 0 24 24" 
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
        <polyline points="16 6 12 2 8 6"></polyline>
        <line x1="12" y1="2" x2="12" y2="15"></line>
    </svg>
);

export default ShareIcon;