import React from 'react';
import { GlassCard } from './GlassCard';
import { Icon, type IconName } from './Icon';

interface FeatureCardProps {
  icon: IconName;
  title: string;
  description: string;
  gradient?: string;
  index?: number;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ 
  icon, 
  title, 
  description, 
  gradient = 'from-amber-500 to-orange-600',
  index = 0
}) => {
  return (
    <GlassCard 
      hover3d 
      className="p-8 cursor-pointer group h-full bg-white/[0.02] border-white/5 hover:border-amber-500/30"
      style={{
        animationDelay: `${index * 100}ms`
      }}
    >
      {/* Icon with gradient background */}
      <div className="relative mb-6 w-fit">
        {/* Glow effect */}
        <div className={`absolute inset-0 bg-gradient-to-r ${gradient} rounded-full blur-xl opacity-20 group-hover:opacity-50 transition-opacity duration-300`}></div>
        
        {/* Icon container */}
        <div className={`relative p-3 rounded-full bg-gradient-to-br from-white/10 to-white/5 border border-white/10 group-hover:scale-110 group-hover:border-amber-500/50 transition-all duration-300`}>
          <Icon name={icon} className="w-6 h-6 text-amber-400" />
        </div>
      </div>
      
      {/* Content */}
      <h3 className="text-lg font-bold text-white mb-3 group-hover:text-amber-400 transition-colors duration-300">
        {title}
      </h3>
      
      <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
        {description}
      </p>
      
    </GlassCard>
  );
};

export const FeaturesGrid: React.FC = () => {
  const features = [
    {
      icon: 'fps' as IconName,
      title: 'Combat Analysis',
      description: 'Deep dive into encounter design, cover placement, and tactical elements with AI-powered insights.',
      gradient: 'from-amber-500 to-orange-600'
    },
    {
      icon: 'grid' as IconName,
      title: 'Flow Visualization',
      description: 'Generate top-down maps and flow diagrams that showcase your level\'s spatial design.',
      gradient: 'from-orange-500 to-red-600'
    },
    {
      icon: 'ruler' as IconName,
      title: 'Pacing Analysis',
      description: 'Understand intensity curves, downtime, and player progression through your level.',
      gradient: 'from-amber-400 to-yellow-600'
    },
    {
      icon: 'video' as IconName,
      title: 'Video Timeline',
      description: 'Upload gameplay footage and get detailed event-by-event breakdown with pacing insights.',
      gradient: 'from-amber-600 to-orange-700'
    },
    {
      icon: 'logo' as IconName,
      title: 'Portfolio Export',
      description: 'Professional PDF portfolios with annotated visuals and comprehensive analysis.',
      gradient: 'from-yellow-500 to-amber-600'
    },
    {
      icon: 'help' as IconName,
      title: 'AI Assistant',
      description: 'Ask questions about your design and get expert-level feedback in real-time.',
      gradient: 'from-orange-400 to-red-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {features.map((feature, index) => (
        <FeatureCard key={index} {...feature} index={index} />
      ))}
    </div>
  );
};