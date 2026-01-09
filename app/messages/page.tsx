"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { MessageCircle } from "lucide-react"

export default function MessagesPage() {
  const messages: unknown[] = []

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Messages</h1>
          <p className="text-lg text-muted-foreground">Your conversations with agents and sellers</p>
        </motion.div>

        {messages.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12 bg-card border border-border rounded-lg"
          >
            <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground mb-6">No messages yet.</p>
            <p className="text-sm text-muted-foreground">
              Send a message to an agent on any property page to start a conversation.
            </p>
          </motion.div>
        ) : null}
      </main>
      <Footer />
    </div>
  )
}
