"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { agents } from "@/lib/data"
import { motion } from "framer-motion"
import { Mail, Phone } from "lucide-react"

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Our Team</h1>
          <p className="text-lg text-muted-foreground">Meet our expert real estate professionals</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {agents.map((agent, i) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-card border border-border rounded-lg overflow-hidden"
            >
              <img src={agent.avatar || "/placeholder.svg"} alt={agent.name} className="w-full h-64 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{agent.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{agent.company}</p>
                <div className="space-y-2">
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
              </div>
            </motion.div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
