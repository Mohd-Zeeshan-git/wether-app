// React core
import React from 'react'

// React Router outlet for page rendering
import { BrowserRouter } from 'react-router-dom'

// App routes configuration
import AppRoutes from './routes'

// UI context for global UI state (theme, etc.)
import { useUIContext } from '../context/UIContext'

const App = () => {
  // Read theme mode from UIContext
    // This value is controlled globally (light / dark)
      const { theme } = useUIContext()

return (
    // BrowserRouter enables routing across the app
<BrowserRouter>
      {/* 
      Root app wrapper
      - min-h-screen ensures full viewport height
      - bg/background handled via Tailwind
      - dark class enables Tailwind dark mode
    */}
  <div
  className={`min-h-screen w-full ${
    theme === 'dark' ? 'dark bg-slate-950' : 'bg-sky-50'
    }`}
  >
  {/* 
    Main content container
      - max-width for large screens
- padding responsive across devices
*/}
<main className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
  {/* Render route-based pages */}
    <AppRoutes />
    </main>
  </div>
      </BrowserRouter>
)
}

export default App


/*
import { useWeather } from '../context/WeatherContext'
import { useTheme } from '../context/ThemeContext'

import Dashboard from '../pages/Dashboard/Dashboard'
import OfflineBanner from '../components/Feedback/OfflineBanner'
import ErrorState from '../components/Feedback/ErrorState'

const App = () => {
  // ------------------------------
  // 1️⃣ Global states
  // ------------------------------
  const { error, source } = useWeather()
  const { isDark } = useTheme()

  // ------------------------------
  // 2️⃣ Root layout
  // ------------------------------
  return (
    <div
      className={`
        min-h-screen
        w-full
        transition-colors
        duration-300
        bg-gray-100
        text-gray-900
        dark:bg-gray-950
        dark:text-gray-100
      `}
    >
      {/* --------------------------
          3️⃣ Offline banner
         -------------------------- }
      {source === 'cache' && <OfflineBanner />}

      {/* --------------------------
          4️⃣ Error state
         -------------------------- }
      {error ? (
        <ErrorState message={error} />
      ) : (
        <Dashboard />
      )}
    </div>
  )
}

export default App
*/