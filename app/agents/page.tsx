"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { agents } from "@/lib/data"
import { motion } from "framer-motion"
import { Mail, Phone, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function AgentsPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Find an Agent</h1>
          <p className="text-lg text-muted-foreground">Connect with our expert real estate professionals</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {agents.map((agent, i) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              <img src={agent.avatar || "/placeholder.svg"} alt={agent.name} className="w-full h-64 object-cover" />
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold">{agent.name}</h3>
                  {agent.verified && <Badge>Verified</Badge>}
                </div>
                <p className="text-sm text-muted-foreground mb-4">{agent.company}</p>

                <div className="space-y-3 mb-4">
                  <a
                    href={`mailto:${agent.email}`}
                    className="flex items-center gap-2 text-sm text-primary hover:underline"
                  >
                    <Mail className="w-4 h-4" />
                    {agent.email}
                  </a>
                  <a
                    href={`tel:${agent.phone}`}
                    className="flex items-center gap-2 text-sm text-primary hover:underline"
                  >
                    <Phone className="w-4 h-4" />
                    {agent.phone}
                  </a>
                </div>

                <Button className="w-full gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Contact Agent
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
