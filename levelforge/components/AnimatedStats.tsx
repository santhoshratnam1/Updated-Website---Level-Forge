import React, { useState, useEffect } from 'react';
import { GlassCard } from './GlassCard';
import { useAnimatedNumber } from '../hooks/useAnimatedNumber';

interface StatCardProps {
  label: string;
  value: number;
  suffix?: string;
  delay?: number;
}

const StatCard: React.FC<StatCardProps> = ({ 
  label, 
  value, 
  suffix = '', 
  delay = 0
}) => {
  // Ensure value is at least 0 to prevent NaN issues
  const safeValue = Math.max(0, value);
  const displayValue = useAnimatedNumber(safeValue, 2000, delay);
  
  // Fallback to show the value if animation fails or takes too long (safety check)
  const [shownValue, setShownValue] = useState(0);
  
  useEffect(() => {
      setShownValue(displayValue);
  }, [displayValue]);

  // Force update to final value after delay + duration to ensure accuracy
  useEffect(() => {
      const timer = setTimeout(() => {
          setShownValue(safeValue);
      }, delay + 2100);
      return () => clearTimeout(timer);
  }, [safeValue, delay]);

  return (
    <GlassCard hover3d className="p-6 group cursor-pointer h-full border-white/5 bg-[#0a0a0a]">
      <div className="flex items-center gap-5">
          {/* Circular Progress UI */}
          <div className="relative w-16 h-16 flex-shrink-0">
               <svg className="w-full h-full transform -rotate-90">
                   <circle cx="32" cy="32" r="28" stroke="rgba(255,255,255,0.1)" strokeWidth="4" fill="transparent" />
                   <circle 
                      cx="32" cy="32" r="28" 
                      stroke="url(#statGradient)" 
                      strokeWidth="4" 
                      fill="transparent" 
                      strokeDasharray={175}
                      strokeDashoffset={175 - (175 * (Math.min(shownValue, safeValue) / (safeValue || 1)))}
                      className="transition-all duration-1000 ease-out"
                   />
                   <defs>
                       <linearGradient id="statGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                           <stop offset="0%" stopColor="#3b82f6" />
                           <stop offset="100%" stopColor="#8b5cf6" />
                       </linearGradient>
                   </defs>
               </svg>
               <div className="absolute inset-0 flex items-center justify-center">
                   <div className="w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.8)] animate-pulse"></div>
               </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-baseline gap-1">
            <h3 className={`text-4xl font-black text-white group-hover:text-blue-400 transition-colors duration-300 tracking-tight`}>
                {shownValue.toLocaleString()}
            </h3>
            {suffix && <span className="text-xl font-bold text-blue-500">{suffix}</span>}
            </div>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest group-hover:text-gray-300 transition-colors">{label}</p>
          </div>
      </div>
    </GlassCard>
  );
};

export const StatsDisplay: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up">
      <StatCard 
        label="Levels Analyzed" 
        value={4200} 
        delay={0}
        suffix="+"
      />
      <StatCard 
        label="Total Designs" 
        value={31000} 
        delay={200}
      />
      <StatCard 
        label="Portfolios Created" 
        value={8450} 
        delay={400}
      />
      <style>{`
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
            animation: fadeInUp 0.8s ease-out forwards;
            animation-delay: 0.2s;
            opacity: 0;
        }
      `}</style>
    </div>
  );
};