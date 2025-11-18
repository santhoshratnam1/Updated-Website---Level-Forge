import React from 'react';
import { Icon, type IconName } from './Icon';

interface ButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: IconName;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  loading?: boolean;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ 
  onClick, 
  disabled = false,
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  fullWidth = false,
  loading = false,
  className = ''
}) => {
  const baseClasses = "relative group inline-flex items-center justify-center gap-2 font-bold rounded-xl transition-all duration-300 overflow-hidden";
  
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };
  
  const variantClasses = {
    primary: "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-lg",
    secondary: "bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-lg",
    outline: "bg-transparent border border-white/20 text-white hover:bg-white/10 hover:border-white/40 disabled:opacity-50",
    ghost: "bg-transparent text-gray-300 hover:text-white hover:bg-white/10 disabled:opacity-50"
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${baseClasses} 
        ${sizeClasses[size]} 
        ${variantClasses[variant]} 
        ${fullWidth ? 'w-full' : ''}
        ${disabled || loading ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}
        ${className}
      `}
    >
      {/* Animated background shimmer for primary/secondary */}
      {!disabled && !loading && (variant === 'primary' || variant === 'secondary') && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      )}
      
      {/* Content */}
      <span className="relative flex items-center gap-2 z-10">
        {loading ? (
          <>
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            <span>Processing...</span>
          </>
        ) : (
          <>
            {icon && iconPosition === 'left' && <Icon name={icon} className="w-5 h-5" />}
            {children}
            {icon && iconPosition === 'right' && <Icon name={icon} className="w-5 h-5" />}
          </>
        )}
      </span>
      
      {/* Particle effect on hover for primary */}
      {!disabled && !loading && variant === 'primary' && (
        <>
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-1 h-1 bg-white rounded-full animate-ping"></div>
            <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-white rounded-full animate-ping" style={{ animationDelay: '0.2s' }}></div>
            <div className="absolute bottom-1/4 left-1/2 w-1 h-1 bg-white rounded-full animate-ping" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </>
      )}
    </button>
  );
};