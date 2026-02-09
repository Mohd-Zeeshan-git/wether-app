import { useEffect, useRef } from 'react'
import { useReducedMotion } from './useReducedMotion'

/**
 * useAmbientSound
 * ------------------------------
 * Plays subtle ambient weather
 * sounds (rain / wind / thunder)
 * based on current condition.
 *
 * Sounds are:
 * - optional
 * - low volume
 * - paused when tab hidden
 * - disabled for reduced motion
 *
 * @param {string} condition
 */
export const useAmbientSound = (condition) => {
  const prefersReducedMotion = useReducedMotion()
  const audioRef = useRef(null)

  // ------------------------------
  // 1️⃣ Resolve sound file
  // ------------------------------
  const resolveSound = () => {
    if (!condition) return null

    const c = condition.toLowerCase()

    if (c.includes('rain') || c.includes('drizzle'))
      return '/sounds/rain.mp3'

    if (c.includes('thunder'))
      return '/sounds/thunder.mp3'

    if (c.includes('wind'))
      return '/sounds/wind.mp3'

    return null
  }

  // ------------------------------
  // 2️⃣ Effect
  // ------------------------------
  useEffect(() => {
    if (prefersReducedMotion) return

    const src = resolveSound()
    if (!src) return

    // Stop previous sound
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current = null
    }

    const audio = new Audio(src)
    audio.loop = true
    audio.volume = 0.2 // subtle
    audioRef.current = audio

    const playSafe = () => {
      audio
        .play()
        .catch(() => {
          // autoplay blocked — silently fail
        })
    }

    playSafe()

    // --------------------------
    // 3️⃣ Visibility handling
    // --------------------------
    const handleVisibility = () => {
      if (document.hidden) {
        audio.pause()
      } else {
        playSafe()
      }
    }

    document.addEventListener(
      'visibilitychange',
      handleVisibility
    )

    // --------------------------
    // 4️⃣ Cleanup
    // --------------------------
    return () => {
      document.removeEventListener(
        'visibilitychange',
        handleVisibility
      )
      audio.pause()
    }
  }, [condition, prefersReducedMotion])
}