import { render, screen, fireEvent, waitFor, act } from '../../test/utils'
import { PWARegistration } from '../PWARegistration'
import { fireBeforeInstallPrompt, fireAppInstalled, mockPWAInstallPrompt } from '../../test/utils'

describe('PWARegistration', () => {
    beforeEach(() => {
        jest.clearAllMocks()
        // Reset beforeinstallprompt
        Object.defineProperty(window, 'beforeinstallprompt', {
            writable: true,
            value: null,
        })
    })

    it('does not render when no install prompt is available', () => {
        render(<PWARegistration />)

        expect(screen.queryByText('Install Workout Tracker')).not.toBeInTheDocument()
    })

    it('shows install prompt when beforeinstallprompt event fires', async () => {
        render(<PWARegistration />)

        // Initially should not be visible
        expect(screen.queryByText('Install Workout Tracker')).not.toBeInTheDocument()

        // Fire the beforeinstallprompt event
        fireBeforeInstallPrompt()

        await waitFor(() => {
            expect(screen.getByText('Install Workout Tracker')).toBeInTheDocument()
        })
    })

    it('displays correct install prompt content', async () => {
        render(<PWARegistration />)
        fireBeforeInstallPrompt()

        await waitFor(() => {
            expect(screen.getByText('Install Workout Tracker')).toBeInTheDocument()
            expect(screen.getByText('Add to your home screen for quick access')).toBeInTheDocument()
        })
    })

    it('renders install and dismiss buttons', async () => {
        render(<PWARegistration />)
        fireBeforeInstallPrompt()

        await waitFor(() => {
            expect(screen.getByRole('button', { name: /install/i })).toBeInTheDocument()
            expect(screen.getByRole('button', { name: /dismiss/i })).toBeInTheDocument()
        })
    })

    it('calls prompt when install button is clicked', async () => {
        render(<PWARegistration />)
        fireBeforeInstallPrompt()

        await waitFor(() => {
            const installButton = screen.getByRole('button', { name: /install/i })
            fireEvent.click(installButton)
        })

        expect(mockPWAInstallPrompt.prompt).toHaveBeenCalledTimes(1)
    })

    it('hides prompt after successful installation', async () => {
        render(<PWARegistration />)
        fireBeforeInstallPrompt()

        await waitFor(() => {
            expect(screen.getByText('Install Workout Tracker')).toBeInTheDocument()
        })

        // Fire appinstalled event
        fireAppInstalled()

        await waitFor(() => {
            expect(screen.queryByText('Install Workout Tracker')).not.toBeInTheDocument()
        })
    })

    it('hides prompt when dismiss button is clicked', async () => {
        render(<PWARegistration />)
        fireBeforeInstallPrompt()

        await waitFor(() => {
            const dismissButton = screen.getByRole('button', { name: /dismiss/i })
            fireEvent.click(dismissButton)
        })

        await waitFor(() => {
            expect(screen.queryByText('Install Workout Tracker')).not.toBeInTheDocument()
        })
    })

    it('has correct styling classes', async () => {
        render(<PWARegistration />)
        fireBeforeInstallPrompt()

        await waitFor(() => {
            // Find the outer container with the fixed positioning classes
            const container = screen.getByText('Install Workout Tracker').closest('.fixed')
            expect(container).toHaveClass('fixed', 'bottom-4', 'left-4', 'right-4', 'z-50')
        })
    })

    it('handles user choice after install prompt', async () => {
        render(<PWARegistration />)
        fireBeforeInstallPrompt()

        await waitFor(() => {
            const installButton = screen.getByRole('button', { name: /install/i })
            fireEvent.click(installButton)
        })

        // Wait for the userChoice promise to resolve
        await waitFor(() => {
            expect(mockPWAInstallPrompt.userChoice).resolves.toEqual({ outcome: 'accepted' })
        })
    })

    it('prevents default on beforeinstallprompt event', async () => {
        const preventDefault = jest.fn()

        render(<PWARegistration />)

        // Create a custom event with preventDefault
        const event = new Event('beforeinstallprompt')
        Object.defineProperty(event, 'preventDefault', {
            value: preventDefault,
            writable: true,
        })

        act(() => {
            window.dispatchEvent(event)
        })

        expect(preventDefault).toHaveBeenCalled()
    })

    it('cleans up event listeners on unmount', async () => {
        const { unmount } = render(<PWARegistration />)

        // Fire event to set up listeners
        fireBeforeInstallPrompt()

        await waitFor(() => {
            expect(screen.getByText('Install Workout Tracker')).toBeInTheDocument()
        })

        unmount()

        // Component should be unmounted and listeners cleaned up
        expect(screen.queryByText('Install Workout Tracker')).not.toBeInTheDocument()
    })

    it('handles multiple beforeinstallprompt events', async () => {
        render(<PWARegistration />)

        // Fire multiple events
        fireBeforeInstallPrompt()
        fireBeforeInstallPrompt()
        fireBeforeInstallPrompt()

        await waitFor(() => {
            expect(screen.getByText('Install Workout Tracker')).toBeInTheDocument()
        })

        // Should only show one prompt
        const prompts = screen.getAllByText('Install Workout Tracker')
        expect(prompts).toHaveLength(1)
    })

    it('has accessible buttons with proper roles', async () => {
        render(<PWARegistration />)
        fireBeforeInstallPrompt()

        await waitFor(() => {
            const buttons = screen.getAllByRole('button')
            expect(buttons).toHaveLength(2)

            const installButton = screen.getByRole('button', { name: /install/i })
            const dismissButton = screen.getByRole('button', { name: /dismiss/i })

            expect(installButton).toBeInTheDocument()
            expect(dismissButton).toBeInTheDocument()
        })
    })
})
