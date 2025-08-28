# Workout Tracker - Component Documentation

## 🧩 Component Overview

This document describes all the components in the Workout Tracker PWA, their purpose, props, and usage examples.

## 📱 PWA Components

### **PWARegistration.tsx**

**Purpose**: Handles PWA installation prompts and user installation flow.

**Features**:

- Detects when app can be installed
- Shows installation prompt to users
- Handles installation acceptance/dismissal
- Provides user feedback

**Props**: None (uses internal state)

**State**:

```typescript
interface PWAInstallPrompt {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const [deferredPrompt, setDeferredPrompt] = useState<PWAInstallPrompt | null>(
  null
);
const [showInstallButton, setShowInstallButton] = useState(false);
```

**Usage**:

```tsx
import { PWARegistration } from "./components/PWARegistration";

function App() {
  return (
    <div>
      {/* Your app content */}
      <PWARegistration />
    </div>
  );
}
```

**Events Handled**:

- `beforeinstallprompt` - App can be installed
- `appinstalled` - App was successfully installed

---

### **ServiceWorkerRegistration.tsx**

**Purpose**: Manages service worker lifecycle and update notifications.

**Features**:

- Registers service worker
- Monitors for updates
- Shows update notifications
- Handles update installation

**Props**: None (uses internal state)

**State**:

```typescript
const [swRegistration, setSwRegistration] =
  useState<ServiceWorkerRegistration | null>(null);
const [updateAvailable, setUpdateAvailable] = useState(false);
```

**Usage**:

```tsx
import { ServiceWorkerRegistration } from "./components/ServiceWorkerRegistration";

function App() {
  return (
    <div>
      {/* Your app content */}
      <ServiceWorkerRegistration />
    </div>
  );
}
```

**Events Handled**:

- Service worker registration
- Update detection
- Controller changes

---

### **ServiceWorkerStatus.tsx**

**Purpose**: Displays real-time service worker status for debugging and user feedback.

**Features**:

- Shows registration status
- Displays controller status
- Indicates ready state
- Real-time updates

**Props**: None (uses internal state)

**State**:

```typescript
interface SWStatus {
  registered: boolean;
  controlling: boolean;
  ready: boolean;
}

const [swStatus, setSwStatus] = useState<SWStatus>({
  registered: false,
  controlling: false,
  ready: false,
});
```

**Usage**:

```tsx
import { ServiceWorkerStatus } from "./components/ServiceWorkerStatus";

function App() {
  return (
    <div>
      <h3>Service Worker Status</h3>
      <ServiceWorkerStatus />
    </div>
  );
}
```

**Status Indicators**:

- 🟢 **Registered**: Service worker is registered
- 🟡 **Controlling**: Service worker is controlling the page
- 🟢 **Ready**: Service worker is ready to handle requests

---

### **OfflinePage.tsx**

**Purpose**: Provides a fallback UI when the app cannot load due to offline status.

**Features**:

- Shows when app is offline
- Explains offline functionality
- Provides retry option
- User-friendly messaging

**Props**: None (static component)

**Usage**:

```tsx
import { OfflinePage } from "./components/OfflinePage";

function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isAppLoaded, setIsAppLoaded] = useState(false);

  // Show offline page if offline and app hasn't loaded
  if (!isOnline && !isAppLoaded) {
    return <OfflinePage />;
  }

  return <MainApp />;
}
```

**Content**:

- App branding and logo
- Offline status explanation
- Feature highlights
- Retry button

---

## 🎨 Main App Component

### **App.tsx**

**Purpose**: Main application component that orchestrates all PWA features.

**Features**:

- Online/offline status monitoring
- PWA installation detection
- Service worker status display
- Offline page handling

**State**:

```typescript
const [isOnline, setIsOnline] = useState(navigator.onLine);
const [isPWAInstalled, setIsPWAInstalled] = useState(false);
const [isAppLoaded, setIsAppLoaded] = useState(false);
```

**Event Listeners**:

- `online` - Connection restored
- `offline` - Connection lost
- `beforeinstallprompt` - PWA installation available
- `appinstalled` - PWA installed

**Usage**:

```tsx
import App from "./App";

// Rendered by main.tsx
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

---

## 🔧 Component Architecture

### **Component Hierarchy**

```
App.tsx
├── Main Content (Hello World)
├── Status Indicators
├── Service Worker Status
├── Feature Preview
├── PWARegistration
├── ServiceWorkerRegistration
└── OfflinePage (conditional)
```

### **State Management**

- **Local State**: Each component manages its own state
- **Event-Driven**: Components respond to browser events
- **Lifecycle**: Components handle mounting/unmounting properly

### **Styling**

- **Tailwind CSS**: Utility-first styling
- **Component Classes**: Reusable CSS classes
- **Responsive Design**: Mobile-first approach

---

## 🧪 Testing Components

### **Unit Testing**

```typescript
// Example test for ServiceWorkerStatus
import { render, screen } from "@testing-library/react";
import { ServiceWorkerStatus } from "./ServiceWorkerStatus";

test("shows service worker status", () => {
  render(<ServiceWorkerStatus />);
  expect(screen.getByText(/Service Worker Registered/)).toBeInTheDocument();
});
```

### **Integration Testing**

```typescript
// Example test for PWA installation flow
test("shows install prompt when available", () => {
  // Mock beforeinstallprompt event
  // Render PWARegistration
  // Verify install button appears
});
```

### **E2E Testing**

```typescript
// Example test for offline functionality
test("works offline after loading", async () => {
  // Load app online
  // Go offline
  // Verify app still works
});
```

---

## 🔮 Future Components

### **Planned Components**

#### **WorkoutForm.tsx**

- Exercise selection
- Set/rep/weight input
- Form validation
- Data submission

#### **ExerciseList.tsx**

- Exercise database display
- Search and filtering
- Exercise details
- Favorites management

#### **ProgressChart.tsx**

- Progress visualization
- Chart rendering
- Data aggregation
- Interactive features

#### **SettingsPanel.tsx**

- User preferences
- App configuration
- Data management
- Export/import

### **Component Guidelines**

#### **Naming Convention**

- PascalCase for component names
- Descriptive, purpose-driven names
- Consistent file naming

#### **Props Interface**

```typescript
interface ComponentProps {
  // Required props
  requiredProp: string;

  // Optional props with defaults
  optionalProp?: number;

  // Event handlers
  onAction?: (data: any) => void;
}
```

#### **State Management**

```typescript
// Local state for component-specific data
const [localState, setLocalState] = useState(initialValue);

// Effects for side effects
useEffect(() => {
  // Side effect logic
  return () => {
    // Cleanup logic
  };
}, [dependencies]);
```

---

## 📚 Best Practices

### **Component Design**

- Single responsibility principle
- Reusable and composable
- Clear prop interfaces
- Proper TypeScript typing

### **Performance**

- Memoization for expensive calculations
- Lazy loading for large components
- Efficient re-rendering
- Bundle size optimization

### **Accessibility**

- Semantic HTML elements
- ARIA labels and roles
- Keyboard navigation
- Screen reader support

### **Error Handling**

- Graceful error states
- User-friendly error messages
- Fallback UI components
- Error boundaries

This component documentation provides a comprehensive guide to understanding and working with the Workout Tracker PWA components.
