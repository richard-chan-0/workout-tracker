import { useState, useEffect } from 'react'

export function ServiceWorkerStatus() {
    const [swStatus, setSwStatus] = useState<{
        registered: boolean
        controlling: boolean
        ready: boolean
    }>({
        registered: false,
        controlling: false,
        ready: false
    })

    useEffect(() => {
        const checkSWStatus = () => {
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.ready.then((registration) => {
                    setSwStatus({
                        registered: !!registration,
                        controlling: !!navigator.serviceWorker.controller,
                        ready: true
                    })
                })

                // Listen for controller change
                navigator.serviceWorker.addEventListener('controllerchange', () => {
                    setSwStatus(prev => ({
                        ...prev,
                        controlling: !!navigator.serviceWorker.controller
                    }))
                })
            }
        }

        checkSWStatus()

        // Check again after a delay to ensure SW has time to register
        const timer = setTimeout(checkSWStatus, 2000)

        return () => clearTimeout(timer)
    }, [])

    return (
        <div className="space-y-2 text-sm">
            <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${swStatus.registered ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span>Service Worker Registered: {swStatus.registered ? 'Yes' : 'No'}</span>
            </div>

            <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${swStatus.controlling ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                <span>Controlling Page: {swStatus.controlling ? 'Yes' : 'No'}</span>
            </div>

            <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${swStatus.ready ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span>Ready: {swStatus.ready ? 'Yes' : 'No'}</span>
            </div>
        </div>
    )
}
