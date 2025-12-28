"use client"

import { ChevronRight } from "lucide-react"
import { PropertyCard } from "./property-card"
import type { Property } from "@/lib/types"
import Link from "next/link"

interface FeaturedSectionProps {
  properties: Property[]
}

export function FeaturedSection({ properties }: FeaturedSectionProps) {
  const featuredProperties = properties.filter((p) => p.featured).slice(0, 4)

  return (
    <section className="py-8 sm:py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-foreground">Featured Properties</h2>
          <Link
            href="/properties?featured=true"
            className="text-sm text-primary hover:underline flex items-center gap-1"
          >
            See all
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Featured grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredProperties.map((property, index) => (
            <PropertyCard key={property.id} property={property} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
