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
  gradient = 'from-cyan-500 to-blue-600'
}) => {
  const displayValue = useAnimatedNumber(value, 2000, delay);

  return (
    <GlassCard hover3d className="p-6 group cursor-pointer h-full">
      <div className="space-y-2">
        <p className="text-gray-400 text-sm font-medium uppercase tracking-wider">{label}</p>
        <div className="flex items-baseline gap-2">
          <h3 className={`text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r ${gradient} group-hover:scale-110 transition-transform duration-300`}>
            {displayValue.toLocaleString()}
          </h3>
          {suffix && <span className="text-2xl font-bold text-gray-400">{suffix}</span>}
        </div>
      </div>
      
      {/* Animated progress bar */}
      <div className="mt-4 h-1 bg-gray-800 rounded-full overflow-hidden">
        <div 
          className={`h-full bg-gradient-to-r ${gradient} transition-all duration-100 ease-out`}
          style={{ width: `${(displayValue / value) * 100}%` }}
        ></div>
      </div>
    </GlassCard>
  );
};

export const StatsDisplay: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-fade-in-up">
      <StatCard 
        label="Levels Analyzed" 
        value={4200} 
        delay={0}
        gradient="from-cyan-500 to-blue-600"
        suffix="+"
      />
      <StatCard 
        label="Total Designs" 
        value={31000} 
        delay={200}
        gradient="from-purple-500 to-pink-600"
      />
      <StatCard 
        label="Portfolio Created" 
        value={8450} 
        delay={400}
        gradient="from-green-500 to-emerald-600"
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