import { useState, useEffect } from 'react'

interface Status {
    registered: boolean
    controlling: boolean
    ready: boolean
}

const ServiceWorkerStatus = () => {
    const [status, setStatus] = useState<Status>({
        registered: false,
        controlling: false,
        ready: false
    })

    const checkSWStatus = () => {
        const isServiceWorkerAvailable = 'serviceWorker' in navigator && navigator.serviceWorker

        if (!isServiceWorkerAvailable) {
            return
        }

        navigator.serviceWorker.ready.then((registration) => {
            setStatus({
                registered: !!registration,
                controlling: !!navigator.serviceWorker.controller,
                ready: true
            })
        })

        // Listen for controller change
        navigator.serviceWorker.addEventListener('controllerchange', () => {
            setStatus(prev => ({
                ...prev,
                controlling: !!navigator.serviceWorker.controller
            }))
        })

    }

    useEffect(() => {
        // checks status of service worker on mount
        checkSWStatus()

        const timer = setTimeout(checkSWStatus, 2000)

        return () => clearTimeout(timer)
    }, [])

    return (
        <div className="space-y-2 text-sm">
            <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${status.registered ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span>Service Worker Registered: {status.registered ? 'Yes' : 'No'}</span>
            </div>

            <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${status.controlling ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                <span>Controlling Page: {status.controlling ? 'Yes' : 'No'}</span>
            </div>

            <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${status.ready ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span>Ready: {status.ready ? 'Yes' : 'No'}</span>
            </div>
        </div>
    )
}

export default ServiceWorkerStatus