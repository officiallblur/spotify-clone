
import { GoogleGenAI, Type } from "@google/genai";
import type { Song, Playlist } from '../types';
import { mockSongs } from '../data/mockData';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const generatePlaylist = async (prompt: string): Promise<Playlist> => {
    try {
        const model = 'gemini-2.5-flash';
        const response = await ai.models.generateContent({
            model,
            contents: `Generate a playlist based on this prompt: "${prompt}". Create a creative playlist name and a list of 10 songs with artist, album, duration, and lyrics. Use \\n for new lines in the lyrics.`,
            config: {
                responseMimeType: 'application/json',
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        playlistName: {
                            type: Type.STRING,
                            description: 'A creative name for the playlist, inspired by the prompt.',
                        },
                        songs: {
                            type: Type.ARRAY,
                            description: 'A list of 10 songs that fit the playlist description.',
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    title: { type: Type.STRING },
                                    artist: { type: Type.STRING },
                                    album: { type: Type.STRING },
                                    duration: { type: Type.STRING, description: 'Duration in M:SS format' },
                                    lyrics: { type: Type.STRING, description: "The full lyrics for the song. Use \\n for new lines." },
                                },
                            },
                        },
                    },
                },
            },
        });
        
        const jsonText = response.text.trim();
        const playlistData = JSON.parse(jsonText);

        const newSongs: Song[] = playlistData.songs.map((song: any, index: number) => ({
            id: `ai-${Date.now()}-${index}`,
            title: song.title,
            artist: song.artist,
            album: song.album,
            duration: song.duration,
            albumCover: `https://picsum.photos/seed/${encodeURIComponent(song.title)}/200`,
            url: mockSongs[index % mockSongs.length].url,
            lyrics: song.lyrics,
        }));

        const newPlaylist: Playlist = {
            id: `ai-pl-${Date.now()}`,
            name: playlistData.playlistName,
            songs: newSongs,
            owner: 'Gemini AI',
            cover: `https://picsum.photos/seed/${encodeURIComponent(playlistData.playlistName)}/300`,
        };
        
        return newPlaylist;

    } catch (error) {
        console.error("Error generating playlist with Gemini:", error);
        throw new Error("Failed to generate AI playlist. Please check your API key and try again.");
    }
};