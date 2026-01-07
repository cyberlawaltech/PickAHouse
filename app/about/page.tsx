"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold mb-6">About Abuja Premier Estates</h1>
          <div className="max-w-3xl space-y-6 text-lg text-muted-foreground">
            <p>
              Abuja Premier Estates is Nigeria's leading luxury real estate platform, specializing in premium properties
              across the Federal Capital Territory. With over a decade of experience, we connect buyers, renters, and
              investors with their dream properties.
            </p>
            <p>
              Our mission is to revolutionize the real estate market in Nigeria through innovative technology,
              transparency, and exceptional customer service. We believe everyone deserves access to beautiful, secure,
              and well-located properties.
            </p>
            <h2 className="text-2xl font-bold text-foreground mt-8">Our Values</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Integrity in every transaction</li>
              <li>Customer-centric approach</li>
              <li>Innovation and technology</li>
              <li>Transparency and trust</li>
            </ul>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}
