// ------------------------------
// 1️⃣ Configuration
// ------------------------------
const ANALYTICS_ENDPOINT =
  import.meta.env.VITE_ANALYTICS_ENDPOINT || null

const isDev = import.meta.env.DEV

// ------------------------------
// 2️⃣ Safe send helper
// ------------------------------
const sendEvent = async (event) => {
  // Dev mode → log only
  if (!ANALYTICS_ENDPOINT) {
    if (isDev) {
      console.info('[Analytics]', event)
    }
    return
  }

  try {
    await fetch(ANALYTICS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event)
    })
  } catch {
    // Analytics must NEVER break the app
  }
}

// ------------------------------
// 3️⃣ Base event builder
// ------------------------------
const baseEvent = (type, payload = {}) => ({
  type,
  payload,
  timestamp: Date.now(),
  userAgent: navigator.userAgent
})

// ------------------------------
// 4️⃣ Public analytics APIs
// ------------------------------
export const logSearchAttempt = (query) => {
  sendEvent(
    baseEvent('search_attempt', {
      queryLength: query?.length || 0
    })
  )
}

export const logSearchSuccess = (source) => {
  sendEvent(
    baseEvent('search_success', {
      source // gps | manual | search | cache
    })
  )
}

export const logSearchFailure = (reason) => {
  sendEvent(
    baseEvent('search_failure', {
      reason
    })
  )
}

export const logSuggestionShown = (count) => {
  sendEvent(
    baseEvent('suggestions_shown', {
      count
    })
  )
}

export const logSuggestionSelected = (value) => {
  sendEvent(
    baseEvent('suggestion_selected', {
      valueLength: value?.length || 0
    })
  )
}