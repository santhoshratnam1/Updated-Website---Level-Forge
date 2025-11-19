import React from 'react';
import { Icon } from './Icon';
import { glossary } from '../data/glossary';

interface HelpTooltipProps {
  glossaryKey: keyof typeof glossary;
  children?: React.ReactNode;
  className?: string;
}

export const HelpTooltip: React.FC<HelpTooltipProps> = ({ glossaryKey, children, className = '' }) => {
  const term = glossary[glossaryKey];
  if (!term) return <>{children || null}</>;

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      {children}
      <div className="relative group inline-flex items-center justify-center isolate">
         <button 
           type="button"
           className="p-1 rounded-full hover:bg-white/10 text-gray-500 hover:text-amber-400 transition-colors focus:outline-none"
           aria-label={`Help: ${term.name}`}
         >
            <Icon name="help" className="w-4 h-4" />
         </button>
         
         {/* Tooltip Content */}
         <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-72 p-4 bg-[#1a1a1a] border border-white/10 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[100] pointer-events-none transform translate-y-2 group-hover:translate-y-0 whitespace-normal">
            <div className="flex items-start gap-3 mb-2">
                <div className="p-1.5 bg-amber-500/10 rounded-lg flex-shrink-0">
                    <Icon name={term.icon} className="w-4 h-4 text-amber-500" />
                </div>
                <h4 className="font-bold text-white text-sm mt-0.5">{term.name}</h4>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">{term.shortDescription}</p>
            
            {/* Arrow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#1a1a1a] border-b border-r border-white/10 transform rotate-45 translate-y-1.5"></div>
         </div>
      </div>
    </div>
  );
};