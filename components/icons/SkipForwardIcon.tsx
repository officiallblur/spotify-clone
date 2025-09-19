import React from 'react';

const SkipForwardIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg 
        role="img" 
        height="32" 
        width="32" 
        aria-hidden="true" 
        viewBox="0 0 24 24" 
        fill="currentColor"
        {...props}
    >
        <path d="M6.5 4.5H8V19.5H6.5V4.5ZM16.29 11.29L9.59 4.59L8.88 5.29L15.59 12L8.88 18.71L9.59 19.41L16.29 12.71C16.48 12.52 16.48 12.2 16.29 11.29V11.29Z"></path>
    </svg>
);

export default SkipForwardIcon;