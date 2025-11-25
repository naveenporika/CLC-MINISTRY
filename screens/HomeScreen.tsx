import React, { useState, useEffect } from 'react';
import { getRandomVerse } from '../services/geminiService'; // geminiService is now bibleService
import { ChevronRightIcon, PlayIcon, DownloadIcon } from '../components/icons';
import type { AppBook, DailyVerse } from '../types';

const books: AppBook[] = [
    {
        id: 1, 
        title: 'పరలోక మర్మాలు', 
        author: 'Brother Amos Agafe',
        content: [
            'దేవుని వాక్యం మనకు పరలోక రాజ్యము యొక్క లోతైన సత్యాలను మరియు మర్మాలను వెల్లడిస్తుంది. మన ఆత్మీయ కన్నులు తెరువబడినప్పుడు, దేవుని మహిమను మరియు ఆయన ప్రణాళికను మనం గ్రహించగలుగుతాము.',
            'యేసు క్రీస్తు తన ఉపమానముల ద్వారా పరలోక రాజ్యము యొక్క అనేక రహస్యములను బయలుపరిచాడు. వాటిని అర్థం చేసుకోవడానికి పరిశుద్ధాత్మ సహాయం మనకు అవసరం.',
            'మన విశ్వాస జీవితంలో, ఈ మర్మాలను తెలుసుకోవడం మనలను దేవునికి మరింత దగ్గర చేస్తుంది మరియు ఆయన చిత్తాన్ని నెరవేర్చడానికి మనకు శక్తినిస్తుంది.',
            'ప్రకటన గ్రంథంలో వర్ణించబడినట్లుగా, నూతన యెరూషలేము దేవుని మహిమతో ప్రకాశించే ఒక అద్భుతమైన నగరం. అది పరిశుద్ధులకు శాశ్వత నివాస స్థలం, అక్కడ దేవుడే మనకు వెలుగుగా ఉంటాడు.',
            'పరలోకంలో లెక్కలేనన్ని దేవదూతలు దేవుని సేవించడానికి మరియు ఆయన ఆజ్ఞలను నెరవేర్చడానికి సిద్ధంగా ఉన్నారు. వారు మన రక్షణ వారసత్వంలో మనకు కూడా సేవచేసే ఆత్మలు.',
            'పరలోకంలో జరిగే ఒక గొప్ప వేడుక గొర్రెపిల్ల వివాహ విందు. ఇది క్రీస్తుకు మరియు ఆయన సంఘానికి (వధువు) మధ్య ఉన్న అద్భుతమైన మరియు శాశ్వతమైన సంబంధానికి ప్రతీక.',
            'మనం పరలోకానికి వెళ్ళినప్పుడు, మనకు మహిమగల, అక్షయమైన ఆత్మీయ శరీరాలు ఇవ్వబడతాయి. ఈ శరీరాలు బలహీనత, వ్యాధి లేదా మరణం లేనివిగా ఉంటాయి, క్రీస్తు మహిమగల శరీరాన్ని పోలి ఉంటాయి.',
            'ఈ లోకంలో మనం దేవుని కొరకు చేసిన ప్రతి పనికి పరలోకంలో బహుమానం ఉంటుంది. మన విశ్వాసాన్ని మరియు మన సత్క్రియలను బట్టి దేవుడు మనకు కిరీటాలను మరియు ప్రతిఫలాలను అనుగ్రహిస్తాడు.',
            'ఏదెను తోటలో కోల్పోయిన జీవ వృక్షం పరలోకంలో తిరిగి స్థాపించబడుతుంది. దాని ఫలాలు జనులకు స్వస్థతను కలిగిస్తాయి మరియు నిత్యజీవాన్ని సూచిస్తాయి.',
            'పరలోకంలో కన్నీళ్లు, దుఃఖం, ఏడ్పు లేదా వేదన ఉండవు. దేవుడు మన కన్నీళ్లన్నిటినీ తుడిచివేస్తాడు. అక్కడ శాశ్వతమైన సంతోషం మరియు సమాధానం మాత్రమే ఉంటాయి.',
            'పరలోకంలో నిరంతరాయమైన ఆరాధన జరుగుతుంది. పరిశుద్ధులు, దేవదూతలు మరియు పరలోక జీవులందరూ దేవుని సింహాసనం ముందు చేరి, ఆయనను స్తుతిస్తూ, ఆరాధిస్తూ ఉంటారు.',
            'ఈ లోకంలో మనకు అర్థం కాని అనేక విషయాలు పరలోకంలో స్పష్టంగా వెల్లడి చేయబడతాయి. దేవుని ప్రణాళిక యొక్క సంపూర్ణతను మరియు ఆయన జ్ఞానాన్ని మనం పూర్తిగా గ్రహిస్తాము.',
            'పరలోకంలో మన ప్రియమైన వారితో మరియు అబ్రాహాము, మోషే, పౌలు వంటి విశ్వాస వీరులతో మనకు శాశ్వతమైన సహవాసం ఉంటుంది. అన్నింటికన్నా ముఖ్యంగా, మనం తండ్రియైన దేవునితో మరియు ప్రభువైన యేసుక్రీస్తుతో ముఖాముఖిగా ఉంటాము.'
        ]
    },
    {
        id: 2, 
        title: 'నరకం', 
        author: 'Brother Amos Agafe',
        content: [
            'బైబిల్ నరకం గురించి స్పష్టంగా మాట్లాడుతుంది. అది దేవుని తిరస్కరించిన వారికి మరియు పశ్చాత్తాపపడని పాపులకు శాశ్వతమైన శిక్షా స్థలం.',
            'దేవుడు ప్రేమగలవాడు, కానీ ఆయన న్యాయవంతుడు కూడా. పాపానికి తగిన శిక్ష ఉంటుంది. అందుకే ఆయన మన రక్షణ కోసం తన కుమారుడైన యేసుక్రీస్తును పంపాడు.',
            'నరకం యొక్క వాస్తవికతను గ్రహించి, మనం క్రీస్తు నందు విశ్వాసముంచి, నిత్యజీవ మార్గంలో నడవాలి. ఇతరులకు కూడా ఈ సువార్తను ప్రకటించాలి.'
        ]
    },
    {
        id: 3, 
        title: 'పరలోకం', 
        author: 'Brother Amos Agafe',
        content: [
            'పరలోకం దేవునితో శాశ్వతమైన సహవాసం చేసే అద్భుతమైన ప్రదేశం. అక్కడ కన్నీళ్లు, దుఃఖం, లేదా వేదన ఉండవు.',
            'ప్రకటన గ్రంథం పరలోకం యొక్క మహిమను వివరిస్తుంది - బంగారు వీధులు, ముత్యాల గుమ్మాలు మరియు దేవుని సింహాసనం నుండి ప్రవహించే జీవనది.',
            'ఈ లోకంలోని శ్రమలు తాత్కాలికమైనవి. క్రీస్తునందు విశ్వాసముంచిన మన కొరకు పరలోకంలో ఒక గొప్ప నిరీక్షణ మరియు బహుమానం వేచి ఉంది. మన చూపులను నిత్యమైన వాటిపై నిలుపుదాం.'
        ]
    },
];

