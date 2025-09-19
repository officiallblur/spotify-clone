import React from 'react';
import type { Playlist, View } from '../types';
import HomeIcon from './icons/HomeIcon';
import SearchIcon from './icons/SearchIcon';
import LibraryIcon from './icons/LibraryIcon';

interface SidebarProps {
    playlists: Playlist[];
    onSelectView: (view: View) => void;
    activeView: View;
    onCreateAiPlaylist: () => void;
}

const NavItem: React.FC<{
    icon: React.ReactNode;
    label: string;
    isActive: boolean;
    onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => (
    <button onClick={onClick} className={`flex items-center gap-4 text-sm font-bold transition-colors duration-200 ${isActive ? 'text-white' : 'text-[#b3b3b3] hover:text-white'}`}>
        {icon}
        <span>{label}</span>
    </button>
);

const Sidebar: React.FC<SidebarProps> = ({ playlists, onSelectView, activeView, onCreateAiPlaylist }) => {
    return (
        <aside className="w-[280px] flex-shrink-0 hidden md:flex flex-col gap-2">
            <div className="bg-[#121212] rounded-lg p-6 flex flex-col gap-5">
                <NavItem icon={<HomeIcon isActive={activeView.type === 'home'} />} label="Home" isActive={activeView.type === 'home'} onClick={() => onSelectView({ type: 'home' })} />
                <NavItem icon={<SearchIcon isActive={activeView.type === 'search'} />} label="Search" isActive={activeView.type === 'search'} onClick={() => onSelectView({ type: 'search' })} />
            </div>
            <div className="bg-[#121212] rounded-lg flex-grow flex flex-col">
                <div className="p-4 flex justify-between items-center">
                    <button onClick={() => onSelectView({ type: 'library' })} className="flex items-center gap-4 text-[#b3b3b3] hover:text-white transition-colors duration-200 font-bold text-sm">
                        <LibraryIcon className="w-6 h-6" />
                        <span>Your Library</span>
                    </button>
                    <button onClick={onCreateAiPlaylist} className="text-[#b3b3b3] hover:text-white transition-colors duration-200" title="Create playlist with AI">
                        <svg role="img" height="24" width="24" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
                           <path d="M12 4a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2h-6v6a1 1 0 1 1-2 0v-6H5a1 1 0 1 1 0-2h6V5a1 1 0 0 1 1-1z"></path>
                        </svg>
                    </button>
                </div>
                <div className="px-2 overflow-y-auto flex-grow">
                    {playlists.map(p => (
                        <button key={p.id} onClick={() => onSelectView({ type: 'playlist', id: p.id })} className={`w-full text-left flex items-center gap-3 p-2 rounded-md transition-colors duration-200 ${activeView.type === 'playlist' && activeView.id === p.id ? 'bg-[#282828]' : 'hover:bg-[#1a1a1a]'}`}>
                            <img src={p.cover} alt={p.name} className="w-12 h-12 rounded-md object-cover"/>
                            <div>
                                <p className="text-white font-semibold text-sm truncate">{p.name}</p>
                                <p className="text-xs text-[#b3b3b3]">{p.owner}</p>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
