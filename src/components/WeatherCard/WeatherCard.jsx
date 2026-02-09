import React from 'react'

const WeatherCard = ({
  city,
    temp,
      condition,
        humidity,
wind
}) => {
  return (
      <section
  className="
w-full max-w-xl mx-auto
        rounded-2xl
      bg-white/80 backdrop-blur
    shadow-xl
  p-6
dark:bg-slate-900/80
      "
  aria-label="Current weather information"
      >
  {/* City name */}
        <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
      {city}
  </h2>

        {/* Temperature */}
    <div className="mt-4 flex items-end gap-2">
  <span className="text-5xl font-bold text-slate-900 dark:text-white">
  {Math.round(temp)}°
</span>
        <span className="text-sm text-slate-600 dark:text-slate-300">
        {condition}
      </span>
  </div>

        {/* Extra details */}
    <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
  <div className="rounded-lg bg-slate-100 p-3 dark:bg-slate-800">
  <p className="text-slate-500 dark:text-slate-400">
    Humidity
    </p>
    <p className="font-medium text-slate-800 dark:text-white">
      {humidity}%
      </p>
    </div>

  <div className="rounded-lg bg-slate-100 p-3 dark:bg-slate-800">
  <p className="text-slate-500 dark:text-slate-400">
    Wind
    </p>
    <p className="font-medium text-slate-800 dark:text-white">
      {wind} km/h
      </p>
    </div>
</div>
    </section>
      )
      }

      export default WeatherCard
      