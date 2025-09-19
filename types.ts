export interface Song {
    id: string;
    title: string;
    artist: string;
    album: string;
    duration: string;
    albumCover: string;
    url: string;
    lyrics?: string;
    artistAvatar?: string;
}

export interface Playlist {
    id:string;
    name: string;
    songs: Song[];
    owner: string;
    cover: string;
    description?: string;
    likes?: number;
    totalDuration?: string;
}

export interface Album {
    id: string;
    name: string;
    artist: string;
    artistAvatar: string;
    year: number;
    cover: string;
    songs: Song[];
    dominantColor?: string;
}

export type View = { type: 'home' } | { type: 'playlist'; id: string } | { type: 'album'; id: string } | {type: 'search'} | {type: 'library'};