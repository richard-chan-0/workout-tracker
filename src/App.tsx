import { useState, useEffect } from 'react'
import { PWARegistration } from './components/PWARegistration'
import ServiceWorkerRegistration from './components/ServiceWorkerRegistration'
import ServiceWorkerStatus from './components/ServiceWorkerStatus'
import OfflinePage from './components/OfflinePage'
import './App.css'

function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const [isPWAInstalled, setIsPWAInstalled] = useState(false)
  const [isAppLoaded, setIsAppLoaded] = useState(false)
  const [showUpdateBanner, setShowUpdateBanner] = useState(false)

  useEffect(() => {
    // Handle online/offline status
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    // Check if app is installed as PWA
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsPWAInstalled(true)
    }

    // Mark app as loaded after a short delay
    const timer = setTimeout(() => setIsAppLoaded(true), 100)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
      clearTimeout(timer)
    }
  }, [])

  // Show offline page if offline and app hasn't loaded yet
  if (!isOnline && !isAppLoaded) {
    return <OfflinePage onRetry={window.location.reload} />
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
        <div className="card max-w-md w-full text-center">
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Hello World! 🏋️
            </h1>
            <p className="text-gray-600">
              Welcome to your Workout Tracker PWA
            </p>
          </div>

          {/* Status Indicators */}
          <div className="space-y-3 mb-6">
            <div className={`flex items-center justify-center space-x-2 p-3 rounded-lg ${isOnline ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
              <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'
                }`}></div>
              <span className="text-sm font-medium">
                {isOnline ? 'Online' : 'Offline'}
              </span>
            </div>

            {isPWAInstalled && (
              <div className="bg-blue-100 text-blue-800 p-3 rounded-lg">
                <span className="text-sm font-medium">✓ Installed as PWA</span>
              </div>
            )}
          </div>

          {/* Service Worker Status */}
          <div className="mb-6 p-3 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-800 mb-2">Service Worker Status</h3>
            <ServiceWorkerStatus />
          </div>

          {/* Feature Preview */}
          <div className="text-left space-y-2 text-sm text-gray-600">
            <p>✨ This app works offline</p>
            <p>📱 Installable as a PWA</p>
            <p>⚡ Built with React + TypeScript + Vite</p>
            <p>🎨 Styled with Tailwind CSS</p>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              Try going offline in Chrome DevTools to test the PWA functionality!
            </p>
          </div>
        </div>
      </div>

      <PWARegistration />
      {showUpdateBanner && <ServiceWorkerRegistration setShowUpdateBanner={setShowUpdateBanner} />}
    </>
  )
}

export default App
