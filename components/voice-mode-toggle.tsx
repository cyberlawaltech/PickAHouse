"use client"
import { Mic, MicOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface VoiceModeToggleProps {
  isAutoMode: boolean
  onToggle: (autoMode: boolean) => void
  isListening: boolean
}

export function VoiceModeToggle({ isAutoMode, onToggle, isListening }: VoiceModeToggleProps) {
  return (
    <div className="fixed bottom-24 right-6 z-40 flex flex-col gap-3">
      <Button
        onClick={() => onToggle(!isAutoMode)}
        className={cn(
          "rounded-full w-16 h-16 shadow-lg transition-all duration-300",
          isAutoMode ? "bg-blue-500 hover:bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300 text-gray-700",
        )}
        title={isAutoMode ? "Switch to Manual Mode" : "Switch to Auto Mode"}
      >
        {isAutoMode && isListening ? <Mic className="w-6 h-6 animate-pulse" /> : <MicOff className="w-6 h-6" />}
      </Button>
      <div className="text-center text-xs font-medium px-2 py-1 bg-white rounded-full shadow-sm">
        {isAutoMode ? "Auto" : "Manual"}
      </div>
    </div>
  )
}
