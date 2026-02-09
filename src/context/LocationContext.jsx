import React, { createContext, useContext, useEffect, useState } from 'react'

// Services
import { resolveCityToCoords } from '../services/geocodingService'

// Utils
import { LOCATION_REFRESH_INTERVAL } from '../utils/constants'

// ----------------------------------
// Create Context
// ----------------------------------
const LocationContext = createContext(null)

// ----------------------------------
// Provider Component
// ----------------------------------
export const LocationProvider = ({ children }) => {
/**
 * location shape:
* {
 * lat: number,
* lon: number,
 * label: string,
* source: 'gps' | 'manual' | 'search'
 * }
*/
const [location, setLocation] = useState(null)

// Track when location was last resolved
const [lastUpdated, setLastUpdated] = useState(null)

// ----------------------------------
// 1️⃣ GPS LOCATION (optional)
// ----------------------------------
const setLocationFromGPS = () => {
if (!navigator.geolocation) return

navigator.geolocation.getCurrentPosition(
(pos) => {
const coords = {
lat: pos.coords.latitude,
lon: pos.coords.longitude,
label: 'Current Location',
source: 'gps'
}

setLocation(coords)
setLastUpdated(Date.now())
},
() => {
// User denied or error → silently fail
// UI will fall back to search/manual
},
{
enableHighAccuracy: false,
timeout: 10000
}
)
}

// ----------------------------------
// 2️⃣ MANUAL / SEARCH LOCATION
// ----------------------------------
const setLocationFromCity = async (cityInput) => {
// Resolve city → canonical lat/lon
const resolved = await resolveCityToCoords(cityInput)

if (!resolved) {
throw new Error('Invalid city')
}

setLocation({
lat: resolved.lat,
lon: resolved.lon,
label: resolved.label,
source: 'manual'
})

setLastUpdated(Date.now())
}

// ----------------------------------
// 3️⃣ AUTO REFRESH (4–5 hours)
// ----------------------------------
useEffect(() => {
if (!location || location.source !== 'gps') return

const interval = setInterval(() => {
setLocationFromGPS()
}, LOCATION_REFRESH_INTERVAL)

return () => clearInterval(interval)
}, [location])

return (
<LocationContext.Provider
value={{
location,
setLocationFromGPS,
setLocationFromCity
}}
>
{children}
</LocationContext.Provider>
)
}

// ----------------------------------
// Hook to consume context
// ----------------------------------
export const useLocationContext = () => {
const context = useContext(LocationContext)

if (!context) {
throw new Error(
'useLocationContext must be used within LocationProvider'
)
}

return context
}


/*. import {
  createContext,
useContext,
  useEffect,
useRef,
  useState
  } from 'react'
  
  // ------------------------------
  // 1️⃣ Create Context
  // ------------------------------
  const LocationContext = createContext(null)
  
  // ------------------------------
  // 2️⃣ Constants
  // ------------------------------
  const AUTO_REFRESH_INTERVAL = 1000 * 60 * 60 * 4 // 4 hours
  
  // ------------------------------
  // 3️⃣ Provider
  // ------------------------------
  export const LocationProvider = ({ children }) => {
// ------------------------------
  // 4️⃣ Core state
// ------------------------------
  const [mode, setMode] = useState('init') // init | gps | manual | search
const [permission, setPermission] = useState('unknown') // granted | denied
  const [coords, setCoords] = useState(null) // { lat, lon }
const [manualLocation, setManualLocation] = useState(null)
  const lastFetchRef = useRef(0)
  
// ------------------------------
  // 5️⃣ Load manual location
// ------------------------------
  useEffect(() => {
  const saved = localStorage.getItem('manual_location')
  if (saved) {
setManualLocation(JSON.parse(saved))
  setMode('manual')
  }
}, [])

  // ------------------------------
// 6️⃣ Persist manual location
  // ------------------------------
useEffect(() => {
if (manualLocation) {
  localStorage.setItem(
  'manual_location',
  JSON.stringify(manualLocation)
)
}
  }, [manualLocation])
  
// ------------------------------
  // 7️⃣ Request GPS location
// ------------------------------
  const requestLocation = () => {
  if (!navigator.geolocation) {
setPermission('denied')
  setMode('search')
return
}

navigator.geolocation.getCurrentPosition(
  (position) => {
  setCoords({
lat: position.coords.latitude,
  lon: position.coords.longitude
  })
  setPermission('granted')
  setMode('gps')
  lastFetchRef.current = Date.now()
},
  () => {
  setPermission('denied')
  setMode('search')
},
  {
  enableHighAccuracy: false,
  timeout: 8000,
  maximumAge: 1000 * 60 * 30
}
)
  }
  
// ------------------------------
  // 8️⃣ Auto-refresh on resume
// ------------------------------
  useEffect(() => {
  const now = Date.now()
  if (
mode === 'gps' &&
  now - lastFetchRef.current > AUTO_REFRESH_INTERVAL
  ) {
requestLocation()
}
  }, [mode])
  
return (
<LocationContext.Provider
  value={{
  mode,
  permission,
  coords,
  manualLocation,
  setManualLocation,
  requestLocation,
  setMode
}}
>
  {children}
  </LocationContext.Provider>
)
}

// ------------------------------
// 9️⃣ Safe consumer hook
// ------------------------------
export const useLocation = () => {
  const context = useContext(LocationContext)
  
if (!context) {
throw new Error(
  'useLocation must be used inside LocationProvider'
  )
}

  return context
  }
   */