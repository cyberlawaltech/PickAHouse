import { notFound } from "next/navigation"
import { properties } from "@/lib/data"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PropertyDetails } from "@/components/property-details"
import { FloatingMessenger } from "@/components/floating-messenger"

interface PropertyPageProps {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  return properties.map((property) => ({
    id: property.id,
  }))
}

export async function generateMetadata({ params }: PropertyPageProps) {
  const { id } = await params
  const property = properties.find((p) => p.id === id)

  if (!property) {
    return { title: "Property Not Found" }
  }

  return {
    title: `${property.title} | Abuja Premier Estates`,
    description: property.description,
    openGraph: {
      title: property.title,
      description: property.description,
      images: property.images,
    },
  }
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const { id } = await params
  const property = properties.find((p) => p.id === id)

  if (!property) {
    notFound()
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <PropertyDetails property={property} />
      </main>
      <Footer />
      <FloatingMessenger property={property} />
    </div>
  )
}
