import React, { useContext } from 'react';
import type { Song } from '../types';
import { PlayerContext } from '../contexts/PlayerContext';

interface QueueModalProps {
    onClose: () => void;
}

const QueueSongRow: React.FC<{ song: Song }> = ({ song }) => {
    const { removeFromQueue } = useContext(PlayerContext);
    return (
        <div className="group flex items-center justify-between p-2 rounded-md hover:bg-white/10">
            <div className="flex items-center gap-3">
                <img src={song.albumCover} alt={song.title} className="w-10 h-10 rounded-sm"/>
                <div>
                    <p className="text-white font-semibold truncate">{song.title}</p>
                    <p className="text-sm text-[#b3b3b3] truncate">{song.artist}</p>
                </div>
            </div>
            <button 
                onClick={() => removeFromQueue(song.id)} 
                className="text-[#b3b3b3] hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label={`Remove ${song.title} from queue`}
            >
                &times;
            </button>
        </div>
    );
};

const QueueModal: React.FC<QueueModalProps> = ({ onClose }) => {
    const { currentSong, songQueue } = useContext(PlayerContext);

    return (
        <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div 
                className="bg-[#282828] text-white rounded-xl shadow-lg w-full max-w-md flex flex-col relative"
                onClick={(e) => e.stopPropagation()}
            >
                <header className="p-4 border-b border-white/10 flex justify-between items-center">
                    <h2 className="text-xl font-bold">Queue</h2>
                    <button 
                        onClick={onClose} 
                        className="text-[#b3b3b3] hover:text-white text-2xl"
                        aria-label="Close queue"
                    >
                        &times;
                    </button>
                </header>

                <div className="p-4 space-y-4 max-h-[70vh] overflow-y-auto">
                    {currentSong && (
                        <section>
                            <h3 className="text-md font-semibold text-[#b3b3b3] mb-2">Now Playing</h3>
                            <div className="flex items-center gap-3 p-2 bg-white/5 rounded-md">
                                <img src={currentSong.albumCover} alt={currentSong.title} className="w-10 h-10 rounded-sm"/>
                                <div>
                                    <p className="text-[#1DB954] font-semibold truncate">{currentSong.title}</p>
                                    <p className="text-sm text-[#b3b3b3] truncate">{currentSong.artist}</p>
                                </div>
                            </div>
                        </section>
                    )}

                    <section>
                        <h3 className="text-md font-semibold text-[#b3b3b3] mb-2">Next Up</h3>
                        {songQueue.length > 0 ? (
                            <div className="space-y-1">
                                {songQueue.map(song => (
                                    <QueueSongRow key={`${song.id}-${Math.random()}`} song={song} />
                                ))}
                            </div>
                        ) : (
                            <p className="text-[#b3b3b3] text-sm text-center py-4">The queue is empty.</p>
                        )}
                    </section>
                </div>
            </div>
        </div>
    );
};

export default QueueModal;
