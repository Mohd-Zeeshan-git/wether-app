 
// import {
// createContext,
//   useContext,
//     useEffect,
// useState
// } from 'react'

// import { useLocation } from './LocationContext'
// import { useUnit } from './UnitContext'

// import {
//   fetchWeatherByCity,
//     fetchWeatherByCoords
//     } from '../services/weatherService'

//     import {
// getCachedWeather,
// setCachedWeather
// } from '../services/cacheService'

// // ------------------------------
// // 1️⃣ Create Context
// // ------------------------------
// const WeatherContext = createContext(null)

// // ------------------------------
// // 2️⃣ Provider
// // ------------------------------
// export const WeatherProvider = ({ children }) => {
//   // ------------------------------
//     // 3️⃣ External contexts
// // ------------------------------
//   const { mode, coords, manualLocation } = useLocation()
//     const { unit } = useUnit()

// // ------------------------------
//   // 4️⃣ Weather state
//     // ------------------------------
// const [data, setData] = useState(null)
// const [loading, setLoading] = useState(false)
//   const [error, setError] = useState(null)
//     const [source, setSource] = useState(null) // gps | manual | search | cache

// // ------------------------------
//   // 5️⃣ Core fetch logic
//     // ------------------------------
// const fetchWeather = async () => {
//     setLoading(true)
// setError(null)

//     try {
//     let result = null

//     // ------------------------------
//   // GPS MODE
//   // ------------------------------
//   if (mode === 'gps' && coords) {
//   result = await fetchWeatherByCoords(
// coords.lat,
//   coords.lon,
// unit
// )
//   setSource('gps')
//   }

// // ------------------------------
// // MANUAL MODE
// // ------------------------------
// else if (mode === 'manual' && manualLocation) {
// result = await fetchWeatherByCity(
//     manualLocation.city,
// manualLocation.country,
//     unit
//     )
// setSource('manual')
// }

//     // ------------------------------
//     // If data fetched successfully
//     // ------------------------------
//   if (result) {
//     setData(result)
// setCachedWeather(result)
// return
// }

// throw new Error('No weather data')
//   } catch (err) {
//   // ------------------------------
//   // Offline / fallback
// // ------------------------------
// const cached = getCachedWeather()
// if (cached) {
// setData(cached)
//   setSource('cache')
//   } else {
//   setError('Unable to fetch weather data')
//   }
// } finally {
// setLoading(false)
//   }
//     }

// // ------------------------------
//   // 6️⃣ React to location or unit change
//     // ------------------------------
// useEffect(() => {
//     if (mode === 'gps' || mode === 'manual') {
//   fetchWeather()
// }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
// }, [mode, coords, manualLocation, unit])

//   return (
// <WeatherContext.Provider
//     value={{
// data,
// loading,
//   error,
//     source,
//     refresh: fetchWeather
//     }}
//   >
// {children}
//     </WeatherContext.Provider>
// )
// }

// // ------------------------------
// // 7️⃣ Safe consumer hook
// // ------------------------------
// export const useWeather = () => {
//   const context = useContext(WeatherContext)

//     if (!context) {
//   throw new Error(
// 'useWeather must be used inside WeatherProvider'
//     )
// }

//   return context
//   }
  


  import {
  createContext,
  useContext,
  useEffect,
  useState
} from 'react'

import {
  fetchWeatherByCity,
  fetchWeatherByCoords
} from '../services/weatherService'

import {
  cacheWeather,
  getCachedWeather,
  cacheLocation,
  getCachedLocation
} from '../services/cacheService'

import { analytics } from '../services/analyticsService'
import { useOffline } from '../hooks/useOffline'

// ----------------------------------
// 1️⃣ Create Context
// ----------------------------------
const WeatherContext = createContext(null)

// ----------------------------------
// 2️⃣ Provider Component
// ----------------------------------
export const WeatherProvider = ({ children }) => {
  const isOffline = useOffline()

  // ------------------------------
  // 3️⃣ State
  // ------------------------------
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [mode, setMode] = useState('IDLE') 
  // IDLE | SEARCH | LOCATION | OFFLINE

  // ------------------------------
  // 4️⃣ Load cached weather on mount
  // ------------------------------
  useEffect(() => {
    const cached = getCachedWeather()
    if (cached) {
      setWeather(cached)
      setMode('OFFLINE')
    }
  }, [])

  // ------------------------------
  // 5️⃣ Fetch weather by city
  // ------------------------------
  const searchByCity = async (city) => {
    if (!city) return

    analytics.searchAttempt(city)

    if (isOffline) {
      analytics.offlineViewed()
      return
    }

    try {
      setLoading(true)
      setError(null)
      setMode('SEARCH')

      const data = await fetchWeatherByCity(city)

      setWeather(data)
      cacheWeather(data)

      analytics.searchSuccess(data.city)
    } catch (err) {
      setError(err.message || 'Search failed')
      analytics.searchFailure(err.message)
    } finally {
      setLoading(false)
    }
  }

  // ------------------------------
  // 6️⃣ Fetch weather by coordinates
  // ------------------------------
  const searchByLocation = async (lat, lon) => {
    if (lat == null || lon == null) return

    if (isOffline) {
      analytics.offlineViewed()
      return
    }

    try {
      setLoading(true)
      setError(null)
      setMode('LOCATION')

      const data = await fetchWeatherByCoords(
        lat,
        lon
      )

      setWeather(data)
      cacheWeather(data)
      cacheLocation({ lat, lon })

      analytics.locationUsed()
    } catch (err) {
      setError('Location weather failed')
    } finally {
      setLoading(false)
    }
  }

  // ------------------------------
  // 7️⃣ Exposed context value
  // ------------------------------
  const value = {
    weather,
    loading,
    error,
    mode,
    isOffline,
    searchByCity,
    searchByLocation
  }

  return (
    <WeatherContext.Provider value={value}>
      {children}
    </WeatherContext.Provider>
  )
}

// ----------------------------------
// 8️⃣ Consumer hook
// ----------------------------------
export const useWeather = () => {
  const context = useContext(WeatherContext)
  if (!context) {
    throw new Error(
      'useWeather must be used within WeatherProvider'
    )
  }
  return context
}