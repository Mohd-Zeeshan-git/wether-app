/**
 *  * cacheService.js
  * ----------------
* Handles local caching of weather data
 * using browser localStorage.
  */

  // Cache expiry time (in milliseconds)
  // Example: 30 minutes
  const CACHE_TTL = 1000 * 60 * 30

  /**
* Generate a unique cache key based on location
 * Ensures different cities/coordinates don't clash
*/
function getCacheKey(location) {
  if (!location) return null

 return `weather_${location.lat}_${location.lon}`
 }

 /**
  * getCachedWeather
* ----------------
 * Returns cached weather data if:
* - cache exists
 * - cache is NOT expired
  */
  export function getCachedWeather(location) {
 const key = getCacheKey(location)
if (!key) return null

try {
 const cached = localStorage.getItem(key)
if (!cached) return null

 const parsed = JSON.parse(cached)

// Check expiry
 if (Date.now() - parsed.timestamp > CACHE_TTL) {
  localStorage.removeItem(key)
return null
 }

return parsed.data
  } catch {
// Corrupted cache → ignore safely
  return null
 }
 }

 /**
  * setCachedWeather
* ----------------
 * Stores raw weather response with timestamp
*/
export function setCachedWeather(location, data) {
  const key = getCacheKey(location)
 if (!key || !data) return

try {
  localStorage.setItem(
key,
JSON.stringify({
timestamp: Date.now(),
data
 })
)
  } catch {
// Storage quota exceeded or disabled → fail silently
}
}

 /* // ------------------------------
 // // 1️⃣ Constants
 // ------------------------------
 const CACHE_KEY = 'cached_weather'
 const CACHE_TTL = 1000 * 60 * 60 * 2 // 2 hours
 
 // ------------------------------
 // 2️⃣ Save weather to cache
 // ------------------------------
 export const setCachedWeather = (data) => {
   if (!data) return
   
const payload = {
    data,
   timestamp: Date.now()
}

  try {
 localStorage.setItem(CACHE_KEY, JSON.stringify(payload))
   } catch (err) {
  // Storage might be full or unavailable
 console.warn('Failed to cache weather data')
   }
   }
   
   // ------------------------------
   // 3️⃣ Read weather from cache
   // ------------------------------
   export const getCachedWeather = () => {
try {
    const raw = localStorage.getItem(CACHE_KEY)
   if (!raw) return null
   
  const parsed = JSON.parse(raw)
  
 // ------------------------------
// 4️⃣ Cache expiration check
    // ------------------------------
   const isExpired =
    Date.now() - parsed.timestamp > CACHE_TTL
    
   if (isExpired) {
    localStorage.removeItem(CACHE_KEY)
return null
    }
    
   return parsed.data
} catch (err) {
    return null
 }
 }
 
 // ------------------------------
 // 5️⃣ Clear cache manually (optional)
 // ------------------------------
 export const clearWeatherCache = () => {
   localStorage.removeItem(CACHE_KEY)
   }
    */