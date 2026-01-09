"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from "lucide-react"

export default function HelpPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [isSending, setIsSending] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSending(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSending(false)
    setSent(true)
    setTimeout(() => setSent(false), 3000)
    setFormData({ name: "", email: "", message: "" })
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Help & Contact</h1>
          <p className="text-muted-foreground text-lg">We're here to help. Find answers and reach our team.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Contact Info */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <h2 className="text-2xl font-bold">Get in Touch</h2>

            <div className="flex gap-4">
              <Phone className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold">Phone</h3>
                <p className="text-muted-foreground">+234 803 456 7890</p>
                <p className="text-sm text-muted-foreground">Monday-Friday, 9AM-6PM WAT</p>
              </div>
            </div>

            <div className="flex gap-4">
              <Mail className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold">Email</h3>
                <p className="text-muted-foreground">support@abujapremier.com</p>
                <p className="text-sm text-muted-foreground">We'll respond within 24 hours</p>
              </div>
            </div>

            <div className="flex gap-4">
              <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold">Office</h3>
                <p className="text-muted-foreground">Plot 123, Aguiyi Ironsi Street</p>
                <p className="text-muted-foreground">Maitama, Abuja FCT</p>
              </div>
            </div>

            <div className="flex gap-4">
              <Clock className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold">Hours</h3>
                <p className="text-muted-foreground">Mon-Fri: 9:00 AM - 6:00 PM</p>
                <p className="text-muted-foreground">Sat-Sun: 10:00 AM - 4:00 PM</p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-card border border-border rounded-lg p-6"
          >
            <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
            {sent && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 bg-green-50 text-green-700 rounded-lg flex items-center gap-2 text-sm"
              >
                <CheckCircle className="w-4 h-4" />
                Message sent successfully! We'll get back to you soon.
              </motion.div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  className="w-full border border-border rounded px-3 py-2 text-sm"
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How can we help?"
                  required
                />
              </div>
              <Button className="w-full gap-2" disabled={isSending}>
                <Send className="w-4 h-4" />
                {isSending ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                q: "How do I list a property?",
                a: "Sign in to your account, click 'Sell' and follow the listing wizard to add your property details.",
              },
              {
                q: "Is there a listing fee?",
                a: "Basic listings are free. Premium featured listings have a small fee for increased visibility.",
              },
              {
                q: "How do I contact an agent?",
                a: "Click the agent's contact button on the property page to message them directly.",
              },
              {
                q: "Can I save properties?",
                a: "Yes, click the heart icon to save properties to your watchlist and access them later.",
              },
            ].map((item, i) => (
              <div key={i} className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-semibold mb-2">{item.q}</h3>
                <p className="text-muted-foreground text-sm">{item.a}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  )
}
