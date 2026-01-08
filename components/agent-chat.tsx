"use client"

import type React from "react"

import { useState } from "react"
import type { Agent, AgentTask } from "@/lib/agents"
import { Button } from "@/components/ui/button"
import { Loader2, Send } from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

interface AgentChatProps {
  agent: Agent
  onClose?: () => void
}

export function AgentChat({ agent, onClose }: AgentChatProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [selectedTask, setSelectedTask] = useState<AgentTask | null>(null)

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/agents/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          agentId: agent.id,
          message: input,
          history: messages,
        }),
      })

      const data = await response.json()

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.response,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("[v0] Chat error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleTaskSelect = (task: AgentTask) => {
    setSelectedTask(task)
    setInput(task.prompt + " ")
  }

  return (
    <div className="flex flex-col h-full gap-4">
      {/* Header */}
      <div className="border-b border-border pb-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold">{agent.name}</h2>
            <p className="text-sm text-muted-foreground">{agent.description}</p>
          </div>
          {onClose && (
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Tasks */}
      {agent.tasks.length > 0 && messages.length === 0 && (
        <div className="grid gap-2">
          <p className="text-xs font-medium text-muted-foreground">QUICK TASKS</p>
          {agent.tasks.map((task) => (
            <button
              key={task.id}
              onClick={() => handleTaskSelect(task)}
              className="text-left p-3 rounded-lg border border-border hover:border-primary hover:bg-secondary transition-colors"
            >
              <div className="font-medium text-sm">{task.title}</div>
              <div className="text-xs text-muted-foreground">{task.description}</div>
            </button>
          ))}
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.length === 0 && (
          <div className="flex items-center justify-center h-full text-center">
            <div>
              <p className="text-sm text-muted-foreground">Start a conversation with {agent.name}</p>
            </div>
          </div>
        )}
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${
                message.role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"
              }`}
            >
              <p className="text-sm">{message.content}</p>
              <p className="text-xs opacity-70 mt-1">{message.timestamp.toLocaleTimeString()}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="w-4 h-4 animate-spin" />
            Agent is thinking...
          </div>
        )}
      </div>

      {/* Input */}
      <form onSubmit={handleSendMessage} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={selectedTask?.inputPlaceholder || "Ask a question..."}
          className="flex-1 px-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
          disabled={isLoading}
        />
        <Button type="submit" disabled={isLoading || !input.trim()} size="sm">
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        </Button>
      </form>
    </div>
  )
}
