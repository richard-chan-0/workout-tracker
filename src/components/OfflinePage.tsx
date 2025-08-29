interface OfflinePageProps {
    onRetry: () => void
}

const OfflinePage = ({ onRetry }: OfflinePageProps) => {
    const handleRetry = () => {
        onRetry()
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
            <div className="card max-w-md w-full text-center">
                <div className="mb-6">
                    <div className="text-6xl mb-4">📱</div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                        Workout Tracker
                    </h1>
                    <p className="text-gray-600">
                        You're currently offline
                    </p>
                </div>

                <div className="space-y-4">
                    <div className="bg-yellow-100 text-yellow-800 p-4 rounded-lg">
                        <h3 className="font-medium mb-2">Offline Mode</h3>
                        <p className="text-sm">
                            This app works offline! Your data is stored locally and will sync when you're back online.
                        </p>
                    </div>

                    <div className="text-left space-y-2 text-sm text-gray-600">
                        <p>✅ App is cached and working offline</p>
                        <p>📊 Your workout data is safe</p>
                        <p>🔄 Will sync when connection returns</p>
                    </div>

                    <button
                        onClick={handleRetry}
                        className="btn-primary w-full"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        </div>
    )
}

export default OfflinePage;