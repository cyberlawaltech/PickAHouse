"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Heart, MessageSquare, Settings, Edit2, MapPin, CheckCircle, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { properties, formatPrice } from "@/lib/data"
import { getAllAgents } from "@/lib/agents"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("listings")
  const agents = getAllAgents()

  const userListings = properties.slice(0, 4)
  const savedProperties = properties.slice(2, 6)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-secondary/30">
        {/* Profile Header */}
        <div className="bg-background border-b border-border">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-2xl font-bold">
                  JA
                </div>
                <button className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-background border border-border flex items-center justify-center hover:bg-secondary">
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-xl font-bold">John Adebayo</h1>
                  <CheckCircle className="w-5 h-5 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  Abuja, Nigeria
                </p>
                <p className="text-xs text-muted-foreground mt-1">Member since January 2023</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
                <Link href="/ai-agents">
                  <Button size="sm">
                    <Zap className="w-4 h-4 mr-2" />
                    Use AI Agents
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="container mx-auto px-4 py-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 md:w-96">
              <TabsTrigger value="listings">My Listings</TabsTrigger>
              <TabsTrigger value="saved">Saved</TabsTrigger>
              <TabsTrigger value="messages">Messages</TabsTrigger>
              <TabsTrigger value="agents">AI Agents</TabsTrigger>
            </TabsList>

            {/* Listings Tab */}
            <TabsContent value="listings" className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold">My Listings (4)</h2>
                <Link href="/my-listings">
                  <Button variant="ghost" size="sm">
                    View All
                  </Button>
                </Link>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {userListings.map((property) => (
                  <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative h-40 bg-gray-200">
                      <Image
                        src={property.images[0] || "/placeholder.svg?height=160&width=320&query=luxury property"}
                        alt={property.title}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                      <Badge
                        className="absolute top-2 right-2"
                        variant={property.status === "for-sale" ? "default" : "secondary"}
                      >
                        {property.status === "for-sale" ? "For Sale" : "For Rent"}
                      </Badge>
                    </div>
                    <CardContent className="p-4">
                      <h4 className="font-bold text-sm mb-1">{property.title}</h4>
                      <p className="text-xs text-muted-foreground mb-3 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {property.location.address}
                      </p>
                      <p className="text-lg font-bold text-primary mb-3">{formatPrice(property.price)}</p>
                      <Link href={`/properties/${property.id}`}>
                        <Button className="w-full" size="sm">
                          View Details
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Saved Tab */}
            <TabsContent value="saved" className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold">Saved Properties (4)</h2>
                <Link href="/saved-properties">
                  <Button variant="ghost" size="sm">
                    View All
                  </Button>
                </Link>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {savedProperties.map((property) => (
                  <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative h-40 bg-gray-200">
                      <Image
                        src={property.images[0] || "/placeholder.svg?height=160&width=320&query=luxury property"}
                        alt={property.title}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                      <button className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-gray-100">
                        <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                      </button>
                    </div>
                    <CardContent className="p-4">
                      <h4 className="font-bold text-sm mb-1">{property.title}</h4>
                      <p className="text-xs text-muted-foreground mb-3 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {property.location.address}
                      </p>
                      <p className="text-lg font-bold text-primary mb-3">{formatPrice(property.price)}</p>
                      <Link href={`/properties/${property.id}`}>
                        <Button className="w-full" size="sm">
                          View Details
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Messages Tab */}
            <TabsContent value="messages" className="space-y-4">
              <h2 className="text-lg font-bold">Messages</h2>
              <Card>
                <CardContent className="p-8 text-center text-muted-foreground">
                  <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No messages yet. Contact an agent to start chatting!</p>
                  <Link href="/agents">
                    <Button variant="outline" className="mt-4 bg-transparent">
                      Find an Agent
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="agents" className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-500" />
                  AI Agents Dashboard
                </h2>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-blue-900">
                  Access specialized AI agents to help you with property recommendations, market analysis, negotiation
                  strategies, and more.
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {agents.map((agent) => (
                  <Card key={agent.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <h3 className="font-bold mb-2">{agent.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{agent.description}</p>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {agent.capabilities.slice(0, 2).map((cap) => (
                          <Badge key={cap} variant="secondary" className="text-xs">
                            {cap}
                          </Badge>
                        ))}
                        {agent.capabilities.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{agent.capabilities.length - 2}
                          </Badge>
                        )}
                      </div>
                      <Link href={`/ai-agents/${agent.id}`}>
                        <Button className="w-full" size="sm">
                          Start Chat
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <Link href="/ai-agents/workflows">
                <Button variant="outline" className="w-full bg-transparent">
                  View Agent Workflows
                </Button>
              </Link>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  )
}
