import React from 'react'

const EmptyState = () => {
  return (
      <section
aria-label="Welcome message"
      className="
  w-full max-w-xl mx-auto
          rounded-2xl
      bg-white/80 backdrop-blur
  shadow-xl
          p-8
      text-center
  dark:bg-slate-900/80
        "
>
      {/* Icon */}
<div className="text-4xl mb-4">🌤️</div>

      {/* Title */}
<h2 className="text-xl font-semibold text-slate-800 dark:text-white">
        Welcome to Weather App
  </h2>

        {/* Description */}
  <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
          Search for a city to see the current weather, or allow location
      access to automatically show weather for where you are.
</p>

      {/* Hint */}
<p className="mt-5 text-xs text-slate-500 dark:text-slate-400">
        Tip: You can also use voice search 🎤
  </p>
      </section>
        )
        }

        export default EmptyState
        