import React, { useEffect, useState } from 'react'

const AutocompleteList = ({ items, onSelect, isLoading }) => {
  // Track which suggestion is focused (keyboard navigation)
    const [activeIndex, setActiveIndex] = useState(-1)

      // Reset active index when items change
        useEffect(() => {
            setActiveIndex(-1)
}, [items])

  // Handle keyboard navigation
    const handleKeyDown = (e) => {
        if (items.length === 0) return

            switch (e.key) {
    case 'ArrowDown':
            e.preventDefault()
      setActiveIndex((prev) =>
  prev < items.length - 1 ? prev + 1 : 0
          )
    break

          case 'ArrowUp':
    e.preventDefault()
            setActiveIndex((prev) =>
        prev > 0 ? prev - 1 : items.length - 1
  )
          break

  case 'Enter':
          if (activeIndex >= 0) {
      e.preventDefault()
  onSelect(items[activeIndex])
          }
    break

          case 'Escape':
    setActiveIndex(-1)
            break

    default:
            break
  }
    }

      return (
          <ul
  role="listbox"
        aria-label="City suggestions"
className="
        absolute z-30 mt-2 w-full overflow-hidden
  rounded-xl border border-slate-200
          bg-white shadow-lg
    dark:border-slate-700 dark:bg-slate-900
          "
  onKeyDown={handleKeyDown}
      >
            {isLoading && (
      <li className="px-4 py-3 text-sm text-slate-500">
  Loading…
          </li>
  )}

        {!isLoading &&
  items.map((item, index) => (
            <li
          key={`${item.lat}-${item.lon}`}
        role="option"
      aria-selected={activeIndex === index}
    className={`
    cursor-pointer px-4 py-3 text-sm
    ${
      activeIndex === index
          ? 'bg-sky-100 text-sky-900 dark:bg-sky-900/30 dark:text-sky-200'
: 'text-slate-700 dark:text-slate-200'
}
hover:bg-sky-50 dark:hover:bg-sky-900/20
            `}
          onMouseEnter={() => setActiveIndex(index)}
        onClick={() => onSelect(item)}
    >
  {item.label}
            </li>
      ))}
          </ul>
            )
            }

            export default AutocompleteList
            