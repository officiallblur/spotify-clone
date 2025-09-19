import React from 'react';

const EqualizerIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg 
        role="img" 
        height="16" 
        width="16" 
        aria-hidden="true" 
        viewBox="0 0 16 16"
        fill="currentColor"
        {...props}
    >
        <rect x="2" y="6" width="2.5" height="10" rx="1.25"></rect>
        <rect x="6.75" y="0" width="2.5" height="16" rx="1.25"></rect>
        <rect x="11.5" y="4" width="2.5" height="12" rx="1.25"></rect>
    </svg>
);

export default EqualizerIcon;