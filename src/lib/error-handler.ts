interface ErrorData {
  message: string;
  stack?: string;
  timestamp: string;
  url: string;
  userAgent: string;
  userId?: string;
  type: 'javascript' | 'promise' | 'network' | 'custom';
  severity: 'low' | 'medium' | 'high' | 'critical';
  context?: Record<string, any>;
}

interface ErrorHandlerConfig {
  enableConsoleLogging: boolean;
  enableLocalStorage: boolean;
  maxStoredErrors: number;
  onError?: (error: ErrorData) => void;
  enableNetworkErrorTracking: boolean;
}

class GlobalErrorHandler {
  private config: ErrorHandlerConfig;
  private isInitialized = false;

  constructor(config: Partial<ErrorHandlerConfig> = {}) {
    this.config = {
      enableConsoleLogging: true,
      enableLocalStorage: true,
      maxStoredErrors: 50,
      enableNetworkErrorTracking: true,
      ...config
    };
  }

  init() {
    if (this.isInitialized) return;

    // Handle uncaught JavaScript errors
    window.addEventListener('error', this.handleJavaScriptError);
    
    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', this.handlePromiseRejection);

    // Handle network errors if enabled
    if (this.config.enableNetworkErrorTracking) {
      this.setupNetworkErrorTracking();
    }

    this.isInitialized = true;
  }

  private handleJavaScriptError = (event: ErrorEvent) => {
    const errorData: ErrorData = {
      message: event.message,
      stack: event.error?.stack,
      timestamp: new Date().toISOString(),
      url: event.filename || window.location.href,
      userAgent: navigator.userAgent,
      type: 'javascript',
      severity: 'high',
      context: {
        lineno: event.lineno,
        colno: event.colno,
        source: event.filename
      }
    };

    this.logError(errorData);
  };

  private handlePromiseRejection = (event: PromiseRejectionEvent) => {
    const errorData: ErrorData = {
      message: event.reason?.message || 'Unhandled Promise Rejection',
      stack: event.reason?.stack,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      type: 'promise',
      severity: 'medium',
      context: {
        reason: event.reason
      }
    };

    this.logError(errorData);
  };

