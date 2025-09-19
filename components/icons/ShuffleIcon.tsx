import React from 'react';

const ShuffleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg 
        role="img" 
        height="24" 
        width="24" 
        aria-hidden="true" 
        viewBox="0 0 24 24" 
        fill="currentColor"
        {...props}
    >
        <path d="M14.588 6.429 19 2l-1.061 4.243L14.588 6.43zM5 2l1.061 4.243L9.412 6.43 5 2zm.439 8.842 12.122 12.122.94-.94-12.122-12.122-.94.94zM19 22l-4.429-4.588L18.17 14l-3.582 3.588L19 22zM5 22l4.429-4.588L5.83 14l3.582 3.588L5 22zM5 13.561l-1.061-4.243L5 5.105l-1.061-4.243L5 5.105V2l-.94.94L5 2v11.561z"></path>
    </svg>
);

export default ShuffleIcon;