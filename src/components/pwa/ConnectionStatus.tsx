import React from 'react';
import { WifiOff } from 'lucide-react';
import { usePWA } from '../../hooks/usePWA';

export const ConnectionStatus: React.FC = () => {
  const { isOnline } = usePWA();

  if (isOnline) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-yellow-500 text-white px-4 py-2">
      <div className="flex items-center justify-center space-x-2">
        <WifiOff className="h-4 w-4" />
        <span className="text-sm font-medium">
          Você está offline. Os dados serão sincronizados quando a conexão voltar.
        </span>
      </div>
    </div>
  );
};