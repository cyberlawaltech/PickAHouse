"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const propertyTypes = [
  { value: "all", label: "All Types", icon: "🏠" },
  { value: "house", label: "Houses", icon: "🏠" },
  { value: "apartment", label: "Apartments", icon: "🏢" },
  { value: "commercial", label: "Commercial", icon: "🏪" },
  { value: "land", label: "Land", icon: "🌳" },
  { value: "hostel", label: "Hostels", icon: "🏨" },
  { value: "flat", label: "Flats", icon: "🏬" },
  { value: "new-projects", label: "New Projects", icon: "🏗️" },
]

const locations = ["Maitama", "Asokoro", "Wuse 2", "Jabi", "Guzape", "Life Camp", "Central Area", "Garki"]

export function Hero() {
  const [searchType, setSearchType] = useState("buy")
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <section className="bg-background">
      <div className="promo-banner">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-white max-w-xl">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 text-balance">
                Find Your Dream Property in Abuja
              </h1>
              <p className="text-white/90 text-lg mb-4">
                Discover premium apartments, houses, and land in Nigeria&apos;s capital city.
              </p>
              <Link href="/properties">
                <Button variant="secondary" className="bg-white text-primary hover:bg-white/90 font-semibold">
                  Explore Now
                </Button>
              </Link>
            </div>
            <div className="relative w-64 h-48 md:w-80 md:h-56">
              <Image
                src="/modern-luxury-house-in-abuja-nigeria.jpg"
                alt="Featured Property"
                fill
                className="object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <h2 className="text-xl font-bold mb-6">Browse by Property Type</h2>
        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
          {propertyTypes.map((category) => (
            <Link
              key={category.value}
              href={`/properties?type=${category.value}`}
              className="flex flex-col items-center gap-2 min-w-[80px] group"
            >
              <div className="category-circle w-20 h-20 rounded-full bg-secondary flex items-center justify-center text-3xl group-hover:bg-secondary/80">
                {category.icon}
              </div>
              <span className="text-sm text-center">{category.label}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 pb-8">
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-primary font-bold text-lg">New Properties Added Daily</p>
            <p className="text-muted-foreground text-sm">Get notified when new listings match your preferences</p>
          </div>
          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
          >
            Set Up Alerts
          </Button>
        </div>
      </div>

      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-primary/10 blur-2xl hidden lg:block" />
      <div className="absolute bottom-20 right-10 w-32 h-32 rounded-full bg-accent/20 blur-3xl hidden lg:block" />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Heading */}
          <div className="mb-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-foreground mb-4 text-balance">
              Find Your <span className="text-primary">Dream Property</span> in Abuja
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
              Discover luxury apartments, houses, commercial properties, and prime land in Nigeria&apos;s Federal
              Capital Territory. Powered by AI for smarter property search.
            </p>
          </div>

          {/* Search box */}
          <div className="bg-card/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-border/50 p-4 sm:p-6 mb-8">
            {/* Tabs */}
            <Tabs value={searchType} onValueChange={setSearchType} className="mb-4">
              <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto">
                <TabsTrigger value="buy" className="touch-target">
                  Buy
                </TabsTrigger>
                <TabsTrigger value="rent" className="touch-target">
                  Rent
                </TabsTrigger>
                <TabsTrigger value="short-term" className="touch-target">
                  Short Term
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Search form */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* Location */}
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground z-10">📍</div>
                <Select>
                  <SelectTrigger className="pl-10 h-12 touch-target">
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((location) => (
                      <SelectItem key={location} value={location.toLowerCase()}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Property Type */}
              <Select>
                <SelectTrigger className="h-12 touch-target">
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent>
                  {propertyTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      <span className="flex items-center gap-2">
                        {type.icon}
                        {type.label}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Price Range */}
              <Select>
                <SelectTrigger className="h-12 touch-target">
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-50m">Under ₦50M</SelectItem>
                  <SelectItem value="50m-100m">₦50M - ₦100M</SelectItem>
                  <SelectItem value="100m-300m">₦100M - ₦300M</SelectItem>
                  <SelectItem value="300m-500m">₦300M - ₦500M</SelectItem>
                  <SelectItem value="500m+">Above ₦500M</SelectItem>
                </SelectContent>
              </Select>

              {/* Search button */}
              <Button size="lg" className="h-12 touch-target gap-2 text-base">
                <Search className="w-5 h-5" />
                Search
              </Button>
            </div>

            {/* AI Search hint */}
            <p className="text-sm text-muted-foreground mt-4">
              💡 Try AI search: &quot;3 bedroom apartment in Maitama under 200 million&quot;
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12">
            {[
              { value: "500+", label: "Properties" },
              { value: "50+", label: "Agents" },
              { value: "1,200+", label: "Happy Clients" },
              { value: "15+", label: "Years Experience" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-primary">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
