import React from 'react';

const PlusIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg 
        role="img" 
        height="16" 
        width="16" 
        aria-hidden="true" 
        viewBox="0 0 16 16" 
        fill="currentColor" 
        {...props}
    >
        <path d="M14 7H9V2H7v5H2v2h5v5h2V9h5z"></path>
    </svg>
);

export default PlusIcon;