import React, { useState, useEffect, useContext } from 'react';
import { mockSongs } from '../data/mockData';
import type { Song } from '../types';
import { PlayerContext } from '../contexts/PlayerContext';
import PlayIcon from './icons/PlayIcon';
import PauseIcon from './icons/PauseIcon';
import ClockIcon from './icons/ClockIcon';
import PlusIcon from './icons/PlusIcon';

interface SearchProps {
    query: string;
    setQuery: (query: string) => void;
}

const SearchResultRow: React.FC<{ song: Song; index: number }> = ({ song, index }) => {
    const { currentSong, isPlaying, playSong, togglePlay, addToQueue } = useContext(PlayerContext);
    const isActive = currentSong?.id === song.id;

    const handlePlayClick = () => {
        if (isActive) {
            togglePlay();
        } else {
            playSong(song);
        }
    };

    return (
        <tr className="group hover:bg-white/10 rounded-lg transition-colors" onDoubleClick={handlePlayClick}>
            <td className="p-3 text-center text-[#b3b3b3] group-hover:text-white relative">
                <span className="group-hover:hidden">{index + 1}</span>
                <button onClick={handlePlayClick} className="hidden group-hover:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white">
                    {isActive && isPlaying ? <PauseIcon className="w-4 h-4" /> : <PlayIcon className="w-4 h-4" />}
                </button>
            </td>
            <td className="p-3 flex items-center gap-3">
                <img src={song.albumCover} alt={song.title} className="w-10 h-10 rounded-sm"/>
                <div className="flex flex-col">
                    <p className={`font-semibold ${isActive ? 'text-[#1DB954]' : 'text-white'} truncate`}>{song.title}</p>
                    <p className="text-sm text-[#b3b3b3] group-hover:text-white truncate">{song.artist}</p>
                </div>
            </td>
            <td className="p-3 hidden md:table-cell truncate">{song.album}</td>
            <td className="p-3 text-right">
                <div className="flex items-center justify-end gap-4">
                    <button 
                        onClick={() => addToQueue(song)} 
                        className="text-white opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Add to queue"
                        aria-label="Add to queue"
                    >
                        <PlusIcon className="w-4 h-4" />
                    </button>
                    <span>{song.duration}</span>
                </div>
            </td>
        </tr>
    );
};

const GenreCard: React.FC<{ title: string; color: string; image?: string, hasAlbumArt?: boolean }> = ({ title, color, image, hasAlbumArt }) => (
    <div style={{ backgroundColor: color }} className="relative aspect-square rounded-lg p-4 overflow-hidden">
        <h3 className="text-white font-extrabold text-2xl break-words">{title}</h3>
        <div className="absolute w-24 h-24 right-[-1.25rem] bottom-0 transform rotate-[25deg]">
            {image ? (
                <img src={image} alt={title} className="w-full h-full object-cover shadow-xl rounded-md"/>
            ) : hasAlbumArt ? (
                <div className="bg-black w-full h-full shadow-xl flex items-end p-2 rounded-md">
                    <p className="text-white font-bold text-2xl">Album</p>
                </div>
            ) : null}
        </div>
    </div>
);

const genres = [
    { title: 'Pop', color: '#8c19a3', image: 'https://tse2.mm.bing.net/th/id/OIP.EJ91XfLVUTjSqGsDs05MJwHaEo?r=0&rs=1&pid=ImgDetMain&o=7&rm=3' },
    { title: 'Indie', color: '#8d6725', hasAlbumArt: true },
];
const podcastCategories = [
    { title: 'News & Politics', color: '#274896', hasAlbumArt: true },
    { title: 'Comedy', color: '#c4421b', hasAlbumArt: true },
];
const browseAll = [
    { title: '2021 Wrapped', color: '#b4c758', hasAlbumArt: true },
    { title: 'Podcasts', color: '#263484', hasAlbumArt: true },
    { title: 'Made for you', color: '#68a558', hasAlbumArt: true },
    { title: 'Charts', color: '#7454a5', hasAlbumArt: true },
];

