import React, { useState } from 'react'

// Hooks
import { useDebounce } from '../../hooks/useDebounce'
import { useLocationContext } from '../../context/LocationContext'

// Services
import { fetchCitySuggestions } from '../../services/geocodingService'

// Components
import AutocompleteList from './AutocompleteList'
import VoiceSearchButton from './VoiceSearchButton'

const SearchBar = () => {
  // Raw input value
const [query, setQuery] = useState('')

  // Suggestions from backend
const [suggestions, setSuggestions] = useState([])

  // Track loading state for suggestions
const [isLoading, setIsLoading] = useState(false)

  // Location setter from context
const { setLocationFromCity } = useLocationContext()

  // Debounced value (300ms)
const debouncedQuery = useDebounce(query, 300)

  /**
 * Fetch autocomplete suggestions
* Runs only after debounce
   */
 React.useEffect(() => {
 if (!debouncedQuery || debouncedQuery.length < 2) {
   setSuggestions([])
 return
 }

 const fetchSuggestions = async () => {
   setIsLoading(true)
 const result = await fetchCitySuggestions(debouncedQuery)
   setSuggestions(result)
 setIsLoading(false)
 }

 fetchSuggestions()
   }, [debouncedQuery])

 /**
* Submit search manually
   */
 const handleSubmit = async (e) => {
 e.preventDefault()

 if (!query.trim()) return

 try {
   await setLocationFromCity(query)
 setQuery('')
   setSuggestions([])
   } catch {
 // Error UI handled elsewhere
 }
   }

 return (
 <form
   onSubmit={handleSubmit}
 className="relative w-full max-w-xl mx-auto"
   role="search"
 aria-label="Search city weather"
 >
   <div className="flex items-center gap-2">
   {/* Search input */}
   <input
 type="text"
   value={query}
 onChange={(e) => setQuery(e.target.value)}
   placeholder="Search city..."
 aria-autocomplete="list"
   aria-expanded={suggestions.length > 0}
 className="
 w-full rounded-xl border border-slate-300
 bg-white px-4 py-3 text-sm
 focus:outline-none focus:ring-2 focus:ring-sky-500
 dark:border-slate-700 dark:bg-slate-900 dark:text-white
   "
   />

   {/* Voice search */}
   <VoiceSearchButton onResult={setQuery} />
 </div>

   {/* Autocomplete dropdown */}
 {suggestions.length > 0 && (
 <AutocompleteList
   items={suggestions}
 onSelect={async (item) => {
 await setLocationFromCity(item.label)
 setQuery('')
 setSuggestions([])
   }}
 isLoading={isLoading}
 />
   )}
   </form>
 )
 }

 export default SearchBar
 


/* 
 import React, { useEffect, useState } from 'react'

 // Hooks
 import { useDebounce } from '../../hooks/useDebounce'
 import { useWeather } from '../../hooks/useWeather'

 // Components
 import AutocompleteList from './AutocompleteList'
 import VoiceSearchButton from './VoiceSearchButton'

 const SearchBar = () => {
   // ------------------------------
 // 1️⃣ Local input state
   // ------------------------------
 const [query, setQuery] = useState('')
   const [isFocused, setIsFocused] = useState(false)

 // ------------------------------
   // 2️⃣ Debounce input
 // ------------------------------
   const debouncedQuery = useDebounce(query, 400)

 // ------------------------------
   // 3️⃣ Weather hook actions
 // ------------------------------
   const {
   searchCity,
   suggestions,
   clearSuggestions
 } = useWeather()

   // ------------------------------
 // 4️⃣ Trigger search on debounce
   // ------------------------------
 useEffect(() => {
 if (debouncedQuery.trim().length >= 2) {
   searchCity(debouncedQuery.trim())
   } else {
 clearSuggestions()
 }
   }, [debouncedQuery, searchCity, clearSuggestions])

 // ------------------------------
   // 5️⃣ Handle suggestion select
 // ------------------------------
   const handleSelect = (city) => {
   setQuery(city)
   clearSuggestions()
   searchCity(city, { immediate: true })
 }

   // ------------------------------
 // 6️⃣ Handle voice result
   // ------------------------------
 const handleVoiceResult = (text) => {
 setQuery(text)
   }

 return (
 <div className="w-full max-w-xl mx-auto relative">
   {/* Input container }
 <div
 className={`
   flex items-center gap-2
 rounded-xl border
   bg-white/80 backdrop-blur
 px-3 py-2
   shadow
 transition
   dark:bg-slate-900/80
 ${
 isFocused
   ? 'border-sky-500'
 : 'border-slate-300 dark:border-slate-700'
   }
   `}
 >
 {/* Text input }
 <input
   type="text"
 value={query}
   placeholder="Search city…"
 onChange={(e) => setQuery(e.target.value)}
   onFocus={() => setIsFocused(true)}
 onBlur={() => setIsFocused(false)}
   className="
   flex-1 bg-transparent
   text-sm
   text-slate-900 placeholder-slate-500
   outline-none
   dark:text-white
 "
   aria-label="Search city"
 autoComplete="off"
 />

 {/* Voice search }
 <VoiceSearchButton onResult={handleVoiceResult} />
   </div>

 {/* Autocomplete }
   {isFocused && suggestions.length > 0 && (
   <AutocompleteList
 suggestions={suggestions}
   onSelect={handleSelect}
   />
 )}
 </div>
   )
   }

   export default SearchBar
   
   */