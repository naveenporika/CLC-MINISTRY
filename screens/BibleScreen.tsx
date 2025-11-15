
import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import { ChevronLeftIcon, CopyIcon, XMarkIcon, ChevronRightIcon, SearchIcon } from '../components/icons';
import { teluguBibleData } from '../data/teluguBible';
import type { BibleBook } from '../types';

interface BibleScreenProps {
    initialLocation: { bookName: string; chapterIndex: number } | null;
    clearInitialLocation: () => void;
}

interface SearchResult {
    bookName: string;
    chapterIndex: number;
    verseIndex: number;
    verseText: string;
}

interface HistoryItem {
  bookName: string;
  chapterIndex: number;
}

const HISTORY_KEY = 'clcBibleHistory';
const MAX_HISTORY_ITEMS = 10;

const getHistory = (): HistoryItem[] => {
  try {
    const storedHistory = localStorage.getItem(HISTORY_KEY);
    return storedHistory ? JSON.parse(storedHistory) : [];
  } catch (error) {
    console.error("Failed to parse history from localStorage", error);
    return [];
  }
};

const addToHistory = (bookName: string, chapterIndex: number): HistoryItem[] => {
  const currentHistory = getHistory();
  const filteredHistory = currentHistory.filter(
    item => !(item.bookName === bookName && item.chapterIndex === chapterIndex)
  );
  const newHistory = [{ bookName, chapterIndex }, ...filteredHistory];
  const trimmedHistory = newHistory.slice(0, MAX_HISTORY_ITEMS);
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(trimmedHistory));
  } catch (error) {
    console.error("Failed to save history to localStorage", error);
  }
  return trimmedHistory;
};


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

const Highlight: React.FC<{text: string, highlight: string}> = ({ text, highlight }) => {
    if (!highlight.trim()) {
        return <>{text}</>;
    }
    const regex = new RegExp(`(${highlight})`, 'gi');
    const parts = text.split(regex);

    return (
        <>
            {parts.map((part, i) =>
                part.toLowerCase() === highlight.toLowerCase() ? (
                    <strong key={i} className="bg-yellow-200">
                        {part}
                    </strong>
                ) : (
                    part
                )
            )}
        </>
    );
};

