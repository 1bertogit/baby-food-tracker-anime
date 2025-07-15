import React from 'react';
import { Loader2, Baby } from 'lucide-react';

interface LazyLoaderProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  showLogo?: boolean;
  className?: string;
}

export const LazyLoader: React.FC<LazyLoaderProps> = ({
  message = 'Carregando...',
  size = 'md',
  showLogo = true,
  className = ''
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  const containerClasses = {
    sm: 'p-4',
    md: 'p-8',
    lg: 'p-12'
  };

  return (
    <div className={`flex min-h-screen items-center justify-center bg-background ${className}`}>
      <div className={`flex flex-col items-center space-y-4 ${containerClasses[size]}`}>
        {showLogo && (
          <div className="flex items-center space-x-2 mb-4">
            <Baby className="w-8 h-8 text-app-primary" />
            <span className="text-xl font-bold text-foreground">Baby Food Tracker</span>
          </div>
        )}
        
        <div className="relative">
          <Loader2 className={`${sizeClasses[size]} animate-spin text-app-primary`} />
          
          {/* Pulse animation background */}
          <div className={`absolute inset-0 ${sizeClasses[size]} rounded-full bg-app-primary/20 animate-pulse`} />
        </div>
        
        <p className="text-sm text-muted-foreground animate-pulse">
          {message}
        </p>
        
        {/* Progress dots */}
        <div className="flex space-x-1">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 bg-app-primary rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Skeleton loader for components
export const SkeletonLoader: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`animate-pulse ${className}`}>
    <div className="space-y-4">
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
      </div>
      <div className="h-32 bg-gray-300 dark:bg-gray-700 rounded"></div>
    </div>
  </div>
);

// Card skeleton
export const CardSkeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`animate-pulse p-4 border rounded-lg ${className}`}>
    <div className="space-y-3">
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
      <div className="space-y-2">
        <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded"></div>
        <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-4/5"></div>
      </div>
      <div className="flex space-x-2">
        <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-16"></div>
        <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-16"></div>
      </div>
    </div>
  </div>
);

// Form skeleton
export const FormSkeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`animate-pulse space-y-4 ${className}`}>
    <div className="space-y-2">
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
      <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded"></div>
    </div>
    <div className="space-y-2">
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/3"></div>
      <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded"></div>
    </div>
    <div className="space-y-2">
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
      <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded"></div>
    </div>
    <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-32"></div>
  </div>
); 