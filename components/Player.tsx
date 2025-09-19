import React, { useContext } from 'react';
import { PlayerContext } from '../contexts/PlayerContext';
import PlayIcon from './icons/PlayIcon';
import PauseIcon from './icons/PauseIcon';
import BluetoothIcon from './icons/BluetoothIcon';

interface PlayerProps {
    onOpenNowPlaying: () => void;
}

const Player: React.FC<PlayerProps> = ({ onOpenNowPlaying }) => {
    const { 
        currentSong, 
        isPlaying, 
        togglePlay,
        currentTime,
        duration,
    } = useContext(PlayerContext);
    
    const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

    const handlePlayButtonClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        togglePlay();
    }

    return (
        <footer onClick={onOpenNowPlaying} className="h-20 flex-shrink-0 bg-[#3E1111] rounded-lg p-3 text-white flex items-center justify-between gap-4 relative overflow-hidden shadow-lg cursor-pointer">
            
            {/* Left section: Album Art & Info */}
            <div className="flex items-center gap-3 flex-1 min-w-0">
                {currentSong ? (
                    <>
                        <img src={currentSong.albumCover} alt={currentSong.title} className="w-12 h-12 rounded-md object-cover"/>
                        <div className="flex flex-col min-w-0">
                            <p className="font-semibold text-sm truncate text-white">
                                {currentSong.title} &bull; {currentSong.artist}
                            </p>
                            <div className="flex items-center gap-1.5 text-green-400">
                                <BluetoothIcon className="w-3.5 h-3.5" />
                                <span className="text-xs font-semibold">BEATSPILL+</span>
                            </div>
                        </div>
                    </>
                ) : (
                     <div className="w-12 h-12 bg-[#532e2e] rounded-md"></div>
                )}
            </div>

            {/* Right section: Controls */}
            <div className="flex items-center gap-4 pr-2">
                <BluetoothIcon className="w-5 h-5 text-green-400"/>
                <button 
                    onClick={handlePlayButtonClick} 
                    className="text-white disabled:opacity-30"
                    aria-label={isPlaying ? "Pause" : "Play"}
                    disabled={!currentSong}
                >
                    {isPlaying ? <PauseIcon className="w-8 h-8"/> : <PlayIcon className="w-8 h-8"/>}
                </button>
            </div>
            
            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 w-full h-[3px] bg-white/20">
                <div 
                    className="h-full bg-white" 
                    style={{ width: `${progressPercentage}%` }}
                ></div>
            </div>
        </footer>
    );
};

export default Player;