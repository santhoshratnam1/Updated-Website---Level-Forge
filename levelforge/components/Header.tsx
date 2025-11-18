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
          ? 'bg-black/80 backdrop-blur-xl border-b border-white/10 shadow-2xl' 
          : 'bg-transparent'
      }`}
    >
      <div className="w-full max-w-7xl mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <div className="flex items-center space-x-3 group cursor-pointer" onClick={onReset}>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full blur-lg opacity-0 group-hover:opacity-75 transition-opacity duration-300"></div>
            <div className="relative p-2 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full">
              <Icon name="logo" className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
            LevelForge
          </h1>
        </div>
        
        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Help Button */}
          <button
            onClick={onHelpClick}
            className="group relative px-4 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 flex items-center gap-2"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 to-purple-500/0 group-hover:from-cyan-500/10 group-hover:to-purple-500/10 rounded-xl transition-all duration-300"></div>
            <Icon name="help" className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
            <span className="relative font-semibold text-gray-300 group-hover:text-white transition-colors">
              Learn
            </span>
          </button>
          
          {hasResult && (
            <>
              {/* Download PDF Button */}
              <button
                onClick={onDownloadPdf}
                disabled={isGeneratingPdf}
                className="group relative px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl hover:shadow-[0_0_20px_rgba(34,197,94,0.5)] transition-all duration-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
              >
                {!isGeneratingPdf && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                )}
                <Icon name="download" className="w-5 h-5 relative z-10" />
                <span className="relative z-10 font-bold">
                  {isGeneratingPdf ? 'Generating...' : 'Export PDF'}
                </span>
              </button>
              
              {/* New Project Button */}
              <button
                onClick={onReset}
                className="group relative px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] hover:scale-105 transition-all duration-300 flex items-center gap-2 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <Icon name="plus" className="w-5 h-5 relative z-10" />
                <span className="relative z-10 font-bold">New Project</span>
              </button>
            </>
          )}
        </div>
      </div>
      
      {/* Animated gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </header>
  );
};