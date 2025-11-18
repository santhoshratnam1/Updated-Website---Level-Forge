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
  gradient = 'from-cyan-500 to-blue-600',
  index = 0
}) => {
  return (
    <GlassCard 
      hover3d 
      className="p-6 cursor-pointer group h-full"
      style={{
        animationDelay: `${index * 100}ms`
      }}
    >
      {/* Icon with gradient background */}
      <div className="relative mb-4 w-fit">
        {/* Glow effect */}
        <div className={`absolute inset-0 bg-gradient-to-r ${gradient} rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300`}></div>
        
        {/* Icon container */}
        <div className={`relative p-4 bg-gradient-to-br ${gradient} rounded-2xl shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
          <Icon name={icon} className="w-8 h-8 text-white" />
        </div>
      </div>
      
      {/* Content */}
      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-400 transition-all duration-300">
        {title}
      </h3>
      
      <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
        {description}
      </p>
      
      {/* Animated arrow */}
      <div className="mt-4 flex items-center gap-2 text-cyan-400 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-2 transition-all duration-300 absolute bottom-6 right-6">
        <span className="text-xs font-bold uppercase tracking-wider">Explore</span>
        <Icon name="arrow" className="w-4 h-4" />
      </div>
      
      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </GlassCard>
  );
};

export const FeaturesGrid: React.FC = () => {
  const features = [
    {
      icon: 'fps' as IconName,
      title: 'Combat Analysis',
      description: 'Deep dive into encounter design, cover placement, and tactical elements with AI-powered insights.',
      gradient: 'from-red-500 to-orange-600'
    },
    {
      icon: 'grid' as IconName,
      title: 'Flow Visualization',
      description: 'Generate top-down maps and flow diagrams that showcase your level\'s spatial design.',
      gradient: 'from-cyan-500 to-blue-600'
    },
    {
      icon: 'ruler' as IconName,
      title: 'Pacing Analysis',
      description: 'Understand intensity curves, downtime, and player progression through your level.',
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      icon: 'video' as IconName,
      title: 'Video Timeline',
      description: 'Upload gameplay footage and get detailed event-by-event breakdown with pacing insights.',
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      icon: 'logo' as IconName,
      title: 'Portfolio Export',
      description: 'Professional PDF portfolios with annotated visuals and comprehensive analysis.',
      gradient: 'from-yellow-500 to-orange-600'
    },
    {
      icon: 'help' as IconName,
      title: 'AI Assistant',
      description: 'Ask questions about your design and get expert-level feedback in real-time.',
      gradient: 'from-indigo-500 to-purple-600'
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h2 className="text-5xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
          Powerful Features
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Everything you need to create portfolio-ready level design documentation
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} index={index} />
        ))}
      </div>
    </div>
  );
};