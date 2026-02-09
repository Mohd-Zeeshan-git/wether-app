// React core
import React from 'react'

// React Router components
import { Routes, Route } from 'react-router-dom'

// Page components
import Dashboard from '../pages/Dashboard/Dashboard'
import Settings from '../pages/Settings/Settings'
import NotFound from '../pages/NotFound'

/**
 * AppRoutes
  * ----------
   * Central place where all routes are defined.
* This component is rendered inside <BrowserRouter>
 * in App.jsx.
  */
  const AppRoutes = () => {
return (
<Routes>
  {/* Home / Dashboard */}
<Route path="/" element={<Dashboard />} />

  {/* Settings page */}
<Route path="/settings" element={<Settings />} />

  {/* Fallback route for unknown URLs */}
<Route path="*" element={<NotFound />} />
</Routes>
  )
  }

  export default AppRoutes
  