import React, { useContext } from 'react';
import type { Album, Song } from '../types';
import { PlayerContext } from '../contexts/PlayerContext';
import PlayIcon from './icons/PlayIcon';
import PauseIcon from './icons/PauseIcon';
import HeartIcon from './icons/HeartIcon';
import DownloadIcon from './icons/DownloadIcon';
import MoreHorizontalIcon from './icons/MoreHorizontalIcon';
import EqualizerIcon from './icons/EqualizerIcon';
import DownloadedIcon from './icons/DownloadedIcon';

const SongRow: React.FC<{ song: Song; albumId: string; }> = ({ song, albumId }) => {
    const { currentSong, isPlaying, playSong, togglePlay } = useContext(PlayerContext);
    const isActive = currentSong?.id === song.id;

    const handlePlayClick = () => {
        if (isActive) {
            togglePlay();
        } else {
            playSong(song, { type: 'album', id: albumId });
        }
    };

    return (
        <div 
            className="group flex items-center justify-between p-2 rounded-md hover:bg-white/10 transition-colors cursor-pointer"
            onDoubleClick={handlePlayClick}
        >
            <div className="flex-1 min-w-0">
                <p className={`truncate ${isActive ? 'text-[#1DB954]' : 'text-white'}`}>{song.title}</p>
                <div className="flex items-center gap-2 text-sm text-[#b3b3b3]">
                    { isPlaying && isActive && <EqualizerIcon className="w-4 h-4 text-[#1DB954]" /> }
                    <DownloadedIcon className="w-4 h-4 text-[#1DB954]" />
                    <span className="truncate">{song.artist}</span>
                </div>
            </div>
            <button className="text-[#b3b3b3] hover:text-white opacity-0 group-hover:opacity-100 transition-opacity" aria-label={`More options for ${song.title}`}>
                <MoreHorizontalIcon className="w-5 h-5"/>
            </button>
        </div>
    );
};

const AlbumView: React.FC<{ album: Album }> = ({ album }) => {
    const { playSong, togglePlay, isPlaying, currentContext } = useContext(PlayerContext);

    const isAlbumPlaying = currentContext?.type === 'album' && currentContext?.id === album.id && isPlaying;

    const handleAlbumPlay = () => {
        if (isAlbumPlaying) {
            togglePlay();
        } else if (album.songs.length > 0) {
            playSong(album.songs[0], { type: 'album', id: album.id });
        }
    };
    
    return (
        <div className="text-white">
            <header className="flex flex-col items-center text-center gap-4 mb-6">
                <div className="shadow-2xl">
                    <img src={album.cover} alt={album.name} className="w-48 h-48 object-cover"/>
                </div>
                <div className="flex flex-col gap-2 w-full items-start">
                    <h1 className="text-2xl font-bold">{album.name}</h1>
                    <div className="flex items-center gap-2 text-sm font-semibold">
                        <img src={album.artistAvatar} alt={album.artist} className="w-6 h-6 rounded-full" />
                        <span>{album.artist}</span>
                    </div>
                    <p className="text-xs text-[#b3b3b3]">Album • {album.year}</p>
                </div>
            </header>

            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-5 text-[#b3b3b3]">
                    <button className="hover:text-white" aria-label="Like album">
                        <HeartIcon className="w-6 h-6"/>
                    </button>
                    <button className="hover:text-white" aria-label="Download album">
                        <DownloadIcon className="w-6 h-6"/>
                    </button>
                    <button className="hover:text-white" aria-label="More options for album">
                        <MoreHorizontalIcon className="w-6 h-6"/>
                    </button>
                </div>
                <button 
                    onClick={handleAlbumPlay}
                    className="bg-[#1DB954] text-black rounded-full p-4 shadow-xl hover:scale-105 transition-transform"
                    aria-label={isAlbumPlaying ? `Pause ${album.name}` : `Play ${album.name}`}
                >
                    {isAlbumPlaying ? <PauseIcon className="w-7 h-7" /> : <PlayIcon className="w-7 h-7" />}
                </button>
            </div>

            <div className="flex flex-col">
                 {album.songs.length > 0 ? (
                    album.songs.map((song) => (
                        <SongRow key={song.id} song={song} albumId={album.id} />
                    ))
                ) : (
                    <p className="p-8 text-center text-[#b3b3b3]">This album has no songs.</p>
                )}
            </div>
        </div>
    );
};

export default AlbumView;
