"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Check } from "lucide-react"

export default function PricingPage() {
  const plans = [
    {
      name: "Basic",
      price: "Free",
      description: "For buyers and renters",
      features: ["Search properties", "Save favorites", "Contact agents", "Property alerts"],
    },
    {
      name: "Professional",
      price: "₦5,000",
      period: "/month",
      description: "For agents and sellers",
      features: ["List property", "Featured listing", "Analytics", "Professional profile", "Priority support"],
      highlighted: true,
    },
    {
      name: "Enterprise",
      price: "₦20,000",
      period: "/month",
      description: "For agencies",
      features: ["Unlimited listings", "Team accounts", "Advanced analytics", "Marketing tools", "Dedicated support"],
    },
  ]

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Choose the plan that works for you</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className={`h-full flex flex-col ${plan.highlighted ? "border-primary border-2" : ""}`}>
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    {plan.period && <span className="text-muted-foreground text-sm">{plan.period}</span>}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <ul className="space-y-3 mb-6 flex-1">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" variant={plan.highlighted ? "default" : "outline"}>
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
