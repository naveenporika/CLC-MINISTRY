import React, { useState, useEffect, useRef } from 'react';
import type { AppBook } from '../types';
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from './icons';

interface BookReaderProps {
  book: AppBook;
  onClose: () => void;
}

const BookReader: React.FC<BookReaderProps> = ({ book, onClose }) => {
  const [selectedChapterIndex, setSelectedChapterIndex] = useState<number | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to top when chapter changes
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [selectedChapterIndex]);
  
  const handlePrevChapter = () => {
    if (selectedChapterIndex !== null && selectedChapterIndex > 0) {
      setSelectedChapterIndex(selectedChapterIndex - 1);
    }
  };

  const handleNextChapter = () => {
    if (selectedChapterIndex !== null && selectedChapterIndex < book.content.length - 1) {
      setSelectedChapterIndex(selectedChapterIndex + 1);
    }
  };

  const renderIndexView = () => (
    <>
      <header className="sticky top-0 bg-white/80 backdrop-blur-lg z-10 shadow-sm">
        <div className="flex items-center justify-between p-4 border-b border-slate-200">
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-bold text-sky-800 font-telugu truncate">{book.title}</h2>
            <p className="text-sm text-slate-500 truncate">{book.author}</p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-600 p-2 rounded-full hover:bg-slate-200 transition-colors ml-2"
            aria-label="Close"
          >
            <XMarkIcon />
          </button>
        </div>
      </header>
      <div className="flex-grow overflow-y-auto">
        <h3 className="p-4 text-base font-bold text-slate-700 font-telugu border-b border-slate-200">అధ్యాయాలు</h3>
        <ul className="divide-y divide-slate-200">
          {book.content.map((_, index) => (
            <li 
              key={index} 
              onClick={() => setSelectedChapterIndex(index)} 
              className="p-4 flex justify-between items-center hover:bg-slate-100 cursor-pointer"
              role="button"
              aria-label={`అధ్యాయము ${index + 1}`}
            >
              <span className="font-semibold text-slate-700 font-telugu">అధ్యాయము {index + 1}</span>
              <ChevronRightIcon className="text-slate-400" />
            </li>
          ))}
        </ul>
      </div>
    </>
  );

  const renderChapterView = () => {
    if (selectedChapterIndex === null) return null;
    
    return (
      <>
        <header className="sticky top-0 bg-white/80 backdrop-blur-lg z-10 shadow-sm">
          <div className="flex items-center justify-between p-4 border-b border-slate-200">
            <button 
              onClick={() => setSelectedChapterIndex(null)} 
              className="text-slate-600 p-2 rounded-full hover:bg-slate-200 transition-colors mr-2"
              aria-label="Back to index"
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </button>
            <div className="flex-1 min-w-0 text-center">
              <h2 className="text-lg font-bold text-sky-800 font-telugu truncate">{book.title}</h2>
              <p className="text-sm text-slate-500 truncate">అధ్యాయము {selectedChapterIndex + 1}</p>
            </div>
            <button
              onClick={onClose}
              className="text-slate-600 p-2 rounded-full hover:bg-slate-200 transition-colors ml-2"
              aria-label="Close"
            >
              <XMarkIcon />
            </button>
          </div>
        </header>

        <div ref={contentRef} className="flex-grow overflow-y-auto p-6">
          <p className="text-slate-700 text-lg leading-relaxed font-telugu">
            {book.content[selectedChapterIndex]}
          </p>
        </div>
        
        <div className="sticky bottom-0 bg-white/80 backdrop-blur-lg border-t border-slate-200 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
            <div className="flex justify-between items-center p-2">
                <button 
                    onClick={handlePrevChapter} 
                    disabled={selectedChapterIndex === 0}
                    className="flex items-center space-x-1 p-3 rounded-lg text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    aria-label="Previous Chapter"
                >
                    <ChevronLeftIcon className="w-6 h-6"/>
                </button>
                <div className="font-bold text-slate-700 tabular-nums">
                    {selectedChapterIndex + 1} / {book.content.length}
                </div>
                <button 
                    onClick={handleNextChapter} 
                    disabled={selectedChapterIndex === book.content.length - 1}
                    className="flex items-center space-x-1 p-3 rounded-lg text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    aria-label="Next Chapter"
                >
                    <ChevronRightIcon className="w-6 h-6"/>
                </button>
            </div>
        </div>
      </>
    );
  };

  return (
    <div className="fixed inset-0 bg-slate-50 z-50 flex flex-col animate-slide-up">
      {selectedChapterIndex === null ? renderIndexView() : renderChapterView()}
    </div>
  );
};

export default BookReader;