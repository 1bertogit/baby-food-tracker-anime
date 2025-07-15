import React, { useState, useEffect } from 'react';
import { WifiOff, Wifi, CloudOff, RefreshCw, AlertCircle } from 'lucide-react';

interface OfflineData {
  timestamp: number;
  data: any;
  type: 'food' | 'test' | 'supplement' | 'todo';
  action: 'create' | 'update' | 'delete';
  id: string;
}

export const OfflineSupport: React.FC = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [offlineQueue, setOfflineQueue] = useState<OfflineData[]>([]);
  const [showOfflineNotice, setShowOfflineNotice] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowOfflineNotice(false);
      syncOfflineData();
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowOfflineNotice(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Load offline queue from localStorage
    loadOfflineQueue();

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const loadOfflineQueue = () => {
    try {
      const savedQueue = localStorage.getItem('offline-queue');
      if (savedQueue) {
        setOfflineQueue(JSON.parse(savedQueue));
      }
    } catch (error) {
      console.error('Failed to load offline queue:', error);
    }
  };

  const saveOfflineQueue = (queue: OfflineData[]) => {
    try {
      localStorage.setItem('offline-queue', JSON.stringify(queue));
    } catch (error) {
      console.error('Failed to save offline queue:', error);
    }
  };

  const addToOfflineQueue = (data: Omit<OfflineData, 'timestamp'>) => {
    const newItem: OfflineData = {
      ...data,
      timestamp: Date.now()
    };

    const updatedQueue = [...offlineQueue, newItem];
    setOfflineQueue(updatedQueue);
    saveOfflineQueue(updatedQueue);
  };

  const syncOfflineData = async () => {
    if (offlineQueue.length === 0 || isSyncing) return;

    setIsSyncing(true);
    
    try {
      // Process each item in the offline queue
      for (const item of offlineQueue) {
        await processOfflineItem(item);
      }

      // Clear the queue after successful sync
      setOfflineQueue([]);
      saveOfflineQueue([]);
      
      // Show success notification
      console.log('Offline data synced successfully');
      
    } catch (error) {
      console.error('Failed to sync offline data:', error);
    } finally {
      setIsSyncing(false);
    }
  };

  const processOfflineItem = async (item: OfflineData) => {
    // This would integrate with your API
    // For now, we'll just simulate the sync
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Syncing offline item:', item);
        resolve(true);
      }, 100);
    });
  };

  const retrySync = () => {
    if (isOnline) {
      syncOfflineData();
    }
  };

  const dismissOfflineNotice = () => {
    setShowOfflineNotice(false);
  };

  // Expose functions to be used by other components
  useEffect(() => {
    (window as any).offlineSupport = {
      addToQueue: addToOfflineQueue,
      isOnline,
      queueLength: offlineQueue.length
    };
  }, [offlineQueue, isOnline]);

  return (
    <>
      {/* Offline Notice */}
      {showOfflineNotice && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-orange-100 border-b border-orange-200 p-3">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <WifiOff className="h-4 w-4 text-orange-600" />
              <span className="text-sm font-medium text-orange-800">
                Você está offline
              </span>
              <span className="text-sm text-orange-700">
                Suas alterações serão salvas localmente
              </span>
            </div>
            <button
              onClick={dismissOfflineNotice}
              className="text-orange-600 hover:text-orange-800 transition-colors"
              aria-label="Dispensar aviso"
            >
              <AlertCircle className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Sync Status */}
      {offlineQueue.length > 0 && (
        <div className="fixed bottom-4 right-4 z-50">
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 max-w-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <CloudOff className="h-4 w-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-800">
                  Dados offline
                </span>
              </div>
              <div className="flex items-center space-x-1">
                {isOnline ? (
                  <Wifi className="h-4 w-4 text-green-600" />
                ) : (
                  <WifiOff className="h-4 w-4 text-red-600" />
                )}
              </div>
            </div>
            
            <p className="text-sm text-gray-600 mb-3">
              {offlineQueue.length} alteração{offlineQueue.length !== 1 ? 'ões' : ''} 
              {isOnline ? ' aguardando sincronização' : ' salvas localmente'}
            </p>

            {isOnline && (
              <button
                onClick={retrySync}
                disabled={isSyncing}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2 px-3 text-sm font-medium flex items-center justify-center space-x-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RefreshCw className={`h-4 w-4 ${isSyncing ? 'animate-spin' : ''}`} />
                <span>{isSyncing ? 'Sincronizando...' : 'Sincronizar agora'}</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Connection Status Indicator */}
      <div className="fixed top-4 right-4 z-40">
        <div className={`p-2 rounded-full ${isOnline ? 'bg-green-100' : 'bg-red-100'}`}>
          {isOnline ? (
            <Wifi className="h-4 w-4 text-green-600" />
          ) : (
            <WifiOff className="h-4 w-4 text-red-600" />
          )}
        </div>
      </div>
    </>
  );
};

// Helper function to add data to offline queue
export const addToOfflineQueue = (data: Omit<OfflineData, 'timestamp'>) => {
  const offlineSupport = (window as any).offlineSupport;
  if (offlineSupport) {
    offlineSupport.addToQueue(data);
  }
};

// Helper function to check if online
export const isOnline = () => {
  const offlineSupport = (window as any).offlineSupport;
  return offlineSupport ? offlineSupport.isOnline : navigator.onLine;
};

// Helper function to get queue length
export const getOfflineQueueLength = () => {
  const offlineSupport = (window as any).offlineSupport;
  return offlineSupport ? offlineSupport.queueLength : 0;
}; 