export type CommandType =
  | "navigate-gallery"
  | "contact-agent"
  | "save-property"
  | "get-info"
  | "zoom-image"
  | "switch-tab"

export interface VoiceCommand {
  type: CommandType
  confidence: number
  parameter?: string | number
}

export function parseVoiceCommand(transcript: string): VoiceCommand | null {
  const lower = transcript.toLowerCase()

  // Gallery navigation
  if (lower.includes("next") || lower.includes("forward")) {
    return { type: "navigate-gallery", confidence: 0.9, parameter: "next" }
  }
  if (lower.includes("previous") || lower.includes("back")) {
    return { type: "navigate-gallery", confidence: 0.9, parameter: "prev" }
  }

  // Property interaction
  if (lower.includes("save") || lower.includes("favorite")) {
    return { type: "save-property", confidence: 0.85 }
  }
  if (lower.includes("contact") || lower.includes("agent") || lower.includes("message")) {
    return { type: "contact-agent", confidence: 0.9 }
  }

  // Information requests
  if (lower.includes("features") || lower.includes("details")) {
    return { type: "switch-tab", confidence: 0.8, parameter: "description" }
  }
  if (lower.includes("location") || lower.includes("map")) {
    return { type: "switch-tab", confidence: 0.8, parameter: "location" }
  }
  if (lower.includes("price") || lower.includes("cost")) {
    return { type: "get-info", confidence: 0.85, parameter: "price" }
  }

  // Image control
  if (lower.includes("zoom in") || lower.includes("enlarge")) {
    return { type: "zoom-image", confidence: 0.8, parameter: "in" }
  }
  if (lower.includes("zoom out") || lower.includes("shrink")) {
    return { type: "zoom-image", confidence: 0.8, parameter: "out" }
  }

  return null
}
