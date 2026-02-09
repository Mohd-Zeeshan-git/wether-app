// React core
import React from 'react'

// Global context providers
import { WeatherProvider } from '../context/WeatherContext'
import { LocationProvider } from '../context/LocationContext'
import { ThemeProvider } from '../context/ThemeContext'
import { UnitProvider } from '../context/UnitContext'
import { UIProvider } from '../context/UIContext'

/**
 * AppProviders
  * --------------
   * This component wraps the entire application with
    * all global Context Providers.
*
 * Order MATTERS:
  * - UI & Theme should be outermost (used everywhere)
   * - Location before Weather (weather depends on location)
    * - Unit last (used by weather formatting)
*/
const AppProviders = ({ children }) => {
  return (
 <UIProvider>
  <ThemeProvider>
<LocationProvider>
<WeatherProvider>
  <UnitProvider>
 {/* 
  children represents <App /> from main.jsx
   Every component inside App can now
    access all global context values
   */}
  {children}
    </UnitProvider>
    </WeatherProvider>
  </LocationProvider>
   </ThemeProvider>
  </UIProvider>
    )
    }

    export default AppProviders
    
    /*
    // ------------------------------
// 1️⃣ Import Providers
// ------------------------------
import { ThemeProvider } from '../context/ThemeContext'
import { UnitProvider } from '../context/UnitContext'
import { LocationProvider } from '../context/LocationContext'
import { WeatherProvider } from '../context/WeatherContext'

// ------------------------------
// 2️⃣ AppProviders Component
// ------------------------------
const AppProviders = ({ children }) => {
  return (
    <ThemeProvider>
      <UnitProvider>
        <LocationProvider>
          <WeatherProvider>
            {children}
          </WeatherProvider>
        </LocationProvider>
      </UnitProvider>
    </ThemeProvider>
  )
}

export default AppProviders
    */