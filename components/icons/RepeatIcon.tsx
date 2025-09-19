import React from 'react';

const RepeatIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg 
        role="img" 
        height="24" 
        width="24" 
        aria-hidden="true" 
        viewBox="0 0 24 24" 
        fill="currentColor"
        {...props}
    >
        <path d="M19.435 7.333H2.565v2.916h16.87v-2.916zm-16.87 5.834h16.87v2.916H2.565v-2.916zM22 3.5v17h-2.917v-4.375H5.482v4.375H2.565V3.5h2.917v4.375h13.5V3.5H22z"></path>
    </svg>
);

export default RepeatIcon;