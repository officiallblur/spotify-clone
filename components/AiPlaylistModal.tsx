
import React, { useState } from 'react';
import type { Playlist } from '../types';
import { generatePlaylist } from '../services/geminiService';

interface AiPlaylistModalProps {
    onClose: () => void;
    onPlaylistCreated: (playlist: Playlist) => void;
}

const AiPlaylistModal: React.FC<AiPlaylistModalProps> = ({ onClose, onPlaylistCreated }) => {
    const [prompt, setPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    const examplePrompts = [
        "Upbeat indie pop for a morning boost",
        "Late night coding session with lofi beats",
        "90s rock anthems for a road trip",
        "Acoustic covers for a rainy afternoon",
        "High-energy electronic for a workout",
        "Classic jazz for a dinner party",
    ];

    const moodsAndGenres = [
        "Happy", "Sad", "Energetic", "Relaxing",
        "Pop", "Rock", "Hip-Hop", "Electronic",
        "Indie", "Classical", "Jazz", "Folk"
    ];

    const handleGenerate = async () => {
        if (!prompt.trim()) {
            setError('Please enter a prompt.');
            return;
        }
        setIsLoading(true);
        setError(null);
        try {
            const newPlaylist = await generatePlaylist(prompt);
            onPlaylistCreated(newPlaylist);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleMoodClick = (mood: string) => {
        setPrompt(prev => {
            if (!prev.trim()) return mood;
            if (prev.trim().endsWith(',')) {
                return `${prev.trim()} ${mood}`;
            }
            return `${prev.trim()}, ${mood}`;
        });
    };

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-[#282828] text-white rounded-xl shadow-lg w-full max-w-lg p-6 md:p-8 relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-[#b3b3b3] hover:text-white">&times;</button>
                <h2 className="text-2xl font-bold mb-4">Create Playlist with AI</h2>
                <p className="text-[#b3b3b3] mb-6">Describe the vibe, mood, or genre you're looking for, and Gemini will craft a playlist for you.</p>

                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="e.g., An epic playlist for conquering a dragon..."
                    className="w-full h-24 bg-[#333] border border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#1DB954] resize-none"
                    disabled={isLoading}
                />

                <div className="my-4">
                    <p className="text-sm text-[#b3b3b3] mb-2">Or try an example:</p>
                    <div className="flex flex-wrap gap-2">
                        {examplePrompts.map(p => (
                            <button key={p} onClick={() => setPrompt(p)} disabled={isLoading} className="bg-[#404040] hover:bg-[#535353] text-xs text-white rounded-full px-3 py-1 transition-colors">
                                {p}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="my-4">
                    <p className="text-sm text-[#b3b3b3] mb-2">Refine with a genre or mood:</p>
                    <div className="flex flex-wrap gap-2">
                        {moodsAndGenres.map(m => (
                            <button key={m} onClick={() => handleMoodClick(m)} disabled={isLoading} className="bg-[#404040] hover:bg-[#535353] text-xs text-white rounded-full px-3 py-1 transition-colors">
                                + {m}
                            </button>
                        ))}
                    </div>
                </div>

                {error && <p className="text-red-400 text-sm mt-4">{error}</p>}

                <div className="mt-8 flex justify-end">
                    <button
                        onClick={handleGenerate}
                        disabled={isLoading}
                        className="bg-[#1DB954] text-black font-bold py-3 px-8 rounded-full hover:scale-105 transition-transform disabled:bg-gray-500 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                        {isLoading ? (
                           <>
                           <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                           </svg>
                           Generating...
                           </>
                        ) : 'Generate'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AiPlaylistModal;