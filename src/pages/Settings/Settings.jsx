import React from 'react'
import { useTheme } from '../../context/ThemeContext'
import { useUnit } from '../../context/UnitContext'

const Settings = () => {
  const { isDark, toggleTheme } = useTheme()
  const { unit, toggleUnit } = useUnit()

  return (
    <div className="mx-auto max-w-md p-6">
      <h1 className="mb-6 text-2xl font-bold">
        Settings
      </h1>

      <div className="flex items-center justify-between py-4">
        <span>Theme</span>
        <button
          onClick={toggleTheme}
          className="rounded bg-gray-200 px-4 py-2 dark:bg-gray-700"
        >
          {isDark ? 'Dark' : 'Light'}
        </button>
      </div>

      <div className="flex items-center justify-between py-4">
        <span>Temperature Unit</span>
        <button
          onClick={toggleUnit}
          className="rounded bg-gray-200 px-4 py-2 dark:bg-gray-700"
        >
          °{unit}
        </button>
      </div>
    </div>
  )
}

export default Settings