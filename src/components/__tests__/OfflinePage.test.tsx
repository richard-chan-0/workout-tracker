import { render, screen, fireEvent } from '../../test/utils'
import { OfflinePage } from '../OfflinePage'

describe('OfflinePage', () => {
    let reloadSpy: jest.SpyInstance

    beforeEach(() => {
        // Use jest.spyOn to mock window.location.reload
        reloadSpy = jest.spyOn(window.location, 'reload').mockImplementation(() => { })
    })

    afterEach(() => {
        reloadSpy.mockRestore()
    })

    it('renders offline page with correct content', () => {
        render(<OfflinePage />)

        expect(screen.getByText('Workout Tracker')).toBeInTheDocument()
        expect(screen.getByText("You're currently offline")).toBeInTheDocument()
        expect(screen.getByText('Offline Mode')).toBeInTheDocument()
    })

    it('displays the app icon/emoji', () => {
        render(<OfflinePage />)

        expect(screen.getByText('📱')).toBeInTheDocument()
    })

    it('shows offline mode explanation', () => {
        render(<OfflinePage />)

        expect(screen.getByText(/This app works offline/)).toBeInTheDocument()
        expect(screen.getByText(/Your data is stored locally/)).toBeInTheDocument()
        expect(screen.getByText(/Will sync when connection returns/)).toBeInTheDocument()
    })

    it('displays feature highlights', () => {
        render(<OfflinePage />)

        expect(screen.getByText('✅ App is cached and working offline')).toBeInTheDocument()
        expect(screen.getByText('📊 Your workout data is safe')).toBeInTheDocument()
        expect(screen.getByText('🔄 Will sync when connection returns')).toBeInTheDocument()
    })

    it('renders try again button', () => {
        render(<OfflinePage />)

        const tryAgainButton = screen.getByRole('button', { name: /try again/i })
        expect(tryAgainButton).toBeInTheDocument()
    })

    it('calls window.location.reload when try again button is clicked', () => {
        render(<OfflinePage />)

        const tryAgainButton = screen.getByRole('button', { name: /try again/i })
        fireEvent.click(tryAgainButton)

        expect(reloadSpy).toHaveBeenCalledTimes(1)
    })

    it('has correct styling classes', () => {
        render(<OfflinePage />)

        const container = screen.getByText('Workout Tracker').closest('.min-h-screen')
        expect(container).toHaveClass('bg-gradient-to-br', 'from-blue-50', 'to-blue-100')
    })

    it('displays offline mode warning with correct styling', () => {
        render(<OfflinePage />)

        const offlineModeSection = screen.getByText('Offline Mode').closest('div')
        expect(offlineModeSection).toHaveClass('bg-yellow-100', 'text-yellow-800')
    })

    it('has proper button styling', () => {
        render(<OfflinePage />)

        const tryAgainButton = screen.getByRole('button', { name: /try again/i })
        expect(tryAgainButton).toHaveClass('btn-primary', 'w-full')
    })

    it('renders all expected sections', () => {
        render(<OfflinePage />)

        // Check main sections are present
        expect(screen.getByText('Workout Tracker')).toBeInTheDocument()
        expect(screen.getByText('Offline Mode')).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument()
    })

    it('has accessible button with proper role', () => {
        render(<OfflinePage />)

        const button = screen.getByRole('button')
        expect(button).toBeInTheDocument()
        expect(button).toHaveTextContent('Try Again')
    })

    it('maintains proper layout structure', () => {
        render(<OfflinePage />)

        // Check that the main container has proper flex layout
        const mainContainer = screen.getByText('Workout Tracker').closest('.min-h-screen')
        expect(mainContainer).toHaveClass('flex', 'items-center', 'justify-center')
    })
})
