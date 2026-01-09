"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Heart } from "lucide-react"
import Link from "next/link"

export default function SavedPropertiesPage() {
  const savedProperties = []

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Saved Properties</h1>
          <p className="text-lg text-muted-foreground">Your watchlist of favorite properties</p>
        </motion.div>

        {savedProperties.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12 bg-card border border-border rounded-lg"
          >
            <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground mb-6">You haven't saved any properties yet.</p>
            <Button asChild>
              <Link href="/properties">Browse Properties</Link>
            </Button>
          </motion.div>
        ) : null}
      </main>
      <Footer />
    </div>
  )
}
