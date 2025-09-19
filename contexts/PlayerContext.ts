import { createContext } from 'react';
import type { Song } from '../types';

interface PlayerContextType {
    currentSong: Song | null;
    isPlaying: boolean;
    playSong: (song: Song, context?: { type: 'playlist' | 'album', id: string }) => void;
    togglePlay: () => void;
    currentContext: { type: 'playlist' | 'album', id: string } | null;
    isShuffle: boolean;
    isRepeat: boolean;
    toggleShuffle: () => void;
    toggleRepeat: () => void;
    volume: number;
    setVolume: (volume: number) => void;
    playNext: () => void;
    playPrevious: () => void;
    songQueue: Song[];
    addToQueue: (song: Song) => void;
    removeFromQueue: (songId: string) => void;
    currentTime: number;
    duration: number;
    seek: (time: number) => void;
}

export const PlayerContext = createContext<PlayerContextType>({
    currentSong: null,
    isPlaying: false,
    playSong: () => {},
    togglePlay: () => {},
    currentContext: null,
    isShuffle: false,
    isRepeat: false,
    toggleShuffle: () => {},
    toggleRepeat: () => {},
    volume: 1,
    setVolume: () => {},
    playNext: () => {},
    playPrevious: () => {},
    songQueue: [],
    addToQueue: () => {},
    removeFromQueue: () => {},
    currentTime: 0,
    duration: 0,
    seek: () => {},
});