"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Briefcase } from "lucide-react"

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Careers at Abuja Premier</h1>
          <p className="text-lg text-muted-foreground">Join our growing team of real estate professionals</p>
        </motion.div>

        <div className="space-y-6 max-w-3xl">
          {[
            { title: "Real Estate Agent", location: "Maitama, Abuja" },
            { title: "Property Manager", location: "CBD, Abuja" },
            { title: "Marketing Specialist", location: "Remote" },
            { title: "Customer Support", location: "Jabi, Abuja" },
          ].map((job, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-card border border-border rounded-lg p-6 flex items-center justify-between"
            >
              <div className="flex gap-4">
                <Briefcase className="w-6 h-6 text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg">{job.title}</h3>
                  <p className="text-sm text-muted-foreground">{job.location}</p>
                </div>
              </div>
              <Button variant="outline">Apply Now</Button>
            </motion.div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
