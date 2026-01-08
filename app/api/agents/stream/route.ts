import { streamText } from "ai"
import { agents } from "@/lib/agents"

export const maxDuration = 30

export async function POST(req: Request) {
  try {
    const { agentId, message } = await req.json()

    const agent = agents[agentId as keyof typeof agents]
    if (!agent) {
      return Response.json({ error: "Agent not found" }, { status: 404 })
    }

    const result = streamText({
      model: agent.model,
      system: agent.systemPrompt,
      prompt: message,
      maxOutputTokens: 2000,
      temperature: agent.temperature,
    })

    return result.toTextStreamResponse()
  } catch (error) {
    console.error("[v0] Stream error:", error)
    return Response.json({ error: "Failed to stream response" }, { status: 500 })
  }
}
