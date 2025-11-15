export type Screen = 'Home' | 'Bible' | 'Offerings' | 'Songs' | 'Testimonies';

export interface Song {
  id: number;
  title: string;
  artist: string;
  youtubeId: string;
  lyrics: string[];
}

export interface Testimony {
  id: number;
  title: string;
  author: string;
  story: string;
}

export interface AppBook {
  id: number;
  title: string;
  author: string;
  content: string[];
}

// FIX: Added missing Article interface used in MoreScreen.tsx
export interface Article {
  id: number;
  title: string;
  author: string;
  date: string;
}

export interface BibleBook {
  name: string;
  chapters: string[][];
}

export interface BibleData {
    oldTestament: BibleBook[];
    newTestament: BibleBook[];
}

export interface DailyVerse {
    text: string;
    reference: string;
    bookName: string;
    chapterIndex: number;
    verseIndex: number;
}