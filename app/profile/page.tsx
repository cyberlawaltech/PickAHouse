"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Building2, Heart, MessageSquare, Settings, Edit2, MapPin, Eye, Star, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { properties, formatPrice } from "@/lib/data"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("listings")

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
                <Link href="/profile/settings">
                  <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                    <Settings className="w-4 h-4" />
                    Settings
                  </Button>
                </Link>
                <Button size="sm" className="gap-2">
                  <Building2 className="w-4 h-4" />
                  Add Listing
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="bg-background border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex gap-8 py-3 text-sm overflow-x-auto">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-muted-foreground" />
                <span className="font-bold">12</span>
                <span className="text-muted-foreground">Listings</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-muted-foreground" />
                <span className="font-bold">48</span>
                <span className="text-muted-foreground">Saved</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-muted-foreground" />
                <span className="font-bold">2.4K</span>
                <span className="text-muted-foreground">Views</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-ebay-yellow" />
                <span className="font-bold">4.8</span>
                <span className="text-muted-foreground">Rating</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="listings" className="gap-2">
                <Building2 className="w-4 h-4" />
                My Listings
              </TabsTrigger>
              <TabsTrigger value="saved" className="gap-2">
                <Heart className="w-4 h-4" />
                Saved
              </TabsTrigger>
              <TabsTrigger value="messages" className="gap-2">
                <MessageSquare className="w-4 h-4" />
                Messages
              </TabsTrigger>
            </TabsList>

            <TabsContent value="listings">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {userListings.map((property) => (
                  <Card key={property.id} className="overflow-hidden">
                    <div className="aspect-[4/3] relative bg-muted">
                      <Image
                        src={property.images[0] || "/placeholder.svg"}
                        alt={property.title}
                        fill
                        className="object-cover"
                      />
                      <Badge className="absolute top-2 left-2 bg-ebay-blue text-white text-xs">Active</Badge>
                    </div>
                    <CardContent className="p-3">
                      <p className="font-bold text-sm">{formatPrice(property.price)}</p>
                      <p className="text-sm text-foreground truncate">{property.title}</p>
                      <p className="text-xs text-muted-foreground">{property.views} views</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="saved">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {savedProperties.map((property) => (
                  <Card key={property.id} className="overflow-hidden">
                    <div className="aspect-[4/3] relative bg-muted">
                      <Image
                        src={property.images[0] || "/placeholder.svg"}
                        alt={property.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-3">
                      <p className="font-bold text-sm">{formatPrice(property.price)}</p>
                      <p className="text-sm text-foreground truncate">{property.title}</p>
                      <p className="text-xs text-muted-foreground">{property.location.city}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="messages">
              <Card>
                <CardContent className="p-6 text-center">
                  <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <h3 className="font-bold mb-1">No messages yet</h3>
                  <p className="text-sm text-muted-foreground">
                    When you contact agents or receive inquiries, they will appear here.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  )
}
