"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { collaborationWorkflows } from "@/lib/agent-collaboration"
import { getAllAgents } from "@/lib/agents"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { ArrowRight, Play } from "lucide-react"

export default function WorkflowsPage() {
  const [selectedWorkflow, setSelectedWorkflow] = useState(null)
  const agents = getAllAgents()

  const workflows = collaborationWorkflows.map((wf) => ({
    ...wf,
    agents: wf.steps.map((step) => agents.find((a) => a.id === step.agentId)).filter(Boolean),
  }))

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Agent Collaboration Workflows</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Harness the power of multiple AI agents working together to provide comprehensive solutions for your real
            estate needs
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {workflows.map((workflow, index) => (
            <motion.div
              key={workflow.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-all h-full">
                <CardHeader>
                  <CardTitle>{workflow.name}</CardTitle>
                  <CardDescription>{workflow.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <p className="text-sm font-medium mb-3">Agent Collaboration</p>
                    <div className="flex flex-wrap gap-2">
                      {workflow.agents.slice(0, 3).map((agent, i) => (
                        <div key={agent.id} className="flex items-center gap-1">
                          <Badge variant="secondary" className="text-xs" style={{ borderColor: agent.color }}>
                            {agent.name.split(" ")[0]}
                          </Badge>
                          {i < Math.min(2, workflow.agents.length - 1) && (
                            <ArrowRight className="w-3 h-3 text-muted-foreground" />
                          )}
                        </div>
                      ))}
                      {workflow.agents.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{workflow.agents.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-2">Steps: {workflow.steps.length}</p>
                    <div className="space-y-1">
                      {workflow.steps.map((step, i) => (
                        <div key={step.id} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold">
                            {i + 1}
                          </span>
                          <span>{step.task}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button className="w-full gap-2" onClick={() => setSelectedWorkflow(workflow)}>
                    <Play className="w-4 h-4" />
                    Start Workflow
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}
