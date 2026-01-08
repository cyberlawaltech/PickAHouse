import { type NextRequest, NextResponse } from "next/server"

// Convert buffer to base64 for Groq API
function bufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer)
  let binary = ""
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return btoa(binary)
}

export async function POST(request: NextRequest) {
  try {
    const audioBuffer = await request.arrayBuffer()

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json({ error: "GROQ_API_KEY not configured" }, { status: 500 })
    }

    // Create FormData for Groq whisper API
    const formData = new FormData()
    const audioBlob = new Blob([audioBuffer], { type: "audio/wav" })
    formData.append("file", audioBlob, "audio.wav")
    formData.append("model", "whisper-large-v3-turbo")

    const response = await fetch("https://api.groq.com/openai/v1/audio/transcriptions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: formData,
    })

    if (!response.ok) {
      const error = await response.text()
      console.error("[v0] Groq transcription error:", error)
      return NextResponse.json({ error: "Transcription failed" }, { status: response.status })
    }

    const result = await response.json()

    return NextResponse.json({
      transcript: result.text,
      language: result.language,
    })
  } catch (error) {
    console.error("[v0] Transcription API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
