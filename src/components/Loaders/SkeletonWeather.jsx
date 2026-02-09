import React from 'react'

const SkeletonWeather = () => {
  return (
      <section
aria-hidden="true"
      className="
  w-full max-w-xl mx-auto
          rounded-2xl
      bg-white/80 backdrop-blur
  shadow-xl
          p-6
      dark:bg-slate-900/80
"
    >
          {/* City name placeholder */}
    <div className="h-5 w-32 rounded bg-slate-200 dark:bg-slate-700 animate-pulse" />

          {/* Temperature placeholder */}
    <div className="mt-4 h-12 w-24 rounded bg-slate-200 dark:bg-slate-700 animate-pulse" />

          {/* Condition placeholder */}
    <div className="mt-2 h-4 w-40 rounded bg-slate-200 dark:bg-slate-700 animate-pulse" />

          {/* Extra details */}
    <div className="mt-6 grid grid-cols-2 gap-4">
<div className="h-16 rounded bg-slate-200 dark:bg-slate-700 animate-pulse" />
        <div className="h-16 rounded bg-slate-200 dark:bg-slate-700 animate-pulse" />
  </div>
      </section>
        )
        }

        export default SkeletonWeather
        