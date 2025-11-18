import React, { useState, useRef, useEffect } from 'react';
import { genres } from '../lib/ai/genreTemplates';
import { Icon } from './Icon';

interface GenreSelectorProps {
  selectedGenre: string;
  onSelectGenre: (genre: string) => void;
}

export const GenreSelector: React.FC<GenreSelectorProps> = ({ selectedGenre, onSelectGenre }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (genreKey: string) => {
    onSelectGenre(genreKey);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const currentGenre = genres[selectedGenre];

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-xl text-left hover:bg-white/10 transition-colors"
      >
        <div className="flex items-center space-x-3">
          <div className="p-1.5 bg-amber-500/20 rounded-lg">
             <Icon name={currentGenre.icon} className="w-4 h-4 text-amber-400" />
          </div>
          <span className="font-medium text-gray-200 text-sm">{currentGenre.name}</span>
        </div>
        <Icon name="dropdown" className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-20 top-full mt-2 w-full bg-[#0f0f0f] border border-white/10 rounded-xl shadow-2xl overflow-hidden animate-fade-in-down">
          <ul className="max-h-60 overflow-y-auto p-1 custom-scrollbar">
            {Object.entries(genres).map(([key, genre]) => (
              <li key={key}>
                <button
                  onClick={() => handleSelect(key)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-colors ${selectedGenre === key ? 'bg-amber-500/10 border border-amber-500/20' : 'hover:bg-white/5 border border-transparent'}`}
                >
                  <Icon name={genre.icon} className={`w-5 h-5 flex-shrink-0 ${selectedGenre === key ? 'text-amber-400' : 'text-gray-500'}`} />
                  <div>
                      <p className={`text-sm font-semibold ${selectedGenre === key ? 'text-white' : 'text-gray-300'}`}>{genre.name}</p>
                      <p className="text-xs text-gray-500 truncate max-w-[200px]">{genre.description}</p>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};