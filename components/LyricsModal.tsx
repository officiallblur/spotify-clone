import React from 'react';
import type { Song } from '../types';

interface LyricsModalProps {
    song: Song | null;
    onClose: () => void;
}

const LyricsModal: React.FC<LyricsModalProps> = ({ song, onClose }) => {
    if (!song) return null;

    const formattedLyrics = song.lyrics?.replace(/\\n/g, '\n').split('\n').map((line, index) => (
        <React.Fragment key={index}>
            {line}
            <br />
        </React.Fragment>
    ));

    return (
        <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div 
                className="bg-gradient-to-br from-[#303030] to-[#181818] text-white rounded-xl shadow-2xl w-full max-w-2xl h-[80vh] flex flex-col p-8 relative"
                onClick={(e) => e.stopPropagation()}
            >
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 text-[#b3b3b3] hover:text-white text-3xl font-bold"
                    aria-label="Close lyrics"
                >
                    &times;
                </button>
                <div className="flex items-center gap-6 mb-8 flex-shrink-0">
                    <img src={song.albumCover} alt={song.title} className="w-24 h-24 rounded-lg shadow-lg"/>
                    <div>
                        <h2 className="text-3xl font-bold">{song.title}</h2>
                        <p className="text-lg text-[#b3b3b3]">{song.artist}</p>
                    </div>
                </div>

                <div className="overflow-y-auto text-lg leading-relaxed text-[#b3b3b3] lyrics-container">
                    {song.lyrics && song.lyrics.trim() ? (
                        <p>{formattedLyrics}</p>
                    ) : (
                        <p className="text-center italic mt-10">No lyrics found for this song.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LyricsModal;
