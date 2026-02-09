import { createContext, useContext, useState } from 'react'

const UIContext = createContext(null)

// ------------------------------
// 1️⃣ Provider
// ------------------------------
export const UIProvider = ({ children }) => {
  // ------------------------------
  // 2️⃣ Global UI state
  // ------------------------------
  const [showSkeleton, setShowSkeleton] =
    useState(false)

  const [modal, setModal] = useState(null)
  // modal = { type: 'settings' | 'info', payload }

  const [banner, setBanner] = useState(null)
  // banner = { type: 'offline' | 'error', message }

  // ------------------------------
  // 3️⃣ Public API
  // ------------------------------
  return (
    <UIContext.Provider
      value={{
        showSkeleton,
        setShowSkeleton,
        modal,
        setModal,
        banner,
        setBanner
      }}
    >
      {children}
    </UIContext.Provider>
  )
}

// ------------------------------
// 4️⃣ Hook
// ------------------------------
export const useUI = () => {
  const ctx = useContext(UIContext)

  if (!ctx) {
    throw new Error(
      'useUI must be used within UIProvider'
    )
  }

  return ctx
}