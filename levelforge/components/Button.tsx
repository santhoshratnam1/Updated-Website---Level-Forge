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
  const baseClasses = "relative group inline-flex items-center justify-center gap-2 font-bold transition-all duration-300 overflow-hidden";
  
  // Updated to rounded-full for pill shape
  const sizeClasses = {
    sm: "px-5 py-2 text-sm rounded-full",
    md: "px-8 py-3 text-base rounded-full",
    lg: "px-10 py-4 text-lg rounded-full"
  };
  
  const variantClasses = {
    primary: "bg-blue-600 hover:bg-blue-500 text-white shadow-lg hover:shadow-xl hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-lg",
    secondary: "glass text-white hover:bg-white/10 shadow-lg hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100",
    outline: "bg-transparent border border-white/20 text-white hover:bg-white/10 hover:border-white/40 disabled:opacity-50",
    ghost: "bg-transparent text-gray-400 hover:text-white hover:bg-white/5 disabled:opacity-50"
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
    </button>
  );
};