const BibleScreen: React.FC<BibleScreenProps> = ({ initialLocation, clearInitialLocation }) => {
    const [view, setView] = useState<'book' | 'chapter' | 'content' | 'search'>('book');
    const [selectedBook, setSelectedBook] = useState<BibleBook | null>(null);
    const [selectedChapter, setSelectedChapter] = useState<number | null>(null);
    const [selectedVerseInfo, setSelectedVerseInfo] = useState<{ text: string; ref: string } | null>(null);
    const [activeTab, setActiveTab] = useState<'old' | 'new'>('old');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const [history, setHistory] = useState<HistoryItem[]>(getHistory());
    const scrollContainerRef = useRef<HTMLDivElement>(null);

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
    
    useEffect(() => {
        if (view === 'content' && selectedBook && selectedChapter !== null) {
            const updatedHistory = addToHistory(selectedBook.name, selectedChapter);
            setHistory(updatedHistory);
            if (scrollContainerRef.current) {
                scrollContainerRef.current.scrollTop = 0;
            }
        }
    }, [view, selectedBook, selectedChapter]);


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
        } else if (view === 'search') {
            setSearchResults([]);
            setSearchQuery('');
            setView('book');
        }
    };
    
    const handlePrevChapter = () => {
        if (selectedBook && selectedChapter !== null && selectedChapter > 0) {
            setSelectedChapter(selectedChapter - 1);
        }
    };

    const handleNextChapter = () => {
        if (selectedBook && selectedChapter !== null && selectedChapter < selectedBook.chapters.length - 1) {
            setSelectedChapter(selectedChapter + 1);
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
    
    const handleSearch = () => {
        if (!searchQuery.trim()) return;
        const results: SearchResult[] = [];
        const allBooks = [...teluguBibleData.oldTestament, ...teluguBibleData.newTestament];

        allBooks.forEach(book => {
            book.chapters.forEach((chapter, chapterIndex) => {
                chapter.forEach((verse, verseIndex) => {
                    if (verse.toLowerCase().includes(searchQuery.toLowerCase())) {
                        results.push({
                            bookName: book.name,
                            chapterIndex: chapterIndex,
                            verseIndex: verseIndex,
                            verseText: verse,
                        });
                    }
                });
            });
        });

        setSearchResults(results);
        setView('search');
    };

    const renderHeader = () => {
        let title = "పవిత్ర బైబిల్";
        let showBack = false;

        if (view === 'chapter' && selectedBook) {
            title = selectedBook.name;
            showBack = true;
        } else if (view === 'content' && selectedBook && selectedChapter !== null) {
            title = `${selectedBook.name} ${selectedChapter + 1}`;
            showBack = true;
        } else if (view === 'search') {
            title = 'Search Results';
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
                const booksToShow = activeTab === 'old' ? teluguBibleData.oldTestament : teluguBibleData.newTestament;
                return (
                    <>
                        {history.length > 0 && (
                            <section className="p-4 bg-slate-100 border-b border-slate-200">
                                <h2 className="text-base font-bold text-slate-600 mb-2 font-telugu">చరిత్ర</h2>
                                <div className="flex overflow-x-auto space-x-2 pb-2 -mx-4 px-4 scrollbar-hide">
                                    {history.map((item, index) => (
                                        <button
                                            key={`${item.bookName}-${item.chapterIndex}-${index}`}
                                            onClick={() => {
                                                const allBooks = [...teluguBibleData.oldTestament, ...teluguBibleData.newTestament];
                                                const book = allBooks.find(b => b.name === item.bookName);
                                                if (book) {
                                                    setSelectedBook(book);
                                                    handleChapterSelect(item.chapterIndex);
                                                }
                                            }}
                                            className="flex-shrink-0 bg-white border border-slate-300 rounded-full px-4 py-2 text-sm font-semibold text-slate-700 font-telugu hover:bg-sky-50 hover:border-sky-400 transition-colors whitespace-nowrap"
                                        >
                                            {item.bookName} {item.chapterIndex + 1}
                                        </button>
                                    ))}
                                </div>
                            </section>
                        )}
                        <div className="p-4 bg-slate-50">
                            <div className="flex gap-2">
                                <input 
                                    type="search"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                    placeholder="బైబిల్ లో వెదకండి..."
                                    className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-none font-telugu"
                                />
                                <button
                                    onClick={handleSearch}
                                    className="bg-sky-600 text-white px-4 rounded-lg hover:bg-sky-700 transition-colors shadow flex-shrink-0"
                                    aria-label="Search"
                                >
                                    <SearchIcon className="w-6 h-6" />
                                </button>
                            </div>
                        </div>
                        <div className="p-4 grid grid-cols-2 gap-3">
                            {booksToShow.map(book => (
                                <button
                                    key={book.name}
                                    onClick={() => handleBookSelect(book)}
                                    className="p-4 h-24 flex items-center justify-center text-center bg-white rounded-lg shadow-sm border border-slate-200 hover:shadow-md hover:border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50 transition-all duration-200 cursor-pointer active:bg-slate-100"
                                    aria-label={book.name}
                                >
                                    <span className="font-telugu font-semibold text-slate-700">{book.name}</span>
                                </button>
                            ))}
                        </div>
                    </>
                );
            case 'search':
                return (
                    <div className="p-4 space-y-3">
                        <h2 className="text-lg font-semibold text-slate-800">
                            "{searchQuery}" <span className="font-normal text-slate-500">({searchResults.length} results)</span>
                        </h2>
                        {searchResults.length === 0 ? (
                            <p className="text-slate-500 text-center py-8">No results found.</p>
                        ) : (
                            <ul className="divide-y divide-slate-200">
                                {searchResults.map((result, index) => {
                                    const verseNum = result.verseText.split('.')[0];
                                    const verseTextOnly = result.verseText.substring(result.verseText.indexOf('.') + 1).trim();

                                    return (
                                        <li 
                                            key={index} 
                                            className="py-3 px-2 cursor-pointer hover:bg-slate-100 rounded-md"
                                            onClick={() => {
                                                const allBooks = [...teluguBibleData.oldTestament, ...teluguBibleData.newTestament];
                                                const book = allBooks.find(b => b.name === result.bookName);
                                                if (book) {
                                                    setSelectedBook(book);
                                                    handleChapterSelect(result.chapterIndex);
                                                }
                                            }}
                                        >
                                            <p className="text-slate-800 font-telugu mb-1 text-lg">
                                                <Highlight text={verseTextOnly} highlight={searchQuery} />
                                            </p>
                                            <p className="text-sm font-semibold text-sky-600 text-right">{`${result.bookName} ${result.chapterIndex + 1}:${verseNum}`}</p>
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                    </div>
                );
            case 'chapter':
                if (!selectedBook) return null;
                return (
                    <div className="p-4 grid grid-cols-5 gap-3">
                        {selectedBook.chapters.map((_, index) => (
                           <button
                                key={index}
                                onClick={() => handleChapterSelect(index)}
                                className="aspect-square flex items-center justify-center bg-white rounded-full shadow-sm border border-slate-200 hover:shadow-md hover:border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50 transition-all duration-200 cursor-pointer active:bg-sky-100"
                                aria-label={`అధ్యాయము ${index + 1}`}
                            >
                                <span className="font-sans font-bold text-slate-700 text-lg">{index + 1}</span>
                            </button>
                        ))}
                    </div>
                );
            case 'content':
                if (!selectedBook || selectedChapter === null) return null;
                const chapterContent = selectedBook.chapters[selectedChapter];
                return (
                    <>
                        <div className="p-4 space-y-1 pb-24">
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
                        <div className="fixed bottom-16 left-0 right-0 max-w-md mx-auto bg-white/80 backdrop-blur-lg border-t border-slate-200 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
                            <div className="flex justify-between items-center p-2">
                                <button 
                                    onClick={handlePrevChapter} 
                                    disabled={selectedChapter === 0}
                                    className="flex items-center space-x-1 p-3 rounded-lg text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                    aria-label="Previous Chapter"
                                >
                                    <ChevronLeftIcon className="w-6 h-6"/>
                                    <span className="font-semibold text-sm hidden sm:inline">Previous</span>
                                </button>
                                <div className="font-bold text-slate-700 tabular-nums">
                                    {selectedChapter + 1} / {selectedBook.chapters.length}
                                </div>
                                <button 
                                    onClick={handleNextChapter} 
                                    disabled={selectedChapter === selectedBook.chapters.length - 1}
                                    className="flex items-center space-x-1 p-3 rounded-lg text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                    aria-label="Next Chapter"
                                >
                                    <span className="font-semibold text-sm hidden sm:inline">Next</span>
                                    <ChevronRightIcon className="w-6 h-6"/>
                                </button>
                            </div>
                        </div>
                    </>
                );
        }
    };

    return (
        <div className="h-full flex flex-col bg-slate-50">
           {renderHeader()}
           {(view === 'book') && (
             <div className="shrink-0 bg-white z-[5] border-b border-slate-200 sticky top-0">
                <div className="flex" role="tablist">
                    <button
                        onClick={() => setActiveTab('old')}
                        role="tab"
                        aria-selected={activeTab === 'old'}
                        className={`w-1/2 py-3 text-center font-bold font-telugu border-b-4 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50 ${
                            activeTab === 'old'
                                ? 'border-sky-600 text-sky-700'
                                : 'border-transparent text-slate-500 hover:text-sky-600 hover:bg-slate-50'
                        }`}
                    >
                        పాత నిబంధన
                    </button>
                    <button
                        onClick={() => setActiveTab('new')}
                        role="tab"
                        aria-selected={activeTab === 'new'}
                        className={`w-1/2 py-3 text-center font-bold font-telugu border-b-4 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50 ${
                            activeTab === 'new'
                                ? 'border-sky-600 text-sky-700'
                                : 'border-transparent text-slate-500 hover:text-sky-600 hover:bg-slate-50'
                        }`}
                    >
                        క్రొత్త నిబంధన
                    </button>
                </div>
            </div>
           )}
            <div ref={scrollContainerRef} className="flex-grow overflow-y-auto pb-16">
              {renderContent()}
            </div>
            {selectedVerseInfo && <VerseActionModal verseText={selectedVerseInfo.text} verseRef={selectedVerseInfo.ref} onClose={() => setSelectedVerseInfo(null)} />}
        </div>
    );
};

export default BibleScreen;