interface HomeScreenProps {
  navigateToChapter: (bookName: string, chapterIndex: number) => void;
  onBookSelect: (book: AppBook) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigateToChapter, onBookSelect }) => {
  const [verse, setVerse] = useState<DailyVerse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isLive, setIsLive] = useState<boolean>(true);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    setLoading(true);
    const fetchedVerse = getRandomVerse();
    setVerse(fetchedVerse);
    setLoading(false);

    // Install prompt listener
    const handleBeforeInstallPrompt = (e: Event) => {
        // Prevent the mini-infobar from appearing on mobile
        e.preventDefault();
        // Stash the event so it can be triggered later.
        setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
        window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    }
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    // Show the install prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    // We've used the prompt, and can't use it again, throw it away
    if (outcome === 'accepted') {
        setDeferredPrompt(null);
    }
  };

  return (
    <div className="min-h-full bg-slate-100">
      <header className="bg-white shadow-sm p-3 flex items-center space-x-3">
        <img 
            src="https://res.cloudinary.com/akinaveen/image/upload/v1740417783/church_logo_ezcira.jpg" 
            alt="CLC Ministry Logo" 
            className="h-12 w-12"
        />
        <div>
            <h1 className="text-xl font-bold text-slate-800">CLC Ministry</h1>
            <p className="text-sm text-slate-500">Christ Love Comfort</p>
        </div>
      </header>

      <div className="p-4 space-y-6 pb-20">
        {/* Install Banner */}
        {deferredPrompt && (
          <section>
            <button
                onClick={handleInstallClick}
                className="w-full bg-slate-800 text-white rounded-xl shadow-md p-4 flex items-center justify-between hover:bg-slate-700 transition-all duration-200 active:scale-[0.98]"
            >
                <div className="flex items-center space-x-4">
                    <div className="bg-slate-700 p-2 rounded-lg">
                        <DownloadIcon className="w-6 h-6 text-sky-400" />
                    </div>
                    <div className="text-left">
                        <h3 className="font-bold text-sm font-telugu">యాప్‌ని ఇన్‌స్టాల్ చేయండి</h3>
                        <p className="text-xs text-slate-300">ఆఫ్‌లైన్ యాక్సెస్ కోసం</p>
                    </div>
                </div>
                <div className="bg-sky-600 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                    Install
                </div>
            </button>
          </section>
        )}

        <section>
            <img 
                src="https://res.cloudinary.com/akinaveen/image/upload/v1718153469/clc_gfqsdg.jpg" 
                alt="Ministry Banner"
                className="w-full h-auto rounded-xl shadow-md"
            />
        </section>

        {isLive && (
          <section>
            <a 
              href="https://www.youtube.com/@clcministrieshyd/live" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="block bg-white rounded-xl shadow-md p-4 border border-red-200 hover:shadow-lg hover:border-red-300 transition-all duration-300"
            >
              <div className="flex items-center space-x-4">
                <div className="relative flex-shrink-0">
                  <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center shadow">
                      <PlayIcon className="text-white w-7 h-7" />
                  </div>
                </div>
                <div className="flex-grow">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </span>
                    <h3 className="font-bold text-red-600 text-sm tracking-wider">LIVE NOW</h3>
                  </div>
                  <p className="text-lg font-semibold text-slate-800 font-telugu leading-tight">ఆరాధన ప్రత్యక్ష ప్రసారం</p>
                  <p className="text-sm text-slate-500">Join our live service</p>
                </div>
                <div className="self-center">
                  <ChevronRightIcon className="text-slate-400 w-6 h-6" />
                </div>
              </div>
            </a>
          </section>
        )}

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
                    <li key={book.id} onClick={() => onBookSelect(book)} className="p-4 flex justify-between items-center hover:bg-slate-50 cursor-pointer">
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