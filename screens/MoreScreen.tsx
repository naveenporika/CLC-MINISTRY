
import React from 'react';
import Header from '../components/Header';
import { ChevronRightIcon } from '../components/icons';
import type { Article } from '../types';

const articles: Article[] = [
    {id: 1, title: 'విశ్వాస జీవితంలో ప్రార్థన యొక్క ప్రాముఖ్యత', author: 'Pastor John', date: 'Dec 15, 2023'},
    {id: 2, title: 'కుటుంబంలో ఆధ్యాత్మిక నాయకత్వం', author: 'Sis. Mary', date: 'Dec 10, 2023'},
    {id: 3, title: 'కష్ట సమయాల్లో దేవునిపై నమ్మకం', author: 'Pastor John', date: 'Dec 05, 2023'},
];


const MoreScreen: React.FC = () => {
    return (
        <div className="h-full flex flex-col bg-slate-100 pb-16">
            <Header title="మరిన్ని వివరాలు" />
            <div className="flex-grow overflow-y-auto p-4 space-y-8">
                {/* Offerings Section */}
                <section>
                    <h2 className="text-lg font-bold text-slate-700 mb-2 px-2 font-telugu">కానుకలు</h2>
                    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 text-center">
                        <p className="text-slate-600 mb-4 font-telugu">
                            మీ కానుకల ద్వారా దేవుని సేవలో పాలుపొందండి.
                        </p>
                        <button className="bg-gradient-to-r from-sky-500 to-sky-600 text-white font-bold py-3 px-8 rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                           ఆన్‌లైన్‌లో ఇవ్వండి
                        </button>
                    </div>
                </section>
                
                {/* Articles Section */}
                <section>
                    <h2 className="text-lg font-bold text-slate-700 mb-2 px-2 font-telugu">వ్యాసాలు</h2>
                     <div className="bg-white rounded-lg shadow-sm border border-slate-200">
                        <ul className="divide-y divide-slate-200">
                           {articles.map(article => (
                             <li key={article.id} className="p-4 flex justify-between items-center hover:bg-slate-50 cursor-pointer">
                                <div>
                                    <h3 className="font-semibold text-slate-800 font-telugu">{article.title}</h3>
                                    <p className="text-sm text-slate-500">{article.author} - {article.date}</p>
                                </div>
                                <ChevronRightIcon className="text-slate-400" />
                            </li>
                           ))}
                        </ul>
                    </div>
                </section>

                {/* About Us Section */}
                <section>
                    <h2 className="text-lg font-bold text-slate-700 mb-2 px-2 font-telugu">మా గురించి</h2>
                     <div className="bg-white rounded-lg shadow-sm border border-slate-200">
                        <ul className="divide-y divide-slate-200">
                           <li className="p-4 flex justify-between items-center hover:bg-slate-50 cursor-pointer">
                                <p className="font-medium text-slate-700">Our Vision</p>
                                <ChevronRightIcon className="text-slate-400" />
                           </li>
                            <li className="p-4 flex justify-between items-center hover:bg-slate-50 cursor-pointer">
                                <p className="font-medium text-slate-700">Contact Us</p>
                                <ChevronRightIcon className="text-slate-400" />
                           </li>
                        </ul>
                    </div>
                </section>

            </div>
        </div>
    );
};

export default MoreScreen;
