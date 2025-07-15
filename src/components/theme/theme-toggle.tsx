import React, { useState, useEffect } from 'react';
import { Moon, Sun, Monitor, Palette } from 'lucide-react';
import { useTheme } from 'next-themes';

interface ThemeToggleProps {
  variant?: 'button' | 'dropdown' | 'switch';
  showLabel?: boolean;
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  variant = 'button', 
  showLabel = false,
  className = ''
}) => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    if (variant === 'button') {
      setTheme(theme === 'dark' ? 'light' : 'dark');
    } else if (variant === 'dropdown') {
      setIsOpen(!isOpen);
    }
  };

  const selectTheme = (selectedTheme: string) => {
    setTheme(selectedTheme);
    setIsOpen(false);
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className={`w-10 h-10 rounded-lg bg-gray-200 animate-pulse ${className}`} />
    );
  }

  const getThemeIcon = (themeType: string) => {
    switch (themeType) {
      case 'dark':
        return <Moon className="w-4 h-4" />;
      case 'light':
        return <Sun className="w-4 h-4" />;
      case 'system':
        return <Monitor className="w-4 h-4" />;
      default:
        return <Palette className="w-4 h-4" />;
    }
  };

  const getThemeLabel = (themeType: string) => {
    switch (themeType) {
      case 'dark':
        return 'Modo Escuro';
      case 'light':
        return 'Modo Claro';
      case 'system':
        return 'Sistema';
      default:
        return 'Tema';
    }
  };

  if (variant === 'dropdown') {
    return (
      <div className={`relative ${className}`}>
        <button
          onClick={toggleTheme}
          className="relative inline-flex items-center justify-center p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700 transition-colors"
          aria-label="Selecionar tema"
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          {getThemeIcon(theme || 'system')}
          {showLabel && (
            <span className="ml-2 text-sm font-medium">
              {getThemeLabel(theme || 'system')}
            </span>
          )}
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
            <div className="py-1">
              {['light', 'dark', 'system'].map((themeOption) => (
                <button
                  key={themeOption}
                  onClick={() => selectTheme(themeOption)}
                  className={`w-full flex items-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                    theme === themeOption
                      ? 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                  role="menuitem"
                >
                  {getThemeIcon(themeOption)}
                  <span className="ml-3">{getThemeLabel(themeOption)}</span>
                  {theme === themeOption && (
                    <span className="ml-auto text-purple-600 dark:text-purple-400">✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  if (variant === 'switch') {
    return (
      <div className={`flex items-center space-x-3 ${className}`}>
        {showLabel && (
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {getThemeLabel(theme || 'system')}
          </span>
        )}
        <button
          onClick={toggleTheme}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
            resolvedTheme === 'dark' ? 'bg-purple-600' : 'bg-gray-200'
          }`}
          role="switch"
          aria-checked={resolvedTheme === 'dark'}
          aria-label={`Mudar para ${resolvedTheme === 'dark' ? 'modo claro' : 'modo escuro'}`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              resolvedTheme === 'dark' ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>
    );
  }

  // Default button variant
  return (
    <button
      onClick={toggleTheme}
      className={`relative inline-flex items-center justify-center p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${className}`}
      aria-label={`Mudar para ${resolvedTheme === 'dark' ? 'modo claro' : 'modo escuro'}`}
    >
      <div className="relative w-5 h-5">
        <Sun 
          className={`absolute inset-0 w-5 h-5 transition-all duration-300 ${
            resolvedTheme === 'dark' ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'
          }`} 
        />
        <Moon 
          className={`absolute inset-0 w-5 h-5 transition-all duration-300 ${
            resolvedTheme === 'dark' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'
          }`} 
        />
      </div>
      {showLabel && (
        <span className="ml-2 text-sm font-medium">
          {getThemeLabel(resolvedTheme || 'system')}
        </span>
      )}
    </button>
  );
};