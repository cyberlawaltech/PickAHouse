"use client"

import { useState, useEffect } from "react"
import { Sparkles, Send, Mic, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { meilisearch } from "@/lib/meilisearch"
import { properties } from "@/lib/data"
import type { Property } from "@/lib/types"

const suggestions = ["3 bed apartment in Maitama", "Office space in CBD", "Land in Guzape", "Furnished flat in Wuse 2"]

export function AISearchSection() {
  const [query, setQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [results, setResults] = useState<Property[]>([])
  const [isIndexed, setIsIndexed] = useState(false)

  useEffect(() => {
    const initializeSearch = async () => {
      try {
        await meilisearch.indexProperties(properties)
        await meilisearch.configureIndex()
        setIsIndexed(true)
      } catch (error) {
        console.error("[v0] Failed to initialize MeiliSearch:", error)
      }
    }

    if (!isIndexed) {
      initializeSearch()
    }
  }, [isIndexed])

  const handleSearch = async () => {
    if (!query.trim() || !isIndexed) return
    setIsSearching(true)

    try {
      const searchResults = await meilisearch.searchProperties(query)
      setResults(searchResults.slice(0, 10))
    } catch (error) {
      console.error("[v0] Search failed:", error)
      setResults([])
    } finally {
      setIsSearching(false)
    }
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
              <p className="text-xs text-muted-foreground">
                {isIndexed ? "Describe what you're looking for" : "Initializing search..."}
              </p>
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
                disabled={!isIndexed}
              />
              <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8">
                <Mic className="w-4 h-4 text-muted-foreground" />
              </Button>
            </div>
            <Button onClick={handleSearch} disabled={isSearching || !query.trim() || !isIndexed} className="h-11 px-6">
              {isSearching ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="text-xs text-muted-foreground">Try:</span>
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => {
                  setQuery(suggestion)
                }}
                className="text-xs px-2.5 py-1 rounded-full bg-background border border-border hover:border-primary/30 text-muted-foreground hover:text-foreground transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>

          {results.length > 0 && (
            <div className="mt-8 pt-6 border-t border-border">
              <h3 className="font-semibold text-foreground mb-4">
                {results.length} {results.length === 1 ? "Result" : "Results"} Found
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {results.map((property) => (
                  <div
                    key={property.id}
                    className="p-4 rounded-lg border border-border bg-background hover:border-primary/30 transition-colors"
                  >
                    <p className="font-semibold text-foreground line-clamp-2">{property.title}</p>
                    <p className="text-sm text-muted-foreground mt-1">{property.location.address}</p>
                    <p className="text-sm font-semibold text-primary mt-2">₦{property.price.toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
