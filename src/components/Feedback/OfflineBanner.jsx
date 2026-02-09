import React from 'react'

const OfflineBanner = ({ isOffline }) => {
  if (!isOffline) return null

    return (
        <div
              role="status"
aria-live="polite"
      className="
              fixed top-0 inset-x-0 z-40
  bg-yellow-100 border-b border-yellow-300
          px-4 py-2
                  text-center text-sm
      text-yellow-900
              dark:bg-yellow-900/80
  dark:border-yellow-700
          dark:text-yellow-100
                "
>
      <span className="font-medium">You’re offline.</span>{' '}
            Showing cached weather where available.
                </div>
                  )
                  }

                  export default OfflineBanner
                  