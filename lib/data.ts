import type { Property, Agent } from "./types"

export const agents: Agent[] = [
  {
    id: "1",
    name: "Adaeze Okonkwo",
    email: "adaeze@abujapremier.com",
    phone: "+234 803 456 7890",
    whatsapp: "+2348034567890",
    avatar: "/professional-african-woman-real-estate-agent.jpg",
    company: "Abuja Premier Estates",
    verified: true,
  },
  {
    id: "2",
    name: "Chukwuemeka Ibe",
    email: "chukwuemeka@abujapremier.com",
    phone: "+234 806 789 0123",
    whatsapp: "+2348067890123",
    avatar: "/professional-african-man-real-estate-agent.jpg",
    company: "Abuja Premier Estates",
    verified: true,
  },
  {
    id: "3",
    name: "Fatima Abdullahi",
    email: "fatima@abujapremier.com",
    phone: "+234 809 012 3456",
    whatsapp: "+2348090123456",
    avatar: "/professional-african-woman-hijab-real-estate-agent.jpg",
    company: "Abuja Premier Estates",
    verified: true,
  },
]

export const properties: Property[] = [
  {
    id: "1",
    title: "Luxury 5-Bedroom Mansion with Pool",
    description:
      "An exquisite mansion in the heart of Maitama, featuring Italian marble floors, smart home technology, private swimming pool, landscaped gardens, and 24/7 security. Perfect for diplomats and executives seeking the finest living experience in Abuja.",
    price: 850000000,
    currency: "NGN",
    type: "house",
    status: "for-sale",
    bedrooms: 5,
    bathrooms: 6,
    area: 1200,
    areaUnit: "sqm",
    location: {
      address: "15 Aguiyi Ironsi Street",
      city: "Maitama",
      state: "Abuja FCT",
      coordinates: { lat: 9.0765, lng: 7.4919 },
    },
    features: ["Swimming Pool", "Smart Home", "Security", "Garden", "Garage", "BQ", "Gym"],
    images: [
      "/luxury-mansion-exterior-abuja-nigeria.jpg",
      "/luxury-mansion-living-room-modern-interior.jpg",
      "/luxury-mansion-swimming-pool-garden.jpg",
      "/luxury-mansion-master-bedroom-suite.jpg",
    ],
    agent: agents[0],
    createdAt: "2024-01-15",
    featured: true,
    views: 1247,
  },
  {
    id: "2",
    title: "Modern 3-Bedroom Apartment in Jabi",
    description:
      "Contemporary apartment with stunning city views, open-plan living, fitted kitchen, and premium finishes. Located in a secure estate with recreational facilities.",
    price: 180000000,
    currency: "NGN",
    type: "apartment",
    status: "for-sale",
    bedrooms: 3,
    bathrooms: 4,
    area: 250,
    areaUnit: "sqm",
    location: {
      address: "Jabi Lake Towers",
      city: "Jabi",
      state: "Abuja FCT",
      coordinates: { lat: 9.0444, lng: 7.4167 },
    },
    features: ["Lake View", "Gym", "Swimming Pool", "Concierge", "Parking", "Generator"],
    images: [
      "/modern-apartment-building-abuja-nigeria.jpg",
      "/modern-apartment-living-room-city-view.jpg",
      "/modern-kitchen-white-cabinets.jpg",
      "/modern-bedroom-minimalist-design.jpg",
    ],
    agent: agents[1],
    createdAt: "2024-01-20",
    featured: true,
    views: 892,
  },
  {
    id: "3",
    title: "Commercial Office Space - Central Business District",
    description:
      "Premium Grade A office space in the CBD. Open floor plan suitable for corporate headquarters, law firms, or financial institutions. High-speed elevators and backup power.",
    price: 15000000,
    currency: "NGN",
    type: "commercial",
    status: "for-rent",
    area: 500,
    areaUnit: "sqm",
    location: {
      address: "Central Business District",
      city: "CBD",
      state: "Abuja FCT",
      coordinates: { lat: 9.0579, lng: 7.4951 },
    },
    features: ["24/7 Power", "High-speed Internet", "Elevator", "Security", "Parking", "Conference Room"],
    images: [
      "/modern-office-building-exterior-glass.jpg",
      "/modern-office-interior-open-plan.jpg",
      "/office-conference-room-modern.jpg",
      "/office-reception-area-professional.jpg",
    ],
    agent: agents[2],
    createdAt: "2024-02-01",
    featured: false,
    views: 456,
  },
  {
    id: "4",
    title: "Prime Land - Guzape District",
    description:
      "Strategic plot of land in the prestigious Guzape district. Ideal for residential development. All infrastructure in place including roads, drainage, and utilities.",
    price: 450000000,
    currency: "NGN",
    type: "land",
    status: "for-sale",
    area: 2000,
    areaUnit: "sqm",
    location: {
      address: "Guzape District",
      city: "Guzape",
      state: "Abuja FCT",
      coordinates: { lat: 9.0298, lng: 7.5156 },
    },
    features: ["Corner Plot", "C of O", "Tarred Road", "Electricity", "Water"],
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    agent: agents[0],
    createdAt: "2024-02-10",
    featured: true,
    views: 623,
  },
  {
    id: "5",
    title: "Serviced 2-Bedroom Flat - Wuse 2",
    description:
      "Fully furnished and serviced flat with daily housekeeping. Perfect for business travelers and expatriates. Walking distance to restaurants and shopping.",
    price: 500000,
    currency: "NGN",
    type: "flat",
    status: "short-term",
    bedrooms: 2,
    bathrooms: 2,
    area: 120,
    areaUnit: "sqm",
    location: {
      address: "Plot 123, Aminu Kano Crescent",
      city: "Wuse 2",
      state: "Abuja FCT",
      coordinates: { lat: 9.0689, lng: 7.4745 },
    },
    features: ["Furnished", "Housekeeping", "WiFi", "Generator", "Security", "Parking"],
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    agent: agents[1],
    createdAt: "2024-02-15",
    featured: false,
    views: 334,
  },
  {
    id: "6",
    title: "Student Hostel - Near University",
    description:
      "Well-maintained hostel accommodation near the University of Abuja. Single and shared rooms available. 24-hour security and reading room facilities.",
    price: 350000,
    currency: "NGN",
    type: "hostel",
    status: "for-rent",
    area: 25,
    areaUnit: "sqm",
    location: {
      address: "Near University of Abuja",
      city: "Gwagwalada",
      state: "Abuja FCT",
      coordinates: { lat: 8.9433, lng: 7.0833 },
    },
    features: ["Security", "Reading Room", "Water", "Electricity", "Laundry"],
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    agent: agents[2],
    createdAt: "2024-02-20",
    featured: false,
    views: 289,
  },
  {
    id: "7",
    title: "4-Bedroom Terrace Duplex - Life Camp",
    description:
      "Elegant terrace duplex in a gated estate. Features include a spacious living area, modern kitchen, all rooms en-suite, and a private garden.",
    price: 95000000,
    currency: "NGN",
    type: "house",
    status: "for-sale",
    bedrooms: 4,
    bathrooms: 5,
    area: 300,
    areaUnit: "sqm",
    location: {
      address: "Dape Life Camp",
      city: "Life Camp",
      state: "Abuja FCT",
      coordinates: { lat: 9.0941, lng: 7.3839 },
    },
    features: ["Gated Estate", "Garden", "All Rooms En-suite", "Security", "Parking"],
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    agent: agents[0],
    createdAt: "2024-02-25",
    featured: true,
    views: 567,
  },
  {
    id: "8",
    title: "Penthouse Apartment - Asokoro",
    description:
      "Exclusive penthouse with panoramic views of Abuja. Features include private elevator access, rooftop terrace, and world-class amenities.",
    price: 650000000,
    currency: "NGN",
    type: "apartment",
    status: "for-sale",
    bedrooms: 4,
    bathrooms: 5,
    area: 450,
    areaUnit: "sqm",
    location: {
      address: "Asokoro Extension",
      city: "Asokoro",
      state: "Abuja FCT",
      coordinates: { lat: 9.0333, lng: 7.5333 },
    },
    features: ["Private Elevator", "Rooftop Terrace", "Smart Home", "Concierge", "Wine Cellar", "Home Cinema"],
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    agent: agents[1],
    createdAt: "2024-03-01",
    featured: true,
    views: 1089,
  },
]

export function formatPrice(price: number, currency = "NGN"): string {
  if (currency === "NGN") {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
      .format(price)
      .replace("NGN", "₦")
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
  }).format(price)
}

export function getPropertyTypeLabel(type: Property["type"]): string {
  const labels: Record<Property["type"], string> = {
    apartment: "Apartment",
    house: "House",
    commercial: "Commercial",
    land: "Land",
    hostel: "Hostel",
    flat: "Flat",
  }
  return labels[type]
}

export function getStatusLabel(status: Property["status"]): string {
  const labels: Record<Property["status"], string> = {
    "for-sale": "For Sale",
    "for-rent": "For Rent",
    "short-term": "Short Term",
  }
  return labels[status]
}
