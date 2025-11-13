
import React, { useState } from 'react';
import Header from '../components/Header';
import type { Testimony } from '../types';

const testimonies: Testimony[] = [
  { id: 1, title: 'నా ప్రార్థనలకు అద్భుతమైన సమాధానం', author: 'రమ్య', story: 'నేను చాలా కాలంగా ఉద్యోగం కోసం ప్రార్థిస్తున్నాను మరియు దేవుడు నాకు అద్భుతమైన అవకాశాన్ని ఇచ్చాడు. ఆయన నమ్మదగినవాడు!' },
  { id: 2, title: 'అనారోగ్యం నుండి స్వస్థత', author: 'సురేష్', story: 'వైద్యులు ఆశ వదులుకున్నాక, ప్రభువు నన్ను పూర్తిగా స్వస్థపరిచాడు. యేసు నామమునకే మహిమ కలుగును గాక!' },
  { id: 3, title: 'దేవుని అద్భుతమైన రక్షణ', author: 'అనిత', story: 'ఒక ప్రమాదం నుండి దేవుడు నన్ను అద్భుతంగా కాపాడాడు. ప్రతి క్షణం ఆయన మనతోనే ఉంటాడు.' },
  { id: 4, title: 'ఆర్థిక ఇబ్బందులలో దేవుని సహాయం', author: 'ప్రకాష్', story: 'మేము తీవ్ర ఆర్థిక సంక్షోభంలో ఉన్నప్పుడు, దేవుడు మా అవసరాలను ఊహించని విధంగా తీర్చాడు. ఆయనకు కృతజ్ఞతలు.' },
];

const TestimonyModal: React.FC<{ testimony: Testimony; onClose: () => void }> = ({ testimony, onClose }) => (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl font-bold text-sky-800 mb-2 font-telugu">{testimony.title}</h2>
            <p className="text-sm text-slate-500 mb-4">By {testimony.author}</p>
            <p className="text-slate-700 leading-relaxed font-telugu">{testimony.story}</p>
            <button onClick={onClose} className="absolute top-2 right-2 text-slate-500 hover:text-slate-800">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    </div>
);


const TestimoniesScreen: React.FC = () => {
    const [selectedTestimony, setSelectedTestimony] = useState<Testimony | null>(null);
  
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
        <button className="w-full bg-sky-600 text-white font-bold py-3 px-4 rounded-full shadow-lg hover:bg-sky-700 transition-colors duration-300 transform hover:scale-105">
          Share Your Story
        </button>
      </div>
      {selectedTestimony && <TestimonyModal testimony={selectedTestimony} onClose={() => setSelectedTestimony(null)} />}
    </div>
  );
};

export default TestimoniesScreen;
