import React from 'react';

const ChevronDownIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg 
        role="img" 
        height="24" 
        width="24" 
        aria-hidden="true" 
        viewBox="0 0 24 24" 
        fill="currentColor"
        {...props}
    >
        <path d="M16 10l-4 4-4-4"></path>
    </svg>
);

export default ChevronDownIcon;