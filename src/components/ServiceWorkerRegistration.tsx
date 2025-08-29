import { useEffect, useState } from 'react'

export function ServiceWorkerRegistration() {
    const [swRegistration, setSwRegistration] = useState<ServiceWorkerRegistration | null>(null)
    const [updateAvailable, setUpdateAvailable] = useState(false)

    useEffect(() => {
        if ('serviceWorker' in navigator) {
            // Register service worker
            navigator.serviceWorker
                .register('/sw.js')
                .then((registration) => {
                    console.log('SW registered: ', registration)
                    setSwRegistration(registration)

                    // Check for updates
                    registration.addEventListener('updatefound', () => {
                        const newWorker = registration.installing
                        if (newWorker) {
                            newWorker.addEventListener('statechange', () => {
                                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                    setUpdateAvailable(true)
                                }
                            })
                        }
                    })
                })
                .catch((registrationError) => {
                    console.log('SW registration failed: ', registrationError)
                })

            // Handle controller change (when SW takes control)
            navigator.serviceWorker.addEventListener('controllerchange', () => {
                console.log('Service Worker is now controlling the page')
            })
        }
    }, [])

    const handleUpdate = () => {
        if (swRegistration && swRegistration.waiting) {
            // Send message to service worker to skip waiting
            swRegistration.waiting.postMessage({ type: 'SKIP_WAITING' })

            // Reload the page to activate the new service worker
            window.location.reload()
        }
    }

    if (!updateAvailable) return null

    return (
        <div className="fixed top-4 left-4 right-4 z-50">
            <div className="bg-blue-500 text-white rounded-lg shadow-lg p-4">
                <div className="flex items-center justify-between">
                    <div className="flex-1">
                        <h3 className="font-medium">Update Available</h3>
                        <p className="text-sm opacity-90">A new version of the app is ready</p>
                    </div>
                    <button
                        onClick={handleUpdate}
                        className="bg-white text-blue-500 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                    >
                        Update
                    </button>
                </div>
            </div>
        </div>
    )
}
