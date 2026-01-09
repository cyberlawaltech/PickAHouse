"use client"

import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getAllAgents } from "@/lib/agents"
import { collaborationWorkflows } from "@/lib/agent-collaboration"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { CheckCircle2, Zap, Brain, Settings } from "lucide-react"

export default function SystemDashboard() {
  const agents = getAllAgents()

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h1 className="text-4xl font-bold mb-4">AI System Overview</h1>
          <p className="text-lg text-muted-foreground">Complete AI infrastructure for real estate intelligence</p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-4 mb-12">
          <Card>
            <CardContent className="p-6 text-center">
              <Brain className="w-8 h-8 mx-auto mb-2 text-primary" />
              <p className="text-3xl font-bold">{agents.length}</p>
              <p className="text-sm text-muted-foreground">AI Agents</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Zap className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
              <p className="text-3xl font-bold">{collaborationWorkflows.length}</p>
              <p className="text-sm text-muted-foreground">Workflows</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <CheckCircle2 className="w-8 h-8 mx-auto mb-2 text-green-500" />
              <p className="text-3xl font-bold">6</p>
              <p className="text-sm text-muted-foreground">Capabilities</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Settings className="w-8 h-8 mx-auto mb-2 text-blue-500" />
              <p className="text-3xl font-bold">∞</p>
              <p className="text-sm text-muted-foreground">Customizable</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Available AI Agents</CardTitle>
              <CardDescription>Specialized agents for different real estate tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {agents.map((agent) => (
                <div
                  key={agent.id}
                  className="flex items-start justify-between p-3 rounded-lg border border-border hover:bg-secondary transition-colors"
                >
                  <div className="flex-1">
                    <p className="font-medium">{agent.name}</p>
                    <p className="text-xs text-muted-foreground">{agent.tasks.length} tasks</p>
                  </div>
                  <Link href={`/ai-agents/${agent.id}`}>
                    <Button size="sm" variant="ghost">
                      Use
                    </Button>
                  </Link>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Configuration</CardTitle>
              <CardDescription>Manage AI behavior and settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                <p className="text-sm font-medium text-blue-900 mb-2">Admin Panel Access</p>
                <p className="text-xs text-blue-800 mb-3">
                  Configure LLM settings, model selection, and agent behavior parameters
                </p>
                <Link href="/admin/llm-settings">
                  <Button size="sm" className="w-full">
                    Go to LLM Settings
                  </Button>
                </Link>
              </div>

              <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                <p className="text-sm font-medium text-green-900 mb-2">Agent Workflows</p>
                <p className="text-xs text-green-800 mb-3">
                  Use pre-configured workflows for complex multi-agent tasks
                </p>
                <Link href="/ai-agents/workflows">
                  <Button size="sm" className="w-full bg-transparent" variant="outline">
                    View Workflows
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>System Architecture</CardTitle>
            <CardDescription>Complete AI infrastructure overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold mb-3">Core Components</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    AI Agent Framework
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    LLM Configuration Panel
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    Agent Collaboration System
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    Real-time Chat Interface
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    Workflow Orchestration
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-3">Key Features</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-500" />6 Specialized Agents
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-500" />
                    Multi-model Support
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-500" />
                    Streaming Responses
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-500" />
                    Pre-defined Tasks
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-500" />
                    Admin Configuration
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  )
}
