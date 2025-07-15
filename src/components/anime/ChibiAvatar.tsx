import React from 'react';
import { motion } from 'framer-motion';

interface ChibiAvatarProps {
  size?: 'sm' | 'md' | 'lg';
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

export const ChibiAvatar: React.FC<ChibiAvatarProps> = ({
  size = 'md',
  isActive = false,
  onClick,
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <motion.div
      className={`
        ${sizeClasses[size]} 
        rounded-full 
        bg-anime-gradient 
        shadow-kawaii 
        border-2 
        border-white/30 
        flex 
        items-center 
        justify-center 
        cursor-pointer 
        transition-all 
        duration-300 
        hover:scale-110 
        ${isActive ? 'animate-bounce-kawaii' : ''} 
        ${className}
      `}
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      animate={isActive ? { y: [-2, 2, -2] } : {}}
      transition={{ 
        y: { 
          duration: 1.5, 
          repeat: Infinity, 
          ease: "easeInOut" 
        } 
      }}
    >
      {/* Kawaii Face */}
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Main face circle */}
        <div className="w-full h-full bg-gradient-to-br from-kawaii-cream to-kawaii-peach rounded-full shadow-cel border border-white/50 flex items-center justify-center">
          {/* Eyes */}
          <div className="flex space-x-1.5 mb-1">
            <div className="w-1.5 h-2 bg-gray-800 rounded-full transform -rotate-12"></div>
            <div className="w-1.5 h-2 bg-gray-800 rounded-full transform rotate-12"></div>
          </div>
          
          {/* Mouth */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
            <div className="w-2 h-1 border-b-2 border-gray-800 rounded-full"></div>
          </div>
          
          {/* Blush */}
          <div className="absolute top-1/2 left-1 w-1.5 h-1 bg-kawaii-pink rounded-full opacity-60"></div>
          <div className="absolute top-1/2 right-1 w-1.5 h-1 bg-kawaii-pink rounded-full opacity-60"></div>
        </div>
        
        {/* Floating hearts effect when active */}
        {isActive && (
          <>
            <motion.div
              className="absolute -top-2 -right-1 text-kawaii-pink text-xs"
              animate={{ 
                y: [-10, -20, -10],
                opacity: [0, 1, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                delay: 0
              }}
            >
              ♡
            </motion.div>
            <motion.div
              className="absolute -top-1 -left-2 text-kawaii-lavender text-xs"
              animate={{ 
                y: [-8, -18, -8],
                opacity: [0, 1, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                delay: 1
              }}
            >
              ♡
            </motion.div>
          </>
        )}
      </div>
    </motion.div>
  );
};