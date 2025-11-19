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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'glass-header shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="w-full max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <div className="flex items-center space-x-3 group cursor-pointer" onClick={onReset}>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-600 rounded-2xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
            <div className="relative p-2.5 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
              <Icon name="logo" className="h-5 w-5 text-white" />
            </div>
          </div>
          <h1 className="text-xl font-semibold tracking-tight text-white">
            LevelForge
          </h1>
        </div>
        
        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Help Button */}
          <button
            onClick={onHelpClick}
            className="group relative px-4 py-2 glass rounded-full hover:bg-white/10 transition-all duration-300 flex items-center gap-2"
          >
            <Icon name="help" className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform duration-200" />
            <span className="relative text-sm font-medium text-gray-200 group-hover:text-white transition-colors">
              Learn
            </span>
          </button>
          
          {hasResult && (
            <>
              <button
                onClick={onDownloadPdf}
                disabled={isGeneratingPdf}
                className="group relative px-5 py-2 glass rounded-full hover:bg-white/10 transition-all duration-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Icon name="download" className="w-4 h-4 text-gray-200 group-hover:text-white" />
                <span className="text-sm font-medium text-gray-200 group-hover:text-white">
                  {isGeneratingPdf ? 'Generating...' : 'Export PDF'}
                </span>
              </button>
              
              <button
                onClick={onReset}
                className="group relative px-5 py-2 bg-blue-600 hover:bg-blue-500 rounded-full transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl"
              >
                <Icon name="plus" className="w-4 h-4 text-white" />
                <span className="text-sm font-semibold text-white">New Project</span>
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};