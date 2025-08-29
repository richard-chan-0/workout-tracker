import '@testing-library/jest-dom'

// Mock service worker for PWA testing
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// Mock navigator.onLine
Object.defineProperty(navigator, 'onLine', {
  writable: true,
  value: true,
})

// Mock service worker
Object.defineProperty(navigator, 'serviceWorker', {
  writable: true,
  value: {
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
  },
})
