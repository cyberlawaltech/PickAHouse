"use client"

import { use } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getAgent } from "@/lib/agents"
import { AgentChat } from "@/components/agent-chat"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Home, TrendingUp, Handshake, FileText, MessageCircle, Wallet } from "lucide-react"

const iconMap = {
  Home,
  TrendingUp,
  Handshake,
  FileText,
  MessageCircle,
  Wallet,
}

export default function AgentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const agent = getAgent(id as any)

  if (!agent) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Agent not found</p>
        </main>
        <Footer />
      </div>
    )
  }

  const IconComponent = iconMap[agent.icon as keyof typeof iconMap]

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            {IconComponent && (
              <div
                className="w-16 h-16 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: agent.color + "20" }}
              >
                <IconComponent className="w-8 h-8" style={{ color: agent.color }} />
              </div>
            )}
            <div>
              <h1 className="text-3xl font-bold">{agent.name}</h1>
              <p className="text-muted-foreground text-lg">{agent.description}</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="border-2">
              <CardContent className="p-8 min-h-[600px]">
                <AgentChat agent={agent} />
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold mb-4">Model Configuration</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-muted-foreground">Model</p>
                    <p className="font-medium font-mono">{agent.model}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Temperature</p>
                    <p className="font-medium">{agent.temperature}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold mb-4">Capabilities</h3>
                <div className="flex flex-wrap gap-2">
                  {agent.capabilities.map((cap) => (
                    <Badge key={cap} variant="secondary">
                      {cap}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold mb-4">Available Tasks</h3>
                <div className="space-y-2">
                  {agent.tasks.map((task) => (
                    <div key={task.id} className="p-3 rounded-lg bg-secondary border border-border text-sm">
                      <p className="font-medium">{task.title}</p>
                      <p className="text-xs text-muted-foreground">{task.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
