// React core library
// Needed to create React elements and use JSX
import React from 'react'

// ReactDOM client for React 18
// This is responsible for attaching React to the browser DOM
import ReactDOM from 'react-dom/client'

// Global Tailwind CSS file
// This includes Tailwind base, components, and utilities
import './index.css'

// Root App component
// This is the UI shell of the application
import App from './app/App'

// AppProviders wraps the App with all global Context Providers
// (Weather, Location, Theme, Unit, UI, etc.)
import AppProviders from './app/AppProviders'

// Find the root HTML element where React will mount
// This element exists in public/index.html as <div id="root"></div>
const rootElement = document.getElementById('root')

// Create a React root using React 18's concurrent renderer
const root = ReactDOM.createRoot(rootElement)

// Render the React application into the DOM
root.render(
  <React.StrictMode>
{/* 
AppProviders supplies global state to the entire app.
Any component inside App can access Context data.
    */}
  <AppProviders>
  {/* App is the main layout + routing container */}
  <App />
</AppProviders>
  </React.StrictMode>
  )
  
