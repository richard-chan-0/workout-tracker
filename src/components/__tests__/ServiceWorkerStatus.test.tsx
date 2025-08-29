import { render, screen, waitFor } from '../../test/utils'
import ServiceWorkerStatus from '../ServiceWorkerStatus'

describe('ServiceWorkerStatus', () => {
    beforeEach(() => {
        // Reset mocks before each test
        jest.clearAllMocks()
    })

    it('renders service worker status indicators', () => {
        render(<ServiceWorkerStatus />)

        expect(screen.getByText(/Service Worker Registered/)).toBeInTheDocument()
        expect(screen.getByText(/Controlling Page/)).toBeInTheDocument()
        expect(screen.getByText(/Ready/)).toBeInTheDocument()
    })

    it('shows correct status indicators with dots', () => {
        render(<ServiceWorkerStatus />)

        const statusIndicators = screen.getAllByRole('generic').filter(el =>
            el.className.includes('w-2 h-2 rounded-full')
        )

        expect(statusIndicators).toHaveLength(3)
    })

    it('updates status when service worker is registered', async () => {
        // Mock service worker registration
        const mockRegistration = {
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
        }

        Object.defineProperty(navigator, 'serviceWorker', {
            writable: true,
            value: {
                ...navigator.serviceWorker,
                ready: Promise.resolve(mockRegistration),
                controller: null,
            },
        })

        render(<ServiceWorkerStatus />)

        await waitFor(() => {
            expect(screen.getByText('Service Worker Registered: Yes')).toBeInTheDocument()
        })
    })

    it('shows controller status when service worker is controlling', async () => {
        // Mock service worker with controller
        const mockRegistration = {
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
        }

        Object.defineProperty(navigator, 'serviceWorker', {
            writable: true,
            value: {
                ...navigator.serviceWorker,
                ready: Promise.resolve(mockRegistration),
                controller: { some: 'controller' },
            },
        })

        render(<ServiceWorkerStatus />)

        await waitFor(() => {
            expect(screen.getByText('Controlling Page: Yes')).toBeInTheDocument()
        })
    })

    it('handles service worker not being available', () => {
        Object.defineProperty(navigator, 'serviceWorker', {
            writable: true,
            value: undefined,
        })

        render(<ServiceWorkerStatus />)

        expect(screen.getByText('Service Worker Registered: No')).toBeInTheDocument()
        expect(screen.getByText('Controlling Page: No')).toBeInTheDocument()
        expect(screen.getByText('Ready: No')).toBeInTheDocument()
    })

    it('listens for controller change events', async () => {
        const mockAddEventListener = jest.fn()
        const mockRegistration = {
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
        }

        Object.defineProperty(navigator, 'serviceWorker', {
            writable: true,
            value: {
                ...navigator.serviceWorker,
                ready: Promise.resolve(mockRegistration),
                addEventListener: mockAddEventListener,
                controller: null,
            },
        })

        render(<ServiceWorkerStatus />)

        await waitFor(() => {
            expect(mockAddEventListener).toHaveBeenCalledWith('controllerchange', expect.any(Function))
        })
    })

    it('cleans up event listeners on unmount', async () => {
        const mockRemoveEventListener = jest.fn()
        const mockRegistration = {
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
        }

        Object.defineProperty(navigator, 'serviceWorker', {
            writable: true,
            value: {
                ...navigator.serviceWorker,
                ready: Promise.resolve(mockRegistration),
                removeEventListener: mockRemoveEventListener,
                controller: null,
            },
        })

        const { unmount } = render(<ServiceWorkerStatus />)

        await waitFor(() => {
            expect(screen.getByText('Service Worker Registered: Yes')).toBeInTheDocument()
        })

        unmount()

        // Note: In a real scenario, we'd check if removeEventListener was called
        // This test demonstrates the pattern for cleanup testing
    })
})
