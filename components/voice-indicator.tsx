"use client"

import { Mic, MicOff } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface VoiceIndicatorProps {
  isListening: boolean
  status: "idle" | "listening" | "processing"
}

export function VoiceIndicator({ isListening, status }: VoiceIndicatorProps) {
  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className={cn("px-4 py-2 rounded-full shadow-lg text-sm font-medium flex items-center gap-2", {
          "bg-blue-500 text-white": status === "listening",
          "bg-amber-500 text-white": status === "processing",
          "bg-gray-200 text-gray-700": status === "idle",
        })}
      >
        {isListening ? (
          <>
            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1 }}>
              <Mic className="w-4 h-4" />
            </motion.div>
            <span>{status === "listening" ? "Listening..." : "Processing..."}</span>
          </>
        ) : (
          <>
            <MicOff className="w-4 h-4" />
            <span>Voice Inactive</span>
          </>
        )}
      </motion.div>
    </div>
  )
}
