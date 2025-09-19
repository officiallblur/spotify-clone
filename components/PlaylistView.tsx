import React, { useContext, useState, useMemo, useEffect, useCallback } from 'react';
import type { Playlist, Song } from '../types';
import { PlayerContext } from '../contexts/PlayerContext';
import PlayIcon from './icons/PlayIcon';
import PauseIcon from './icons/PauseIcon';
import HeartIcon from './icons/HeartIcon';
import DownloadIcon from './icons/DownloadIcon';
import MoreHorizontalIcon from './icons/MoreHorizontalIcon';
import SpotifyIcon from './icons/SpotifyIcon';

const SongRow: React.FC<{ song: Song; playlistId: string; }> = ({ song, playlistId }) => {
    const { currentSong, isPlaying, playSong, togglePlay } = useContext(PlayerContext);
    const isActive = currentSong?.id === song.id;

    const handlePlayClick = () => {
        if (isActive) {
            togglePlay();
        } else {
            playSong(song, { type: 'playlist', id: playlistId });
        }
    };

    return (
        <div 
            className="group flex items-center justify-between p-2 rounded-md hover:bg-white/10 transition-colors cursor-pointer"
            onDoubleClick={handlePlayClick}
        >
            <div className="flex items-center gap-3 flex-1 min-w-0">
                <img src={song.albumCover} alt={song.title} className="w-10 h-10 rounded-sm object-cover"/>
                <div className="flex-1 min-w-0">
                    <p className={`font-medium ${isActive ? 'text-[#1DB954]' : 'text-white'} truncate`}>{song.title}</p>
                    <p className="text-sm text-[#b3b3b3] group-hover:text-white truncate">{song.artist}</p>
                </div>
            </div>
            <button className="text-[#b3b3b3] hover:text-white opacity-0 group-hover:opacity-100 transition-opacity" aria-label={`More options for ${song.title}`}>
                <MoreHorizontalIcon className="w-5 h-5"/>
            </button>
        </div>
    );
};

const PlaylistView: React.FC<{ playlist: Playlist, setHeaderControls: (controls: React.ReactNode | null) => void; }> = ({ playlist, setHeaderControls }) => {
    const { playSong, togglePlay, isPlaying, currentContext } = useContext(PlayerContext);
    const [filter, setFilter] = useState('');
    const [sortBy, setSortBy] = useState('default'); // 'default', 'title', 'artist'

    const isPlaylistPlaying = currentContext?.type === 'playlist' && currentContext.id === playlist.id && isPlaying;

    const handlePlaylistPlay = () => {
        if (isPlaylistPlaying) {
            togglePlay();
        } else if (playlist.songs.length > 0) {
            playSong(playlist.songs[0], { type: 'playlist', id: playlist.id });
        }
    };

     const handleSortClick = useCallback(() => {
        setSortBy(current => {
            if (current === 'default') return 'title';
            if (current === 'title') return 'artist';
            return 'default';
        });
    }, []);

    const filteredAndSortedSongs = useMemo(() => {
        let songs = playlist.songs;
    
        if (filter.trim() !== '') {
            const lowerCaseFilter = filter.toLowerCase();
            songs = songs.filter(s => 
                s.title.toLowerCase().includes(lowerCaseFilter) || 
                s.artist.toLowerCase().includes(lowerCaseFilter)
            );
        }

        if (sortBy !== 'default') {
            songs = [...songs].sort((a, b) => {
                if (sortBy === 'title') return a.title.localeCompare(b.title);
                if (sortBy === 'artist') return a.artist.localeCompare(b.artist);
                return 0;
            });
        }

        return songs;
    }, [playlist.songs, filter, sortBy]);

    useEffect(() => {
        const controls = (
             <div className="flex items-center gap-4 flex-grow justify-end md:justify-start w-full">
                <div className="relative flex-grow max-w-xs hidden md:block">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg className="w-5 h-5 text-[#b3b3b3]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input 
                        type="search" 
                        placeholder="Find in playlist" 
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="block w-full p-2 pl-10 text-sm text-white border-transparent rounded-md bg-[#2a2a2a] focus:ring-[#1DB954] focus:border-[#1DB954]"
                    />
                </div>
                <button onClick={handleSortClick} className="p-2 text-sm bg-[#2a2a2a] rounded-md hover:bg-[#3e3e3e] flex-shrink-0">
                    Sort by: <span className="font-bold capitalize">{sortBy}</span>
                </button>
            </div>
        );
        setHeaderControls(controls);
        return () => setHeaderControls(null);
    }, [filter, sortBy, handleSortClick, setHeaderControls]);
    
    return (
        <div className="text-white">
            <header className="flex flex-col items-center text-center gap-6 mb-6">
                <div className="shadow-2xl">
                    <img src={playlist.cover} alt={playlist.name} className="w-48 h-48 md:w-56 md:h-56 object-cover"/>
                </div>
                <div className="flex flex-col gap-2 items-start w-full">
                    <h1 className="text-2xl md:text-3xl font-bold">{playlist.name}</h1>
                    {playlist.description && <p className="text-sm text-[#b3b3b3]">{playlist.description}</p>}
                    <div className="flex items-center gap-2 text-sm">
                        <SpotifyIcon className="w-5 h-5" />
                        <span className="font-bold">{playlist.owner}</span>
                    </div>
                    {playlist.likes && playlist.totalDuration && (
                         <p className="text-xs text-[#b3b3b3]">
                            {playlist.likes.toLocaleString()} likes • {playlist.songs.length} songs, about {playlist.totalDuration}
                        </p>
                    )}
                </div>
            </header>

            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-5 text-[#b3b3b3]">
                    <button className="hover:text-white" aria-label="Like playlist">
                        <HeartIcon className="w-7 h-7"/>
                    </button>
                    <button className="hover:text-white" aria-label="Download playlist">
                        <DownloadIcon className="w-7 h-7"/>
                    </button>
                    <button className="hover:text-white" aria-label="More options for playlist">
                        <MoreHorizontalIcon className="w-7 h-7"/>
                    </button>
                </div>
                <button 
                    onClick={handlePlaylistPlay}
                    className="bg-[#1DB954] text-black rounded-full p-4 shadow-xl hover:scale-105 transition-transform"
                    aria-label={isPlaylistPlaying ? `Pause ${playlist.name}` : `Play ${playlist.name}`}
                >
                    {isPlaylistPlaying ? <PauseIcon className="w-7 h-7" /> : <PlayIcon className="w-7 h-7" />}
                </button>
            </div>
            
            <div className="flex flex-col mt-4">
                 {filteredAndSortedSongs.length > 0 ? (
                    filteredAndSortedSongs.map((song) => (
                        <SongRow key={song.id} song={song} playlistId={playlist.id} />
                    ))
                ) : (
                    <p className="p-8 text-center text-[#b3b3b3]">
                        {filter ? `Couldn't find "${filter}"` : 'This playlist is empty.'}
                    </p>
                )}
            </div>
        </div>
    );
};

export default PlaylistView;