const Search: React.FC<SearchProps> = ({ query, setQuery }) => {
    const [results, setResults] = useState<Song[]>([]);

    useEffect(() => {
        if (query.trim() === '') {
            setResults([]);
            return;
        }

        const searchResults = mockSongs.filter(song => 
            song.title.toLowerCase().includes(query.toLowerCase()) ||
            song.artist.toLowerCase().includes(query.toLowerCase()) ||
            song.album.toLowerCase().includes(query.toLowerCase())
        );
        setResults(searchResults);
    }, [query]);

    if (query) {
        return (
            <div>
                 <div className="relative mb-6">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-black">
                        <svg role="img" height="24" width="24" aria-hidden="true" viewBox="0 0 16 16" fill="currentColor"><path d="M7 1a6 6 0 1 0 0 12A6 6 0 0 0 7 1zM.805 7a6.195 6.195 0 0 1 6.195-6.195A6.195 6.195 0 0 1 13.195 7 6.195 6.195 0 0 1 7 13.195A6.195 6.195 0 0 1 .805 7z"></path><path d="M15.226 13.822 12.41 11.006a.75.75 0 1 0-1.06 1.06l2.816 2.816a.75.75 0 0 0 1.06-1.06z"></path></svg>
                    </div>
                    <input
                        type="text"
                        placeholder="Artists, songs, or podcasts"
                        className="w-full bg-white text-black font-semibold placeholder-neutral-600 border-none rounded-md py-3 pl-12 pr-4 focus:outline-none text-base"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        aria-label="Search for artists, songs, or podcasts"
                    />
                </div>
                {results.length > 0 ? (
                    <table className="w-full text-left table-auto">
                        <tbody>
                            {results.map((song, i) => (
                                <SearchResultRow key={song.id} song={song} index={i} />
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="text-center p-8 mt-8">
                        <h3 className="text-2xl font-bold text-white">No results found for "{query}"</h3>
                        <p className="text-[#b3b3b3] mt-2">Please make sure your words are spelled correctly, or use fewer or different keywords.</p>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-extrabold text-white">Search</h1>
                <button className="text-white" aria-label="Search with camera">
                    <svg role="img" height="24" width="24" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 8.25a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5zM4.5 4.5A3 3 0 0 0 1.5 7.5v9A3 3 0 0 0 4.5 19.5h15a3 3 0 0 0 3-3v-9a3 3 0 0 0-3-3h-1.586a1.5 1.5 0 0 1-1.06-.44L15.44 2.64A1.5 1.5 0 0 0 14.38 2H9.62a1.5 1.5 0 0 0-1.06.44L7.146 4.06A1.5 1.5 0 0 1 6.086 4.5H4.5zm0 1.5h1.586l1.414-1.414A.75.75 0 0 1 8.025 4h7.95a.75.75 0 0 1 .53.22l1.414 1.414H19.5a1.5 1.5 0 0 1 1.5 1.5v9a1.5 1.5 0 0 1-1.5-1.5h-15a1.5 1.5 0 0 1-1.5-1.5v-9A1.5 1.5 0 0 1 4.5 6z"></path>
                    </svg>
                </button>
            </div>

            <div className="relative mb-6">
                 <div className="absolute left-4 top-1/2 -translate-y-1/2 text-black">
                    <svg role="img" height="24" width="24" aria-hidden="true" viewBox="0 0 16 16" fill="currentColor"><path d="M7 1a6 6 0 1 0 0 12A6 6 0 0 0 7 1zM.805 7a6.195 6.195 0 0 1 6.195-6.195A6.195 6.195 0 0 1 13.195 7 6.195 6.195 0 0 1 7 13.195A6.195 6.195 0 0 1 .805 7z"></path><path d="M15.226 13.822 12.41 11.006a.75.75 0 1 0-1.06 1.06l2.816 2.816a.75.75 0 0 0 1.06-1.06z"></path></svg>
                </div>
                <input
                    type="text"
                    placeholder="Artists, songs, or podcasts"
                    className="w-full bg-white text-black font-semibold placeholder-neutral-600 border-none rounded-md py-3 pl-12 pr-4 focus:outline-none text-base"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    aria-label="Search for artists, songs, or podcasts"
                />
            </div>

            <section className="mb-6">
                <h2 className="text-lg font-bold text-white mb-3">Your top genres</h2>
                <div className="grid grid-cols-2 gap-4">
                    {genres.map(g => <GenreCard key={g.title} {...g} />)}
                </div>
            </section>
            
            <section className="mb-6">
                <h2 className="text-lg font-bold text-white mb-3">Popular podcast categories</h2>
                <div className="grid grid-cols-2 gap-4">
                     {podcastCategories.map(p => <GenreCard key={p.title} {...p} />)}
                </div>
            </section>
            
            <section className="mb-6">
                <h2 className="text-lg font-bold text-white mb-3">Browse all</h2>
                <div className="grid grid-cols-2 gap-4">
                    {browseAll.map(b => <GenreCard key={b.title} {...b} />)}
                </div>
            </section>
        </div>
    );
};

export default Search;