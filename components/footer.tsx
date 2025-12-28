"use client"

import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const footerLinks = {
  buy: [
    { label: "Houses", href: "/properties?type=house" },
    { label: "Apartments", href: "/properties?type=apartment" },
    { label: "Land", href: "/properties?type=land" },
    { label: "Commercial", href: "/properties?type=commercial" },
  ],
  rent: [
    { label: "Monthly Rentals", href: "/properties?status=for-rent" },
    { label: "Short Term", href: "/properties?status=short-term" },
    { label: "Serviced Apartments", href: "/properties?type=flat" },
    { label: "Office Space", href: "/properties?type=commercial&status=for-rent" },
  ],
  aboutUs: [
    { label: "Company Info", href: "/about" },
    { label: "Our Team", href: "/team" },
    { label: "Careers", href: "/careers" },
    { label: "Contact Us", href: "/contact" },
  ],
  help: [
    { label: "Help Center", href: "/help" },
    { label: "FAQs", href: "/faq" },
    { label: "Guides", href: "/guides" },
    { label: "Site Map", href: "/sitemap" },
  ],
}

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
]

export function Footer() {
  return (
    <footer className="bg-secondary border-t border-border">
      {/* Main footer */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-6 lg:gap-8">
          {/* Buy column */}
          <div>
            <h4 className="font-bold text-sm mb-3 text-foreground">Buy</h4>
            <ul className="space-y-2">
              {footerLinks.buy.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-xs text-muted-foreground hover:text-primary hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Rent column */}
          <div>
            <h4 className="font-bold text-sm mb-3 text-foreground">Rent</h4>
            <ul className="space-y-2">
              {footerLinks.rent.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-xs text-muted-foreground hover:text-primary hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About Us column */}
          <div>
            <h4 className="font-bold text-sm mb-3 text-foreground">About Us</h4>
            <ul className="space-y-2">
              {footerLinks.aboutUs.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-xs text-muted-foreground hover:text-primary hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help column */}
          <div>
            <h4 className="font-bold text-sm mb-3 text-foreground">Help</h4>
            <ul className="space-y-2">
              {footerLinks.help.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-xs text-muted-foreground hover:text-primary hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-2 sm:col-span-4 lg:col-span-1">
            <h4 className="font-bold text-sm mb-3 text-foreground">Stay Connected</h4>
            <p className="text-xs text-muted-foreground mb-3">Get the latest listings in your inbox</p>
            <div className="flex gap-2">
              <Input type="email" placeholder="Email" className="h-9 text-sm bg-background" />
              <Button size="sm" className="h-9 px-4">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-border bg-muted/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {/* Logo */}
              <Link href="/" className="flex items-baseline">
                <span className="text-lg font-bold text-ebay-red">pick</span>
                <span className="text-lg font-bold text-ebay-blue">ah</span>
                <span className="text-lg font-bold text-ebay-yellow">ou</span>
                <span className="text-lg font-bold text-ebay-green">se</span>
              </Link>
              <span className="text-xs text-muted-foreground">© 2025 Pickahouse. All rights reserved.</span>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-background flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors touch-target"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Legal links */}
          <div className="flex flex-wrap gap-4 mt-3 text-xs text-muted-foreground">
            <Link href="/accessibility" className="hover:underline">
              Accessibility
            </Link>
            <Link href="/privacy" className="hover:underline">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:underline">
              Terms of Use
            </Link>
            <Link href="/cookies" className="hover:underline">
              Cookies
            </Link>
            <Link href="/sitemap" className="hover:underline">
              Site Map
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
