"use client"

import { useState } from "react"
import { Sparkles, Send, Mic, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const suggestions = ["3 bed apartment in Maitama", "Office space in CBD", "Land in Guzape", "Furnished flat in Wuse 2"]

export function AISearchSection() {
  const [query, setQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = async () => {
    if (!query.trim()) return
    setIsSearching(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSearching(false)
  }

  return (
    <section className="py-8 bg-secondary/50 border-y border-border">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-ebay-yellow flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-foreground" />
            </div>
            <div>
              <h2 className="font-bold text-foreground">AI Property Search</h2>
              <p className="text-xs text-muted-foreground">Describe what you&apos;re looking for</p>
            </div>
          </div>

          <div className="flex gap-2 mb-4">
            <div className="relative flex-1">
              <Input
                placeholder="e.g., '4 bedroom house with pool in Asokoro'"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="h-11 pr-10"
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8">
                <Mic className="w-4 h-4 text-muted-foreground" />
              </Button>
            </div>
            <Button onClick={handleSearch} disabled={isSearching || !query.trim()} className="h-11 px-6">
              {isSearching ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="text-xs text-muted-foreground">Try:</span>
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => setQuery(suggestion)}
                className="text-xs px-2.5 py-1 rounded-full bg-background border border-border hover:border-primary/30 text-muted-foreground hover:text-foreground transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
