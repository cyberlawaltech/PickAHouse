"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { MessageCircle } from "lucide-react"

export default function AdminMessagesPage() {
  const messages = [
    {
      id: "1",
      from: "Adaeze Okonkwo",
      subject: "Property Inquiry",
      preview: "Is the Maitama property still available?",
      date: "2024-01-15",
      unread: true,
    },
    {
      id: "2",
      from: "John Doe",
      subject: "Viewing Request",
      preview: "Can I schedule a viewing for tomorrow?",
      date: "2024-01-14",
      unread: false,
    },
  ]

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Messages</h1>
          <p className="text-muted-foreground">Manage agent and user messages</p>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              Recent Messages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className="flex items-center gap-4 p-4 border border-border rounded-lg hover:bg-secondary/50 cursor-pointer"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold truncate">{msg.from}</p>
                      {msg.unread && (
                        <Badge variant="default" className="text-xs">
                          New
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm font-medium mb-1">{msg.subject}</p>
                    <p className="text-sm text-muted-foreground truncate">{msg.preview}</p>
                  </div>
                  <div className="text-xs text-muted-foreground shrink-0">{msg.date}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
