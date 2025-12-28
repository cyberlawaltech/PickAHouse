"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  Building2,
  Search,
  Menu,
  X,
  Home,
  Building,
  Briefcase,
  Users,
  Heart,
  Bell,
  ShoppingCart,
  ChevronDown,
  Settings,
  HelpCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/", label: "Buy", icon: Home },
  { href: "/rent", label: "Rent", icon: Building },
  { href: "/new-projects", label: "New Projects", icon: Building2 },
  { href: "/commercial", label: "Commercial", icon: Briefcase },
  { href: "/agents", label: "Find Agent", icon: Users },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const pathname = usePathname()
  const isAdminPath = pathname.startsWith("/admin")

  return (
    <header className="sticky top-0 z-40 w-full bg-background border-b border-border">
      <div className="hidden lg:block border-b border-border/50">
        <div className="container mx-auto px-4 py-1.5 flex items-center justify-between text-xs">
          <div className="flex items-center gap-4">
            <span className="text-muted-foreground">
              Hi!{" "}
              <Link href="/signin" className="text-primary hover:underline">
                Sign in
              </Link>{" "}
              or{" "}
              <Link href="/register" className="text-primary hover:underline">
                register
              </Link>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/deals" className="hover:text-primary transition-colors">
              Daily Deals
            </Link>
            <Link href="/help" className="hover:text-primary transition-colors flex items-center gap-1">
              <HelpCircle className="w-3 h-3" />
              Help & Contact
            </Link>
            <Link href="/sell" className="hover:text-primary transition-colors font-medium">
              Sell
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 hover:text-primary transition-colors">
                <Heart className="w-3.5 h-3.5" />
                Watchlist
                <ChevronDown className="w-3 h-3" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Saved Properties</DropdownMenuItem>
                <DropdownMenuItem>Saved Searches</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 hover:text-primary transition-colors">
                My Account
                <ChevronDown className="w-3 h-3" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>My Listings</DropdownMenuItem>
                <DropdownMenuItem>Messages</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Sign Out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <Bell className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <ShoppingCart className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex h-14 items-center gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-ebay-red">pick</span>
              <span className="text-2xl font-bold text-ebay-blue">ah</span>
              <span className="text-2xl font-bold text-ebay-yellow">ou</span>
              <span className="text-2xl font-bold text-ebay-green">se</span>
            </div>
          </Link>

          {/* Category dropdown */}
          <div className="hidden md:block">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1 text-sm font-normal">
                  Browse by
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuItem>Houses</DropdownMenuItem>
                <DropdownMenuItem>Apartments</DropdownMenuItem>
                <DropdownMenuItem>Commercial</DropdownMenuItem>
                <DropdownMenuItem>Land</DropdownMenuItem>
                <DropdownMenuItem>Hostels</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>All Categories</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="hidden md:flex flex-1 max-w-2xl">
            <div className="flex w-full">
              <div className="relative flex-1">
                <Input
                  type="search"
                  placeholder="Search for properties"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-10 rounded-r-none border-r-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-40 h-10 rounded-none border-x-0 focus:ring-0">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="houses">Houses</SelectItem>
                  <SelectItem value="apartments">Apartments</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="land">Land</SelectItem>
                </SelectContent>
              </Select>
              <Button className="h-10 px-6 rounded-l-none">
                <Search className="w-5 h-5" />
                <span className="sr-only">Search</span>
              </Button>
            </div>
          </div>

          {/* Advanced link */}
          <Link href="/advanced-search" className="hidden lg:block text-xs text-primary hover:underline">
            Advanced
          </Link>

          {/* Right actions */}
          <div className="flex items-center gap-2 ml-auto">
            <Link href={isAdminPath ? "/" : "/admin"} className="hidden md:block">
              <Button variant="ghost" size="sm" className="gap-2 text-xs">
                <Settings className="w-4 h-4" />
                {isAdminPath ? "Exit" : "Admin"}
              </Button>
            </Link>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden touch-target"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6 pb-2 text-sm">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "hover:text-primary transition-colors",
                pathname === item.href && "text-primary font-medium",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border bg-background"
          >
            <div className="container mx-auto px-4 py-4 space-y-4">
              {/* Mobile search */}
              <div className="flex">
                <Input type="search" placeholder="Search properties..." className="h-11 rounded-r-none" />
                <Button className="h-11 rounded-l-none">
                  <Search className="w-5 h-5" />
                </Button>
              </div>

              {/* Mobile nav */}
              <nav className="space-y-1">
                {navItems.map((item) => (
                  <Link key={item.href} href={item.href}>
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-start gap-3 h-11 touch-target",
                        pathname === item.href && "bg-secondary",
                      )}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <item.icon className="w-5 h-5" />
                      {item.label}
                    </Button>
                  </Link>
                ))}
              </nav>

              {/* Mobile auth */}
              <div className="flex gap-2 pt-2 border-t border-border">
                <Link href="/signin" className="flex-1">
                  <Button variant="outline" className="w-full h-11 touch-target bg-transparent">
                    Sign In
                  </Button>
                </Link>
                <Link href="/register" className="flex-1">
                  <Button className="w-full h-11 touch-target">Register</Button>
                </Link>
              </div>

              {/* Admin link */}
              <Link href="/admin">
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <Settings className="w-5 h-5" />
                  Admin Dashboard
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
