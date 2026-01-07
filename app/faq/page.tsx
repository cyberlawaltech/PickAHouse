"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQPage() {
  const faqs = [
    {
      q: "How do I create an account?",
      a: "Click the 'Register' button in the top menu, fill in your details, and verify your email. Your account will be activated immediately.",
    },
    {
      q: "What property types are available?",
      a: "We list apartments, houses, commercial properties, land, hostels, and serviced flats. Use filters to narrow down your search.",
    },
    {
      q: "How can I contact an agent?",
      a: "Click the agent's profile on any property listing, then use the messaging system to send them a message directly.",
    },
    {
      q: "Is there a commission fee for buyers?",
      a: "No, there is no commission fee for buyers. Only sellers pay a listing fee for featured listings.",
    },
    {
      q: "How do I report a suspicious listing?",
      a: "Click the three-dot menu on any listing and select 'Report Listing'. Our team reviews all reports within 24 hours.",
    },
    {
      q: "Can I schedule a property viewing?",
      a: "Yes, contact the agent through the messaging system to arrange a viewing at your convenience.",
    },
  ]

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-muted-foreground">Find answers to common questions</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl bg-card border border-border rounded-lg p-6"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left">{faq.q}</AccordionTrigger>
                <AccordionContent>{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}
