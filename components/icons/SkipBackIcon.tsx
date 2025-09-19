import React from 'react';

const SkipBackIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg 
        role="img" 
        height="32" 
        width="32" 
        aria-hidden="true" 
        viewBox="0 0 24 24" 
        fill="currentColor"
        {...props}
    >
        <path d="M17.5 4.5H16V19.5H17.5V4.5ZM7.71 11.29L14.41 4.59L15.12 5.29L8.41 12L15.12 18.71L14.41 19.41L7.71 12.71C7.52 12.52 7.52 12.2 7.71 11.29V11.29Z"></path>
    </svg>
);

export default SkipBackIcon;