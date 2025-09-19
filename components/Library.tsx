import React from 'react';
import type { Playlist } from '../types';

const Library: React.FC<{ playlists: Playlist[]; onCreateAiPlaylist: () => void; }> = ({ playlists, onCreateAiPlaylist }) => {
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl md:text-3xl font-extrabold text-white">Your Library</h1>
                <button onClick={onCreateAiPlaylist} className="text-[#b3b3b3] hover:text-white transition-colors duration-200" title="Create playlist with AI">
                    <svg role="img" height="28" width="28" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 4a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2h-6v6a1 1 0 1 1-2 0v-6H5a1 1 0 1 1 0-2h6V5a1 1 0 0 1 1-1z"></path>
                        <path fillRule="evenodd" clipRule="evenodd" d="M20.925 10.35a.75.75 0 0 1-.295.66l-2.4 1.6a.75.75 0 0 0 0 1.32l2.4 1.6a.75.75 0 0 1 .295.66l.4 2.7a.75.75 0 0 1-1.07.785l-2.6-1a.75.75 0 0 0-.84 0l-2.6 1a.75.75 0 0 1-1.07-.785l.4-2.7a.75.75 0 0 1 .295-.66l2.4-1.6a.75.75 0 0 0 0-1.32l-2.4-1.6a.75.75 0 0 1-.295-.66l-.4-2.7a.75.75 0 0 1 1.07-.785l2.6 1a.75.75 0 0 0 .84 0l2.6-1a.75.75 0 0 1 1.07.785l-.4 2.7z" fill="#1DB954"></path>
                    </svg>
                </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                {playlists.map(playlist => (
                    <div key={playlist.id} className="bg-[#181818] p-4 rounded-lg cursor-pointer">
                        <img src={playlist.cover} alt={playlist.name} className="w-full h-auto rounded-md shadow-lg mb-4 aspect-square object-cover"/>
                        <h3 className="font-bold text-white truncate">{playlist.name}</h3>
                        <p className="text-sm text-[#b3b3b3]">By {playlist.owner}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Library;
