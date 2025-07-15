import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <div className="animate-spin rounded-full border-2 border-purple-200 border-t-purple-600 h-full w-full"></div>
    </div>
  );
};

interface LoadingButtonProps {
  loading: boolean;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export const LoadingButton: React.FC<LoadingButtonProps> = ({
  loading,
  children,
  className = '',
  onClick,
  disabled = false
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`flex items-center justify-center space-x-2 ${className} ${
        loading || disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      {loading && <LoadingSpinner size="sm" />}
      <span>{children}</span>
    </button>
  );
};

export const LoadingCard: React.FC = () => (
  <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
    <div className="animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
      <div className="space-y-2">
        <div className="h-3 bg-gray-200 rounded"></div>
        <div className="h-3 bg-gray-200 rounded w-5/6"></div>
        <div className="h-3 bg-gray-200 rounded w-4/6"></div>
      </div>
    </div>
  </div>
);
