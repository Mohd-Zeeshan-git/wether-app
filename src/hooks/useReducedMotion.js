import { useEffect, useState } from 'react'

export const useReducedMotion = () => {
  // ------------------------------
    // 1️⃣ Initial preference
// ------------------------------
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
if (typeof window === 'undefined') return false

    return window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches
    })

// ------------------------------
  // 2️⃣ Listen for preference change
    // ------------------------------
useEffect(() => {
    if (typeof window === 'undefined') return

  const mediaQuery = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
)

    const handler = (event) => {
    setPrefersReducedMotion(event.matches)
  }

mediaQuery.addEventListener('change', handler)

    return () => {
    mediaQuery.removeEventListener('change', handler)
  }
    }, [])

return prefersReducedMotion
}
