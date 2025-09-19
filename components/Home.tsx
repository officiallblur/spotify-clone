import React, { useContext } from 'react';
import type { Playlist, Song, Album, View } from '../types';
import PlayIcon from './icons/PlayIcon';
import PauseIcon from './icons/PauseIcon';
import { PlayerContext } from '../contexts/PlayerContext';

const isPlaylist = (item: Song | Playlist | Album): item is Playlist => {
    return (item as Playlist).owner !== undefined;
};

const isAlbum = (item: Song | Playlist | Album): item is Album => {
    return (item as Album).year !== undefined;
};

const ItemCard: React.FC<{ item: Playlist | Album | Song, onSelectView: (view: View) => void }> = ({ item, onSelectView }) => {
    const { playSong, togglePlay, currentSong, currentContext, isPlaying } = useContext(PlayerContext);
    
    const itemIsPlaylist = isPlaylist(item);
    const itemIsAlbum = isAlbum(item);

    const isThisItemPlaying = (() => {
        if (!isPlaying || !currentSong) return false;
        if (itemIsPlaylist) {
            return currentContext?.type === 'playlist' && currentContext?.id === item.id;
        }
        if (itemIsAlbum) {
            return currentContext?.type === 'album' && currentContext?.id === item.id;
        }
        return currentSong.id === item.id;
    })();

    const handlePlay = (e: React.MouseEvent) => {
        e.stopPropagation(); 
        if (isThisItemPlaying) {
            togglePlay();
        } else {
            if (itemIsPlaylist && item.songs.length > 0) {
                playSong(item.songs[0], { type: 'playlist', id: item.id });
            } else if (itemIsAlbum && item.songs.length > 0) {
                playSong(item.songs[0], { type: 'album', id: item.id });
            } else if (!itemIsPlaylist && !itemIsAlbum) {
                playSong(item as Song);
            }
        }
    };

    const handleNavigate = () => {
        if (itemIsPlaylist) {
            onSelectView({ type: 'playlist', id: item.id });
        } else if (itemIsAlbum) {
            onSelectView({ type: 'album', id: item.id });
        }
    };
    
    const cover = itemIsPlaylist || itemIsAlbum ? (item as Playlist | Album).cover : (item as Song).albumCover;
    const title = itemIsPlaylist || itemIsAlbum ? (item as Playlist | Album).name : (item as Song).title;
    const description = itemIsPlaylist ? `By ${(item as Playlist).owner}` : (item as Album | Song).artist;
    const canPlay = !itemIsPlaylist && !itemIsAlbum || (item as Playlist | Album).songs.length > 0;

    return (
        <div onClick={handleNavigate} className="bg-[#181818] hover:bg-[#282828] transition-all duration-300 p-4 rounded-lg group relative cursor-pointer">
            <img src={cover} alt={title} className="w-full h-auto rounded-md shadow-lg mb-4 object-cover aspect-square"/>
            <h3 className="font-bold text-white truncate">{title}</h3>
            <p className="text-sm text-[#b3b3b3]">{description}</p>
            {canPlay && (
                <div className="absolute bottom-24 right-6 opacity-0 group-hover:opacity-100 group-hover:bottom-28 transition-all duration-300">
                    <button 
                        onClick={handlePlay} 
                        className="bg-[#1DB954] text-black rounded-full p-4 shadow-xl flex items-center justify-center"
                        aria-label={isThisItemPlaying ? `Pause ${title}` : `Play ${title}`}
                    >
                        {isThisItemPlaying ? <PauseIcon className="w-6 h-6" /> : <PlayIcon className="w-6 h-6" />}
                    </button>
                </div>
            )}
        </div>
    );
};

interface HomeProps {
    playlists: Playlist[];
    albums: Album[];
    recentlyPlayed: (Song | Playlist | Album)[];
    onSelectView: (view: View) => void;
}

const Home: React.FC<HomeProps> = ({ playlists, albums, recentlyPlayed, onSelectView }) => {
    
    // Combine playlists and albums for display
    const madeForYouItems: (Playlist | Album)[] = [...playlists, ...albums];

    return (
        <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-6">Good Afternoon</h1>
            
            {recentlyPlayed.length > 0 && (
                <section className="mb-8">
                    <h2 className="text-xl md:text-2xl font-bold text-white mb-4">Recently Played</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                        {recentlyPlayed.map(item => <ItemCard key={`${isPlaylist(item) ? 'pl' : 'al'}-${item.id}`} item={item} onSelectView={onSelectView} />)}
                    </div>
                </section>
            )}

            <section>
                <h2 className="text-xl md:text-2xl font-bold text-white mb-4">Made For You</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                    {madeForYouItems.map(p => <ItemCard key={p.id} item={p} onSelectView={onSelectView}/>)}
                </div>
            </section>
        </div>
    );
};

export default Home;