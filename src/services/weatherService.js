/**
 *  * weatherService.js
  * -----------------
   * Fetches weather data using canonical coordinates (lat/lon).
    * All weather API calls go through this file.
*/

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

/**
* fetchWeatherByCoords
 * -------------------
  * @param {number} lat - latitude
   * @param {number} lon - longitude
    * @returns {Promise<Object>} normalized weather data
*/
export async function fetchWeatherByCoords(lat, lon) {
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
throw new Error('Invalid coordinates')
  }

    try {
   const response = await fetch(
   `${API_BASE_URL}/weather/current?lat=${lat}&lon=${lon}`
  )

if (!response.ok) {
 throw new Error('Weather API error')
}

   const data = await response.json()

  /**
 * Expected backend response:
 * {
*   success: true,
*   data: {
*temp: number,
    *condition: string,
    *humidity: number,
   *wind: number
   *   }
  * }
  */

if (!data.success || !data.data) {
 throw new Error('Malformed weather response')
}

   return normalizeWeather(data.data)
} catch (error) {
    // Re-throw for useWeather hook to handle
  throw error
    }
    }

    /**
* normalizeWeather
 * ----------------
  * Converts backend response into UI-safe shape
   */
   function normalizeWeather(raw) {
return {
   temp: raw.temp,
  condition: raw.condition,
humidity: raw.humidity,
    wind: raw.wind
 }
 }
 
 /* // ------------------------------
 // // 1️⃣ Base configuration
 // ------------------------------
 const BASE_URL = import.meta.env.VITE_WEATHER_API_BASE
 const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
 
 // ------------------------------
 // 2️⃣ Helper: handle fetch safely
 // ------------------------------
 const safeFetch = async (url) => {
   const response = await fetch(url)
   
if (!response.ok) {
    throw new Error(`Weather API error: ${response.status}`)
 }
 
   return response.json()
   }
   
   // ------------------------------
   // 3️⃣ Normalize API response
   // Converts raw API shape → app shape
   // ------------------------------
   const normalizeWeather = (data) => {
return {
    city: data.name,
   country: data.sys?.country,
   
  temp: data.main?.temp ?? null,
 feelsLike: data.main?.feels_like ?? null,
humidity: data.main?.humidity ?? null,

    condition: data.weather?.[0]?.main ?? '',
   description: data.weather?.[0]?.description ?? '',
   
  windSpeed: data.wind?.speed ?? null,
  
 timestamp: Date.now()
   }
   }
   
   // ------------------------------
   // 4️⃣ Fetch by city name
   // ------------------------------
   export const fetchWeatherByCity = async (
city,
  country,
    unit = 'C'
    ) => {
 if (!city) throw new Error('City is required')
 
   const units = unit === 'F' ? 'imperial' : 'metric'
const query = country ? `${city},${country}` : city

  const url = `${BASE_URL}/weather?q=${encodeURIComponent(
 query
   )}&units=${units}&appid=${API_KEY}`
   
const data = await safeFetch(url)
  return normalizeWeather(data)
  }
  
  // ------------------------------
  // 5️⃣ Fetch by coordinates
  // ------------------------------
  export const fetchWeatherByCoords = async (
    lat,
 lon,
   unit = 'C'
   ) => {
if (!lat || !lon) throw new Error('Coordinates required')

  const units = unit === 'F' ? 'imperial' : 'metric'
  
    const url = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`
    
 const data = await safeFetch(url)
   return normalizeWeather(data)
   }
    */