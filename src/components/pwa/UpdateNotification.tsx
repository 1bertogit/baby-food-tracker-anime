import React, { useState, useEffect } from 'react';
import { RefreshCw, Download, X, Clock } from 'lucide-react';
import { usePWA } from '../../hooks/usePWA';

export const UpdateNotification: React.FC = () => {
  const { isUpdateAvailable, updateApp } = usePWA();
  const [isVisible, setIsVisible] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [isDismissed, setIsDismissed] = useState(false);

  // Show notification with animation
  useEffect(() => {
    if (isUpdateAvailable && !isDismissed) {
      setIsVisible(true);
      
      // Check if user has dismissed this update before
      const dismissedUpdate = localStorage.getItem('dismissed-update');
      if (dismissedUpdate) {
        const dismissedTime = parseInt(dismissedUpdate);
        const now = Date.now();
        // Show again after 1 hour
        if (now - dismissedTime < 60 * 60 * 1000) {
          setIsDismissed(true);
          return;
        }
      }

      // Auto-update countdown (optional)
      const autoUpdateDelay = 30; // 30 seconds
      setCountdown(autoUpdateDelay);
      
      const interval = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            handleUpdate();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isUpdateAvailable, isDismissed]);

  const handleUpdate = async () => {
    setIsUpdating(true);
    try {
      await updateApp();
    } catch (error) {
      console.error('Update failed:', error);
      setIsUpdating(false);
    }
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
    localStorage.setItem('dismissed-update', Date.now().toString());
  };

  const handlePostpone = () => {
    setCountdown(0);
    setIsVisible(false);
    // Show again in 10 minutes
    setTimeout(() => {
      setIsVisible(true);
      setCountdown(30);
    }, 10 * 60 * 1000);
  };

  if (!isUpdateAvailable || isDismissed || !isVisible) return null;

  return (
    <div className="fixed top-4 left-4 right-4 z-50 md:left-auto md:right-4 md:w-80">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 animate-in slide-in-from-top-2 duration-300">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 rounded-full p-2">
              <RefreshCw className={`h-5 w-5 text-blue-600 ${isUpdating ? 'animate-spin' : ''}`} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Nova versão disponível</h3>
              <p className="text-sm text-gray-600">
                {isUpdating ? 'Atualizando...' : 'Uma atualização está pronta'}
              </p>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            disabled={isUpdating}
            className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
            aria-label="Dispensar notificação"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="mb-4">
          <p className="text-gray-700 text-sm">
            Uma nova versão do Baby Food Tracker está disponível com melhorias e correções.
          </p>
          
          {countdown > 0 && !isUpdating && (
            <div className="mt-2 flex items-center space-x-2 text-sm text-gray-600">
              <Clock className="h-4 w-4" />
              <span>Atualização automática em {countdown}s</span>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="space-y-2">
          <button
            onClick={handleUpdate}
            disabled={isUpdating}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3 px-4 font-medium text-sm flex items-center justify-center space-x-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="h-4 w-4" />
            <span>{isUpdating ? 'Atualizando...' : 'Atualizar agora'}</span>
          </button>
          
          {!isUpdating && (
            <button
              onClick={handlePostpone}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl py-2 px-4 font-medium text-sm transition-colors"
            >
              Lembrar mais tarde
            </button>
          )}
        </div>

        {/* Note */}
        <p className="text-center text-xs text-gray-500 mt-2">
          {isUpdating ? 'Por favor, aguarde...' : 'O app será reiniciado após a atualização'}
        </p>
      </div>
    </div>
  );
};