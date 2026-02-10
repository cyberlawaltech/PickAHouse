# PickAHouse - Detailed Implementation & Deployment Guide

## Quick Reference

**Document**: Complete Implementation Roadmap  
**Version**: 1.0.0  
**Audience**: Development Team, DevOps, Project Managers  
**Last Updated**: February 10, 2026

---

## Table of Contents

1. [Development Environment Setup](#development-environment-setup)
2. [Backend Implementation Guide](#backend-implementation-guide)
3. [Frontend Integration Steps](#frontend-integration-steps)
4. [Database Design & Migration](#database-design--migration)
5. [API Specification Details](#api-specification-details)
6. [Authentication Implementation](#authentication-implementation)
7. [Testing Strategy](#testing-strategy)
8. [CI/CD Pipeline Setup](#cicd-pipeline-setup)
9. [Deployment Procedures](#deployment-procedures)
10. [Monitoring & Maintenance](#monitoring--maintenance)
11. [Troubleshooting Guide](#troubleshooting-guide)

---

## Development Environment Setup

### Prerequisites

```bash
# Node.js (v18+)
node --version  # v18.0.0 or higher

# PNPM (v8+)
pnpm --version

# PostgreSQL (v14+)
psql --version

# Git
git --version

# Docker (optional but recommended)
docker --version
docker-compose --version
```

### Local Development Setup

#### 1. Clone Repository
```bash
git clone https://github.com/yourusername/pickahouse.git
cd pickahouse
```

#### 2. Install Dependencies
```bash
# Frontend
pnpm install

# Backend (if separate)
cd backend
pnpm install
cd ..
```

#### 3. Set Up Database

```bash
# Create database
createdb pickahouse_dev

# Or using Docker
docker run -d \
  --name pickahouse-postgres \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=pickahouse_dev \
  -p 5432:5432 \
  postgres:15

# Verify connection
psql -U postgres -d pickahouse_dev -c "SELECT version();"
```

#### 4. Environment Configuration

```bash
# Create .env.local
cp .env.example .env.local

# Edit with your values
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:3001
DATABASE_URL=postgresql://postgres:password@localhost:5432/pickahouse_dev
JWT_SECRET=your_super_secret_key_change_in_production
NODE_ENV=development
```

#### 5. Initialize Database

```bash
# Using Prisma
npx prisma migrate dev --name init

# Seed with sample data
npx prisma db seed
```

#### 6. Start Development Servers

```bash
# Terminal 1: Frontend (Next.js)
pnpm dev

# Terminal 2: Backend (Express)
cd backend && npm run dev

# Terminal 3: Database (if using Docker)
# Already running in container
```

#### 7. Verify Setup

```bash
# Frontend: http://localhost:3000
curl http://localhost:3000

# Backend API: http://localhost:3001/api/health
curl http://localhost:3001/api/health

# Database
psql -U postgres -d pickahouse_dev -c "\dt"
```

---

## Backend Implementation Guide

### Project Structure

```
backend/
├── src/
│   ├── index.ts                    # Entry point
│   ├── app.ts                      # Express app setup
│   ├── config/
│   │   ├── database.ts             # Database connection
│   │   ├── environment.ts          # Environment variables
│   │   └── logger.ts               # Logging setup
│   ├── middleware/
│   │   ├── auth.ts                 # Authentication middleware
│   │   ├── errorHandler.ts         # Error handling
│   │   ├── validation.ts           # Input validation
│   │   ├── cors.ts                 # CORS configuration
│   │   └── rateLimit.ts            # Rate limiting
│   ├── routes/
│   │   ├── auth.ts                 # Authentication routes
│   │   ├── properties.ts           # Property routes
│   │   ├── users.ts                # User routes
│   │   ├── agents.ts               # Agent routes
│   │   ├── inquiries.ts            # Inquiry routes
│   │   ├── messages.ts             # Message routes
│   │   └── admin.ts                # Admin routes
│   ├── controllers/
│   │   ├── authController.ts       # Auth logic
│   │   ├── propertyController.ts   # Property logic
│   │   ├── userController.ts       # User logic
│   │   └── ...
│   ├── services/
│   │   ├── authService.ts          # Auth business logic
│   │   ├── propertyService.ts      # Property business logic
│   │   ├── emailService.ts         # Email sending
│   │   └── ...
│   ├── models/
│   │   ├── User.ts                 # Prisma schema (separate)
│   │   ├── Property.ts
│   │   └── ...
│   ├── utils/
│   │   ├── validators.ts           # Zod schemas
│   │   ├── jwt.ts                  # JWT utilities
│   │   ├── hash.ts                 # Password hashing
│   │   └── errors.ts               # Custom errors
│   └── types/
│       ├── express.d.ts            # Express type extensions
│       └── index.ts                # TypeScript types
├── prisma/
│   ├── schema.prisma               # Database schema
│   ├── migrations/                 # Migration files
│   └── seed.ts                     # Seed script
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── .env.example                    # Environment template
├── .eslintrc.json                  # ESLint config
├── tsconfig.json                   # TypeScript config
├── jest.config.js                  # Jest config
├── docker-compose.yml              # Docker configuration
└── package.json
```

### Step-by-Step Backend Implementation

#### Step 1: Initialize Express Project

```bash
mkdir backend
cd backend
npm init -y

# Install dependencies
npm install express typescript @types/express dotenv cors helmet express-rate-limit
npm install -D ts-node @types/node nodemon
```

#### Step 2: Set Up TypeScript & Basics

```typescript
// backend/src/index.ts
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import { config } from 'dotenv'

config()

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(helmet())
app.use(cors())
app.use(express.json())

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
})

app.use('/api/', limiter)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
```

#### Step 3: Set Up Prisma & Database

```bash
# Install Prisma
npm install @prisma/client
npm install -D prisma

# Initialize Prisma
npx prisma init
```

```prisma
// prisma/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String
  phone         String?
  passwordHash  String
  avatar        String?
  role          Role      @default(MEMBER)
  isVerified    Boolean   @default(false)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  properties    Property[]
  inquiries     Inquiry[]
  messages      Message[]
  favorites     Favorite[]
  
  @@map("users")
}

enum Role {
  MEMBER
  AGENT
  ADMIN
}

model Property {
  id            String    @id @default(cuid())
  title         String
  description   String
  price         Int
  currency      String    @default("NGN")
  type          PropertyType
  status        PropertyStatus @default(FOR_SALE)
  bedrooms      Int?
  bathrooms     Int?
  area          Int
  areaUnit      String    @default("sqm")
  address       String
  city          String
  state         String
  latitude      Float?
  longitude     Float?
  features      String[]
  images        String[]
  agentId       String
  agent         User      @relation(fields: [agentId], references: [id])
  views         Int       @default(0)
  featured      Boolean   @default(false)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  inquiries     Inquiry[]
  favorites     Favorite[]
  
  @@index([agentId])
  @@index([type, status])
  @@index([city])
  @@map("properties")
}

enum PropertyType {
  APARTMENT
  HOUSE
  COMMERCIAL
  LAND
  HOSTEL
  FLAT
}

enum PropertyStatus {
  FOR_SALE
  FOR_RENT
  SHORT_TERM
}

model Inquiry {
  id            String    @id @default(cuid())
  message       String
  phone         String
  preferredContactMethod String
  propertyId    String
  property      Property  @relation(fields: [propertyId], references: [id], onDelete: Cascade)
  userId        String?
  user          User?     @relation(fields: [userId], references: [id], onDelete: SetNull)
  status        InquiryStatus @default(PENDING)
  createdAt     DateTime  @default(now())
  
  @@index([propertyId])
  @@index([userId])
  @@map("inquiries")
}

enum InquiryStatus {
  PENDING
  CONTACTED
  VIEWING
  SOLD
  REJECTED
}

model Message {
  id            String    @id @default(cuid())
  content       String
  channel       String    @default("email")
  fromId        String
  from          User      @relation(fields: [fromId], references: [id], onDelete: Cascade)
  toId          String?
  to            User?     @relation(fields: [toId], references: [id], onDelete: SetNull)
  isRead        Boolean   @default(false)
  createdAt     DateTime  @default(now())
  
  @@index([fromId])
  @@index([toId])
  @@map("messages")
}

model Favorite {
  id            String    @id @default(cuid())
  userId        String
  user          User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  propertyId    String
  property      Property  @relation(fields: [propertyId], references: [id], onDelete: Cascade)
  createdAt     DateTime  @default(now())
  
  @@unique([userId, propertyId])
  @@index([userId])
  @@map("favorites")
}
```

#### Step 4: Authentication Implementation

```typescript
// backend/src/utils/auth.ts
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const SALT_ROUNDS = 10
const JWT_SECRET = process.env.JWT_SECRET || 'change_me'

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS)
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

export function generateToken(userId: string): string {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' })
}

export function verifyToken(token: string): any {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (error) {
    return null
  }
}
```

```typescript
// backend/src/middleware/auth.ts
import { Request, Response, NextFunction } from 'express'
import { verifyToken } from '../utils/auth'

export interface AuthRequest extends Request {
  userId?: string
  user?: any
}

export function authentication(req: AuthRequest, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(' ')[1]
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' })
  }
  
  const decoded = verifyToken(token)
  if (!decoded) {
    return res.status(401).json({ error: 'Invalid token' })
  }
  
  req.userId = decoded.userId
  next()
}

export function authorize(roles: string[]) {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    // Fetch user from DB and check role
    next()
  }
}
```

#### Step 5: Create API Routes

```typescript
// backend/src/routes/auth.ts
import { Router, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { hashPassword, verifyPassword, generateToken } from '../utils/auth'
import { z } from 'zod'

const router = Router()
const prisma = new PrismaClient()

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(2),
  phone: z.string().optional(),
})

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

// Register
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { email, password, name, phone } = registerSchema.parse(req.body)
    
    // Check if user exists
    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' })
    }
    
    // Hash password
    const passwordHash = await hashPassword(password)
    
    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        name,
        phone,
        passwordHash,
      },
    })
    
    const token = generateToken(user.id)
    
    res.status(201).json({
      success: true,
      data: {
        userId: user.id,
        email: user.email,
        token,
      },
    })
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
})

// Login
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = loginSchema.parse(req.body)
    
    // Find user
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }
    
    // Verify password
    const isValid = await verifyPassword(password, user.passwordHash)
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }
    
    const token = generateToken(user.id)
    
    res.json({
      success: true,
      data: {
        userId: user.id,
        email: user.email,
        token,
      },
    })
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
})

export default router
```

---

## Frontend Integration Steps

### Step 1: Create API Client

```typescript
// lib/api.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
}

class ApiClient {
  private token: string | null = null

  constructor() {
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('auth_token')
    }
  }

  setToken(token: string) {
    this.token = token
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token)
    }
  }

  getToken() {
    return this.token
  }

  private getHeaders(): HeadersInit {
    return {
      'Content-Type': 'application/json',
      ...(this.token && { Authorization: `Bearer ${this.token}` }),
    }
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'GET',
      headers: this.getHeaders(),
    })
    return response.json()
  }

  async post<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    })
    return response.json()
  }

  async put<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    })
    return response.json()
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    })
    return response.json()
  }
}

export const apiClient = new ApiClient()
```

### Step 2: Create Auth Store

```typescript
// lib/store/authStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { apiClient } from '../api'

interface AuthState {
  user: any | null
  isAuthenticated: boolean
  isLoading: boolean
  register: (email: string, password: string, name: string) => Promise<void>
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  checkAuth: () => Promise<void>
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      register: async (email, password, name) => {
        set({ isLoading: true })
        try {
          const response = await apiClient.post('/api/auth/register', {
            email,
            password,
            name,
          })
          if (response.success && response.data?.token) {
            apiClient.setToken(response.data.token)
            set({ user: response.data, isAuthenticated: true })
          }
        } finally {
          set({ isLoading: false })
        }
      },

      login: async (email, password) => {
        set({ isLoading: true })
        try {
          const response = await apiClient.post('/api/auth/login', {
            email,
            password,
          })
          if (response.success && response.data?.token) {
            apiClient.setToken(response.data.token)
            set({ user: response.data, isAuthenticated: true })
          }
        } finally {
          set({ isLoading: false })
        }
      },

      logout: () => {
        apiClient.setToken('')
        set({ user: null, isAuthenticated: false })
      },

      checkAuth: async () => {
        const token = apiClient.getToken()
        if (token) {
          set({ isAuthenticated: true })
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ isAuthenticated: state.isAuthenticated }),
    }
  )
)
```

### Step 3: Update Components to Use API

```typescript
// app/admin/properties/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { apiClient } from '@/lib/api'

interface Property {
  id: string
  title: string
  price: number
  type: string
  // ... other fields
}

export default function AdminPropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchProperties()
  }, [])

  async function fetchProperties() {
    try {
      setIsLoading(true)
      const response = await apiClient.get<Property[]>('/api/properties')
      if (response.success && response.data) {
        setProperties(response.data)
      } else {
        setError(response.error || 'Failed to fetch properties')
      }
    } catch (err) {
      setError('An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      {properties.map((prop) => (
        <div key={prop.id}>
          <h3>{prop.title}</h3>
          <p>{prop.price}</p>
        </div>
      ))}
    </div>
  )
}
```

---

## Database Design & Migration

### Database Schema Overview

```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  password_hash VARCHAR(255) NOT NULL,
  avatar VARCHAR(255),
  role VARCHAR(50) DEFAULT 'MEMBER',
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);

-- Properties table
CREATE TABLE properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  price INTEGER NOT NULL,
  currency VARCHAR(10) DEFAULT 'NGN',
  type VARCHAR(50) NOT NULL,
  status VARCHAR(50) DEFAULT 'FOR_SALE',
  bedrooms INTEGER,
  bathrooms INTEGER,
  area INTEGER,
  area_unit VARCHAR(10) DEFAULT 'sqm',
  address VARCHAR(255),
  city VARCHAR(100),
  state VARCHAR(100),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  features TEXT[],
  images VARCHAR(255)[],
  agent_id UUID NOT NULL REFERENCES users(id),
  views INTEGER DEFAULT 0,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_properties_agent ON properties(agent_id);
CREATE INDEX idx_properties_type_status ON properties(type, status);
CREATE INDEX idx_properties_city ON properties(city);

-- Inquiries table
CREATE TABLE inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  message TEXT,
  phone VARCHAR(20),
  preferred_contact_method VARCHAR(50),
  property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  status VARCHAR(50) DEFAULT 'PENDING',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_inquiries_property ON inquiries(property_id);
CREATE INDEX idx_inquiries_user ON inquiries(user_id);

-- Favorites table
CREATE TABLE favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, property_id)
);

CREATE INDEX idx_favorites_user ON favorites(user_id);

-- Messages table
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content TEXT NOT NULL,
  channel VARCHAR(50) DEFAULT 'email',
  from_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  to_id UUID REFERENCES users(id) ON DELETE SET NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_messages_from ON messages(from_id);
CREATE INDEX idx_messages_to ON messages(to_id);
```

### Prisma Migrations

```bash
# Generate migration
npx prisma migrate dev --name create_initial_schema

# Apply migrations
npx prisma migrate deploy

# Seed database
npx ts-node prisma/seed.ts
```

---

## API Specification Details

### Properties API

#### List Properties
```
GET /api/properties?type=apartment&city=Maitama&minPrice=100000000&maxPrice=500000000&limit=20&page=1

Response:
{
  "success": true,
  "data": {
    "properties": [...],
    "pagination": {
      "total": 45,
      "page": 1,
      "limit": 20,
      "pages": 3
    }
  }
}
```

#### Get Single Property
```
GET /api/properties/:id

Response:
{
  "success": true,
  "data": {
    "id": "prop_123",
    "title": "Luxury Villa",
    "price": 850000000,
    "bedrooms": 5,
    "bathrooms": 6,
    "agent": { ... },
    "images": [...],
    "features": [...]
  }
}
```

#### Create Property (Agent)
```
POST /api/properties
Authorization: Bearer {token}

Request:
{
  "title": "Modern 3BR Apartment",
  "price": 180000000,
  "type": "apartment",
  "bedrooms": 3,
  "bathrooms": 2,
  "area": 150,
  "address": "Jabi",
  "city": "Jabi",
  "features": ["Pool", "Gym"],
  "images": ["url1", "url2"]
}

Response: { "success": true, "data": {...} }
```

---

## Authentication Implementation

### JWT Flow

```
1. User registers/logs in
   ↓
2. Server returns JWT token
   ↓
3. Client stores token in localStorage
   ↓
4. Client includes token in Authorization header
   ↓
5. Server validates token on protected routes
   ↓
6. Grant access or return 401
```

### Token Structure

```typescript
{
  userId: "user_123",
  iat: 1707547200,      // issued at
  exp: 1708152000       // expires in 7 days
}
```

---

## Testing Strategy

### Unit Tests

```typescript
// __tests__/utils/auth.test.ts
import { hashPassword, verifyPassword } from '@/utils/auth'

describe('Auth Utils', () => {
  it('should hash password', async () => {
    const password = 'mypassword123'
    const hash = await hashPassword(password)
    expect(hash).not.toBe(password)
  })

  it('should verify password', async () => {
    const password = 'mypassword123'
    const hash = await hashPassword(password)
    const isValid = await verifyPassword(password, hash)
    expect(isValid).toBe(true)
  })
})
```

### Integration Tests

```typescript
// __tests__/api/auth.test.ts
import request from 'supertest'
import app from '@/app'

describe('Auth API', () => {
  it('should register user', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
      })

    expect(response.status).toBe(201)
    expect(response.body.success).toBe(true)
    expect(response.body.data.token).toBeDefined()
  })
})
```

### E2E Tests

```typescript
// e2e/auth.spec.ts
import { test, expect } from '@playwright/test'

test('should register and login user', async ({ page }) => {
  // Go to register page
  await page.goto('/register')

  // Fill form
  await page.fill('input[name="email"]', 'user@example.com')
  await page.fill('input[name="password"]', 'password123')
  await page.fill('input[name="name"]', 'Test User')

  // Submit
  await page.click('button:has-text("Register")')

  // Should redirect to home
  await expect(page).toHaveURL('/')
})
```

---

## CI/CD Pipeline Setup

### GitHub Actions Workflow

```yaml
# .github/workflows/ci.yml
name: CI/CD

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  test:
    runs-on: ubuntu-latest

    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: password
          POSTGRES_DB: pickahouse_test
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 5432:5432

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: pnpm install

      - name: Lint
        run: pnpm lint

      - name: Type check
        run: pnpm type-check

      - name: Run tests
        run: pnpm test
        env:
          DATABASE_URL: postgresql://postgres:password@localhost:5432/pickahouse_test

      - name: Upload coverage
        uses: codecov/codecov-action@v3

  deploy:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Deploy to production
        run: |
          # Add your deployment commands here
          echo "Deploying to production..."
```

---

## Deployment Procedures

### Vercel Deployment (Recommended)

```bash
# Connect repository
vercel link

# Deploy
vercel deploy --prod

# Set environment variables
vercel env add NEXT_PUBLIC_API_URL
vercel env add DATABASE_URL
vercel env add JWT_SECRET
```

### Docker Deployment

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

```yaml
# docker-compose.yml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgresql://user:password@db:5432/pickahouse
      JWT_SECRET: secret
    depends_on:
      - db

  db:
    image: postgres:15
    environment:
      POSTGRES_PASSWORD: password
      POSTGRES_DB: pickahouse
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

volumes:
  postgres_data:
```

---

## Monitoring & Maintenance

### Application Monitoring

```typescript
// Configure Sentry for error tracking
import * as Sentry from "@sentry/nextjs"

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  integrations: [
    new Sentry.Replay({
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],
})
```

### Log Management

```typescript
// Configure Winston logger
import winston from 'winston'

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
})
```

---

## Troubleshooting Guide

### Common Issues

**Issue**: Database connection refused
```
Solution:
1. Check PostgreSQL is running
2. Verify DATABASE_URL is correct
3. Check credentials
4. Verify database exists
```

**Issue**: 401 Unauthorized on protected routes
```
Solution:
1. Verify token is being sent
2. Check JWT_SECRET is same on backend
3. Verify token hasn't expired
4. Check bearer token format
```

**Issue**: CORS errors
```
Solution:
1. Verify CORS middleware is configured
2. Check allowed origins
3. Verify credentials header is sent
```

---

**End of Implementation Guide**
