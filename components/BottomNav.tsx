
import React from 'react';
import type { Screen } from '../types';
import { HomeIcon, BibleIcon, MusicIcon, TestimonyIcon, OfferingsIcon } from './icons';

interface BottomNavProps {
  activeScreen: Screen;
  setActiveScreen: (screen: Screen) => void;
}

const navItems: { screen: Screen; label: string; icon: React.FC<any> }[] = [
  { screen: 'Home', label: 'హోమ్', icon: HomeIcon },
  { screen: 'Bible', label: 'బైబిల్', icon: BibleIcon },
  { screen: 'Offerings', label: 'కానుక', icon: OfferingsIcon },
  { screen: 'Songs', label: 'పాటలు', icon: MusicIcon },
  { screen: 'Testimonies', label: 'సాక్ష్యాలు', icon: TestimonyIcon },
];

const BottomNav: React.FC<BottomNavProps> = ({ activeScreen, setActiveScreen }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-slate-200 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = activeScreen === item.screen;
          const Icon = item.icon;
          return (
            <button
              key={item.screen}
              onClick={() => setActiveScreen(item.screen)}
              className={`flex flex-col items-center justify-center w-full h-full transition-colors duration-200 ${
                isActive ? 'text-sky-600' : 'text-slate-500 hover:text-sky-500'
              }`}
            >
              <Icon className={`h-6 w-6 mb-1 ${isActive ? 'fill-current' : ''}`} />
              <span className={`text-xs font-medium font-telugu`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
