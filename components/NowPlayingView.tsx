import React, { useContext, useState, useMemo } from 'react';
import type { Album, Song } from '../types';
import { PlayerContext } from '../contexts/PlayerContext';
import ChevronDownIcon from './icons/ChevronDownIcon';
import MoreHorizontalIcon from './icons/MoreHorizontalIcon';
import HeartIcon from './icons/HeartIcon';
import ShuffleIcon from './icons/ShuffleIcon';
import SkipBackIcon from './icons/SkipBackIcon';
import PlayIcon from './icons/PlayIcon';
import PauseIcon from './icons/PauseIcon';
import SkipForwardIcon from './icons/SkipForwardIcon';
import RepeatIcon from './icons/RepeatIcon';
import BluetoothIcon from './icons/BluetoothIcon';
import ShareIcon from './icons/ShareIcon';
import QueueIcon from './icons/QueueIcon';
import ExpandIcon from './icons/ExpandIcon';

interface NowPlayingViewProps {
    albums: Album[];
    onClose: () => void;
}

const formatTime = (seconds: number): string => {
    if (isNaN(seconds)) return '0:00';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const NowPlayingView: React.FC<NowPlayingViewProps> = ({ albums, onClose }) => {
    const {
        currentSong,
        isPlaying,
        togglePlay,
        playNext,
        playPrevious,
        isShuffle,
        toggleShuffle,
        isRepeat,
        toggleRepeat,
        currentTime,
        duration,
        seek,
    } = useContext(PlayerContext);
    
    const [lyricsExpanded, setLyricsExpanded] = useState(false);

    const dominantColor = useMemo(() => {
        if (!currentSong) return '#1f1f1f';
        const album = albums.find(a => a.name === currentSong.album);
        return album?.dominantColor || '#1f1f1f';
    }, [currentSong, albums]);

    if (!currentSong) return null;

    if (lyricsExpanded) {
        return (
            <div 
                className="fixed inset-0 z-50 flex flex-col p-4 md:p-6 text-black transition-colors duration-500"
                style={{
                    background: `linear-gradient(to bottom, #FBBF24 0%, #D97706 100%)`,
                }}
            >
                <header className="flex items-center justify-between flex-shrink-0 mb-4">
                     <div className="flex items-center gap-4">
                        <img src={currentSong.albumCover} alt={currentSong.title} className="w-12 h-12 rounded-md shadow-md" />
                        <div>
                            <p className="font-bold text-lg">{currentSong.title}</p>
                            <p className="text-sm text-black/80">{currentSong.artist}</p>
                        </div>
                     </div>
                    <button 
                        onClick={() => setLyricsExpanded(false)}
                        className="flex items-center gap-2 text-xs font-bold bg-black/20 hover:bg-black/40 rounded-full p-2 text-white"
                        aria-label="Close lyrics view"
                    >
                       <ExpandIcon className="rotate-180" />
                    </button>
                </header>
                <main className="flex-grow overflow-y-auto text-center lyrics-container">
                    <p className="text-3xl font-bold leading-loose whitespace-pre-line p-4 md:p-8">
                        {currentSong.lyrics && currentSong.lyrics.trim() 
                            ? currentSong.lyrics.replace(/\\n/g, '\n') 
                            : "No lyrics available for this song."}
                    </p>
                </main>
            </div>
        );
    }


    return (
        <div 
            className="fixed inset-0 z-50 flex flex-col p-4 md:p-6 text-white transition-colors duration-500"
            style={{
                background: `linear-gradient(to bottom, ${dominantColor} 0%, #121212 80%)`,
            }}
        >
            <header className="flex items-center justify-between flex-shrink-0">
                <button onClick={onClose} aria-label="Close now playing view"><ChevronDownIcon /></button>
                <span className="font-semibold text-sm">{currentSong.album}</span>
                <button aria-label="More options"><MoreHorizontalIcon /></button>
            </header>

            <main className="flex-grow flex flex-col justify-center items-center gap-8 py-8 min-h-0">
                <img src={currentSong.albumCover} alt={currentSong.title} className="w-full max-w-xs aspect-square rounded-lg shadow-2xl" />

                <div className="w-full max-w-md">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold truncate">{currentSong.title}</h2>
                            <p className="text-lg text-white/70">{currentSong.artist}</p>
                        </div>
                        <button aria-label="Like song"><HeartIcon className="w-6 h-6" /></button>
                    </div>

                    <div className="mt-4">
                        <input
                            type="range"
                            min="0"
                            max={duration || 1}
                            value={currentTime}
                            onChange={(e) => seek(Number(e.target.value))}
                            className="progress-slider w-full"
                        />
                        <div className="flex justify-between text-xs text-white/70 mt-1">
                            <span>{formatTime(currentTime)}</span>
                            <span>-{formatTime(duration - currentTime)}</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                        <button onClick={toggleShuffle} aria-label="Shuffle" className={isShuffle ? 'text-[#1DB954]' : 'text-white/70 hover:text-white'}><ShuffleIcon /></button>
                        <button onClick={playPrevious} aria-label="Previous song"><SkipBackIcon /></button>
                        <button onClick={togglePlay} className="bg-white text-black rounded-full p-4" aria-label={isPlaying ? 'Pause' : 'Play'}>
                            {isPlaying ? <PauseIcon className="w-8 h-8"/> : <PlayIcon className="w-8 h-8"/>}
                        </button>
                        <button onClick={playNext} aria-label="Next song"><SkipForwardIcon /></button>
                        <button onClick={toggleRepeat} aria-label="Repeat" className={isRepeat ? 'text-[#1DB954]' : 'text-white/70 hover:text-white'}><RepeatIcon /></button>
                    </div>

                    <div className="flex items-center justify-between mt-8 text-white/70">
                        <div className="flex items-center gap-2 text-green-400">
                             <BluetoothIcon className="w-4 h-4" />
                            <span className="text-xs font-bold">BEATSPILL+</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <button className="hover:text-white" aria-label="Share"><ShareIcon /></button>
                            <button className="hover:text-white" aria-label="Queue"><QueueIcon className="w-5 h-5"/></button>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="flex-shrink-0">
                 <div 
                    className="rounded-lg bg-[#D97706]/90 cursor-pointer"
                    onClick={() => setLyricsExpanded(true)}
                    aria-label="Open lyrics"
                    role="button"
                >
                    <div className="flex items-center justify-between p-4">
                        <h3 className="font-bold text-lg">Lyrics</h3>
                        <div className="flex items-center gap-2 text-xs font-bold bg-black/20 rounded-full px-3 py-1 pointer-events-none">
                            MORE <ExpandIcon />
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default NowPlayingView;