import { useEffect, useState } from 'react'

/**
 * Debounce any changing value
  * @param {*} value - value to debounce
* @param {number} delay - delay in ms
 */
 export const useDebounce = (value, delay = 300) => {
const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
// Wait for delay before updating
 const timer = setTimeout(() => {
 setDebouncedValue(value)
  }, delay)

// Cleanup if value changes quickly
 return () => {
 clearTimeout(timer)
  }
 }, [value, delay])

return debouncedValue
}
