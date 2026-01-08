"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getAllAgents } from "@/lib/agents"
import { AgentChat } from "@/components/agent-chat"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { Home, TrendingUp, Handshake, FileText, MessageCircle, Wallet, X } from "lucide-react"

const iconMap = {
  Home,
  TrendingUp,
  Handshake,
  FileText,
  MessageCircle,
  Wallet,
}

export default function AIAgentsPage() {
  const agents = getAllAgents()
  const [selectedAgent, setSelectedAgent] = useState(null)

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-12">
        {selectedAgent ? (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-card rounded-lg border border-border p-8 min-h-[600px]">
                <AgentChat agent={selectedAgent} onClose={() => setSelectedAgent(null)} />
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-bold mb-2">Agent Info</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-muted-foreground">Model</p>
                    <p className="font-medium">{selectedAgent.model}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Temperature</p>
                    <p className="font-medium">{selectedAgent.temperature}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Capabilities</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {selectedAgent.capabilities.map((cap) => (
                        <Badge key={cap} variant="secondary" className="text-xs">
                          {cap}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <Button variant="outline" className="w-full bg-transparent" onClick={() => setSelectedAgent(null)}>
                <X className="w-4 h-4 mr-2" />
                Back to Agents
              </Button>
            </div>
          </div>
        ) : (
          <>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 text-center">
              <h1 className="text-4xl font-bold mb-4">AI Agents for Real Estate</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Meet your specialized AI assistants designed to help you navigate every aspect of real estate investing
                and transactions
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {agents.map((agent, index) => {
                const IconComponent = iconMap[agent.icon as keyof typeof iconMap] || Home

                return (
                  <motion.div
                    key={agent.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="hover:shadow-lg transition-all cursor-pointer h-full hover:border-primary/50">
                      <CardContent className="p-6 flex flex-col h-full">
                        <div className="mb-4">
                          <div
                            className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                            style={{ backgroundColor: agent.color + "20" }}
                          >
                            <IconComponent className="w-6 h-6" style={{ color: agent.color }} />
                          </div>
                          <h3 className="text-lg font-bold mb-2">{agent.name}</h3>
                          <p className="text-sm text-muted-foreground">{agent.description}</p>
                        </div>

                        <div className="mt-auto space-y-4">
                          <div>
                            <p className="text-xs font-medium text-muted-foreground mb-2">CAPABILITIES</p>
                            <div className="flex flex-wrap gap-1">
                              {agent.capabilities.slice(0, 2).map((cap) => (
                                <Badge key={cap} variant="secondary" className="text-xs">
                                  {cap}
                                </Badge>
                              ))}
                              {agent.capabilities.length > 2 && (
                                <Badge variant="secondary" className="text-xs">
                                  +{agent.capabilities.length - 2}
                                </Badge>
                              )}
                            </div>
                          </div>

                          <Button className="w-full" onClick={() => setSelectedAgent(agent)}>
                            Start Chat
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  )
}
