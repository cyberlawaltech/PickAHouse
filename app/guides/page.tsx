"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"

export default function GuidesPage() {
  const guides = [
    {
      title: "How to Buy Property in Abuja",
      excerpt: "A comprehensive guide to navigating the property buying process in Nigeria.",
    },
    {
      title: "Top 10 Neighborhoods in Abuja",
      excerpt: "Discover the best areas to live and invest in the Federal Capital Territory.",
    },
    {
      title: "Real Estate Investment Tips",
      excerpt: "Learn strategies for building wealth through property investment.",
    },
    {
      title: "Renting vs. Buying",
      excerpt: "Compare the pros and cons of renting and purchasing property.",
    },
  ]

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Real Estate Guides</h1>
          <p className="text-lg text-muted-foreground">Learn everything about real estate in Abuja</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-3xl">
          {guides.map((guide, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer"
            >
              <h3 className="text-lg font-bold mb-2">{guide.title}</h3>
              <p className="text-sm text-muted-foreground">{guide.excerpt}</p>
            </motion.div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
