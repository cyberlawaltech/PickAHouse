"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X, Send, Mail, CheckCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import type { Property } from "@/lib/types"

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
)

const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

interface FloatingMessengerProps {
  property: Property
}

const channels = [
  { id: "whatsapp", label: "WhatsApp", icon: WhatsAppIcon, color: "bg-green-500 hover:bg-green-600" },
  { id: "facebook", label: "Facebook", icon: FacebookIcon, color: "bg-blue-600 hover:bg-blue-700" },
  { id: "twitter", label: "Twitter/X", icon: TwitterIcon, color: "bg-foreground hover:bg-foreground/90" },
  {
    id: "email",
    label: "Email",
    icon: () => <Mail className="w-5 h-5" />,
    color: "bg-ebay-blue hover:bg-ebay-blue-hover",
  },
]

export function FloatingMessenger({ property }: FloatingMessengerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeChannel, setActiveChannel] = useState("whatsapp")
  const [message, setMessage] = useState(`Hi, I'm interested in: ${property.title}`)
  const [name, setName] = useState("")
  const [contact, setContact] = useState("")
  const [isSending, setIsSending] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSend = async () => {
    if (!message.trim() || !name.trim() || !contact.trim()) return
    setIsSending(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSending(false)
    setSent(true)
    setTimeout(() => {
      setSent(false)
      setIsOpen(false)
    }, 2000)
  }

  const getPlaceholder = () => {
    switch (activeChannel) {
      case "whatsapp":
        return "Your WhatsApp number"
      case "facebook":
        return "Your Facebook profile"
      case "twitter":
        return "Your Twitter/X handle"
      case "email":
        return "Your email address"
      default:
        return "Your contact"
    }
  }

  return (
    <>
      {/* Messenger panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-20 right-4 sm:right-6 z-50 w-[calc(100%-2rem)] sm:w-96 bg-card rounded-lg shadow-xl border border-border overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-ebay-red text-white">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold">Contact Agent</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-white hover:bg-white/10"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white/20">
                  <Image
                    src={property.agent.avatar || "/placeholder.svg"}
                    alt={property.agent.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium flex items-center gap-1 text-sm">
                    {property.agent.name}
                    {property.agent.verified && <CheckCircle className="w-3.5 h-3.5" />}
                  </p>
                  <p className="text-xs text-white/80">{property.agent.phone}</p>
                </div>
              </div>
            </div>

            {sent ? (
              <div className="p-8 text-center">
                <div className="w-14 h-14 rounded-full bg-ebay-green/10 flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-7 h-7 text-ebay-green" />
                </div>
                <h4 className="font-bold mb-1">Message Sent!</h4>
                <p className="text-sm text-muted-foreground">Agent will respond via {activeChannel}</p>
              </div>
            ) : (
              <>
                {/* Channel selector */}
                <div className="p-4 border-b border-border">
                  <p className="text-xs text-muted-foreground mb-2">Contact via:</p>
                  <div className="grid grid-cols-4 gap-2">
                    {channels.map((channel) => (
                      <button
                        key={channel.id}
                        onClick={() => setActiveChannel(channel.id)}
                        className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all ${
                          activeChannel === channel.id ? "bg-secondary ring-2 ring-primary" : "hover:bg-secondary/50"
                        }`}
                      >
                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center text-white ${channel.color}`}
                        >
                          <channel.icon />
                        </div>
                        <span className="text-xs">{channel.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Form */}
                <div className="p-4 space-y-3">
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="h-10"
                  />
                  <Input
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder={getPlaceholder()}
                    className="h-10"
                  />
                  <Textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Message..."
                    className="min-h-[80px] resize-none"
                  />
                  <Button
                    onClick={handleSend}
                    disabled={isSending || !message.trim() || !name.trim() || !contact.trim()}
                    className="w-full gap-2"
                  >
                    {isSending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    Send Message
                  </Button>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Red floating button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="floating-btn bottom-4 right-4 sm:right-6 w-12 h-12 rounded-full bg-ebay-red text-white shadow-lg flex items-center justify-center touch-target"
        aria-label="Contact Agent"
      >
        {isOpen ? <X className="w-5 h-5" /> : <MessageCircle className="w-5 h-5" />}
      </motion.button>
    </>
  )
}
