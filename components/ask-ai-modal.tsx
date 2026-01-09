"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { X, Send, Loader2, Mic } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useVoiceSearch } from "@/hooks/use-voice-search"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

interface AskAIModalProps {
  isOpen: boolean
  onClose: () => void
  initialQuery?: string
}

const contextResponses: Record<string, string[]> = {
  price: [
    "I can help you find properties within your budget. What's your price range?",
    "Looking for affordable options or luxury properties? Tell me your budget.",
  ],
  location: [
    "Where in Abuja interests you? I can search Maitama, CBD, Guzape, Wuse 2, and more.",
    "Which area are you interested in? I specialize in all FCT locations.",
  ],
  negotiation: [
    "For property negotiations, consider these strategies: research market rates, get inspections, and build rapport with sellers.",
    "I can guide you on negotiation tactics. Would you like tips on pricing strategy or inspection recommendations?",
  ],
  market: [
    "The Abuja real estate market is trending toward luxury apartments and commercial spaces in prime locations.",
    "Market conditions favor buyers currently. Would you like analysis on specific areas?",
  ],
  financing: [
    "For financing options, consider: bank mortgages, developer payment plans, or cash transactions.",
    "Let me help you explore financing options. What's your preferred payment method?",
  ],
  documentation: [
    "Essential documents include: Title Deed, Survey Plan, and C of O. I can guide you through the process.",
    "Documentation is crucial. Would you like a checklist of required documents?",
  ],
  default: [
    "I'm your AI property assistant. I can help with recommendations, market analysis, negotiation, documentation, financing, and more.",
    "How can I assist you today? Ask about properties, market trends, or the buying process.",
  ],
}

function getContextualResponse(query: string): string {
  const lowerQuery = query.toLowerCase()

  if (lowerQuery.match(/price|budget|cost|afford/)) {
    return contextResponses.price[Math.floor(Math.random() * contextResponses.price.length)]
  }
  if (lowerQuery.match(/location|area|where|maitama|cbd|guzape/)) {
    return contextResponses.location[Math.floor(Math.random() * contextResponses.location.length)]
  }
  if (lowerQuery.match(/negotiat|offer|deal|discount/)) {
    return contextResponses.negotiation[Math.floor(Math.random() * contextResponses.negotiation.length)]
  }
  if (lowerQuery.match(/market|trend|analysis|compare/)) {
    return contextResponses.market[Math.floor(Math.random() * contextResponses.market.length)]
  }
  if (lowerQuery.match(/financ|loan|mortgage|payment/)) {
    return contextResponses.financing[Math.floor(Math.random() * contextResponses.financing.length)]
  }
  if (lowerQuery.match(/document|deed|cof|title|survey/)) {
    return contextResponses.documentation[Math.floor(Math.random() * contextResponses.documentation.length)]
  }

  return contextResponses.default[Math.floor(Math.random() * contextResponses.default.length)]
}

export function AskAIModal({ isOpen, onClose, initialQuery = "" }: AskAIModalProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hi! I'm your AI property assistant. What can I help you find today?",
    },
  ])
  const [input, setInput] = useState(initialQuery)
  const [isLoading, setIsLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const { isListening, startListening, stopListening, transcript } = useVoiceSearch()

  useEffect(() => {
    if (transcript) {
      setInput(transcript)
    }
  }, [transcript])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 1200))

    const aiResponse = getContextualResponse(input)
    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: aiResponse,
    }

    setMessages((prev) => [...prev, aiMessage])
    setIsLoading(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="w-full max-w-md md:max-w-lg h-[600px] bg-background rounded-lg shadow-2xl border border-border flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-ebay-blue text-white rounded-t-lg">
          <div>
            <h2 className="text-lg font-bold">Ask AI</h2>
            <p className="text-xs opacity-90">Your property assistant</p>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/20" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4" ref={scrollRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs rounded-lg px-4 py-2 text-sm ${
                    message.role === "user"
                      ? "bg-ebay-blue text-white"
                      : "bg-secondary text-foreground border border-border"
                  }`}
                >
                  {message.content}
                </div>
              </motion.div>
            ))}
            {isLoading && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
                <div className="bg-secondary text-foreground border border-border rounded-lg px-4 py-2 flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm">Thinking...</span>
                </div>
              </motion.div>
            )}
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="border-t border-border p-4 bg-secondary/30 rounded-b-lg">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Input
                placeholder="Ask about properties, pricing, locations..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="pr-10"
              />
              <Button
                variant="ghost"
                size="icon"
                className={`absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 ${
                  isListening ? "text-ebay-red" : "text-muted-foreground"
                }`}
                onClick={(e) => {
                  e.stopPropagation()
                  if (isListening) {
                    stopListening()
                  } else {
                    startListening()
                  }
                }}
              >
                <Mic className="w-4 h-4" />
              </Button>
            </div>
            <Button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="bg-ebay-blue hover:bg-ebay-blue/90 text-white"
              size="icon"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          {isListening && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs text-ebay-red mt-2 font-medium"
            >
              Listening...
            </motion.p>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
