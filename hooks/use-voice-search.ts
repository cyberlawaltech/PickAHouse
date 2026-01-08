"use client"

import { useState, useCallback, useRef } from "react"

export function useVoiceSearch() {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const recognitionRef = useRef<any>(null)

  const startListening = useCallback(() => {
    if (typeof window === "undefined") return

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition

    if (!SpeechRecognition) {
      console.error("Speech Recognition API not supported")
      return
    }

    if (!recognitionRef.current) {
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = false
      recognitionRef.current.interimResults = true
      recognitionRef.current.language = "en-US"

      recognitionRef.current.onstart = () => {
        setIsListening(true)
        setTranscript("")
      }

      recognitionRef.current.onresult = (event: any) => {
        let interimTranscript = ""

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript

          if (event.results[i].isFinal) {
            setTranscript((prev) => prev + transcript)
          } else {
            interimTranscript += transcript
          }
        }

        if (interimTranscript) {
          setTranscript((prev) => prev.split(" ").slice(0, -1).join(" "))
        }
      }

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error)
        setIsListening(false)
      }

      recognitionRef.current.onend = () => {
        setIsListening(false)
      }
    }

    recognitionRef.current.start()
  }, [])

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
      setIsListening(false)
    }
  }, [])

  return {
    isListening,
    transcript,
    startListening,
    stopListening,
  }
}
