"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Share2,
  Calendar,
  MapPin,
  Bed,
  Bath,
  Maximize,
  Check,
  Phone,
  Mail,
  MessageCircle,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Star,
  Eye,
  Home,
  Building2,
  CheckCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { type Property, formatPrice, getStatusLabel, getPropertyTypeLabel } from "@/lib/data"
import { cn } from "@/lib/utils"

interface PropertyDetailsProps {
  property: Property
}

export function PropertyDetails({ property }: PropertyDetailsProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [hasSpoken, setHasSpoken] = useState(false)
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null)

  // AI Voice Introduction
  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window && !hasSpoken) {
      const introduction = generatePropertyIntroduction(property)
      speechRef.current = new SpeechSynthesisUtterance(introduction)
      speechRef.current.rate = 0.9
      speechRef.current.pitch = 1
      speechRef.current.volume = isMuted ? 0 : 1

      // Auto-play after a short delay
      const timer = setTimeout(() => {
        if (speechRef.current) {
          window.speechSynthesis.speak(speechRef.current)
          setIsPlaying(true)
          setHasSpoken(true)
        }
      }, 1500)

      speechRef.current.onend = () => setIsPlaying(false)

      return () => {
        clearTimeout(timer)
        window.speechSynthesis.cancel()
      }
    }
  }, [property, hasSpoken, isMuted])

  const togglePlayPause = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return

    if (isPlaying) {
      window.speechSynthesis.cancel()
      setIsPlaying(false)
    } else {
      const introduction = generatePropertyIntroduction(property)
      speechRef.current = new SpeechSynthesisUtterance(introduction)
      speechRef.current.rate = 0.9
      speechRef.current.volume = isMuted ? 0 : 1
      speechRef.current.onend = () => setIsPlaying(false)
      window.speechSynthesis.speak(speechRef.current)
      setIsPlaying(true)
    }
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
    if (speechRef.current) {
      speechRef.current.volume = !isMuted ? 0 : 1
    }
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === property.images.length - 1 ? 0 : prev + 1))
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? property.images.length - 1 : prev - 1))
  }

  return (
    <div className="pb-12">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/properties" className="hover:text-foreground transition-colors">
            Properties
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground truncate max-w-[200px]">{property.title}</span>
        </nav>
      </div>

      {/* Image Gallery */}
      <section className="container mx-auto px-4 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Main image */}
          <div className="lg:col-span-2 relative aspect-[16/10] rounded-2xl overflow-hidden group">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
              >
                <Image
                  src={property.images[currentImageIndex] || "/placeholder.svg"}
                  alt={`${property.title} - Image ${currentImageIndex + 1}`}
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>
            </AnimatePresence>

            {/* Navigation arrows */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity touch-target"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity touch-target"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Image counter */}
            <div className="absolute bottom-4 left-4 bg-black/60 text-white text-sm px-3 py-1 rounded-full">
              {currentImageIndex + 1} / {property.images.length}
            </div>

            {/* AI Voice controls */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <Button size="sm" onClick={togglePlayPause} className="gap-2 bg-primary/90 hover:bg-primary">
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                AI Voice Tour
              </Button>
              <Button size="icon" variant="secondary" onClick={toggleMute} className="w-9 h-9">
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </Button>
            </div>

            {/* Top badges */}
            <div className="absolute top-4 right-4 flex gap-2">
              <Badge
                className={cn(
                  "text-sm",
                  property.status === "for-sale" && "bg-primary text-primary-foreground",
                  property.status === "for-rent" && "bg-blue-500 text-white",
                  property.status === "short-term" && "bg-amber-500 text-white",
                )}
              >
                {getStatusLabel(property.status)}
              </Badge>
              {property.featured && (
                <Badge className="bg-gold text-gold-foreground gap-1">
                  <Star className="w-3 h-3 fill-current" />
                  Featured
                </Badge>
              )}
            </div>
          </div>

          {/* Thumbnail grid */}
          <div className="grid grid-cols-4 lg:grid-cols-2 gap-2 lg:gap-4">
            {property.images.slice(0, 4).map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={cn(
                  "relative aspect-square rounded-xl overflow-hidden transition-all touch-target",
                  currentImageIndex === index ? "ring-2 ring-primary ring-offset-2" : "hover:opacity-80",
                )}
              >
                <Image src={image || "/placeholder.svg"} alt={`Thumbnail ${index + 1}`} fill className="object-cover" />
                {index === 3 && property.images.length > 4 && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <span className="text-white font-medium">+{property.images.length - 4}</span>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div>
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-foreground mb-2">
                    {property.title}
                  </h1>
                  <p className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    {property.location.address}, {property.location.city}, {property.location.state}
                  </p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setIsFavorite(!isFavorite)}
                    className={cn("touch-target", isFavorite && "text-red-500")}
                  >
                    <Heart className={cn("w-5 h-5", isFavorite && "fill-current")} />
                  </Button>
                  <Button variant="outline" size="icon" className="touch-target bg-transparent">
                    <Share2 className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Price and stats */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                <div>
                  <p className="text-3xl sm:text-4xl font-bold text-primary">{formatPrice(property.price)}</p>
                  {property.status !== "for-sale" && (
                    <span className="text-muted-foreground">
                      /{property.status === "short-term" ? "night" : "year"}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4 text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {property.views} views
                  </span>
                  <Badge variant="outline" className="gap-1">
                    {property.type === "house" ? <Home className="w-3 h-3" /> : <Building2 className="w-3 h-3" />}
                    {getPropertyTypeLabel(property.type)}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {property.bedrooms && (
                <Card>
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Bed className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{property.bedrooms}</p>
                      <p className="text-xs text-muted-foreground">Bedrooms</p>
                    </div>
                  </CardContent>
                </Card>
              )}
              {property.bathrooms && (
                <Card>
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Bath className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{property.bathrooms}</p>
                      <p className="text-xs text-muted-foreground">Bathrooms</p>
                    </div>
                  </CardContent>
                </Card>
              )}
              <Card>
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Maximize className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{property.area}</p>
                    <p className="text-xs text-muted-foreground">{property.areaUnit}</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">
                      {new Date(property.createdAt).toLocaleDateString("en-NG", { month: "short", year: "numeric" })}
                    </p>
                    <p className="text-xs text-muted-foreground">Listed</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="description" className="touch-target">
                  Description
                </TabsTrigger>
                <TabsTrigger value="features" className="touch-target">
                  Features
                </TabsTrigger>
                <TabsTrigger value="location" className="touch-target">
                  Location
                </TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>About This Property</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{property.description}</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="features" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Property Features</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {property.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-primary shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="location" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Location</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-4">
                      <div className="text-center">
                        <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                        <p className="font-medium">Map Location</p>
                        <p className="text-sm text-muted-foreground">
                          {property.location.coordinates?.lat}, {property.location.coordinates?.lng}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">(Interactive map would be displayed here)</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <p>
                        <strong>Address:</strong> {property.location.address}
                      </p>
                      <p>
                        <strong>Area:</strong> {property.location.city}
                      </p>
                      <p>
                        <strong>State:</strong> {property.location.state}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right column - Agent & Contact */}
          <div className="space-y-6">
            {/* Agent card */}
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Contact Agent</CardTitle>
                <p className="text-sm text-muted-foreground">Get in touch with the property agent</p>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Agent info */}
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden">
                    <Image
                      src={property.agent.avatar || "/placeholder.svg"}
                      alt={property.agent.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold flex items-center gap-1">
                      {property.agent.name}
                      {property.agent.verified && <CheckCircle className="w-4 h-4 text-blue-500" />}
                    </p>
                    <p className="text-sm text-muted-foreground">{property.agent.company}</p>
                  </div>
                </div>

                {/* Contact buttons */}
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" className="gap-2 touch-target bg-transparent">
                    <Phone className="w-4 h-4" />
                    Call
                  </Button>
                  <Button variant="outline" className="gap-2 touch-target bg-transparent">
                    <Mail className="w-4 h-4" />
                    Email
                  </Button>
                </div>

                {/* Contact form */}
                <div className="space-y-3">
                  <h4 className="font-medium">Send a Message</h4>
                  <Input placeholder="Your Name" className="touch-target" />
                  <Input placeholder="Your Email" type="email" className="touch-target" />
                  <Input placeholder="Your Phone" type="tel" className="touch-target" />
                  <Textarea placeholder={`I'm interested in ${property.title}...`} className="min-h-[100px]" />
                  <Button className="w-full gap-2 touch-target">
                    <MessageCircle className="w-4 h-4" />
                    Send Message
                  </Button>
                </div>

                {/* Quick actions */}
                <div className="pt-4 border-t border-border">
                  <h4 className="font-medium mb-3">Quick Actions</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm" className="gap-1 bg-transparent">
                      <Heart className="w-3 h-3" />
                      Save
                    </Button>
                    <Button variant="outline" size="sm" className="gap-1 bg-transparent">
                      <Calendar className="w-3 h-3" />
                      Schedule
                    </Button>
                  </div>
                </div>

                {/* Share buttons */}
                <div className="pt-4 border-t border-border">
                  <h4 className="font-medium mb-3">Share Property</h4>
                  <div className="flex gap-2">
                    {["facebook", "twitter", "whatsapp", "linkedin"].map((platform) => (
                      <Button
                        key={platform}
                        variant="outline"
                        size="icon"
                        className="w-9 h-9 touch-target bg-transparent"
                      >
                        <span className="sr-only">Share on {platform}</span>
                        <Share2 className="w-4 h-4" />
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}

function generatePropertyIntroduction(property: Property): string {
  const priceFormatted = formatPrice(property.price)
  const statusText =
    property.status === "for-sale"
      ? "for sale"
      : property.status === "for-rent"
        ? "for rent"
        : "available for short-term rental"

  let intro = `Welcome to this stunning ${property.title}. `
  intro += `This exceptional property is located in ${property.location.city}, ${property.location.state}, `
  intro += `and is ${statusText} at ${priceFormatted}. `

  if (property.bedrooms && property.bathrooms) {
    intro += `Featuring ${property.bedrooms} spacious bedrooms and ${property.bathrooms} modern bathrooms, `
  }

  intro += `this ${property.area} ${property.areaUnit} property offers premium living. `

  if (property.features.length > 0) {
    const topFeatures = property.features.slice(0, 4).join(", ")
    intro += `Key amenities include ${topFeatures}. `
  }

  intro += `Contact our agent ${property.agent.name} today to schedule a viewing and make this your dream home.`

  return intro
}
