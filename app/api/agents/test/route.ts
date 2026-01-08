import { generateText } from "ai"

export async function POST(req: Request) {
  try {
    const { config } = await req.json()

    const result = await generateText({
      model: config.defaultModel,
      prompt: "Say 'Connection successful' in one sentence.",
      maxOutputTokens: 100,
      temperature: config.temperature,
    })

    return Response.json({
      success: true,
      message: result.text,
      model: config.defaultModel,
    })
  } catch (error) {
    console.error("[v0] LLM test error:", error)
    return Response.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Connection failed",
      },
      { status: 500 },
    )
  }
}
