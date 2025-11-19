import React from 'react';

interface LoadingSpinnerProps {
  message?: string;
  progress?: number; // 0-100
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message, progress }) => {
  const radius = 56;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - ((progress ?? 0) / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      {/* Spinner with progress */}
      <div className="relative h-40 w-40">
        {/* Background circle */}
        <svg className="absolute top-0 left-0 w-full h-full transform -rotate-90" viewBox="0 0 128 128">
          <circle
            cx="64"
            cy="64"
            r={radius}
            stroke="currentColor"
            strokeWidth="6"
            fill="transparent"
            className="text-white/5"
          />
          {/* Progress circle */}
          {typeof progress !== 'undefined' && (
            <circle
              cx="64"
              cy="64"
              r={radius}
              stroke="url(#spinnerGradient)"
              strokeWidth="6"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 0.35s ease-out' }}
            />
          )}
           <defs>
               <linearGradient id="spinnerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                   <stop offset="0%" stopColor="#3b82f6" />
                   <stop offset="100%" stopColor="#8b5cf6" />
               </linearGradient>
           </defs>
        </svg>
        
        {/* Spinning center */}
        <div className="absolute inset-0 flex items-center justify-center">
             <div className="relative w-16 h-16">
                <div className="absolute inset-0 border-t-2 border-blue-500 rounded-full animate-spin"></div>
                <div className="absolute inset-2 border-r-2 border-purple-600 rounded-full animate-spin animation-delay-200"></div>
             </div>
        </div>
        
        {/* Progress percentage */}
        {typeof progress !== 'undefined' && (
            <div className="absolute inset-0 flex items-center justify-center pt-20">
                <span className="text-sm font-bold text-blue-500 mt-2">{Math.round(progress)}%</span>
            </div>
        )}
      </div>

      {/* Message */}
      {message && (
        <div className="text-center space-y-2 max-w-md animate-fade-in">
          <p className="text-xl font-semibold text-white tracking-tight">{message}</p>
          {typeof progress !== 'undefined' && (
             <p className="text-sm text-gray-500">This may take 1-2 minutes...</p>
          )}
        </div>
      )}

      {/* Progress bar */}
      {typeof progress !== 'undefined' && (
        <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
            <div 
            className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
            style={{ width: `${progress}%`, transition: 'width 0.35s ease-out' }}
            />
        </div>
      )}
    </div>
  );
};