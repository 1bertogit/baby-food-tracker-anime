import React from 'react';
import { Download, X, Smartphone } from 'lucide-react';
import { usePWA } from '../../hooks/usePWA';

export const InstallPrompt: React.FC = () => {
  const { canInstall, showInstallPrompt, hideInstallPrompt } = usePWA();

  if (!canInstall) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:w-80">
      <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-2xl shadow-2xl p-4 border border-white/20">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="bg-white/20 rounded-full p-2">
              <Smartphone className="h-5 w-5" />
            </div>
            <h3 className="font-semibold text-sm">Instalar App</h3>
          </div>
          <button
            onClick={hideInstallPrompt}
            className="bg-white/20 hover:bg-white/30 rounded-full p-1 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="mb-4">
          <p className="text-white/90 text-sm mb-2">
            Instale o <strong>Baby Food Tracker</strong> na tela inicial do seu celular
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs text-white/80">
            <div className="flex items-center space-x-1">
              <span className="w-1.5 h-1.5 bg-white/60 rounded-full"></span>
              <span>Acesso rápido</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="w-1.5 h-1.5 bg-white/60 rounded-full"></span>
              <span>Funciona offline</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="w-1.5 h-1.5 bg-white/60 rounded-full"></span>
              <span>Notificações</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="w-1.5 h-1.5 bg-white/60 rounded-full"></span>
              <span>Como app nativo</span>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex space-x-2">
          <button
            onClick={showInstallPrompt}
            className="flex-1 bg-white text-purple-600 hover:bg-gray-100 rounded-xl py-3 px-4 font-medium text-sm flex items-center justify-center space-x-2 transition-colors"
          >
            <Download className="h-4 w-4" />
            <span>Instalar</span>
          </button>
          <button
            onClick={hideInstallPrompt}
            className="bg-white/20 hover:bg-white/30 rounded-xl py-3 px-4 font-medium text-sm transition-colors"
          >
            Depois
          </button>
        </div>

        {/* Install instructions hint */}
        <div className="mt-3 text-center">
          <p className="text-white/70 text-xs">
            Ou toque em <span className="font-medium">⋮</span> → "Instalar app"
          </p>
        </div>
      </div>
    </div>
  );
};