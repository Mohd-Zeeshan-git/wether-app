import React from 'react'
import { motion } from 'framer-motion'

// Effects resolver
import WeatherEffects from './WeatherEffects'

// Hooks
import { useReducedMotion } from '../../hooks/useReducedMotion'

// Utils
import { getWeatherGradient } from '../../utils/getWeatherGradient'

const WeatherEnvironment = ({ temp, condition }) => {
  // Respect OS reduced motion preference
const prefersReducedMotion = useReducedMotion()

  // Resolve background gradient
const background = getWeatherGradient(temp, condition)

  return (
  <motion.div
aria-hidden="true"
  className="
  absolute inset-0 z-0
  overflow-hidden
"
  style={{
  background
}}
  // Animate gradient change smoothly
animate={{ background }}
  transition={{
  duration: prefersReducedMotion ? 0 : 1.2,
  ease: 'easeInOut'
}}
>
  {/* Weather particles / effects */}
{!prefersReducedMotion && (
<WeatherEffects temp={temp} condition={condition} />
  )}
  </motion.div>
)
}

export default WeatherEnvironment
