import { createContext, useContext, useEffect, useState } from 'react'

// ------------------------------
// 1️⃣ Create Context
// ------------------------------
const ThemeContext = createContext(null)

// ------------------------------
// 2️⃣ Detect system preference
// ------------------------------
const getSystemTheme = () => {
  if (typeof window === 'undefined') return 'light'

    return window.matchMedia('(prefers-color-scheme: dark)').matches
? 'dark'
    : 'light'
    }

    // ------------------------------
    // 3️⃣ Provider Component
    // ------------------------------
    export const ThemeProvider = ({ children }) => {
      // ------------------------------
// 4️⃣ Initial theme resolution
  // Priority:
    // localStorage → system → light
      // ------------------------------
const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme')
return saved || getSystemTheme()
  })

    // ------------------------------
      // 5️⃣ Sync theme to <html>
// ------------------------------
  useEffect(() => {
      const root = document.documentElement

  if (theme === 'dark') {
root.classList.add('dark')
    } else {
  root.classList.remove('dark')
      }

  localStorage.setItem('theme', theme)
    }, [theme])

      // ------------------------------
// 6️⃣ Toggle helper
  // ------------------------------
    const toggleTheme = () => {
setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

    return (
<ThemeContext.Provider
      value={{
      theme,
      setTheme,
      toggleTheme,
      isDark: theme === 'dark'
    }}
>
      {children}
  </ThemeContext.Provider>
    )
    }

    // ------------------------------
    // 7️⃣ Safe consumer hook
    // ------------------------------
    export const useTheme = () => {
      const context = useContext(ThemeContext)

if (!context) {
    throw new Error(
  'useTheme must be used inside ThemeProvider'
      )
}

  return context
  }
  