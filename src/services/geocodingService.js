/**
 *  * geocodingService.js
  * -------------------
* Converts user city input into canonical coordinates
 * (lat, lon) using backend geocoding.
  */

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

  /**
* resolveCityToCoords
 * -------------------
* @param {string} cityInput - Raw user input (e.g. "delhi", "new yrok")
 * @returns {Promise<{lat, lon, label} | null>}
  */
  export async function resolveCityToCoords(cityInput) {
 if (!cityInput || typeof cityInput !== 'string') {
return null
  }

 // Normalize input (trim, collapse spaces)
const query = cityInput.trim().replace(/\s+/g, ' ')

try {
 const response = await fetch(
  `${API_BASE_URL}/location/resolve?query=${encodeURIComponent(query)}`
)

  if (!response.ok) {
return null
 }

const data = await response.json()

 /**
 * Expected backend response shape:
* {
*success: true,
*location: {
  *  lat: number,
  *  lon: number,
 *  label: string
 *},
 *suggestions?: []
* }
*/

 if (!data.success || !data.location) {
  return null
 }

  return {
lat: data.location.lat,
 lon: data.location.lon,
 label: data.location.label
}
  } catch (error) {
 // Network or parsing failure
  return null
 }
 }

 /**
* fetchCitySuggestions
 * --------------------
  * Used for autocomplete & "Did you mean?"
*/
export async function fetchCitySuggestions(partial) {
  if (!partial || partial.length < 2) return []

 try {
const response = await fetch(
 `${API_BASE_URL}/location/suggest?query=${encodeURIComponent(partial)}`
  )

 if (!response.ok) return []

  const data = await response.json()

 /**
* Expected:
* {
*success: true,
  *suggestions: [
  *  { label, lat, lon }
 *]
 * }
 */

  return data.success ? data.suggestions : []
 } catch {
return []
  }
  }
  
/* // ------------------------------
// 1️⃣ Base configuration
// ------------------------------
const BASE_URL = import.meta.env.VITE_WEATHER_API_BASE
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY

// ------------------------------
// 2️⃣ Safe fetch helper
// ------------------------------
const safeFetch = async (url) => {
  const res = await fetch(url)

  if (!res.ok) {
    throw new Error(`Geocoding failed: ${res.status}`)
  }

  return res.json()
}

// ------------------------------
// 3️⃣ Resolve city → coordinates
// ------------------------------
export const resolveCityLocation = async ({
  city,
  country,
  pincode
}) => {
  if (!city && !pincode) {
    throw new Error('City or pincode required')
  }

  let query = ''

  // ------------------------------
  // 4️⃣ Build query safely
  // ------------------------------
  if (pincode) {
    query = `${pincode}${country ? ',' + country : ''}`
  } else {
    query = `${city}${country ? ',' + country : ''}`
  }

  const url = `${BASE_URL}/geo/1.0/direct?q=${encodeURIComponent(
    query
  )}&limit=1&appid=${API_KEY}`

  const data = await safeFetch(url)

  if (!Array.isArray(data) || data.length === 0) {
    throw new Error('Location not found')
  }

  const location = data[0]

  // ------------------------------
  // 5️⃣ Normalize result
  // ------------------------------
  return {
    city: location.name,
    country: location.country,
    lat: location.lat,
    lon: location.lon
  }
}*/