import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import type { Playlist, Song, View, Album } from './types';
import { mockPlaylists, mockAlbums } from './data/mockData';
import Sidebar from './components/Sidebar';
import MainView from './components/MainView';
import Player from './components/Player';
import { PlayerContext } from './contexts/PlayerContext';
import AiPlaylistModal from './components/AiPlaylistModal';
import BottomNav from './components/BottomNav';
import NowPlayingView from './components/NowPlayingView';

const App: React.FC = () => {
    const [playlists, setPlaylists] = useState<Playlist[]>(mockPlaylists);
    const [albums, setAlbums] = useState<Album[]>(mockAlbums);
    const [historyStack, setHistoryStack] = useState<View[]>([{ type: 'home' }]);
    const [historyIndex, setHistoryIndex] = useState(0);
    const [currentSong, setCurrentSong] = useState<Song | null>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [currentContext, setCurrentContext] = useState<{ type: 'playlist' | 'album', id: string } | null>(null);
    const [isShuffle, setIsShuffle] = useState<boolean>(false);
    const [isRepeat, setIsRepeat] = useState<boolean>(false);
    const [volume, setVolume] = useState<number>(0.75);
    const [recentlyPlayed, setRecentlyPlayed] = useState<(Song | Playlist | Album)[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [songQueue, setSongQueue] = useState<Song[]>([]);
    const [isNowPlayingOpen, setIsNowPlayingOpen] = useState<boolean>(false);

    const audioRef = useRef<HTMLAudioElement>(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const currentView = historyStack[historyIndex];
    const canGoBack = historyIndex > 0;
    const canGoForward = historyIndex < historyStack.length - 1;

    const navigateTo = useCallback((view: View) => {
        const currentView = historyStack[historyIndex];
        if (JSON.stringify(view) === JSON.stringify(currentView)) return;

        const newHistory = historyStack.slice(0, historyIndex + 1);
        newHistory.push(view);
        setHistoryStack(newHistory);
        setHistoryIndex(newHistory.length - 1);
    }, [historyStack, historyIndex]);
    
    const goBack = useCallback(() => {
      if (canGoBack) {
        setHistoryIndex(i => i - 1);
      }
    }, [canGoBack]);

    const goForward = useCallback(() => {
      if (canGoForward) {
        setHistoryIndex(i => i - 1);
      }
    }, [canGoForward]);

    const clearQueue = () => setSongQueue([]);

    const playSong = useCallback((song: Song, context?: { type: 'playlist' | 'album', id: string }) => {
        const isNewContext = currentSong?.id !== song.id;

        setCurrentSong(song);
        setIsPlaying(true);

        if (isNewContext) {
            clearQueue();
        }

        let songContext = context;
        if (!songContext) {
            const foundPlaylist = playlists.find(p => p.songs.some(s => s.id === song.id));
            if (foundPlaylist) {
                songContext = { type: 'playlist', id: foundPlaylist.id };
            } else {
                const foundAlbum = albums.find(a => a.songs.some(s => s.id === song.id));
                if(foundAlbum) {
                    songContext = { type: 'album', id: foundAlbum.id };
                }
            }
        }
        if (songContext) {
            setCurrentContext(songContext);
        }

        setRecentlyPlayed(prev => {
             let itemToAdd: Song | Playlist | Album | undefined;
            if (context) {
                if(context.type === 'playlist') {
                    itemToAdd = playlists.find(p => p.id === context.id)
                } else {
                    itemToAdd = albums.find(a => a.id === context.id);
                }
            } else {
                itemToAdd = song;
            }

            if (!itemToAdd) return prev;

            const filtered = prev.filter(item => item.id !== itemToAdd.id);
            return [itemToAdd, ...filtered].slice(0, 5);
        });
    }, [playlists, albums, currentSong]);

    const togglePlay = useCallback(() => {
        if (currentSong) {
            setIsPlaying(prev => !prev);
        }
    }, [currentSong]);
    
    const toggleShuffle = useCallback(() => setIsShuffle(prev => !prev), []);
    const toggleRepeat = useCallback(() => setIsRepeat(prev => !prev), []);

    const playNext = useCallback(() => {
        if (songQueue.length > 0) {
            const nextSong = songQueue[0];
            setSongQueue(prev => prev.slice(1));
            playSong(nextSong);
            return;
        }

        if (!currentSong || !currentContext) return;

        let songList: Song[] = [];
        if (currentContext.type === 'playlist') {
            songList = playlists.find(p => p.id === currentContext.id)?.songs || [];
        } else {
            songList = albums.find(a => a.id === currentContext.id)?.songs || [];
        }
        
        if (songList.length === 0) return;

        const currentIndex = songList.findIndex(s => s.id === currentSong.id);

        if (isShuffle) {
            let nextIndex;
            do {
                nextIndex = Math.floor(Math.random() * songList.length);
            } while (songList.length > 1 && nextIndex === currentIndex);
            playSong(songList[nextIndex], currentContext);
            return;
        }

        const nextIndex = currentIndex + 1;
        if (nextIndex < songList.length) {
            playSong(songList[nextIndex], currentContext);
        } else if (isRepeat) {
            playSong(songList[0], currentContext);
        } else {
            setIsPlaying(false);
        }
    }, [currentSong, currentContext, playlists, albums, playSong, isShuffle, isRepeat, songQueue]);

    const playPrevious = useCallback(() => {
        if (!currentSong || !currentContext) return;

        let songList: Song[] = [];
        if (currentContext.type === 'playlist') {
            songList = playlists.find(p => p.id === currentContext.id)?.songs || [];
        } else {
            songList = albums.find(a => a.id === currentContext.id)?.songs || [];
        }
        
        if (songList.length === 0) return;
        
        const currentIndex = songList.findIndex(s => s.id === currentSong.id);

        if (isShuffle) {
            playNext();
            return;
        }

        const prevIndex = currentIndex - 1;
        if (prevIndex >= 0) {
            playSong(songList[prevIndex], currentContext);
        } else if (isRepeat) {
            playSong(songList[songList.length - 1]);
        }
    }, [currentSong, currentContext, playlists, albums, playSong, isShuffle, isRepeat, playNext]);


    const addPlaylist = (playlist: Playlist) => {
        setPlaylists(prev => [playlist, ...prev]);
        navigateTo({type: 'playlist', id: playlist.id});
        setIsModalOpen(false);
    };

    const addToQueue = useCallback((song: Song) => {
        setSongQueue(prev => [...prev, song]);
    }, []);

    const removeFromQueue = useCallback((songId: string) => {
        setSongQueue(prev => prev.filter(song => song.id !== songId));
    }, []);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;
        const playWhenReady = async () => {
            try {
                await audio.play();
            } catch (error) {
                if (error.name !== 'AbortError') console.error("Audio playback failed:", error);
            }
        };
        if (isPlaying && currentSong) {
            if (audio.src !== currentSong.url) {
                audio.src = currentSong.url;
                audio.load();
                audio.addEventListener('canplay', playWhenReady, { once: true });
            } else {
                 playWhenReady();
            }
        } else {
            audio.pause();
        }
         if (!currentSong) {
            audio.src = '';
        }
        return () => audio.removeEventListener('canplay', playWhenReady);
    }, [currentSong, isPlaying]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;
        const updateProgress = () => setCurrentTime(audio.currentTime);
        const setAudioDuration = () => setDuration(audio.duration);
        const handleSongEnd = () => playNext();
        audio.addEventListener('timeupdate', updateProgress);
        audio.addEventListener('loadedmetadata', setAudioDuration);
        audio.addEventListener('ended', handleSongEnd);
        return () => {
            audio.removeEventListener('timeupdate', updateProgress);
            audio.removeEventListener('loadedmetadata', setAudioDuration);
            audio.removeEventListener('ended', handleSongEnd);
        };
    }, [playNext]);

    useEffect(() => {
        if (audioRef.current) audioRef.current.volume = volume;
    }, [volume]);

    const seek = (time: number) => {
        if (audioRef.current) audioRef.current.currentTime = time;
    };


    const playerContextValue = useMemo(() => ({
        currentSong,
        isPlaying,
        playSong,
        togglePlay,
        currentContext,
        isShuffle,
        isRepeat,
        toggleShuffle,
        toggleRepeat,
        volume,
        setVolume,
        playNext,
        playPrevious,
        songQueue,
        addToQueue,
        removeFromQueue,
        currentTime,
        duration,
        seek,
    }), [currentSong, isPlaying, playSong, togglePlay, currentContext, isShuffle, isRepeat, toggleShuffle, toggleRepeat, volume, setVolume, playNext, playPrevious, songQueue, addToQueue, removeFromQueue, currentTime, duration]);

    return (
        <PlayerContext.Provider value={playerContextValue}>
            <audio ref={audioRef} />
            <div className="h-screen w-screen bg-black text-[#b3b3b3] p-2 pb-16 md:pb-2 flex flex-col gap-2">
                <div className="flex-grow flex gap-2 overflow-hidden">
                    <Sidebar 
                        playlists={playlists} 
                        onSelectView={navigateTo}
                        activeView={currentView}
                        onCreateAiPlaylist={() => setIsModalOpen(true)}
                    />
                    <MainView 
                        view={currentView} 
                        playlists={playlists}
                        albums={albums}
                        recentlyPlayed={recentlyPlayed}
                        onSelectView={navigateTo}
                        goBack={goBack}
                        goForward={goForward}
                        canGoBack={canGoBack}
                        canGoForward={canGoForward}
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        onCreateAiPlaylist={() => setIsModalOpen(true)}
                    />
                </div>
                <Player onOpenNowPlaying={() => setIsNowPlayingOpen(true)} />
                <BottomNav
                    onSelectView={navigateTo}
                    activeView={currentView}
                />
            </div>
            {isModalOpen && <AiPlaylistModal onClose={() => setIsModalOpen(false)} onPlaylistCreated={addPlaylist} />}
            {isNowPlayingOpen && <NowPlayingView albums={albums} onClose={() => setIsNowPlayingOpen(false)} />}
        </PlayerContext.Provider>
    );
};

export default App;