"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"

export default function PressPage() {
  const releases = [
    {
      title: "Abuja Premier Estates Launches AI-Powered Property Search",
      date: "2024-01-15",
    },
    {
      title: "Company Expands to 50+ Property Listings Across FCT",
      date: "2024-01-10",
    },
  ]

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Press Room</h1>
          <p className="text-lg text-muted-foreground">Latest news and press releases from Abuja Premier Estates</p>
        </motion.div>

        <div className="max-w-2xl space-y-6">
          {releases.map((release, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer"
            >
              <h3 className="text-xl font-bold mb-2">{release.title}</h3>
              <p className="text-sm text-muted-foreground">{release.date}</p>
            </motion.div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
