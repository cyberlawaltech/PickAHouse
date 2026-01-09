"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PropertyGrid } from "@/components/property-grid"
import { properties } from "@/lib/data"

export default function RentPage() {
  const rentalProperties = properties.filter((p) => p.status === "for-rent" || p.status === "short-term")

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Rental Properties in Abuja</h1>
          <p className="text-lg text-muted-foreground">Find the perfect rental property for your needs</p>
        </div>

        <PropertyGrid initialProperties={rentalProperties} />
      </main>
      <Footer />
    </div>
  )
}
