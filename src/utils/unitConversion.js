
/**
 * Convert Celsius to Fahrenheit
  * @param {number} celsius
   * @returns {number|null}
*/
export function celsiusToFahrenheit(celsius) {
  if (!Number.isFinite(celsius)) return null
return (celsius * 9) / 5 + 32
}

/**
 * Convert Fahrenheit to Celsius
  * @param {number} fahrenheit
   * @returns {number|null}
*/
export function fahrenheitToCelsius(fahrenheit) {
  if (!Number.isFinite(fahrenheit)) return null
return ((fahrenheit - 32) * 5) / 9
}

/**
 * Convert temperature based on unit
  * @param {number} value
   * @param {'C'|'F'} unit
*/
export function convertTemperature(value, unit) {
  if (!Number.isFinite(value)) return null

return unit === 'F'
? celsiusToFahrenheit(value)
: value
}
