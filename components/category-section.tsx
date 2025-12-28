"use client"

import Link from "next/link"
import { Home, Building2, Briefcase, Trees, Building, GraduationCap, ChevronRight } from "lucide-react"

const categories = [
  {
    title: "Apartments",
    icon: Building2,
    count: 45,
    href: "/properties?type=apartment",
  },
  {
    title: "Houses",
    icon: Home,
    count: 38,
    href: "/properties?type=house",
  },
  {
    title: "Commercial",
    icon: Briefcase,
    count: 24,
    href: "/properties?type=commercial",
  },
  {
    title: "Land",
    icon: Trees,
    count: 31,
    href: "/properties?type=land",
  },
  {
    title: "Flats",
    icon: Building,
    count: 19,
    href: "/properties?type=flat",
  },
  {
    title: "Hostels",
    icon: GraduationCap,
    count: 12,
    href: "/properties?type=hostel",
  },
]

export function CategorySection() {
  return (
    <section className="py-8 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-foreground">Explore Popular Categories</h2>
          <Link href="/categories" className="text-sm text-primary hover:underline flex items-center gap-1">
            See all
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link key={category.title} href={category.href}>
              <div className="group p-4 rounded-lg border border-border hover:border-primary/30 hover:shadow-sm transition-all bg-card text-center">
                <div className="w-12 h-12 mx-auto rounded-full bg-secondary flex items-center justify-center mb-3 group-hover:bg-primary/10 transition-colors">
                  <category.icon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h3 className="font-medium text-sm text-foreground mb-1">{category.title}</h3>
                <p className="text-xs text-muted-foreground">{category.count} listings</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
