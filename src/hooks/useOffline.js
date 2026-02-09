import { useEffect, useState } from 'react'

/**
 * useOffline
  * ----------
   * Detects whether the browser is offline.
    *
     * @returns {boolean} isOffline
*/
export const useOffline = () => {
  // Browser-provided online status
    const [isOffline, setIsOffline] = useState(!navigator.onLine)

useEffect(() => {
    // Event handlers
  const handleOnline = () => setIsOffline(false)
const handleOffline = () => setIsOffline(true)

    // Register listeners
  window.addEventListener('online', handleOnline)
window.addEventListener('offline', handleOffline)

    // Cleanup on unmount
  return () => {
  window.removeEventListener('online', handleOnline)
  window.removeEventListener('offline', handleOffline)
}
  }, [])

    return isOffline
    }
    