"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Heart, Bed, Bath, Maximize, MapPin, Eye, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { type Property, formatPrice, getStatusLabel } from "@/lib/data"
import { cn } from "@/lib/utils"

interface PropertyCardProps {
  property: Property
  index?: number
}

export function PropertyCard({ property, index = 0 }: PropertyCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <div className="property-card group animate-fade-up" style={{ animationDelay: `${index * 50}ms` }}>
      <Link href={`/properties/${property.id}`}>
        <div className="bg-card rounded-lg overflow-hidden border border-border hover:border-primary/30 transition-colors">
          {/* Image container */}
          <div className="relative aspect-[4/3] overflow-hidden">
            {/* Shimmer placeholder */}
            {!imageLoaded && <div className="absolute inset-0 bg-muted animate-shimmer" />}
            <Image
              src={property.images[0] || "/placeholder.svg"}
              alt={property.title}
              fill
              className={cn(
                "object-cover property-image transition-opacity duration-200",
                imageLoaded ? "opacity-100" : "opacity-0",
              )}
              onLoad={() => setImageLoaded(true)}
            />

            <div className="absolute top-2 left-2 flex flex-wrap gap-1.5">
              {property.featured && (
                <Badge className="bg-ebay-yellow text-foreground text-xs font-medium px-2 py-0.5 live-badge">
                  Featured
                </Badge>
              )}
              <Badge
                className={cn(
                  "text-xs font-medium px-2 py-0.5",
                  property.status === "for-sale" && "bg-ebay-blue text-white",
                  property.status === "for-rent" && "bg-ebay-green text-white",
                  property.status === "short-term" && "bg-ebay-red text-white",
                )}
              >
                {getStatusLabel(property.status)}
              </Badge>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 hover:bg-white shadow-sm transition-all touch-target",
                isFavorite && "text-ebay-red",
              )}
              onClick={(e) => {
                e.preventDefault()
                setIsFavorite(!isFavorite)
              }}
            >
              <Heart className={cn("w-4 h-4", isFavorite && "fill-current")} />
            </Button>
          </div>

          <div className="p-3">
            {/* Price */}
            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-lg font-bold text-foreground">{formatPrice(property.price)}</span>
              {property.status !== "for-sale" && (
                <span className="text-xs text-muted-foreground">
                  /{property.status === "short-term" ? "night" : "yr"}
                </span>
              )}
            </div>

            {/* Title */}
            <h3 className="text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-1.5 leading-snug">
              {property.title}
            </h3>

            {/* Features inline */}
            <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
              {property.bedrooms && (
                <span className="flex items-center gap-0.5">
                  <Bed className="w-3.5 h-3.5" />
                  {property.bedrooms} bed
                </span>
              )}
              {property.bathrooms && (
                <span className="flex items-center gap-0.5">
                  <Bath className="w-3.5 h-3.5" />
                  {property.bathrooms} bath
                </span>
              )}
              <span className="flex items-center gap-0.5">
                <Maximize className="w-3.5 h-3.5" />
                {property.area} {property.areaUnit}
              </span>
            </div>

            {/* Location */}
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {property.location.city}, {property.location.state}
            </p>

            <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-border">
              <div className="flex items-center gap-1.5">
                <div className="relative w-6 h-6 rounded-full overflow-hidden">
                  <Image
                    src={property.agent.avatar || "/placeholder.svg"}
                    alt={property.agent.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="text-xs text-muted-foreground flex items-center gap-0.5">
                  {property.agent.name}
                  {property.agent.verified && <CheckCircle className="w-3 h-3 text-primary" />}
                </span>
              </div>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Eye className="w-3 h-3" />
                {property.views}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
