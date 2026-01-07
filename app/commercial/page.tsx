"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PropertyGrid } from "@/components/property-grid"
import { properties } from "@/lib/data"

export default function CommercialPage() {
  const commercialProperties = properties.filter((p) => p.type === "commercial")

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Commercial Properties</h1>
          <p className="text-lg text-muted-foreground">Office spaces and business properties</p>
        </div>

        <PropertyGrid initialProperties={commercialProperties} />
      </main>
      <Footer />
    </div>
  )
}
