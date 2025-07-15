import { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route, RouteProps } from 'react-router-dom'
import { ThemeProvider } from 'next-themes'
import { Toaster } from './components/ui/sonner'
import { PWAWrapper } from './components/pwa/PWAWrapper'
import { ErrorBoundary } from './components/error-boundary'
import { OfflineSupport } from './components/pwa/OfflineSupport'
import { LazyLoader } from './components/loading/LazyLoader'
import { SEOHead } from './components/seo/SEOHead'
import { ResourcePreloader, commonPreloads } from './components/seo/ResourcePreloader'
import { globalErrorHandler } from './lib/error-handler'

// Lazy load pages with dynamic imports
const routes: RouteProps[] = [
  {
    index: true,
    path: '/',
    Component: lazy(() => 
      import('./pages/index').then(module => ({ default: module.default }))
    ),
  },
]

// Lazy load heavy components (for future use)
// const BabyFoodTracker = lazy(() => 
//   import('./components/baby-food-tracker').then(module => ({ default: module.BabyFoodTracker }))
// );

// const AddFoodModal = lazy(() => 
//   import('./components/baby-food/add-food-modal').then(module => ({ default: module.AddFoodModal }))
// );

const loading = <LazyLoader message="Carregando aplicação..." />

function App() {
  return (
    <ErrorBoundary
      onError={(error, errorInfo) => {
        globalErrorHandler.logError({
          message: error.message,
          stack: error.stack,
          timestamp: new Date().toISOString(),
          url: window.location.href,
          userAgent: navigator.userAgent,
          type: 'javascript',
          severity: 'high',
          context: { componentStack: errorInfo.componentStack }
        });
      }}
      showDetails={process.env.NODE_ENV === 'development'}
    >
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <ResourcePreloader 
          resources={[...commonPreloads.images, ...commonPreloads.fonts]}
          priority="high"
        />
        <PWAWrapper>
          <OfflineSupport />
          <Router>
            <SEOHead />
            <Suspense fallback={loading}>
              <Routes>
                {routes.map((route) => (
                  <Route key={route.path} {...route} />
                ))}
              </Routes>
            </Suspense>
            <Toaster />
          </Router>
        </PWAWrapper>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export { App }
