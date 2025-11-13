import React, { useState } from 'react';
import BottomNav from './components/BottomNav';
import HomeScreen from './screens/HomeScreen';
import BibleScreen from './screens/BibleScreen';
import SongsScreen from './screens/SongsScreen';
import TestimoniesScreen from './screens/TestimoniesScreen';
import OfferingsScreen from './screens/OfferingsScreen';
import type { Screen } from './types';

const App: React.FC = () => {
  const [activeScreen, setActiveScreen] = useState<Screen>('Home');
  const [bibleNav, setBibleNav] = useState<{ bookName: string; chapterIndex: number } | null>(null);

  const navigateToChapter = (bookName: string, chapterIndex: number) => {
    setBibleNav({ bookName, chapterIndex });
    setActiveScreen('Bible');
  };

  const renderScreen = () => {
    switch (activeScreen) {
      case 'Home':
        return <HomeScreen navigateToChapter={navigateToChapter} />;
      case 'Bible':
        return <BibleScreen initialLocation={bibleNav} clearInitialLocation={() => setBibleNav(null)} />;
      case 'Songs':
        return <SongsScreen />;
      case 'Testimonies':
        return <TestimoniesScreen />;
      case 'Offerings':
        return <OfferingsScreen />;
      default:
        return <HomeScreen navigateToChapter={navigateToChapter} />;
    }
  };

  return (
    <div className="w-full max-w-md mx-auto h-[100dvh] bg-slate-50 flex flex-col shadow-2xl">
      <main className="flex-grow overflow-y-auto">
        {renderScreen()}
      </main>
      <BottomNav activeScreen={activeScreen} setActiveScreen={setActiveScreen} />
    </div>
  );
};

export default App;