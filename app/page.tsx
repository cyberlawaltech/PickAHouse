import { Preloader } from "@/components/preloader"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { FeaturedSection } from "@/components/featured-section"
import { CategorySection } from "@/components/category-section"
import { AISearchSection } from "@/components/ai-search-section"
import { PropertyGrid } from "@/components/property-grid"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"
import { FloatingAIButton } from "@/components/floating-ai-button"
import { properties } from "@/lib/data"

export default function HomePage() {
  return (
    <>
      <Preloader />
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Hero />
          <FeaturedSection properties={properties} />
          <CategorySection />
          <AISearchSection />
          <PropertyGrid properties={properties} title="Latest Properties" showFilters={true} />
          <CTASection />
        </main>
        <Footer />
        <FloatingAIButton />
      </div>
    </>
  )
}
