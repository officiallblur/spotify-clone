import React from 'react';

const BluetoothIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg
        role="img"
        height="16"
        width="16"
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <polyline points="6.5 6.5 17.5 17.5 12 23 12 1 17.5 6.5 6.5 17.5"></polyline>
    </svg>
);

export default BluetoothIcon;