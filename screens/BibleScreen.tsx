import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { ChevronLeftIcon, CopyIcon, XMarkIcon } from '../components/icons';
import { teluguBibleData } from '../data/teluguBible';
import type { BibleBook } from '../types';

interface BibleScreenProps {
    initialLocation: { bookName: string; chapterIndex: number } | null;
    clearInitialLocation: () => void;
}

const VerseActionModal: React.FC<{ verseText: string; verseRef: string; onClose: () => void }> = ({ verseText, verseRef, onClose }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(`${verseText} - ${verseRef}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative animate-slide-up-fast" onClick={(e) => e.stopPropagation()}>
                <p className="text-slate-800 text-lg leading-relaxed font-telugu mb-4">"{verseText}"</p>
                <p className="text-right text-sky-600 font-semibold mb-6">- {verseRef}</p>
                <button
                    onClick={handleCopy}
                    className="w-full flex items-center justify-center bg-sky-600 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:bg-sky-700 transition-colors"
                >
                    <CopyIcon className="w-5 h-5 mr-2"/>
                    {copied ? 'Copied!' : 'Copy Verse'}
                </button>
                 <button onClick={onClose} className="absolute top-2 right-2 text-slate-400 hover:text-slate-800 p-2 rounded-full">
                    <XMarkIcon className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};


const BibleScreen: React.FC<BibleScreenProps> = ({ initialLocation, clearInitialLocation }) => {
    const [view, setView] = useState<'book' | 'chapter' | 'content'>('book');
    const [selectedBook, setSelectedBook] = useState<BibleBook | null>(null);
    const [selectedChapter, setSelectedChapter] = useState<number | null>(null);
    const [activeTestament, setActiveTestament] = useState<'OT' | 'NT'>('OT');
    const [selectedVerseInfo, setSelectedVerseInfo] = useState<{ text: string; ref: string } | null>(null);

    useEffect(() => {
        if (initialLocation) {
            const allBooks = [...teluguBibleData.oldTestament, ...teluguBibleData.newTestament];
            const book = allBooks.find(b => b.name === initialLocation.bookName);
            if (book) {
                setSelectedBook(book);
                setSelectedChapter(initialLocation.chapterIndex);
                setView('content');
            }
            clearInitialLocation();
        }
    }, [initialLocation, clearInitialLocation]);

    const handleBookSelect = (book: BibleBook) => {
        setSelectedBook(book);
        setView('chapter');
    };

    const handleChapterSelect = (chapterIndex: number) => {
        setSelectedChapter(chapterIndex);
        setView('content');
    };

    const handleBack = () => {
        if (view === 'content') {
            setSelectedChapter(null);
            setView('chapter');
        } else if (view === 'chapter') {
            setSelectedBook(null);
            setView('book');
        }
    };

    const handleVerseClick = (verse: string, book: BibleBook, chapterIdx: number) => {
        const parts = verse.split('.');
        const verseNum = parts[0];
        const verseText = parts.slice(1).join('.').trim();
        setSelectedVerseInfo({
            text: verseText,
            ref: `${book.name} ${chapterIdx + 1}:${verseNum}`
        });
    };
    
    const booksToShow = activeTestament === 'OT' ? teluguBibleData.oldTestament : teluguBibleData.newTestament;
    
    const renderHeader = () => {
        let title = "పవిత్ర బైబిల్";
        let showBack = false;

        if (view === 'chapter' && selectedBook) {
            title = selectedBook.name;
            showBack = true;
        } else if (view === 'content' && selectedBook && selectedChapter !== null) {
            title = `${selectedBook.name} ${selectedChapter + 1}`;
            showBack = true;
        }

        return (
            <Header title={title}>
                {showBack && (
                     <button onClick={handleBack} className="absolute left-2 p-2 text-slate-600 hover:text-sky-600">
                        <ChevronLeftIcon className="w-6 h-6" />
                    </button>
                )}
            </Header>
        );
    }
    
    const renderContent = () => {
        switch (view) {
            case 'book':
                return (
                    <>
                        <div className="flex border-b border-slate-200 sticky top-[65px] bg-white z-[5]">
                            <button
                                onClick={() => setActiveTestament('OT')}
                                className={`flex-1 p-3 text-center font-bold font-telugu transition-colors duration-200 ${activeTestament === 'OT' ? 'border-b-4 border-sky-600 text-sky-600' : 'text-slate-500 hover:bg-slate-50'}`}
                            >
                                పాత నిబంధన
                            </button>
                            <button
                                onClick={() => setActiveTestament('NT')}
                                className={`flex-1 p-3 text-center font-bold font-telugu transition-colors duration-200 ${activeTestament === 'NT' ? 'border-b-4 border-sky-600 text-sky-600' : 'text-slate-500 hover:bg-slate-50'}`}
                            >
                                క్రొత్త నిబంధన
                            </button>
                        </div>
                        <div className="p-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
                           {booksToShow.map(book => (
                             <button
                                key={book.name} 
                                onClick={() => handleBookSelect(book)} 
                                className="p-4 bg-white border border-slate-200 rounded-lg shadow-sm text-center font-telugu font-semibold text-slate-700 hover:bg-sky-50 hover:border-sky-300 cursor-pointer active:bg-sky-100 transition-all duration-200"
                             >
                                {book.name}
                            </button>
                           ))}
                        </div>
                    </>
                );
            case 'chapter':
                if (!selectedBook) return null;
                return (
                    <div className="p-4 grid grid-cols-5 sm:grid-cols-8 gap-3">
                       {selectedBook.chapters.map((_, index) => (
                         <button
                            key={index}
                            onClick={() => handleChapterSelect(index)}
                            className="aspect-square flex items-center justify-center bg-white border border-slate-200 rounded-lg shadow-sm cursor-pointer hover:bg-sky-500 hover:text-white hover:scale-105 transition-all duration-200 font-bold text-slate-700 active:bg-sky-600"
                          >
                           {index + 1}
                         </button>
                       ))}
                    </div>
                );
            case 'content':
                if (!selectedBook || selectedChapter === null) return null;
                const chapterContent = selectedBook.chapters[selectedChapter];
                return (
                    <div className="p-4 space-y-1">
                        {chapterContent.map((verse, index) => {
                             const parts = verse.split('.');
                             const verseNum = parts[0];
                             const verseText = parts.slice(1).join('.').trim();
                             return (
                                <div key={index} onClick={() => handleVerseClick(verse, selectedBook!, selectedChapter)} className="p-2 rounded-md hover:bg-sky-100 cursor-pointer">
                                    <p className="text-slate-800 text-lg leading-relaxed font-telugu">
                                        <span className="font-bold text-sky-700 pr-2 select-none">{verseNum}</span>
                                        {verseText}
                                    </p>
                                </div>
                             );
                        })}
                    </div>
                );
        }
    };

    return (
        <div className="h-full flex flex-col bg-slate-50">
           {renderHeader()}
            <div className="flex-grow overflow-y-auto pb-20">
              {renderContent()}
            </div>
            {selectedVerseInfo && <VerseActionModal verseText={selectedVerseInfo.text} verseRef={selectedVerseInfo.ref} onClose={() => setSelectedVerseInfo(null)} />}
        </div>
    );
};

export default BibleScreen;