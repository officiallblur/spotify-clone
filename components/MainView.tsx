import React, { useState, useEffect } from 'react';
import type { Playlist, View, Song, Album } from '../types';
import Home from './Home';
import PlaylistView from './PlaylistView';
import Search from './Search';
import Library from './Library';
import AlbumView from './AlbumView';

interface MainViewProps {
    view: View;
    playlists: Playlist[];
    albums: Album[];
    recentlyPlayed: (Song | Playlist | Album)[];
    onSelectView: (view: View) => void;
    goBack: () => void;
    goForward: () => void;
    canGoBack: boolean;
    canGoForward: boolean;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    onCreateAiPlaylist: () => void;
}

const NavButton: React.FC<{ onClick: () => void, disabled: boolean, 'aria-label': string, children: React.ReactNode }> = ({ onClick, disabled, 'aria-label': ariaLabel, children }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        aria-label={ariaLabel}
        className="bg-black/40 rounded-full p-1.5 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-black/70 transition-colors"
    >
        {children}
    </button>
);


const MainView: React.FC<MainViewProps> = ({ view, playlists, albums, recentlyPlayed, onSelectView, goBack, goForward, canGoBack, canGoForward, searchQuery, setSearchQuery, onCreateAiPlaylist }) => {
    const [headerControls, setHeaderControls] = useState<React.ReactNode | null>(null);
    
    const albumForColor = view.type === 'album' ? albums.find(a => a.id === view.id) : null;
    const dominantColor = albumForColor?.dominantColor;

    useEffect(() => {
        if (view.type !== 'playlist') {
            setHeaderControls(null);
        }
    }, [view]);

    const renderContent = () => {
        switch (view.type) {
            case 'home':
                return <Home playlists={playlists} albums={albums} recentlyPlayed={recentlyPlayed} onSelectView={onSelectView} />;
            case 'playlist':
                const playlist = playlists.find(p => p.id === view.id);
                return playlist ? <PlaylistView playlist={playlist} setHeaderControls={setHeaderControls} /> : <div>Playlist not found</div>;
            case 'album':
                const album = albums.find(a => a.id === view.id);
                return album ? <AlbumView album={album} /> : <div>Album not found</div>;
            case 'search':
                return <Search query={searchQuery} setQuery={setSearchQuery} />;
            case 'library':
                return <Library playlists={playlists} onCreateAiPlaylist={onCreateAiPlaylist} />;
            default:
                return <Home playlists={playlists} albums={albums} recentlyPlayed={recentlyPlayed} onSelectView={onSelectView}/>;
        }
    };
    
    return (
        <main className="bg-[#121212] rounded-lg flex-grow overflow-y-auto relative">
           <div 
                className="absolute top-0 left-0 w-full h-96 transition-colors duration-500 z-0"
                style={{
                    background: dominantColor 
                        ? `linear-gradient(to bottom, ${dominantColor} 0%, #121212 100%)`
                        : 'linear-gradient(to bottom, #1f1f1f 0%, #121212 100%)',
                    opacity: 0.5,
                }}
            ></div>
           
           <header className={`sticky top-0 z-20 p-4 ${dominantColor ? 'bg-transparent' : 'bg-black/20 backdrop-blur-sm'} flex items-center gap-4 transition-colors duration-300`}>
                <div className="flex items-center gap-2">
                    <NavButton onClick={goBack} disabled={!canGoBack} aria-label="Go back">
                        <svg role="img" height="22" width="22" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor"><path d="M15 18l-6-6 6-6"></path></svg>
                    </NavButton>
                     <NavButton onClick={goForward} disabled={!canGoForward} aria-label="Go forward">
                        <svg role="img" height="22" width="22" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor"><path d="M9 18l6-6-6-6"></path></svg>
                    </NavButton>
                </div>
                {headerControls}
           </header>
           
           <div className="relative z-10 px-4 md:px-6 pb-40 md:pb-28">
                {renderContent()}
           </div>
        </main>
    );
};

export default MainView;