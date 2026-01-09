"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Home } from "lucide-react"
import Link from "next/link"

export default function MyListingsPage() {
  const listings: unknown[] = []

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h1 className="text-4xl font-bold mb-4">My Listings</h1>
          <p className="text-lg text-muted-foreground">Properties you have listed for sale or rent</p>
        </motion.div>

        {listings.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12 bg-card border border-border rounded-lg"
          >
            <Home className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground mb-6">You haven't listed any properties yet.</p>
            <Button asChild>
              <Link href="/sell">Create Your First Listing</Link>
            </Button>
          </motion.div>
        ) : null}
      </main>
      <Footer />
    </div>
  )
}
