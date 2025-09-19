import React from 'react';

const ExpandIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg 
        role="img" 
        height="16" 
        width="16" 
        aria-hidden="true" 
        viewBox="0 0 24 24" 
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <path d="M15 3h6v6"></path>
        <path d="M9 21H3v-6"></path>
        <path d="M21 3l-7 7"></path>
        <path d="M3 21l7-7"></path>
    </svg>
);

export default ExpandIcon;