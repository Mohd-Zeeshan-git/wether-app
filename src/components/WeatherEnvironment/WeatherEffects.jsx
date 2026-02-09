import React from 'react'

// Third-party effect libraries
import { Rain, Snow, Cloud } from 'react-weather-effects'
import Snowfall from 'react-snowfall'

// Hooks
import { useReducedMotion } from '../../hooks/useReducedMotion'

// Utils
import { getDeviceProfile } from '../../utils/deviceProfile'

const WeatherEffects = ({ temp, condition }) => {
  const prefersReducedMotion = useReducedMotion()
const { isLowEnd, particleMultiplier } = getDeviceProfile()

  // Defensive guards
if (prefersReducedMotion || temp == null || !condition) {
return null
  }

const normalized = condition.toLowerCase()

  // ------------------------------
// 🌧️ Rain / Drizzle
  // ------------------------------
if (normalized.includes('rain') || normalized.includes('drizzle')) {
return (
  <Rain
  className="absolute inset-0"
  dropSize={2 * particleMultiplier}
  rainChance={0.6}
/>
)
  }

// ------------------------------
  // ❄️ Snow
// ------------------------------
  if (normalized.includes('snow') || temp < 0) {
  return (
<Snow
className="absolute inset-0"
snowflakeCount={150 * particleMultiplier}
  />
  )
}

  // ------------------------------
// ☁️ Cloud / Fog
  // ------------------------------
if (
normalized.includes('cloud') ||
normalized.includes('fog')
  ) {
  return (
<Cloud
className="absolute inset-0"
opacity={0.4}
  />
  )
}

  // ------------------------------
// 🔥 Heat (custom effect)
  // ------------------------------
if (temp > 30) {
return (
  <div
  className="
absolute inset-0
  pointer-events-none
rotate-180
"
  >
  <Snowfall
snowflakeCount={120 * particleMultiplier}
  color="#ffb347"
speed={[0.1, 0.4]}
  wind={[-0.2, 0.2]}
  />
</div>
)
  }

// ------------------------------
  // 🌬️ Wind / Thunder (CSS driven)
// ------------------------------
  if (normalized.includes('wind')) {
  return (
<div className="absolute inset-0 animate-wind" />
)
  }

if (normalized.includes('thunder')) {
return (
  <div className="absolute inset-0 animate-thunder" />
  )
}

  return null
  }

  export default WeatherEffects
  

  /*
  import Snowfall from 'react-snowfall'
import { Rain } from 'react-weather-effects'

import { useReducedMotion } from '../../hooks/useReducedMotion'
import { getDeviceProfile } from '../../utils/deviceProfile'

const WeatherEffects = ({ temp, condition }) => {
  // ------------------------------
  // 1️⃣ Accessibility & performance
  // ------------------------------
  const prefersReducedMotion = useReducedMotion()
  const { particleMultiplier } = getDeviceProfile()

  if (prefersReducedMotion) return null

  const safeTemp = Number.isFinite(temp) ? temp : null
  const safeCondition =
    typeof condition === 'string'
      ? condition.toLowerCase()
      : ''

  // ------------------------------
  // 2️⃣ Effect resolution
  // ------------------------------

  // 🌧️ Rain / Drizzle
  if (
    safeCondition.includes('rain') ||
    safeCondition.includes('drizzle')
  ) {
    return (
      <Rain
        color="rgba(255,255,255,0.4)"
        count={80 * particleMultiplier}
      />
    )
  }

  // ❄️ Snow / Freezing
  if (
    safeCondition.includes('snow') ||
    (safeTemp !== null && safeTemp < 0)
  ) {
    return (
      <Snowfall
        snowflakeCount={120 * particleMultiplier}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%'
        }}
      />
    )
  }

  // 🔥 Heat (custom rising particles)
  if (safeTemp !== null && safeTemp > 30) {
    return (
      <div
        className="
          absolute
          inset-0
          pointer-events-none
          rotate-180
        "
      >
        <Snowfall
          snowflakeCount={60 * particleMultiplier}
          color="rgba(255,165,0,0.6)"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%'
          }}
        />
      </div>
    )
  }

  // 🌫️ Fog / Clouds → no particles (background only)
  return null
}

export default WeatherEffects
  */