import React from 'react';

const DownloadedIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg 
        role="img" 
        height="16" 
        width="16" 
        aria-hidden="true" 
        viewBox="0 0 16 16" 
        fill="currentColor" 
        {...props}
    >
        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM7 4.75a.75.75 0 0 1 1.5 0V9.06l1.22-1.22a.75.75 0 1 1 1.06 1.06l-2.5 2.5a.75.75 0 0 1-1.06 0l-2.5-2.5a.75.75 0 0 1 1.06-1.06L7 9.06V4.75z"></path>
    </svg>
);

export default DownloadedIcon;