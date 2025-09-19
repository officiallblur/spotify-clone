
import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
    isActive?: boolean;
}

const HomeIcon: React.FC<IconProps> = ({ isActive, ...props }) => (
    <svg 
        role="img" 
        height="24" 
        width="24" 
        aria-hidden="true" 
        viewBox="0 0 24 24" 
        fill={isActive ? 'currentColor' : 'none'} 
        stroke="currentColor" 
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        {isActive ? <path d="M13.5 1.515a3 3 0 0 0-3 0L3 5.845a2 2 0 0 0-1 1.732V21a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6h4v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V7.577a2 2 0 0 0-1-1.732l-7.5-4.33Z"></path> : <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>}
        {!isActive && <polyline points="9 22 9 12 15 12 15 22"></polyline>}
    </svg>
);

export default HomeIcon;
