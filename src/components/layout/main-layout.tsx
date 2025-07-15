import { FC, PropsWithChildren } from 'react';
import { Baby } from 'lucide-react';

import { ThemeToggle } from '@/components/theme/theme-toggle';

export const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="bg-card shadow-sm border-b border-border" role="banner">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Baby className="w-6 h-6 text-app-primary" />
            <a href="/" className="text-xl font-bold text-foreground hover:text-app-primary transition-colors">
              Baby Food Tracker
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle variant="dropdown" showLabel={false} />
          </div>
        </nav>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500">
            © {new Date().getFullYear()} Your Project. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};
