"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface PropertyInquiryFormProps {
  propertyTitle: string
  agentName: string
  agentEmail: string
  agentPhone: string
}

export function PropertyInquiryForm({ propertyTitle, agentName, agentEmail, agentPhone }: PropertyInquiryFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: `Hi, I'm interested in the property: ${propertyTitle}`,
  })
  const [isSending, setIsSending] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSending(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSending(false)
    setSent(true)
    setTimeout(() => {
      setSent(false)
      setFormData({ name: "", email: "", phone: "", message: "" })
    }, 3000)
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <Card>
        <CardHeader>
          <CardTitle>Send an Inquiry</CardTitle>
        </CardHeader>
        <CardContent>
          {sent && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 bg-green-50 text-green-700 rounded-lg flex items-center gap-2 text-sm"
            >
              <CheckCircle className="w-4 h-4" />
              Inquiry sent to {agentName}. They'll contact you soon.
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Your full name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <Input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+234 803 000 0000"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Message</label>
              <Textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Your message"
                className="min-h-[100px]"
              />
            </div>

            <Button type="submit" className="w-full gap-2" disabled={isSending}>
              <Send className="w-4 h-4" />
              {isSending ? "Sending..." : "Send Inquiry"}
            </Button>
          </form>

          <div className="mt-6 pt-4 border-t border-border text-xs text-muted-foreground space-y-1">
            <p>
              <strong>Agent:</strong> {agentName}
            </p>
            <p>
              <strong>Email:</strong> {agentEmail}
            </p>
            <p>
              <strong>Phone:</strong> {agentPhone}
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
