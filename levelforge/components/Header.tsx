import React, { useState, useEffect } from 'react';
import { Icon } from './Icon';

export const Header: React.FC<{
  hasResult: boolean;
  onReset: () => void;
  onDownloadPdf: () => void;
  isGeneratingPdf: boolean;
  onHelpClick: () => void;
}> = ({ hasResult, onReset, onDownloadPdf, isGeneratingPdf, onHelpClick }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-[#050505]/90 backdrop-blur-xl border-b border-white/5 shadow-2xl' 
          : 'bg-transparent'
      }`}
    >
      <div className="w-full max-w-7xl mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <div className="flex items-center space-x-3 group cursor-pointer" onClick={onReset}>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-600 rounded-full blur-lg opacity-0 group-hover:opacity-75 transition-opacity duration-300"></div>
            <div className="relative p-2 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full">
              <Icon name="logo" className="h-6 w-6 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400">
            LevelForge
          </h1>
        </div>
        
        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Help Button */}
          <button
            onClick={onHelpClick}
            className="group relative px-4 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full hover:bg-white/10 hover:border-white/20 transition-all duration-300 flex items-center gap-2"
          >
            <Icon name="help" className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform duration-300" />
            <span className="relative text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
              Learn
            </span>
          </button>
          
          {hasResult && (
            <>
              {/* Download PDF Button */}
              <button
                onClick={onDownloadPdf}
                disabled={isGeneratingPdf}
                className="group relative px-5 py-2 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all duration-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Icon name="download" className="w-4 h-4 text-gray-300 group-hover:text-white" />
                <span className="text-sm font-medium text-gray-300 group-hover:text-white">
                  {isGeneratingPdf ? 'Generating...' : 'Export PDF'}
                </span>
              </button>
              
              {/* New Project Button */}
              <button
                onClick={onReset}
                className="group relative px-5 py-2 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:scale-105 transition-all duration-300 flex items-center gap-2 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <Icon name="plus" className="w-4 h-4 text-white relative z-10" />
                <span className="relative z-10 text-sm font-bold text-white">New Project</span>
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};