import React, { useState, useEffect } from 'react';
import { getRandomVerse } from '../services/geminiService'; // geminiService is now bibleService
import { ChevronRightIcon } from '../components/icons';
import type { AppBook, DailyVerse } from '../types';

const books: AppBook[] = [
    {id: 1, title: 'పరలోక మర్మాలు', author: 'Brother Amos Agafe'},
    {id: 2, title: 'నరకం', author: 'Brother Amos Agafe'},
    {id: 3, title: 'పరలోకం', author: 'Brother Amos Agafe'},
];

interface HomeScreenProps {
  navigateToChapter: (bookName: string, chapterIndex: number) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigateToChapter }) => {
  const [verse, setVerse] = useState<DailyVerse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    const fetchedVerse = getRandomVerse();
    setVerse(fetchedVerse);
    setLoading(false);
  }, []);

  return (
    <div className="min-h-full bg-slate-100">
      <div className="relative h-56 bg-gradient-to-br from-sky-600 to-sky-800 flex flex-col justify-end p-6 text-white shadow-lg">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10">
          <h1 className="text-3xl font-bold font-telugu">CLC Ministry</h1>
          <p className="text-sky-200">Christ Love Comfort</p>
        </div>
      </div>

      <div className="p-4 space-y-6 pb-20">
        <section>
          <h2 className="text-lg font-bold text-slate-700 mb-2 font-telugu">రోజు వాక్యం</h2>
          <div className="bg-white rounded-xl shadow-md p-5 border border-slate-200">
            {loading || !verse ? (
              <div className="animate-pulse flex flex-col space-y-3">
                <div className="h-4 bg-slate-200 rounded w-full"></div>
                <div className="h-4 bg-slate-200 rounded w-5/6"></div>
                <div className="h-4 bg-slate-200 rounded w-1/3 self-end mt-2"></div>
              </div>
            ) : (
              <>
                <p className="text-slate-800 text-lg leading-relaxed font-telugu italic">"{verse.text.trim()}"</p>
                <p className="text-right text-sky-600 font-semibold mt-3">- {verse.reference.trim()}</p>
                 <button 
                  onClick={() => navigateToChapter(verse.bookName, verse.chapterIndex)}
                  className="w-full mt-4 bg-sky-100 text-sky-700 font-bold py-2 px-4 rounded-lg hover:bg-sky-200 transition-colors duration-200"
                >
                  Read Full Chapter
                </button>
              </>
            )}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-700 mb-2 font-telugu">పుస్తకాలు</h2>
            <div className="bg-white rounded-xl shadow-md border border-slate-200">
              <ul className="divide-y divide-slate-200">
                  {books.map(book => (
                    <li key={book.id} className="p-4 flex justify-between items-center hover:bg-slate-50 cursor-pointer">
                      <div>
                          <h3 className="font-semibold text-slate-800 font-telugu">{book.title}</h3>
                          <p className="text-sm text-slate-500">{book.author}</p>
                      </div>
                      <ChevronRightIcon className="text-slate-400" />
                  </li>
                  ))}
              </ul>
          </div>
        </section>
        
        <section>
          <h2 className="text-lg font-bold text-slate-700 mb-2 font-telugu">రాబోయే ఈవెంట్‌లు</h2>
          <div className="bg-white rounded-xl shadow-md p-5 border border-slate-200 space-y-4">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 text-center bg-sky-100 text-sky-700 rounded-lg px-3 py-1">
                <p className="font-bold text-xl">25</p>
                <p className="text-xs">DEC</p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-800">Christmas Service</h3>
                <p className="text-sm text-slate-500">10:00 AM - Main Hall</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 text-center bg-sky-100 text-sky-700 rounded-lg px-3 py-1">
                <p className="font-bold text-xl">31</p>
                <p className="text-xs">DEC</p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-800">Watch Night Service</h3>
                <p className="text-sm text-slate-500">10:30 PM - Main Hall</p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default HomeScreen;