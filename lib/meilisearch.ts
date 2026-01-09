// MeiliSearch client utility for AI-powered property search
import type { Property } from "./types"

interface MeiliSearchConfig {
  host: string
  apiKey: string
}

export class MeiliSearchClient {
  private config: MeiliSearchConfig

  constructor(config?: Partial<MeiliSearchConfig>) {
    this.config = {
      host: config?.host || process.env.NEXT_PUBLIC_MEILISEARCH_HOST || "http://localhost:7700",
      apiKey: config?.apiKey || process.env.MEILISEARCH_API_KEY || "",
    }
  }

  // Index properties for full-text and AI search
  async indexProperties(properties: Property[]): Promise<void> {
    try {
      const response = await fetch(`${this.config.host}/indexes/properties/documents`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.config.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(properties),
      })

      if (!response.ok) {
        console.error("[v0] Failed to index properties:", response.statusText)
      }
    } catch (error) {
      console.error("[v0] MeiliSearch indexing error:", error)
    }
  }

  // Search with semantic understanding
  async searchProperties(query: string, filters?: Record<string, unknown>): Promise<Property[]> {
    try {
      const searchParams = new URLSearchParams({
        q: query,
        limit: "20",
      })

      if (filters) {
        const filterQueries = Object.entries(filters)
          .map(([key, value]) => {
            if (Array.isArray(value)) {
              return `${key} IN [${value.map((v) => `"${v}"`).join(",")}]`
            }
            return `${key} = "${value}"`
          })
          .join(" AND ")

        if (filterQueries) {
          searchParams.append("filter", filterQueries)
        }
      }

      const response = await fetch(`${this.config.host}/indexes/properties/search?${searchParams}`, {
        headers: {
          Authorization: `Bearer ${this.config.apiKey}`,
        },
      })

      if (!response.ok) {
        console.error("[v0] Search failed:", response.statusText)
        return []
      }

      const data = await response.json()
      return data.hits || []
    } catch (error) {
      console.error("[v0] MeiliSearch search error:", error)
      return []
    }
  }

  // Configure searchable attributes
  async configureIndex(): Promise<void> {
    try {
      await fetch(`${this.config.host}/indexes/properties/settings/searchable-attributes`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${this.config.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify([
          "title",
          "description",
          "location.address",
          "location.city",
          "features",
          "type",
          "bedrooms",
          "bathrooms",
        ]),
      })
    } catch (error) {
      console.error("[v0] Failed to configure index:", error)
    }
  }
}

export const meilisearch = new MeiliSearchClient()
