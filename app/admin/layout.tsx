"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import {
  LayoutDashboard,
  Building2,
  Users,
  Settings,
  BarChart3,
  MessageSquare,
  FileText,
  Bell,
  LogOut,
  Home,
  Search,
  HelpCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar"

const adminNavItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/properties", label: "Properties", icon: Building2 },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/messages", label: "Messages", icon: MessageSquare },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/reports", label: "Reports", icon: FileText },
  { href: "/admin/settings", label: "Settings", icon: Settings },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  return (
    <SidebarProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="flex min-h-screen w-full">
          <Sidebar className="border-r border-border bg-background">
            <SidebarHeader className="border-b border-border p-4">
              <Link href="/admin" className="flex items-baseline">
                <span className="text-xl font-bold text-ebay-red">pick</span>
                <span className="text-xl font-bold text-ebay-blue">ah</span>
                <span className="text-xl font-bold text-ebay-yellow">ou</span>
                <span className="text-xl font-bold text-ebay-green">se</span>
              </Link>
              <p className="text-xs text-muted-foreground mt-1">Seller Hub</p>
            </SidebarHeader>

            <SidebarContent>
              <ScrollArea className="h-full">
                <SidebarMenu className="p-2 space-y-1">
                  {adminNavItems.map((item) => (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton asChild isActive={pathname === item.href} className="w-full">
                        <Link href={item.href}>
                          <item.icon className="w-5 h-5" />
                          <span>{item.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </ScrollArea>
            </SidebarContent>

            <SidebarFooter className="border-t border-border p-4">
              <div className="space-y-1">
                <Link href="/">
                  <Button variant="ghost" size="sm" className="w-full justify-start gap-2 h-9">
                    <Home className="w-4 h-4" />
                    Back to Site
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" className="w-full justify-start gap-2 h-9 text-ebay-red">
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </Button>
              </div>
            </SidebarFooter>
          </Sidebar>

          <SidebarInset className="flex-1">
            <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b border-border bg-background px-4">
              <SidebarTrigger className="-ml-2" />

              {/* Search */}
              <div className="hidden md:flex flex-1 max-w-md">
                <div className="relative w-full">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Search properties, users..." className="pl-9 h-9 bg-secondary/50" />
                </div>
              </div>

              <div className="flex-1" />

              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <HelpCircle className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="h-9 w-9 relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-ebay-red rounded-full" />
                </Button>
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-medium">
                  A
                </div>
              </div>
            </header>

            {/* Main content */}
            <main className="flex-1 p-4 sm:p-6 bg-secondary/30">{children}</main>
          </SidebarInset>
        </div>
      </Suspense>
    </SidebarProvider>
  )
}
