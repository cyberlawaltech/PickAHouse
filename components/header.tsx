"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
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
  HelpCircle,
  Zap,
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
import { getCurrentUser, logout } from "@/lib/auth"
import type { AuthUser } from "@/lib/auth"
import { AskAIButton } from "@/components/ask-ai-button"

const navItems = [
  { href: "/", label: "Buy", icon: Home },
  { href: "/rent", label: "Rent", icon: Building },
  { href: "/new-projects", label: "New Projects", icon: Building2 },
  { href: "/commercial", label: "Commercial", icon: Briefcase },
  { href: "/agents", label: "Find Agent", icon: Users },
  { href: "/ai-agents", label: "AI Agents", icon: Zap },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [user, setUser] = useState<AuthUser | null>(null)
  const pathname = usePathname()
  const router = useRouter()
  const isAdminPath = pathname.startsWith("/admin")

  useEffect(() => {
    setUser(getCurrentUser())
  }, [])

  const handleLogout = () => {
    logout()
    setUser(null)
    router.push("/")
  }

  return (
    <header className="sticky top-0 z-40 w-full bg-background border-b border-border">
      <div className="hidden lg:block border-b border-border/50">
        <div className="container mx-auto px-4 py-1.5 flex items-center justify-between text-xs">
          <div className="flex items-center gap-4">
            <span className="text-muted-foreground">
              Hi!{" "}
              {user ? (
                <span>
                  {user.name}{" "}
                  <button onClick={handleLogout} className="text-primary hover:underline">
                    Sign out
                  </button>
                </span>
              ) : (
                <>
                  <Link href="/signin" className="text-primary hover:underline">
                    Sign in
                  </Link>{" "}
                  or{" "}
                  <Link href="/register" className="text-primary hover:underline">
                    register
                  </Link>
                </>
              )}
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
            <Link
              href="/ai-agents"
              className="hover:text-primary transition-colors font-medium flex items-center gap-1"
            >
              <Zap className="w-3 h-3" />
              AI Agents
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 hover:text-primary transition-colors">
                <Heart className="w-3.5 h-3.5" />
                Watchlist
                <ChevronDown className="w-3 h-3" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/saved-properties">Saved Properties</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/saved-searches">Saved Searches</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 hover:text-primary transition-colors">
                My Account
                <ChevronDown className="w-3 h-3" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/my-listings">My Listings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/messages">Messages</Link>
                </DropdownMenuItem>
                {user?.role === "admin" && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/admin">Admin Panel</Link>
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>Sign Out</DropdownMenuItem>
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

          {/* Ask AI button next to logo */}
          <div className="hidden md:flex">
            <AskAIButton variant="header" />
          </div>

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
                <DropdownMenuItem asChild>
                  <Link href="/properties?type=house">Houses</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/properties?type=apartment">Apartments</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/commercial">Commercial</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/properties?type=land">Land</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/properties?type=hostel">Hostels</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/ai-agents" className="flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    AI Agents
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/properties">All Categories</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Search bar */}
          <div className="hidden md:flex flex-1 max-w-2xl">
            <div className="flex w-full">
              <div className="relative flex-1">
                <Input
                  type="search"
                  placeholder="Search for properties"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="rounded-r-none"
                />
              </div>
              <Button
                size="sm"
                className="rounded-l-none gap-2"
                onClick={() => {
                  if (searchQuery) {
                    router.push(`/properties?search=${encodeURIComponent(searchQuery)}`)
                  }
                }}
              >
                <Search className="w-4 h-4" />
                <span className="hidden sm:inline">Search</span>
              </Button>
            </div>
          </div>

          <div className="flex-1" />

          {/* Mobile menu button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
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
            <div className="container mx-auto px-4 py-4 space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-2 py-2 text-sm hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
