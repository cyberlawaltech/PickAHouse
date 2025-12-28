import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PropertyGrid } from "@/components/property-grid"
import { FloatingAIButton } from "@/components/floating-ai-button"
import { properties } from "@/lib/data"

export const metadata = {
  title: "Properties | Abuja Premier Estates",
  description:
    "Browse all available properties in Abuja, Nigeria. Luxury apartments, houses, commercial properties, and land.",
}

export default function PropertiesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-foreground mb-2">All Properties</h1>
            <p className="text-muted-foreground">Discover your perfect property in Abuja, Nigeria</p>
          </div>
        </div>
        <PropertyGrid properties={properties} showFilters={true} title="" />
      </main>
      <Footer />
      <FloatingAIButton />
    </div>
  )
}
