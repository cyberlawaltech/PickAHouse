"use client"

import { useState } from "react"
import Image from "next/image"
import {
  Plus,
  Search,
  Download,
  MoreHorizontal,
  Eye,
  Pencil,
  Trash2,
  Mail,
  Shield,
  UserCheck,
  UserX,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

const users = [
  {
    id: "1",
    name: "Adaeze Okonkwo",
    email: "adaeze@example.com",
    role: "agent",
    status: "active",
    joined: "2024-01-15",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    name: "Chukwuemeka Ibe",
    email: "chukwuemeka@example.com",
    role: "member",
    status: "active",
    joined: "2024-02-20",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    name: "Fatima Abdullahi",
    email: "fatima@example.com",
    role: "agent",
    status: "active",
    joined: "2024-03-10",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "4",
    name: "Oluwaseun Adeleke",
    email: "oluwaseun@example.com",
    role: "member",
    status: "inactive",
    joined: "2024-01-05",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "5",
    name: "Amina Mohammed",
    email: "amina@example.com",
    role: "admin",
    status: "active",
    joined: "2023-12-01",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "6",
    name: "David Obi",
    email: "david@example.com",
    role: "member",
    status: "active",
    joined: "2024-04-15",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "7",
    name: "Grace Nnamdi",
    email: "grace@example.com",
    role: "agent",
    status: "pending",
    joined: "2024-05-01",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "8",
    name: "Ibrahim Suleiman",
    email: "ibrahim@example.com",
    role: "member",
    status: "active",
    joined: "2024-03-25",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export default function AdminUsersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRole, setSelectedRole] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = selectedRole === "all" || u.role === selectedRole
    const matchesStatus = selectedStatus === "all" || u.status === selectedStatus
    return matchesSearch && matchesRole && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Users</h1>
          <p className="text-muted-foreground">Manage users and permissions</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add User
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <UserCheck className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{users.filter((u) => u.status === "active").length}</p>
              <p className="text-xs text-muted-foreground">Active</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
              <UserX className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{users.filter((u) => u.status === "pending").length}</p>
              <p className="text-xs text-muted-foreground">Pending</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
              <Shield className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{users.filter((u) => u.role === "agent").length}</p>
              <p className="text-xs text-muted-foreground">Agents</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <Mail className="w-5 h-5 text-purple-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{users.length}</p>
              <p className="text-xs text-muted-foreground">Total Users</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger className="w-full sm:w-[150px]">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="agent">Agent</SelectItem>
                <SelectItem value="member">Member</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full sm:w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2 bg-transparent">
              <Download className="w-4 h-4" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Users table */}
      <Card>
        <CardContent className="p-0">
          <div className="table-responsive">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">User</th>
                  <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground hidden md:table-cell">
                    Email
                  </th>
                  <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">Role</th>
                  <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground hidden sm:table-cell">
                    Status
                  </th>
                  <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground hidden lg:table-cell">
                    Joined
                  </th>
                  <th className="text-right py-4 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-muted shrink-0">
                          <Image
                            src={user.avatar || "/placeholder.svg"}
                            alt={user.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-sm">{user.name}</p>
                          <p className="text-xs text-muted-foreground md:hidden">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-muted-foreground hidden md:table-cell">{user.email}</td>
                    <td className="py-4 px-4">
                      <Badge
                        variant="outline"
                        className={cn(
                          "text-xs capitalize",
                          user.role === "admin" && "border-purple-500 text-purple-500",
                          user.role === "agent" && "border-blue-500 text-blue-500",
                          user.role === "member" && "border-gray-500 text-gray-500",
                        )}
                      >
                        {user.role}
                      </Badge>
                    </td>
                    <td className="py-4 px-4 hidden sm:table-cell">
                      <Badge
                        className={cn(
                          "text-xs",
                          user.status === "active" && "bg-green-500/10 text-green-500",
                          user.status === "inactive" && "bg-gray-500/10 text-gray-500",
                          user.status === "pending" && "bg-amber-500/10 text-amber-500",
                        )}
                      >
                        {user.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-4 text-sm text-muted-foreground hidden lg:table-cell">
                      {new Date(user.joined).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="gap-2">
                            <Eye className="w-4 h-4" /> View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <Pencil className="w-4 h-4" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <Mail className="w-4 h-4" /> Send Email
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 text-destructive">
                            <Trash2 className="w-4 h-4" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
