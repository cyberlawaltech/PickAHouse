"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Home, DollarSign, Clock } from "lucide-react"

export default function SellPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">List Your Property on Abuja Premier</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Reach thousands of potential buyers and renters. List your property in minutes.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {[
            { icon: Home, title: "Easy to List", description: "Upload photos and details in 5 minutes" },
            { icon: DollarSign, title: "Competitive Pricing", description: "Tools to help you set the right price" },
            { icon: Clock, title: "24/7 Visibility", description: "Your property visible to buyers round the clock" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-card border border-border rounded-lg p-6 text-center"
            >
              <item.icon className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card border border-border rounded-lg p-8 text-center"
        >
          <h2 className="text-2xl font-bold mb-4">Ready to List?</h2>
          <Button size="lg" className="px-8" onClick={() => (window.location.href = "/signin")}>
            Start Listing Now
          </Button>
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}
