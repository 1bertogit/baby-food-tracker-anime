import React, { Component, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home, Bug } from 'lucide-react';

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
  eventId: string | null;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  showDetails?: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      eventId: null
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    const eventId = `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    this.setState({
      error,
      errorInfo,
      eventId
    });

    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error);
      console.error('Error info:', errorInfo);
    }

    // Call custom error handler
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Log to external service (you can integrate with Sentry, LogRocket, etc.)
    this.logErrorToService(error, errorInfo, eventId);
  }

  private logErrorToService = (error: Error, errorInfo: React.ErrorInfo, eventId: string) => {
    // This is where you would integrate with error tracking services
    const errorData = {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      eventId,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
      userId: localStorage.getItem('userId') || 'anonymous'
    };

    // Store locally for now (in production, send to error tracking service)
    const existingErrors = JSON.parse(localStorage.getItem('app_errors') || '[]');
    existingErrors.push(errorData);
    
    // Keep only last 10 errors to prevent storage overflow
    if (existingErrors.length > 10) {
      existingErrors.splice(0, existingErrors.length - 10);
    }
    
    localStorage.setItem('app_errors', JSON.stringify(existingErrors));
  };

  private handleReload = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  private handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      eventId: null
    });
  };

  render() {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            
            <h1 className="text-xl font-bold text-gray-900 text-center mb-2">
              Oops! Algo deu errado
            </h1>
            
            <p className="text-gray-600 text-center mb-6">
              Ocorreu um erro inesperado. Nossa equipe foi notificada e está trabalhando para resolver.
            </p>

            {this.state.eventId && (
              <div className="bg-gray-50 rounded-lg p-3 mb-4">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">ID do erro:</span> {this.state.eventId}
                </p>
              </div>
            )}

            <div className="space-y-3">
              <button
                onClick={this.handleRetry}
                className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Tentar Novamente
              </button>
              
              <button
                onClick={this.handleGoHome}
                className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors flex items-center justify-center gap-2"
              >
                <Home className="w-4 h-4" />
                Ir para Início
              </button>
              
              <button
                onClick={this.handleReload}
                className="w-full bg-gray-100 text-gray-600 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors text-sm"
              >
                Recarregar Página
              </button>
            </div>

            {this.props.showDetails && this.state.error && (
              <details className="mt-4">
                <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1">
                  <Bug className="w-4 h-4" />
                  Detalhes técnicos
                </summary>
                <div className="mt-2 p-3 bg-gray-50 rounded text-xs font-mono text-gray-700 overflow-auto max-h-40">
                  <div className="mb-2">
                    <strong>Erro:</strong> {this.state.error.message}
                  </div>
                  {this.state.error.stack && (
                    <div>
                      <strong>Stack:</strong>
                      <pre className="whitespace-pre-wrap text-xs">
                        {this.state.error.stack}
                      </pre>
                    </div>
                  )}
                </div>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Hook para usar o ErrorBoundary de forma mais simples
export const useErrorHandler = () => {
  const handleError = (error: Error, errorInfo?: any) => {
    console.error('Error caught by useErrorHandler:', error);
    
    // Você pode integrar com serviços de monitoramento aqui
    const errorData = {
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
      additionalInfo: errorInfo
    };

    // Store locally for now
    const existingErrors = JSON.parse(localStorage.getItem('app_errors') || '[]');
    existingErrors.push(errorData);
    localStorage.setItem('app_errors', JSON.stringify(existingErrors));
  };

  return { handleError };
}; 