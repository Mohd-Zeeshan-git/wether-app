import { createContext, useContext, useEffect, useState } from 'react'

// ------------------------------
// 1️⃣ Create Context
// ------------------------------
const UnitContext = createContext(null)

// ------------------------------
// 2️⃣ Provider Component
// ------------------------------
export const UnitProvider = ({ children }) => {
  // ------------------------------
    // 3️⃣ Initial unit (from storage)
// ------------------------------
  const [unit, setUnit] = useState(() => {
const saved = localStorage.getItem('temp_unit')
    return saved === 'F' ? 'F' : 'C'
})

  // ------------------------------
    // 4️⃣ Persist unit preference
// ------------------------------
  useEffect(() => {
localStorage.setItem('temp_unit', unit)
  }, [unit])

    // ------------------------------
// 5️⃣ Toggle helper
  // ------------------------------
    const toggleUnit = () => {
  setUnit((prev) => (prev === 'C' ? 'F' : 'C'))
    }

return (
    <UnitContext.Provider
    value={{
unit,
  setUnit,
    toggleUnit
    }}
  >
  {children}
</UnitContext.Provider>
  )
  }

  // ------------------------------
  // 6️⃣ Safe consumer hook
  // ------------------------------
  export const useUnit = () => {
    const context = useContext(UnitContext)
if (!context) {
    throw new Error(
    'useUnit must be used inside UnitProvider'
  )
    }
return context
}
