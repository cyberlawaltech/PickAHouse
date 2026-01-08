"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, Mic } from "lucide-react"
import { AskAIModal } from "@/components/ask-ai-modal"
import { useVoiceSearch } from "@/hooks/use-voice-search"

export function AskAIButton() {
  const [isOpen, setIsOpen] = useState(false)
  const { isListening, startListening, stopListening, transcript } = useVoiceSearch()

  const handleVoiceClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (isListening) {
      stopListening()
    } else {
      startListening()
    }
  }

  return (
    <>
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
        className="fixed bottom-6 right-6 z-40"
      >
        <div className="flex items-center gap-2">
          {/* Voice button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleVoiceClick}
            className={`p-3 rounded-full shadow-lg transition-all ${
              isListening ? "bg-ebay-red text-white" : "bg-ebay-yellow text-foreground hover:bg-ebay-yellow/90"
            }`}
            title="Voice search"
          >
            <Mic className="w-5 h-5" />
          </motion.button>

          {/* Main button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="p-3 rounded-full bg-ebay-blue text-white shadow-lg hover:bg-ebay-blue/90 transition-all flex items-center gap-2"
            title="Ask AI for property help"
          >
            <MessageCircle className="w-5 h-5" />
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              whileHover={{ opacity: 1, width: "auto" }}
              className="text-sm font-semibold whitespace-nowrap overflow-hidden"
            >
              Ask AI
            </motion.span>
          </motion.button>
        </div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && <AskAIModal isOpen={isOpen} onClose={() => setIsOpen(false)} initialQuery={transcript} />}
      </AnimatePresence>
    </>
  )
}
