import { WEATHER_GRADIENTS } from '../design-tokens/gradients'

/**
 * Resolve background gradient based on weather
  * @param {number} temp
   * @param {string} condition
    * @returns {string} CSS linear-gradient
*/
export function getWeatherGradient(temp, condition) {
  // ------------------------------
    // 1️⃣ Defensive normalization
 // ------------------------------
   const safeTemp = Number.isFinite(temp) ? temp : null
const safeCondition =
    typeof condition === 'string'
? condition.toLowerCase()
 : ''

   // ------------------------------
// 2️⃣ Hot weather
  // ------------------------------
    if (safeTemp !== null && safeTemp > 30) {
   return WEATHER_GRADIENTS.HOT.value
}

  // ------------------------------
    // 3️⃣ Rain / Drizzle
 // ------------------------------
   if (
  safeCondition.includes('rain') ||
 safeCondition.includes('drizzle')
   ) {
  return WEATHER_GRADIENTS.RAIN.value
    }

 // ------------------------------
   // 4️⃣ Snow / Freezing
// ------------------------------
  if (
 safeCondition.includes('snow') ||
(safeTemp !== null && safeTemp < 0)
  ) {
 return WEATHER_GRADIENTS.SNOW.value
   }

// ------------------------------
  // 5️⃣ Cloudy / Fog
    // ------------------------------
 if (
safeCondition.includes('cloud') ||
    safeCondition.includes('fog')
 ) {
return WEATHER_GRADIENTS.CLOUDY.value
  }

    // ------------------------------
 // 6️⃣ Default clear weather
   // ------------------------------
return WEATHER_GRADIENTS.CLEAR.value
}
