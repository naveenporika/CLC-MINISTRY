import React, { useState } from 'react';
import Header from '../components/Header';
import { XMarkIcon, YouTubeIcon } from '../components/icons';
import type { Song } from '../types';

const songs: Song[] = [
  { 
    id: 1, 
    title: 'యెహోవా నా కాపరి', 
    artist: 'Hosanna Ministries', 
    youtubeId: 'v3gB1e1e9jI', 
    lyrics: [
      'యెహోవా నా కాపరి నాకు లేమి కలుగదు',
      'పచ్చికగల చోట్ల నన్ను పరుండజేయును',
      'శాంతికరమైన జలముల యొద్ద నన్ను నడిపించును',
      'నా ప్రాణమునకు ఆయన సేదదీర్చుచున్నాడు',
      'నీతి మార్గములలో నన్ను నడిపించుచున్నాడు'
    ]
  },
  { 
    id: 2, 
    title: 'నీవే నా సంతోషగానము', 
    artist: 'Bro. Yesanna', 
    youtubeId: 'dQw4w9WgXcQ',
    lyrics: [
      'నీవే నా సంతోషగానము - రక్షణ శృంగము',
      'బలశూరుడా నా యేసయ్యా - నా తోడు నీవయ్యా',
      'అ.ప: ఆపదలో నాకు అండవు నీవే',
      'ఆనందగానము చేయుచు నిన్నే',
      'ఆరాధించి కీర్తించెదను'
    ]
  },
  { 
    id: 3, 
    title: 'నా ప్రాణమా యెహోవాను', 
    artist: 'S.P. Balasubrahmanyam', 
    youtubeId: 'dQw4w9WgXcQ',
    lyrics: [
      'నా ప్రాణమా, యెహోవాను సన్నుతించుము.',
      'నా అంతరంగమా, ఆయన పరిశుద్ధ నామమును సన్నుతించుము.',
      'నా ప్రాణమా, యెహోవాను సన్నుతించుము;',
      'ఆయన చేసిన ఉపకారములలో దేనిని మరువకుము.'
    ]
  },
  { 
    id: 4, 
    title: 'స్తోత్రం యేసు స్తోత్రం', 
    artist: 'K.S. Chithra', 
    youtubeId: 'dQw4w9WgXcQ',
    lyrics: [
      'స్తోత్రం యేసు స్తోత్రం - హల్లెలూయా స్తోత్రం',
      'నిన్నే నే కొనియాడెదను నా యేసయ్యా',
      'నీ మేలులన్ తలంచుచు నే పాడెదను',
      'హల్లెలూయా ఆమెన్'
    ]
  },
];

const PlayIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.648c1.295.742 1.295 2.545 0 3.286L7.279 20.99c-1.25.717-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
    </svg>
);

const SongLyricsModal: React.FC<{ song: Song; onClose: () => void }> = ({ song, onClose }) => (
    <div className="fixed inset-0 bg-slate-50 z-50 flex flex-col animate-slide-up">
        <header className="sticky top-0 bg-white/80 backdrop-blur-lg z-10 shadow-sm">
            <div className="flex items-center justify-between p-4 border-b border-slate-200">
                <div className="flex-1 min-w-0">
                    <h2 className="text-lg font-bold text-sky-800 font-telugu truncate">{song.title}</h2>
                    <p className="text-sm text-slate-500 truncate">{song.artist}</p>
                </div>
                 <a
                    href={`https://www.youtube.com/watch?v=${song.youtubeId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-red-600 text-white font-bold p-2 rounded-full shadow-md hover:bg-red-700 transition-colors flex items-center space-x-2 ml-2"
                    aria-label="Watch on YouTube"
                  >
                    <YouTubeIcon />
                  </a>
                <button 
                  onClick={onClose} 
                  className="text-slate-600 p-2 rounded-full hover:bg-slate-200 transition-colors ml-2"
                  aria-label="Close"
                >
                  <XMarkIcon />
                </button>
            </div>
        </header>

        <div className="flex-grow overflow-y-auto p-6">
            <div className="space-y-3">
                {song.lyrics.map((line, index) => (
                    <p key={index} className="text-slate-700 text-xl leading-relaxed font-telugu">{line}</p>
                ))}
            </div>
        </div>
    </div>
);


const SongsScreen: React.FC = () => {
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);

  return (
    <div className="h-full flex flex-col bg-slate-100">
      <Header title="ఆరాధన పాటలు" />
      <div className="flex-grow overflow-y-auto p-4 space-y-3 pb-20">
        {songs.map((song) => (
          <div
            key={song.id}
            onClick={() => setSelectedSong(song)}
            className="block bg-white p-4 rounded-lg shadow-sm border border-slate-200 hover:shadow-md hover:border-sky-300 transition-all duration-200 cursor-pointer"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-bold text-slate-800 font-telugu">{song.title}</h3>
                <p className="text-sm text-slate-500">{song.artist}</p>
              </div>
              <div className="text-sky-500">
                <PlayIcon />
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedSong && <SongLyricsModal song={selectedSong} onClose={() => setSelectedSong(null)} />}
    </div>
  );
};

export default SongsScreen;