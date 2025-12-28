"use client"

import { ArrowRight, Tag, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function CTASection() {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        {/* eBay-style dual promo cards */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* List your property card */}
          <div className="bg-gradient-to-r from-ebay-blue to-blue-700 rounded-lg p-6 text-white">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <Tag className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">List Your Property</h3>
                <p className="text-white/80 text-sm mb-4">
                  Reach thousands of potential buyers and renters in Abuja. Free listing for 30 days.
                </p>
                <Link href="/sell">
                  <Button variant="secondary" className="bg-white text-primary hover:bg-white/90">
                    Start Selling
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Find an agent card */}
          <div className="bg-gradient-to-r from-ebay-green to-green-700 rounded-lg p-6 text-white">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <Zap className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">Find a Local Agent</h3>
                <p className="text-white/80 text-sm mb-4">
                  Connect with verified real estate agents in your area for personalized assistance.
                </p>
                <Link href="/agents">
                  <Button variant="secondary" className="bg-white text-ebay-green hover:bg-white/90">
                    Browse Agents
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom banner */}
        <div className="mt-4 bg-ebay-yellow/20 border border-ebay-yellow/30 rounded-lg p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">📱</span>
            <div>
              <p className="font-bold text-foreground">Download Our App</p>
              <p className="text-sm text-muted-foreground">Get property alerts on the go</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="bg-transparent">
              App Store
            </Button>
            <Button variant="outline" size="sm" className="bg-transparent">
              Play Store
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
