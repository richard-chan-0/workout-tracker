# Workout Tracker PWA

A Progressive Web App (PWA) for tracking your workouts, built with React, TypeScript, Vite, and Tailwind CSS.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

1. **Clone and install dependencies:**

   ```bash
   pnpm install
   ```

2. **Start development server:**

   ```bash
   pnpm dev
   ```

3. **Open your browser:**

   Navigate to `http://localhost:5173`

### Building for Production

```bash
pnpm build
```

The built files will be in the `dist/` directory, ready for deployment.

## 📱 PWA Features

### Testing Offline Functionality

1. Open Chrome DevTools (F12)
2. Go to the **Network** tab
3. Check the **Offline** checkbox
4. Refresh the page - you should still see the "Hello World" message!

### Installing as PWA

1. Open the app in Chrome/Edge
2. Look for the install prompt or click the install icon in the address bar
3. Click "Install" to add to your home screen

### PWA Manifest

The app includes a web app manifest with:

- App name: "Workout Tracker"
- Theme color: Blue (#3b82f6)
- Display mode: Standalone (app-like experience)
- Icons for various sizes

## 📁 Project Structure

```
workout-tracker/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── PWARegistration.tsx
│   │   ├── ServiceWorkerRegistration.tsx
│   │   ├── ServiceWorkerStatus.tsx
│   │   └── OfflinePage.tsx
│   ├── features/            # Feature-specific modules (future)
│   ├── hooks/              # Custom React hooks (future)
│   ├── services/           # Business logic & API services (future)
│   ├── stores/             # State management (future)
│   ├── types/              # TypeScript type definitions (future)
│   ├── utils/              # Utility functions (future)
│   ├── App.tsx             # Main application component
│   ├── App.css             # Application styles
│   ├── index.css           # Global styles & Tailwind imports
│   └── main.tsx            # Application entry point
├── docs/
│   ├── architecture/       # Architecture documentation
│   │   ├── README.md       # System architecture overview
│   │   └── PWA-ARCHITECTURE.md # PWA implementation details
│   ├── features/           # Feature documentation
│   │   ├── README.md       # Features overview
│   │   └── COMPONENTS.md   # Component documentation
│   ├── prompts/            # Development prompts
│   ├── templates/          # Documentation templates
│   ├── TESTING-PWA.md      # PWA testing guide
│   └── PWA-EXPLAINED.md    # PWA concepts explained
├── public/                 # Static assets
├── dist/                   # Production build output
└── [config files]          # Build & development configuration
```

## 📚 Documentation

### 🏗️ Architecture

- **[System Architecture](docs/architecture/README.md)** - Overview of the system design and principles
- **[PWA Architecture](docs/architecture/PWA-ARCHITECTURE.md)** - Detailed PWA implementation and caching strategies

### 🎯 Features

- **[Features Overview](docs/features/README.md)** - Current and planned features roadmap
- **[Component Documentation](docs/features/COMPONENTS.md)** - Detailed component guides and usage

### 🧪 Testing & Development

- **[PWA Testing Guide](docs/TESTING-PWA.md)** - How to test PWA functionality
- **[PWA Concepts Explained](docs/PWA-EXPLAINED.md)** - Understanding PWA fundamentals

### 💡 Development

- **[Development Prompts](docs/prompts/)** - AI prompts for development assistance
- **[Documentation Templates](docs/templates/)** - Templates for consistent documentation

## 🛠️ Development

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint

### Key Technologies

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Vite PWA Plugin** - PWA functionality
- **Workbox** - Service worker library

## 🎯 Current Status

### ✅ Implemented

- PWA foundation with offline support
- Service worker with caching strategies
- Installation prompts and status monitoring
- Responsive design with Tailwind CSS
- TypeScript configuration and type safety

### 🚧 In Progress

- Component documentation and testing
- Feature planning and architecture design

### 🔮 Planned

- Exercise database and workout logging
- Local data storage with IndexedDB
- Progress tracking and analytics
- Social features and cloud sync

## 🚀 Next Steps

This is a starter template. Here are some ideas for expanding the workout tracker:

1. **Add Workout Tracking**

   - Exercise database
   - Set/rep/weight logging
   - Workout history

2. **Data Persistence**

   - IndexedDB for offline storage
   - Sync with backend when online

3. **Advanced Features**

   - Progress charts
   - Workout templates
   - Social features

4. **Deployment**

   - AWS S3 + CloudFront
   - Custom domain
   - HTTPS setup

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - feel free to use this project for your own workout tracking needs!

---

**Need help?** Check out the [documentation](docs/) for detailed guides and explanations!
