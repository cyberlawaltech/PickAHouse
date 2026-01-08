"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
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
  Play,
  Pause,
  Volume2,
  VolumeX,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Property } from "@/lib/types"
import { formatPrice, getStatusLabel, getPropertyTypeLabel } from "@/lib/data"
import { cn } from "@/lib/utils"
import { PropertyInquiryForm } from "./property-inquiry-form"
import { VoiceModeToggle } from "./voice-mode-toggle"
import { VoicePropertyController } from "./voice-property-controller"
import { VoiceStream } from "@/lib/voice-stream"
import { parseVoiceCommand } from "@/lib/voice-commands"

interface PropertyDetailsProps {
  property: Property
}

function generatePropertyIntroduction(property: Property): string {
  return `Welcome to ${property.title}. This beautiful ${property.bedrooms || 0} bedroom property is located in ${property.location.city}, ${property.location.state}. 
  Priced at ${formatPrice(property.price)} Nigerian Naira, this ${getPropertyTypeLabel(property.type)} features ${property.features.join(", ")}. 
  With a total area of ${property.area} square meters, this property is perfect for ${property.status === "for-rent" ? "rental" : "investment"}. 
  ${property.description}`
}

export function PropertyDetails({ property }: PropertyDetailsProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [hasSpoken, setHasSpoken] = useState(false)
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null)

  const [isAutoMode, setIsAutoMode] = useState(true)
  const [isListening, setIsListening] = useState(false)
  const [voiceStatus, setVoiceStatus] = useState<"idle" | "listening" | "processing">("idle")
  const voiceStreamRef = useRef<VoiceStream | null>(null)
  const [activeTab, setActiveTab] = useState("description")
  const [showContactForm, setShowContactForm] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined" || !isAutoMode) return

    const initializeVoice = async () => {
      try {
        const voiceStream = new VoiceStream({
          onTranscript: (text) => {
            const command = parseVoiceCommand(text)
            if (command && command.confidence > 0.75) {
              handleVoiceCommand(command)
            }
          },
          onError: (error) => {
            console.error("[v0] Voice error:", error)
            speakResponse(error)
          },
          onStateChange: setVoiceStatus,
        })

        await voiceStream.initialize()
        voiceStream.start()
        voiceStreamRef.current = voiceStream
        setIsListening(true)
      } catch (error) {
        console.error("[v0] Voice initialization error:", error)
      }
    }

    initializeVoice()

    return () => {
      if (voiceStreamRef.current) {
        voiceStreamRef.current.destroy()
      }
    }
  }, [isAutoMode])

  const handleVoiceCommand = (command: any) => {
    const { executeCommand } = VoicePropertyController({
      property,
      onImageNavigate: (dir) => {
        setCurrentImageIndex((prev) =>
          dir === "next"
            ? (prev + 1) % property.images.length
            : (prev - 1 + property.images.length) % property.images.length,
        )
      },
      onTabChange: setActiveTab,
      onToggleSave: () => setIsFavorite(!isFavorite),
      onToggleContact: () => setShowContactForm(true),
      onVoiceOutput: speakResponse,
    })

    executeCommand(command)
  }

  const speakResponse = (text: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 0.9
      utterance.volume = isMuted ? 0 : 1
      window.speechSynthesis.speak(utterance)
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window && !hasSpoken) {
      const introduction = generatePropertyIntroduction(property)
      speechRef.current = new SpeechSynthesisUtterance(introduction)
      speechRef.current.rate = 0.9
      speechRef.current.pitch = 1
      speechRef.current.volume = isMuted ? 0 : 1

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
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length)
  }

  return (
    <div className="relative space-y-8">
      {isAutoMode && (
        <VoiceModeToggle
          isAutoMode={isAutoMode}
          onToggle={setIsAutoMode}
          isListening={isListening && voiceStatus === "listening"}
        />
      )}

      {/* Image Gallery */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
        <div className="relative w-full h-96 bg-secondary rounded-lg overflow-hidden group">
          <Image
            src={property.images[currentImageIndex] || "/placeholder.svg"}
            alt={property.title}
            fill
            className="object-cover"
            priority
          />

          {/* Gallery controls */}
          <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full bg-background/80 hover:bg-background"
              onClick={prevImage}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full bg-background/80 hover:bg-background"
              onClick={nextImage}
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Image counter */}
          <div className="absolute top-4 right-4 bg-background/80 px-3 py-1 rounded text-xs font-medium">
            {currentImageIndex + 1} / {property.images.length}
          </div>

          {/* Audio controls */}
          <div className="absolute bottom-4 left-4 flex gap-2">
            <Button
              size="icon"
              className="rounded-full bg-ebay-yellow text-foreground hover:bg-ebay-yellow/90"
              onClick={togglePlayPause}
              title={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="rounded-full"
              onClick={toggleMute}
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </Button>
          </div>

          {/* Action buttons */}
          <div className="absolute top-4 left-4 flex gap-2">
            <Button
              size="icon"
              variant={isFavorite ? "default" : "secondary"}
              className="rounded-full bg-background/80 hover:bg-background"
              onClick={() => setIsFavorite(!isFavorite)}
            >
              <Heart className={cn("w-5 h-5", isFavorite && "fill-current")} />
            </Button>
            <Button size="icon" variant="secondary" className="rounded-full bg-background/80 hover:bg-background">
              <Share2 className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Thumbnail strip */}
        <div className="grid grid-cols-4 gap-2">
          {property.images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={cn(
                "relative w-full h-20 rounded overflow-hidden border-2 transition-colors",
                currentImageIndex === index ? "border-primary" : "border-border hover:border-primary/50",
              )}
            >
              <Image src={image || "/placeholder.svg"} alt={`View ${index + 1}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      </motion.div>

      {/* Property Info Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid sm:grid-cols-2 md:grid-cols-4 gap-4"
      >
        {property.bedrooms && (
          <Card>
            <CardContent className="pt-6 flex items-center gap-3">
              <Bed className="w-5 h-5 text-primary flex-shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">Bedrooms</p>
                <p className="font-bold text-lg">{property.bedrooms}</p>
              </div>
            </CardContent>
          </Card>
        )}
        {property.bathrooms && (
          <Card>
            <CardContent className="pt-6 flex items-center gap-3">
              <Bath className="w-5 h-5 text-primary flex-shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">Bathrooms</p>
                <p className="font-bold text-lg">{property.bathrooms}</p>
              </div>
            </CardContent>
          </Card>
        )}
        <Card>
          <CardContent className="pt-6 flex items-center gap-3">
            <Maximize className="w-5 h-5 text-primary flex-shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground">Area</p>
              <p className="font-bold text-lg">
                {property.area} {property.areaUnit}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 flex items-center gap-3">
            <Calendar className="w-5 h-5 text-primary flex-shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground">Listed</p>
              <p className="font-bold text-lg">{property.createdAt}</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid lg:grid-cols-3 gap-8"
      >
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <div>
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge>{getPropertyTypeLabel(property.type)}</Badge>
                  <Badge variant="outline">{getStatusLabel(property.status)}</Badge>
                </div>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-primary">{formatPrice(property.price)}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {property.location.address}, {property.location.city}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="location">Location</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">{property.description}</p>
            </TabsContent>

            <TabsContent value="features" className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-3">
                {property.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2 p-3 bg-secondary rounded">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="location" className="space-y-4">
              <div className="bg-secondary rounded-lg h-64 flex items-center justify-center">
                <p className="text-muted-foreground">Map integration coming soon</p>
              </div>
              <p>
                <strong>{property.location.address}</strong>
              </p>
              <p className="text-muted-foreground">
                {property.location.city}, {property.location.state}
              </p>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Agent Card */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <Card>
              <CardHeader>
                <CardTitle>Agent Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <Image
                    src={property.agent.avatar || "/placeholder.svg"}
                    alt={property.agent.name}
                    width={60}
                    height={60}
                    className="rounded-full object-cover"
                  />
                  <div>
                    <p className="font-bold">{property.agent.name}</p>
                    <p className="text-xs text-muted-foreground">{property.agent.company}</p>
                    {property.agent.verified && <Badge className="text-xs mt-1">Verified</Badge>}
                  </div>
                </div>

                <div className="space-y-2 pt-4 border-t border-border">
                  <a
                    href={`tel:${property.agent.phone}`}
                    className="flex items-center gap-2 text-sm hover:text-primary"
                  >
                    <Phone className="w-4 h-4" />
                    {property.agent.phone}
                  </a>
                  <a
                    href={`mailto:${property.agent.email}`}
                    className="flex items-center gap-2 text-sm hover:text-primary"
                  >
                    <Mail className="w-4 h-4" />
                    {property.agent.email}
                  </a>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Inquiry Form */}
          {showContactForm && (
            <PropertyInquiryForm
              propertyTitle={property.title}
              agentName={property.agent.name}
              agentEmail={property.agent.email}
              agentPhone={property.agent.phone}
            />
          )}
        </div>
      </motion.div>
    </div>
  )
}
