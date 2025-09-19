import React from 'react';

const QueueIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg 
        role="img" 
        height="16" 
        width="16" 
        aria-hidden="true" 
        viewBox="0 0 16 16" 
        fill="currentColor" 
        {...props}
    >
        <path d="M15 15H1v-1.5h14V15zm0-4.5H1V9h14v1.5zm-14-7A2.5 2.5 0 0 1 3.5 1h9A2.5 2.5 0 0 1 15 3.5v2.5H1V3.5z"></path>
    </svg>
);

export default QueueIcon;