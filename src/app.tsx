import { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route, RouteProps, Navigate } from 'react-router-dom'
import { ThemeProvider } from 'next-themes'
import { Toaster } from './components/ui/sonner'
import { PWAWrapper } from './components/pwa/PWAWrapper'
import { ErrorBoundary, FallbackProps } from 'react-error-boundary'
import { LazyLoader } from './components/loading/LazyLoader'
import { AuthProvider, useAuth } from './lib/auth-context'

// Lazy load pages with dynamic imports
const routes: RouteProps[] = [
  {
    index: true,
    path: '/',
    element: <ProtectedRoute />,
  },
  {
    path: '/auth',
    Component: lazy(() => 
      import('./pages/auth').then(module => ({ default: module.default }))
    ),
  },
]

// Protected Route component
function ProtectedRoute() {
  const { user, loading } = useAuth();
  
  const HomePage = lazy(() => 
    import('./pages/index').then(module => ({ default: module.default }))
  );

  if (loading) {
    return <LazyLoader message="Verificando autenticação..." />;
  }
  
  return user ? <HomePage /> : <Navigate to="/auth" />;
}

const loading = <LazyLoader message="Carregando aplicação..." />

function App() {
  return (
    <ErrorBoundary
      onError={(error: Error, errorInfo: React.ErrorInfo) => {
        console.error('Application error:', error, errorInfo);
      }}
      fallbackRender={({ error }: FallbackProps) => (
        <div className="flex items-center justify-center min-h-screen bg-red-50 p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold text-red-600 mb-2">Algo deu errado!</h2>
            <p className="text-gray-700 mb-4">{error.message || 'Um erro ocorreu. Por favor, recarregue a página.'}</p>
            <button 
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              onClick={() => window.location.reload()}
            >
              Recarregar aplicação
            </button>
          </div>
        </div>
      )}
    >
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <AuthProvider>
          <PWAWrapper>
            <Router>
              <Suspense fallback={loading}>
                <Routes>
                  {routes.map((route, index) => (
                    <Route key={index} {...route} />
                  ))}
                </Routes>
              </Suspense>
            </Router>
            <Toaster position="top-center" />
          </PWAWrapper>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export { App }
