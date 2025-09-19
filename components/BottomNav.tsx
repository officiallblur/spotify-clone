import React from 'react';
import type { View } from '../types';
import HomeIcon from './icons/HomeIcon';
import SearchIcon from './icons/SearchIcon';
import LibraryIcon from './icons/LibraryIcon';

interface BottomNavProps {
    onSelectView: (view: View) => void;
    activeView: View;
}

const NavItem: React.FC<{
    icon: React.ReactNode;
    label: string;
    isActive: boolean;
    onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => (
    <button 
        onClick={onClick} 
        className={`flex flex-col items-center justify-center gap-1 w-full transition-colors duration-200 ${isActive ? 'text-white' : 'text-[#b3b3b3] hover:text-white'}`}
    >
        {icon}
        <span className="text-xs font-medium">{label}</span>
    </button>
);

const BottomNav: React.FC<BottomNavProps> = ({ onSelectView, activeView }) => {
    return (
        <nav className="fixed bottom-0 left-0 right-0 h-16 bg-black border-t border-white/10 md:hidden flex items-center justify-around z-30">
            <NavItem 
                icon={<HomeIcon isActive={activeView.type === 'home'} />} 
                label="Home" 
                isActive={activeView.type === 'home'} 
                onClick={() => onSelectView({ type: 'home' })} 
            />
            <NavItem 
                icon={<SearchIcon isActive={activeView.type === 'search'} />} 
                label="Search" 
                isActive={activeView.type === 'search'} 
                onClick={() => onSelectView({ type: 'search' })} 
            />
            <NavItem 
                icon={<LibraryIcon className="w-6 h-6"/>} 
                label="Library" 
                isActive={activeView.type === 'library'} 
                onClick={() => onSelectView({ type: 'library' })} 
            />
        </nav>
    );
};

export default BottomNav;
