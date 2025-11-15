
import React, { useState } from 'react';
import Header from '../components/Header';
import { XMarkIcon } from '../components/icons';
import type { Testimony } from '../types';

const initialTestimonies: Testimony[] = [
  { id: 1, title: 'నా ప్రార్థనలకు అద్భుతమైన సమాధానం', author: 'రమ్య', story: 'నేను చాలా కాలంగా ఉద్యోగం కోసం ప్రార్థిస్తున్నాను మరియు దేవుడు నాకు అద్భుతమైన అవకాశాన్ని ఇచ్చాడు. ఆయన నమ్మదగినవాడు!' },
  
];

const TestimonyModal: React.FC<{ testimony: Testimony; onClose: () => void }> = ({ testimony, onClose }) => (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative animate-slide-up-fast" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl font-bold text-sky-800 mb-2 font-telugu">{testimony.title}</h2>
            <p className="text-sm text-slate-500 mb-4">By {testimony.author}</p>
            <p className="text-slate-700 leading-relaxed font-telugu">{testimony.story}</p>
            <button onClick={onClose} className="absolute top-2 right-2 text-slate-500 hover:text-slate-800 p-2 rounded-full">
                <XMarkIcon className="h-6 w-6" />
            </button>
        </div>
    </div>
);

const TestimonyFormModal: React.FC<{
  onClose: () => void;
  onSubmit: (data: { title: string; author: string; story: string }) => void;
}> = ({ onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [story, setStory] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !author.trim() || !story.trim()) {
      alert('Please fill out all fields.');
      return;
    }
    onSubmit({ title, author, story });
  };

  return (
    <div className="fixed inset-0 bg-slate-50 z-50 flex flex-col animate-slide-up">
        <header className="sticky top-0 bg-white/80 backdrop-blur-lg z-10 shadow-sm">
            <div className="flex items-center justify-between p-4 border-b border-slate-200">
                <h2 className="text-xl font-bold text-slate-800 font-telugu">మీ సాక్ష్యాన్ని పంచుకోండి</h2>
                <button 
                    onClick={onClose} 
                    className="text-slate-600 p-2 rounded-full hover:bg-slate-200 transition-colors"
                    aria-label="Close Form"
                >
                    <XMarkIcon />
                </button>
            </div>
        </header>
      
        <form onSubmit={handleSubmit} className="flex-grow overflow-y-auto p-6 space-y-4">
            <div>
                <label htmlFor="miracle" className="block text-sm font-bold text-slate-700 font-telugu mb-1">అద్భుతం (శీర్షిక)</label>
                <input 
                    type="text" 
                    id="miracle" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    required 
                    className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-none font-telugu"
                    placeholder="ఉదా: దేవుని అద్భుతమైన స్వస్థత"
                />
            </div>
            <div>
                <label htmlFor="name" className="block text-sm font-bold text-slate-700 font-telugu mb-1">మీ పేరు</label>
                <input 
                    type="text" 
                    id="name" 
                    value={author} 
                    onChange={(e) => setAuthor(e.target.value)} 
                    required 
                    className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-none font-telugu"
                    placeholder="మీ పూర్తి పేరు"
                />
            </div>
            <div>
                <label htmlFor="message" className="block text-sm font-bold text-slate-700 font-telugu mb-1">మీ సాక్ష్యం</label>
                <textarea 
                    id="message" 
                    value={story} 
                    onChange={(e) => setStory(e.target.value)} 
                    required 
                    rows={8} 
                    className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-none font-telugu"
                    placeholder="దేవుడు మీ జీవితంలో చేసిన కార్యాన్ని ఇక్కడ పంచుకోండి..."
                ></textarea>
            </div>
            <div className="pt-4">
                <button type="submit" className="w-full bg-sky-600 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:bg-sky-700 transition-colors duration-300">
                    Submit Testimony
                </button>
            </div>
        </form>
    </div>
  );
};


const TestimoniesScreen: React.FC = () => {
    const [testimonies, setTestimonies] = useState<Testimony[]>(initialTestimonies);
    const [selectedTestimony, setSelectedTestimony] = useState<Testimony | null>(null);
    const [isFormVisible, setIsFormVisible] = useState(false);
  
    const handleAddTestimony = (data: { title: string; author: string; story: string }) => {
        const newTestimony: Testimony = {
            id: Date.now(),
            ...data,
        };
        setTestimonies([newTestimony, ...testimonies]);
        setIsFormVisible(false);
    };

    return (
    <div className="h-full flex flex-col bg-slate-100">
      <Header title="దేవుని సాక్ష్యాలు" />
      <div className="flex-grow overflow-y-auto p-4 space-y-3 pb-24">
        {testimonies.map((testimony) => (
          <div
            key={testimony.id}
            onClick={() => setSelectedTestimony(testimony)}
            className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 cursor-pointer hover:shadow-md hover:border-sky-300 transition-all duration-200"
          >
            <h3 className="font-bold text-slate-800 font-telugu">{testimony.title}</h3>
            <p className="text-sm text-slate-500">By {testimony.author}</p>
            <p className="text-slate-600 mt-2 line-clamp-2 font-telugu">{testimony.story}</p>
            <span className="text-sm font-semibold text-sky-600 mt-2 inline-block">Read More</span>
          </div>
        ))}
      </div>
       <div className="fixed bottom-20 left-1/2 -translate-x-1/2 w-full max-w-md px-4">
        <button 
            onClick={() => setIsFormVisible(true)}
            className="w-full bg-sky-600 text-white font-bold py-3 px-4 rounded-full shadow-lg hover:bg-sky-700 transition-colors duration-300 transform hover:scale-105">
          Share Your Story
        </button>
      </div>
      {selectedTestimony && <TestimonyModal testimony={selectedTestimony} onClose={() => setSelectedTestimony(null)} />}
      {isFormVisible && <TestimonyFormModal onClose={() => setIsFormVisible(false)} onSubmit={handleAddTestimony} />}
    </div>
  );
};

export default TestimoniesScreen;
