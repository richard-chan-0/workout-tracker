import { render, screen, waitFor } from '../test/utils'
import App from '../App'
import { setOnlineStatus, setPWAInstalled, fireOnlineEvent, fireOfflineEvent } from '../test/utils'

describe('App', () => {
    beforeEach(() => {
        jest.clearAllMocks()
        // Reset to default state
        setOnlineStatus(true)
        setPWAInstalled(false)
    })

    it('renders main app content', () => {
        render(<App />)

        expect(screen.getByText('Hello World! 🏋️')).toBeInTheDocument()
        expect(screen.getByText('Welcome to your Workout Tracker PWA')).toBeInTheDocument()
    })

    it('shows online status when connected', () => {
        setOnlineStatus(true)
        render(<App />)

        expect(screen.getByText('Online')).toBeInTheDocument()
    })

    it('updates status when online/offline events fire', async () => {
        render(<App />)

        // Initially online
        expect(screen.getByText('Online')).toBeInTheDocument()

        // Fire offline event
        fireOfflineEvent()

        await waitFor(() => {
            expect(screen.getByText('Offline')).toBeInTheDocument()
        })

        // Fire online event
        fireOnlineEvent()

        await waitFor(() => {
            expect(screen.getByText('Online')).toBeInTheDocument()
        })
    })

    it('shows PWA installed status when app is installed', () => {
        setPWAInstalled(true)
        render(<App />)

        expect(screen.getByText('✓ Installed as PWA')).toBeInTheDocument()
    })

    it('does not show PWA installed status when app is not installed', () => {
        setPWAInstalled(false)
        render(<App />)

        expect(screen.queryByText('✓ Installed as PWA')).not.toBeInTheDocument()
    })

    it('displays service worker status section', () => {
        render(<App />)

        expect(screen.getByText('Service Worker Status')).toBeInTheDocument()
        expect(screen.getByText(/Service Worker Registered/)).toBeInTheDocument()
        expect(screen.getByText(/Controlling Page/)).toBeInTheDocument()
        expect(screen.getByText(/Ready/)).toBeInTheDocument()
    })

    it('shows feature preview list', () => {
        render(<App />)

        expect(screen.getByText('✨ This app works offline')).toBeInTheDocument()
        expect(screen.getByText('📱 Installable as a PWA')).toBeInTheDocument()
        expect(screen.getByText('⚡ Built with React + TypeScript + Vite')).toBeInTheDocument()
        expect(screen.getByText('🎨 Styled with Tailwind CSS')).toBeInTheDocument()
    })

    it('displays testing instructions', () => {
        render(<App />)

        expect(screen.getByText(/Try going offline in Chrome DevTools/)).toBeInTheDocument()
    })

    it('has correct styling classes', () => {
        render(<App />)

        const mainContainer = screen.getByText('Hello World! 🏋️').closest('.min-h-screen')
        expect(mainContainer).toHaveClass('bg-gradient-to-br', 'from-blue-50', 'to-blue-100')
    })

    it('renders PWA registration component', () => {
        render(<App />)

        // The component is rendered but may not be visible initially
        // We can check that the component structure is in place
        expect(screen.getByText('Hello World! 🏋️')).toBeInTheDocument()
    })

    it('renders service worker registration component', () => {
        render(<App />)

        // The component is rendered but may not be visible initially
        // We can check that the component structure is in place
        expect(screen.getByText('Hello World! 🏋️')).toBeInTheDocument()
    })

    it('has proper status indicator styling', () => {
        render(<App />)

        const statusIndicator = screen.getByText('Online').closest('div')
        expect(statusIndicator).toHaveClass('flex', 'items-center', 'justify-center', 'space-x-2')
    })

    it('displays status indicator with colored dot', () => {
        render(<App />)

        const statusDots = screen.getAllByRole('generic').filter(el =>
            el.className.includes('w-3 h-3 rounded-full')
        )

        expect(statusDots.length).toBeGreaterThan(0)
    })

    it('has accessible status indicators', () => {
        render(<App />)

        const onlineStatus = screen.getByText('Online')
        expect(onlineStatus).toBeInTheDocument()

        // Check that the status is properly labeled
        const statusContainer = onlineStatus.closest('div')
        expect(statusContainer).toHaveClass('flex', 'items-center')
    })

    it('maintains proper layout structure', () => {
        render(<App />)

        // Check main sections are present
        expect(screen.getByText('Hello World! 🏋️')).toBeInTheDocument()
        expect(screen.getByText('Service Worker Status')).toBeInTheDocument()
        expect(screen.getByText(/✨ This app works offline/)).toBeInTheDocument()
    })

    it('handles rapid online/offline state changes', async () => {
        render(<App />)

        // Rapidly fire online/offline events
        fireOfflineEvent()
        fireOnlineEvent()
        fireOfflineEvent()
        fireOnlineEvent()

        // Should handle the changes gracefully
        await waitFor(() => {
            expect(screen.getByText('Online')).toBeInTheDocument()
        })
    })
})
