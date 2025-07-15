import React from 'react';
import { Smartphone, Wifi, Check } from 'lucide-react';
import { usePWA } from '../../hooks/usePWA';

export const PWAStatus: React.FC = () => {
  const { isInstalled, isOnline, canInstall, showInstallPrompt } = usePWA();

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100">
      <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
        <Smartphone className="h-5 w-5 mr-2 text-purple-500" />
        Status do App
      </h3>
      
      <div className="space-y-3">
        {/* Installation Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${isInstalled ? 'bg-green-500' : 'bg-gray-300'}`}></div>
            <span className="text-sm text-gray-700">
              {isInstalled ? 'App Instalado' : 'App não instalado'}
            </span>
          </div>
          {isInstalled ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : canInstall ? (
            <button
              onClick={showInstallPrompt}
              className="text-purple-600 hover:text-purple-700 text-xs font-medium"
            >
              Instalar
            </button>
          ) : null}
        </div>

        {/* Connection Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className="text-sm text-gray-700">
              {isOnline ? 'Online' : 'Offline'}
            </span>
          </div>
          <Wifi className={`h-4 w-4 ${isOnline ? 'text-green-500' : 'text-red-500'}`} />
        </div>

        {/* PWA Features */}
        <div className="border-t pt-3 mt-3">
          <div className="text-xs text-gray-600 mb-2">Funcionalidades PWA:</div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center space-x-1">
              <Check className="h-3 w-3 text-green-500" />
              <span>Cache offline</span>
            </div>
            <div className="flex items-center space-x-1">
              <Check className="h-3 w-3 text-green-500" />
              <span>Instalável</span>
            </div>
            <div className="flex items-center space-x-1">
              <Check className="h-3 w-3 text-green-500" />
              <span>Responsivo</span>
            </div>
            <div className="flex items-center space-x-1">
              <Check className="h-3 w-3 text-green-500" />
              <span>Seguro (HTTPS)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};