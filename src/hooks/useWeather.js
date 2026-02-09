import { useEffect, useState } from 'react'

// Contexts
import { useLocationContext } from '../context/LocationContext'
import { useUnitContext } from '../context/UnitContext'

// Services
import { fetchWeatherByCoords } from '../services/weatherService'
import { getCachedWeather, setCachedWeather } from '../services/cacheService'

// Utils
import { convertTemp } from '../utils/unitConversion'

/**
 * useWeather
  * ----------
   * Central hook that decides:
    * - which weather to fetch
* - when to fetch
 * - what to expose to UI
  */
  export const useWeather = () => {
    // Local UI states
 const [weather, setWeather] = useState(null)
   const [isLoading, setIsLoading] = useState(false)
const [error, setError] = useState(null)

  // Global contexts
    const { location } = useLocationContext()
 const { unit } = useUnitContext()

   /**
 * Effect: Fetch weather whenever
    * - location changes
  * - unit changes
*/
  useEffect(() => {
 if (!location) return

const fetchWeather = async () => {
 setIsLoading(true)
  setError(null)

   try {
 // 1️⃣ Try cache first
    const cached = getCachedWeather(location)

  if (cached) {
  setWeather(formatWeather(cached, unit))
  setIsLoading(false)
  return
}

   // 2️⃣ Fetch from API
 const response = await fetchWeatherByCoords(
 location.lat,
 location.lon
    )

  // 3️⃣ Cache raw response
setCachedWeather(location, response)

   // 4️⃣ Normalize & store
 setWeather(formatWeather(response, unit))
  } catch (err) {
setError('Unable to fetch weather data')
 } finally {
    setIsLoading(false)
}
    }

   fetchWeather()
}, [location, unit])

  return {
 weather,
isLoading,
    error,
   cityLabel: location?.label || ''
}
}

/**
 * formatWeather
  * -------------
   * Converts raw API response into UI-safe structure
    */
    function formatWeather(raw, unit) {
 return {
temp: convertTemp(raw.temp, unit),
    condition: raw.condition,
   humidity: raw.humidity,
  wind: raw.wind
    }
    }
    