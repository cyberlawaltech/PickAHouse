export interface AuthUser {
  id: string
  name: string
  email: string
  phone: string
  avatar: string
  role: "member" | "agent" | "admin"
  createdAt: string
}

// Simulate user database
const users: Record<string, { email: string; password: string; user: AuthUser }> = {
  "admin@abujapremier.com": {
    email: "admin@abujapremier.com",
    password: "admin123", // Demo only
    user: {
      id: "admin-1",
      name: "Admin User",
      email: "admin@abujapremier.com",
      phone: "+234 803 000 0000",
      avatar: "/admin-avatar.jpg",
      role: "admin",
      createdAt: new Date().toISOString(),
    },
  },
  "user@example.com": {
    email: "user@example.com",
    password: "user123",
    user: {
      id: "user-1",
      name: "John Doe",
      email: "user@example.com",
      phone: "+234 803 123 4567",
      avatar: "/user-avatar.jpg",
      role: "member",
      createdAt: new Date().toISOString(),
    },
  },
}

export function register(email: string, password: string, name: string, phone: string): AuthUser | null {
  if (users[email]) {
    return null // User already exists
  }

  const newUser: AuthUser = {
    id: `user-${Date.now()}`,
    name,
    email,
    phone,
    avatar: "/default-avatar.jpg",
    role: "member",
    createdAt: new Date().toISOString(),
  }

  users[email] = { email, password, user: newUser }
  return newUser
}

export function login(email: string, password: string): AuthUser | null {
  const user = users[email]
  if (!user || user.password !== password) {
    return null
  }
  return user.user
}

export function getCurrentUser(): AuthUser | null {
  if (typeof window === "undefined") return null
  const stored = localStorage.getItem("currentUser")
  return stored ? JSON.parse(stored) : null
}

export function setCurrentUser(user: AuthUser | null): void {
  if (typeof window === "undefined") return
  if (user) {
    localStorage.setItem("currentUser", JSON.stringify(user))
  } else {
    localStorage.removeItem("currentUser")
  }
}

export function logout(): void {
  setCurrentUser(null)
}
