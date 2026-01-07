"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { motion } from "framer-motion"

export default function SitemapPage() {
  const sections = [
    {
      title: "Browse Properties",
      links: [
        { label: "Buy Properties", href: "/" },
        { label: "Rental Properties", href: "/rent" },
        { label: "New Projects", href: "/new-projects" },
        { label: "Commercial", href: "/commercial" },
        { label: "All Properties", href: "/properties" },
      ],
    },
    {
      title: "Agents",
      links: [
        { label: "Find an Agent", href: "/agents" },
        { label: "Our Team", href: "/team" },
        { label: "Agent Directory", href: "/agents" },
      ],
    },
    {
      title: "Account",
      links: [
        { label: "Sign In", href: "/signin" },
        { label: "Register", href: "/register" },
        { label: "My Profile", href: "/profile" },
        { label: "Saved Properties", href: "/saved-properties" },
        { label: "Messages", href: "/messages" },
      ],
    },
    {
      title: "Help & Support",
      links: [
        { label: "Help Center", href: "/help" },
        { label: "FAQ", href: "/faq" },
        { label: "Guides", href: "/guides" },
        { label: "Contact Us", href: "/contact" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Careers", href: "/careers" },
        { label: "Blog", href: "/blog" },
        { label: "Press", href: "/press" },
      ],
    },
    {
      title: "Selling",
      links: [
        { label: "Sell Your Property", href: "/sell" },
        { label: "Daily Deals", href: "/deals" },
        { label: "Pricing", href: "/pricing" },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Site Map</h1>
          <p className="text-lg text-muted-foreground">Browse all pages on Abuja Premier Estates</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sections.map((section, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <h2 className="text-lg font-bold mb-4">{section.title}</h2>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-primary hover:underline text-sm">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
