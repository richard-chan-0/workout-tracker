import React, { ReactElement } from 'react'
import { render, RenderOptions, act } from '@testing-library/react'

// Custom render function with providers
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
    return <>{children}</>
}

const customRender = (
    ui: ReactElement,
    options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options })

// PWA-specific test utilities
export const mockServiceWorker = {
    register: jest.fn().mockResolvedValue({
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
    }),
    ready: Promise.resolve({
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
    }),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    controller: null,
}

export const mockPWAInstallPrompt = {
    prompt: jest.fn().mockResolvedValue(undefined),
    userChoice: Promise.resolve({ outcome: 'accepted' as const }),
}

export const setOnlineStatus = (isOnline: boolean) => {
    Object.defineProperty(navigator, 'onLine', {
        writable: true,
        value: isOnline,
    })
}

export const setPWAInstalled = (isInstalled: boolean) => {
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation((query: string) => ({
            matches: isInstalled && query === '(display-mode: standalone)',
            media: query,
            onchange: null,
            addListener: jest.fn(),
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
        })),
    })
}

export const fireOnlineEvent = () => {
    act(() => {
        window.dispatchEvent(new Event('online'))
    })
}

export const fireOfflineEvent = () => {
    act(() => {
        window.dispatchEvent(new Event('offline'))
    })
}

export const fireBeforeInstallPrompt = () => {
    const event = new Event('beforeinstallprompt')
    Object.defineProperty(event, 'preventDefault', {
        value: jest.fn(),
        writable: true,
    })
    Object.defineProperty(event, 'prompt', {
        value: mockPWAInstallPrompt.prompt,
        writable: true,
    })
    Object.defineProperty(event, 'userChoice', {
        value: mockPWAInstallPrompt.userChoice,
        writable: true,
    })

    act(() => {
        window.dispatchEvent(event)
    })
}

export const fireAppInstalled = () => {
    act(() => {
        window.dispatchEvent(new Event('appinstalled'))
    })
}

// Re-export everything
export * from '@testing-library/react'
export { customRender as render }
