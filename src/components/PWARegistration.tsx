import { useEffect, useState } from 'react'

interface PWAInstallPrompt {
    prompt: () => Promise<void>
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export function PWARegistration() {
    const [deferredPrompt, setDeferredPrompt] = useState<PWAInstallPrompt | null>(null)
    const [showInstallButton, setShowInstallButton] = useState(false)

    useEffect(() => {
        // Listen for the beforeinstallprompt event
        const handleBeforeInstallPrompt = (e: Event) => {
            e.preventDefault()
            setDeferredPrompt(e as unknown as PWAInstallPrompt) // TODO: fix this typing issue
            setShowInstallButton(true)
        }

        // Listen for successful installation
        const handleAppInstalled = () => {
            setShowInstallButton(false)
            setDeferredPrompt(null)
            console.log('PWA was installed')
        }

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
        window.addEventListener('appinstalled', handleAppInstalled)

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
            window.removeEventListener('appinstalled', handleAppInstalled)
        }
    }, [])

    const handleInstallClick = async () => {
        if (!deferredPrompt) return

        deferredPrompt.prompt()
        const { outcome } = await deferredPrompt.userChoice

        if (outcome === 'accepted') {
            console.log('User accepted the install prompt')
        } else {
            console.log('User dismissed the install prompt')
        }

        setDeferredPrompt(null)
        setShowInstallButton(false)
    }

    if (!showInstallButton) return null

    return (
        <div className="fixed bottom-4 left-4 right-4 z-50">
            <div className="bg-white rounded-lg shadow-lg p-4 border border-gray-200">
                <div className="flex items-center justify-between">
                    <div className="flex-1">
                        <h3 className="font-medium text-gray-900">Install Workout Tracker</h3>
                        <p className="text-sm text-gray-600">Add to your home screen for quick access</p>
                    </div>
                    <div className="flex space-x-2">
                        <button
                            onClick={handleInstallClick}
                            className="btn-primary text-sm"
                        >
                            Install
                        </button>
                        <button
                            onClick={() => setShowInstallButton(false)}
                            className="text-gray-500 hover:text-gray-700 text-sm"
                        >
                            Dismiss
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
