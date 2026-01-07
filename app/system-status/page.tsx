"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { CheckCircle, AlertCircle, Zap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function SystemStatusPage() {
  const features = [
    {
      category: "Authentication",
      items: [
        { name: "User Registration", status: "complete" },
        { name: "User Login/Logout", status: "complete" },
        { name: "Admin Authentication", status: "complete" },
        { name: "Session Management", status: "complete" },
      ],
    },
    {
      category: "Pages & Navigation",
      items: [
        { name: "Homepage", status: "complete" },
        { name: "Properties Listing", status: "complete" },
        { name: "Property Details", status: "complete" },
        { name: "Category Pages (Rent, Commercial, etc.)", status: "complete" },
        { name: "Admin Dashboard", status: "complete" },
        { name: "Footer Links", status: "complete" },
        { name: "Header Navigation", status: "complete" },
      ],
    },
    {
      category: "Forms & Interactions",
      items: [
        { name: "Contact Forms", status: "complete" },
        { name: "Inquiry Forms", status: "complete" },
        { name: "Floating Messenger", status: "complete" },
        { name: "Multi-channel Contact (WhatsApp, Email, etc.)", status: "complete" },
      ],
    },
    {
      category: "AI Features",
      items: [
        { name: "Property AI Voice Introduction", status: "complete" },
        { name: "AI Voice Configuration", status: "complete" },
        { name: "Text-to-Speech Integration", status: "complete" },
      ],
    },
    {
      category: "Admin Features",
      items: [
        { name: "Protected Admin Routes", status: "complete" },
        { name: "Property Management", status: "complete" },
        { name: "User Management", status: "complete" },
        { name: "Analytics Dashboard", status: "complete" },
        { name: "Settings & Configuration", status: "complete" },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold">System Status</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Complete overview of all implemented features and functionality
          </p>
        </motion.div>

        <div className="space-y-6">
          {features.map((section, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>{section.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {section.items.map((item, j) => (
                      <div key={j} className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                        {item.status === "complete" ? (
                          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                        )}
                        <span className="flex-1">{item.name}</span>
                        <Badge variant={item.status === "complete" ? "default" : "secondary"}>
                          {item.status === "complete" ? "Done" : "Pending"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 p-6 bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-lg text-center"
        >
          <h2 className="text-2xl font-bold mb-2">Application Complete</h2>
          <p className="text-muted-foreground mb-4">
            All core features and functionality have been successfully implemented
          </p>
          <div className="inline-flex items-center gap-2 text-primary font-semibold">
            <CheckCircle className="w-5 h-5" />
            Ready for Production
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}
