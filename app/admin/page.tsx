"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Building2,
  Users,
  Eye,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  Download,
  Calendar,
  DollarSign,
  ChevronRight,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { properties, formatPrice } from "@/lib/data"

const stats = [
  {
    title: "Total Listings",
    value: "487",
    change: "+12%",
    trend: "up",
    icon: Building2,
  },
  {
    title: "Active Users",
    value: "2,847",
    change: "+8.2%",
    trend: "up",
    icon: Users,
  },
  {
    title: "Total Views",
    value: "156.4K",
    change: "+23%",
    trend: "up",
    icon: Eye,
  },
  {
    title: "Revenue",
    value: "₦24.8M",
    change: "-3.1%",
    trend: "down",
    icon: DollarSign,
  },
]

const recentActivities = [
  { id: 1, action: "New listing", property: "Luxury Villa in Maitama", time: "2 mins ago", type: "property" },
  { id: 2, action: "User registered", property: "John Adebayo", time: "15 mins ago", type: "user" },
  { id: 3, action: "Inquiry received", property: "3BR Apartment in Jabi", time: "32 mins ago", type: "inquiry" },
  { id: 4, action: "Property sold", property: "Commercial Space CBD", time: "1 hour ago", type: "sale" },
]

export default function AdminDashboard() {
  const [dateRange, setDateRange] = useState("7d")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Seller Hub</h1>
          <p className="text-sm text-muted-foreground">Overview of your property listings and performance</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[130px] h-9 text-sm">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" className="gap-2 bg-transparent h-9">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <stat.icon className="w-5 h-5 text-muted-foreground" />
                <span
                  className={`text-xs font-medium flex items-center gap-0.5 ${stat.trend === "up" ? "text-ebay-green" : "text-ebay-red"}`}
                >
                  {stat.trend === "up" ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.title}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Listings */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between py-4">
            <CardTitle className="text-base font-bold">Recent Listings</CardTitle>
            <Link href="/admin/properties" className="text-sm text-primary hover:underline flex items-center gap-1">
              View all <ChevronRight className="w-4 h-4" />
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {properties.slice(0, 5).map((property) => (
                <div key={property.id} className="flex items-center gap-4 p-4 hover:bg-secondary/50 transition-colors">
                  <div className="w-12 h-12 rounded-lg bg-muted shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{property.title}</p>
                    <p className="text-xs text-muted-foreground">{property.location.city}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm">{formatPrice(property.price)}</p>
                    <Badge variant="outline" className="text-xs">
                      {property.status === "for-sale" ? "Sale" : "Rent"}
                    </Badge>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View</DropdownMenuItem>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem className="text-ebay-red">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Activity Feed */}
        <Card>
          <CardHeader className="py-4">
            <CardTitle className="text-base font-bold">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 p-4">
                  <div
                    className={`w-2 h-2 rounded-full mt-1.5 ${
                      activity.type === "property"
                        ? "bg-ebay-blue"
                        : activity.type === "user"
                          ? "bg-ebay-green"
                          : activity.type === "sale"
                            ? "bg-ebay-yellow"
                            : "bg-muted-foreground"
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground truncate">{activity.property}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Chart */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between py-4">
          <CardTitle className="text-base font-bold">Performance Overview</CardTitle>
          <div className="flex gap-1">
            <Button variant="ghost" size="sm" className="h-8 text-xs">
              Daily
            </Button>
            <Button variant="secondary" size="sm" className="h-8 text-xs">
              Weekly
            </Button>
            <Button variant="ghost" size="sm" className="h-8 text-xs">
              Monthly
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] flex items-center justify-center bg-secondary/50 rounded-lg">
            <div className="text-center">
              <TrendingUp className="w-10 h-10 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Analytics visualization</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
