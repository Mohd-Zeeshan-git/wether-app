import React, { useEffect, useRef, useState } from 'react'

const VoiceSearchButton = ({ onResult }) => {
  const recognitionRef = useRef(null)
    const [isListening, setIsListening] = useState(false)
      const [isSupported, setIsSupported] = useState(true)

useEffect(() => {
    // Check browser support
const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition

  if (!SpeechRecognition) {
setIsSupported(false)
      return
  }

      // Create recognition instance
  const recognition = new SpeechRecognition()
      recognition.lang = 'en-US'
  recognition.interimResults = false
      recognition.maxAlternatives = 1

  // Event: speech started
      recognition.onstart = () => {
    setIsListening(true)
}

    // Event: speech result
recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript
    onResult(transcript)
}

    // Event: speech end
recognition.onend = () => {
      setIsListening(false)
  }

      // Event: error
  recognition.onerror = () => {
setIsListening(false)
    }

recognitionRef.current = recognition
  }, [onResult])

    // Start listening
      const startListening = () => {
  if (!recognitionRef.current || isListening) return
      recognitionRef.current.start()
}

  // Unsupported browser → render nothing
    if (!isSupported) return null

      return (
  <button
type="button"
      onClick={startListening}
    aria-label="Search by voice"
  className={`
  flex items-center justify-center rounded-xl
  border border-slate-300 px-3 py-2
  transition
  ${
    isListening
? 'bg-sky-500 text-white'
    : 'bg-white text-slate-700 hover:bg-slate-100'
    }
    dark:border-slate-700 dark:bg-slate-900 dark:text-white
  `}
      >
    {isListening ? '🎙️' : '🎤'}
</button>
  )
  }

  export default VoiceSearchButton
  