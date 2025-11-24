import React from 'react';
import { Flame, Github, Volume2, VolumeX } from 'lucide-react';
import { APP_NAME } from '../constants';

interface HeaderProps {
  soundEnabled: boolean;
  toggleSound: () => void;
  goHome: () => void;
}

const Header: React.FC<HeaderProps> = ({ soundEnabled, toggleSound, goHome }) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-surface-300/80 backdrop-blur-xl">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <div 
          className="flex items-center gap-3 cursor-pointer group" 
          onClick={goHome}
        >
          <div className="relative">
            <Flame className="h-6 w-6 text-blood-500 group-hover:text-blood-400 transition-colors" />
            <div className="absolute inset-0 bg-blood-500 blur-lg opacity-20 group-hover:opacity-40 transition-opacity" />
          </div>
          <span className="font-display font-bold text-lg tracking-wide text-white group-hover:text-gray-200 transition-colors">
            {APP_NAME}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={toggleSound}
            className="p-2.5 rounded-full hover:bg-white/5 text-gray-500 hover:text-blood-500 transition-all"
            title="Toggle SFX"
          >
            {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>
          
          <a 
            href="#" 
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-surface-100 border border-white/5 hover:border-white/10 text-sm font-medium transition-all group hover:bg-surface-50"
          >
            <Github size={16} className="text-gray-400 group-hover:text-white" />
            <span className="text-gray-400 group-hover:text-white">Fork</span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;