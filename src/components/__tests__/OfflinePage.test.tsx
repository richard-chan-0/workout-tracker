import { render, screen, fireEvent } from '../../test/utils'
import OfflinePage from '../OfflinePage'

describe('OfflinePage', () => {
    const onRetry = jest.fn()

    it('renders offline page with correct content', () => {
        render(<OfflinePage onRetry={onRetry} />)
        expect(screen.getByText('Workout Tracker')).toBeInTheDocument()
        expect(screen.getByText("You're currently offline")).toBeInTheDocument()
        expect(screen.getByText('Offline Mode')).toBeInTheDocument()
    })

    it('renders try again button', () => {
        render(<OfflinePage />)
        const tryAgainButton = screen.getByRole('button', { name: /try again/i })
        expect(tryAgainButton).toBeInTheDocument()
    })

    it('calls onRetry when try again button is clicked', () => {
        render(<OfflinePage onRetry={onRetry} />)
        const tryAgainButton = screen.getByRole('button', { name: /try again/i })
        fireEvent.click(tryAgainButton)
        expect(onRetry).toHaveBeenCalledTimes(1)
    })
})