  private setupNetworkErrorTracking() {
    // Intercept fetch requests to track network errors
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      try {
        const response = await originalFetch(...args);
        
        if (!response.ok) {
          const errorData: ErrorData = {
            message: `Network Error: ${response.status} ${response.statusText}`,
            timestamp: new Date().toISOString(),
            url: typeof args[0] === 'string' ? args[0] : (args[0] as Request).url || window.location.href,
            userAgent: navigator.userAgent,
            type: 'network',
            severity: response.status >= 500 ? 'high' : 'medium',
            context: {
              status: response.status,
              statusText: response.statusText,
              method: args[1]?.method || 'GET'
            }
          };
          
          this.logError(errorData);
        }
        
        return response;
      } catch (error) {
        const err = error as Error;
        const errorData: ErrorData = {
          message: `Network Error: ${err.message}`,
          stack: err.stack,
          timestamp: new Date().toISOString(),
          url: typeof args[0] === 'string' ? args[0] : (args[0] as Request).url || window.location.href,
          userAgent: navigator.userAgent,
          type: 'network',
          severity: 'high',
          context: {
            method: args[1]?.method || 'GET'
          }
        };
        
        this.logError(errorData);
        throw error;
      }
    };
  }

  logError(errorData: ErrorData) {
    // Add user ID if available
    const userId = localStorage.getItem('userId');
    if (userId) {
      errorData.userId = userId;
    }

    // Console logging
    if (this.config.enableConsoleLogging) {
      console.error('Global Error Handler:', errorData);
    }

    // Local storage
    if (this.config.enableLocalStorage) {
      this.storeErrorLocally(errorData);
    }

    // Custom error handler
    if (this.config.onError) {
      this.config.onError(errorData);
    }

    // In production, you would send to error tracking service
    if (process.env.NODE_ENV === 'production') {
      this.sendToErrorService(errorData);
    }
  }

  private storeErrorLocally(errorData: ErrorData) {
    try {
      const existingErrors = JSON.parse(localStorage.getItem('app_errors') || '[]');
      existingErrors.push(errorData);
      
      // Keep only the most recent errors
      if (existingErrors.length > this.config.maxStoredErrors) {
        existingErrors.splice(0, existingErrors.length - this.config.maxStoredErrors);
      }
      
      localStorage.setItem('app_errors', JSON.stringify(existingErrors));
    } catch (e) {
      console.warn('Failed to store error locally:', e);
    }
  }

  private sendToErrorService(errorData: ErrorData) {
    // This is where you would integrate with services like Sentry, LogRocket, etc.
    // For now, we'll just log it
    console.info('Would send to error service:', errorData);
  }

  // Manual error logging
  logCustomError(error: Error | string, context?: Record<string, any>, severity: ErrorData['severity'] = 'medium') {
    const errorData: ErrorData = {
      message: typeof error === 'string' ? error : error.message,
      stack: typeof error === 'string' ? undefined : error.stack,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      type: 'custom',
      severity,
      context
    };

    this.logError(errorData);
  }

  // Get stored errors for debugging
  getStoredErrors(): ErrorData[] {
    try {
      return JSON.parse(localStorage.getItem('app_errors') || '[]');
    } catch (e) {
      console.warn('Failed to retrieve stored errors:', e);
      return [];
    }
  }

  // Clear stored errors
  clearStoredErrors() {
    localStorage.removeItem('app_errors');
  }

  // Health check for the error handler
  healthCheck(): boolean {
    return this.isInitialized;
  }

  destroy() {
    if (!this.isInitialized) return;

    window.removeEventListener('error', this.handleJavaScriptError);
    window.removeEventListener('unhandledrejection', this.handlePromiseRejection);
    
    this.isInitialized = false;
  }
}

// Create singleton instance
export const globalErrorHandler = new GlobalErrorHandler({
  enableConsoleLogging: process.env.NODE_ENV === 'development',
  enableLocalStorage: true,
  maxStoredErrors: 50,
  enableNetworkErrorTracking: true
});

// Initialize on module load
if (typeof window !== 'undefined') {
  globalErrorHandler.init();
}

// Export for manual use
export const logError = (error: Error | string, context?: Record<string, any>, severity?: ErrorData['severity']) => {
  globalErrorHandler.logCustomError(error, context, severity);
};

// Helper function to create user-friendly error messages
export const createUserFriendlyError = (error: Error | string): string => {
  const message = typeof error === 'string' ? error : error.message;
  
  // Map technical errors to user-friendly messages
  const errorMappings: Record<string, string> = {
    'Network Error': 'Problema de conexão. Verifique sua internet e tente novamente.',
    'TypeError': 'Ocorreu um erro técnico. Tente recarregar a página.',
    'ReferenceError': 'Ocorreu um erro técnico. Tente recarregar a página.',
    'Failed to fetch': 'Não foi possível conectar ao servidor. Verifique sua conexão.',
    'Unauthorized': 'Sua sessão expirou. Faça login novamente.',
    'Forbidden': 'Você não tem permissão para realizar esta ação.',
    'Not Found': 'O recurso solicitado não foi encontrado.',
    'Internal Server Error': 'Erro interno do servidor. Tente novamente em alguns minutos.'
  };

  // Check for exact matches first
  if (errorMappings[message]) {
    return errorMappings[message];
  }

  // Check for partial matches
  for (const [key, value] of Object.entries(errorMappings)) {
    if (message.includes(key)) {
      return value;
    }
  }

  // Default fallback
  return 'Ocorreu um erro inesperado. Tente novamente ou entre em contato com o suporte.';
};

export type { ErrorData, ErrorHandlerConfig }; 