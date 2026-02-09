import React from 'react'

const ErrorState = ({
  title = 'Something went wrong',
    message = 'Unable to fetch weather data.',
      onRetry
      }) => {
        return (
<div
      role="alert"
className="
        w-full max-w-xl mx-auto
    rounded-2xl
bg-red-50
        border border-red-200
    p-6
text-center
        dark:bg-red-900/30
    dark:border-red-800
          "
  >
        {/* Icon */}
  <div className="text-3xl mb-3">⚠️</div>

        {/* Title */}
  <h2 className="text-lg font-semibold text-red-800 dark:text-red-200">
          {title}
    </h2>

          {/* Message */}
    <p className="mt-2 text-sm text-red-700 dark:text-red-300">
{message}
      </p>

{/* Retry button (optional) */}
      {onRetry && (
  <button
onClick={onRetry}
          className="
          mt-5 inline-flex items-center justify-center
          rounded-lg
          bg-red-600 px-4 py-2
          text-sm font-medium text-white
          hover:bg-red-700
          focus:outline-none focus:ring-2 focus:ring-red-400
        "
    >
  Retry
          </button>
    )}
        </div>
          )
          }

          export default ErrorState
          