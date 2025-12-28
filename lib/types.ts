export interface Property {
  id: string
  title: string
  description: string
  price: number
  currency: string
  type: "apartment" | "house" | "commercial" | "land" | "hostel" | "flat"
  status: "for-sale" | "for-rent" | "short-term"
  bedrooms?: number
  bathrooms?: number
  area: number
  areaUnit: string
  location: {
    address: string
    city: string
    state: string
    coordinates?: { lat: number; lng: number }
  }
  features: string[]
  images: string[]
  agent: Agent
  createdAt: string
  featured?: boolean
  views: number
}

export interface Agent {
  id: string
  name: string
  email: string
  phone: string
  whatsapp?: string
  avatar: string
  company?: string
  verified: boolean
}

export interface User {
  id: string
  name: string
  email: string
  phone: string
  avatar: string
  role: "member" | "agent" | "admin"
  createdAt: string
  aiAgents: AIAgent[]
}

export interface AIAgent {
  id: string
  name: string
  type: "search" | "deploy" | "automation" | "assistant"
  status: "active" | "idle"
  tasks: string[]
}

export interface Message {
  id: string
  from: User
  to: User | Agent
  content: string
  channel: "whatsapp" | "email" | "facebook" | "twitter" | "sms"
  createdAt: string
  read: boolean
}
