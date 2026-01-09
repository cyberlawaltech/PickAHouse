import { generateText } from "ai"
import { agents } from "@/lib/agents"

export async function POST(req: Request) {
  try {
    const { agentId, message, history } = await req.json()

    const agent = agents[agentId as keyof typeof agents]
    if (!agent) {
      return Response.json({ error: "Agent not found" }, { status: 404 })
    }

    const { text, usage } = await generateText({
      model: agent.model,
      system: agent.systemPrompt,
      prompt: message,
      maxOutputTokens: 2000,
      temperature: agent.temperature,
      messages: history || [],
    })

    return Response.json({ response: text, usage })
  } catch (error) {
    console.error("[v0] Agent API error:", error)
    return Response.json({ error: "Failed to process request" }, { status: 500 })
  }
}
