"use client"

import { useState } from "react"
import { Grid3X3, List, SlidersHorizontal, ChevronDown, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { PropertyCard } from "./property-card"
import type { Property } from "@/lib/types"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface PropertyGridProps {
  properties: Property[]
  title?: string
  showFilters?: boolean
}

const filterOptions = [
  { value: "all", label: "All" },
  { value: "apartment", label: "Apartments" },
  { value: "house", label: "Houses" },
  { value: "commercial", label: "Commercial" },
  { value: "land", label: "Land" },
  { value: "flat", label: "Flats" },
  { value: "hostel", label: "Hostels" },
]

const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "popular", label: "Most Popular" },
]

export function PropertyGrid({ properties, title = "Properties", showFilters = true }: PropertyGridProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [activeFilter, setActiveFilter] = useState("all")
  const [sortBy, setSortBy] = useState("newest")

  const filteredProperties = properties.filter((p) => activeFilter === "all" || p.type === activeFilter)

  const sortedProperties = [...filteredProperties].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return a.price - b.price
      case "price-desc":
        return b.price - a.price
      case "popular":
        return b.views - a.views
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    }
  })

  return (
    <section className="py-8 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold text-foreground">{title}</h2>
            <span className="text-sm text-muted-foreground">({sortedProperties.length} results)</span>
          </div>
          <Link href="/properties" className="text-sm text-primary hover:underline flex items-center gap-1">
            See all
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {showFilters && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex flex-wrap gap-2">
              {filterOptions.map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setActiveFilter(filter.value)}
                  className={cn(
                    "px-3 py-1.5 text-sm rounded-full border transition-colors",
                    activeFilter === filter.value
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background border-border hover:border-primary/50 text-foreground",
                  )}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              {/* Sort dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2 bg-transparent text-sm">
                    <SlidersHorizontal className="w-4 h-4" />
                    Sort
                    <ChevronDown className="w-3 h-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {sortOptions.map((option) => (
                    <DropdownMenuItem
                      key={option.value}
                      onClick={() => setSortBy(option.value)}
                      className={cn(sortBy === option.value && "bg-accent")}
                    >
                      {option.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* View mode toggle */}
              <div className="flex border border-border rounded-md overflow-hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn("rounded-none h-8 w-8", viewMode === "grid" && "bg-secondary")}
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn("rounded-none h-8 w-8", viewMode === "list" && "bg-secondary")}
                  onClick={() => setViewMode("list")}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Properties grid */}
        <div
          className={cn(
            "grid gap-4",
            viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5" : "grid-cols-1",
          )}
        >
          {sortedProperties.map((property, index) => (
            <PropertyCard key={property.id} property={property} index={index} />
          ))}
        </div>

        {/* Empty state */}
        {sortedProperties.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No properties found matching your criteria.</p>
          </div>
        )}

        {sortedProperties.length > 0 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <Button variant="outline" size="sm" disabled className="bg-transparent">
              Previous
            </Button>
            <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">
              1
            </Button>
            <Button variant="outline" size="sm" className="bg-transparent">
              2
            </Button>
            <Button variant="outline" size="sm" className="bg-transparent">
              3
            </Button>
            <span className="text-muted-foreground">...</span>
            <Button variant="outline" size="sm" className="bg-transparent">
              10
            </Button>
            <Button variant="outline" size="sm" className="bg-transparent">
              Next
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
