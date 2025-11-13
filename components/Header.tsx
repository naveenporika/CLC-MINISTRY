
import React from 'react';

interface HeaderProps {
  title: string;
  children?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ title, children }) => {
  return (
    <header className="sticky top-0 bg-white/80 backdrop-blur-lg z-10 shadow-sm">
        <div className="flex items-center justify-between p-4 border-b border-slate-200">
             <h1 className="text-xl font-bold text-slate-800 font-telugu">{title}</h1>
             {children}
        </div>
    </header>
  );
};

export default Header;
