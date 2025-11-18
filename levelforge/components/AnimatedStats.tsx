import React from 'react';
import { GlassCard } from './GlassCard';
import { useAnimatedNumber } from '../hooks/useAnimatedNumber';

interface StatCardProps {
  label: string;
  value: number;
  suffix?: string;
  delay?: number;
  gradient?: string;
}

const StatCard: React.FC<StatCardProps> = ({ 
  label, 
  value, 
  suffix = '', 
  delay = 0,
  gradient = 'from-amber-300 to-orange-500'
}) => {
  const displayValue = useAnimatedNumber(value, 2000, delay);

  return (
    <GlassCard hover3d className="p-6 group cursor-pointer h-full border-white/5 bg-white/[0.02]">
      <div className="flex items-center gap-4">
          {/* Circular Progress Placeholder */}
          <div className="relative w-16 h-16">
               <svg className="w-full h-full transform -rotate-90">
                   <circle cx="32" cy="32" r="28" stroke="rgba(255,255,255,0.05)" strokeWidth="4" fill="transparent" />
                   <circle 
                      cx="32" cy="32" r="28" 
                      stroke="url(#statGradient)" 
                      strokeWidth="4" 
                      fill="transparent" 
                      strokeDasharray={175}
                      strokeDashoffset={175 - (175 * (displayValue / value))}
                      className="transition-all duration-1000 ease-out"
                   />
                   <defs>
                       <linearGradient id="statGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                           <stop offset="0%" stopColor="#f59e0b" />
                           <stop offset="100%" stopColor="#ea580c" />
                       </linearGradient>
                   </defs>
               </svg>
               <div className="absolute inset-0 flex items-center justify-center">
                   <div className="w-2 h-2 bg-amber-500 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.8)]"></div>
               </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-baseline gap-1">
            <h3 className={`text-4xl font-bold text-white group-hover:text-amber-400 transition-colors duration-300`}>
                {displayValue.toLocaleString()}
            </h3>
            {suffix && <span className="text-xl font-bold text-gray-500">{suffix}</span>}
            </div>
            <p className="text-gray-500 text-xs font-medium uppercase tracking-wider">{label}</p>
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
        label="Portfolio Created" 
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