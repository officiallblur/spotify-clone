
import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
    isActive?: boolean;
}

const SearchIcon: React.FC<IconProps> = ({ isActive, ...props }) => (
    <svg 
        role="img" 
        height="24" 
        width="24" 
        aria-hidden="true" 
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        {isActive && <path d="M10.28 3.22a7 7 0 0 0-7.28 7 7 7 0 0 0 7.28 7.02 7 7 0 0 0 6.6-4.24"></path>}
        {isActive && <path d="M17.07 17.07l-2.07-2.07"></path>}
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
);

export default SearchIcon;
