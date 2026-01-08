export interface LLMConfig {
  apiKey: string
  provider: "openai" | "anthropic" | "google" | "xai"
  defaultModel: string
  temperature: number
  maxTokens: number
  topP: number
  frequencyPenalty: number
  presencePenalty: number
  systemPromptTemplate: string
  enableStreaming: boolean
  requestTimeout: number
}

export const defaultLLMConfig: LLMConfig = {
  apiKey: "",
  provider: "openai",
  defaultModel: "openai/gpt-5",
  temperature: 0.7,
  maxTokens: 2000,
  topP: 0.9,
  frequencyPenalty: 0.1,
  presencePenalty: 0.1,
  systemPromptTemplate: "You are a helpful real estate assistant. Provide accurate, detailed, and actionable advice.",
  enableStreaming: true,
  requestTimeout: 30000,
}

export const modelOptions = [
  { value: "openai/gpt-5", label: "GPT-5 (OpenAI)" },
  { value: "openai/gpt-4-turbo", label: "GPT-4 Turbo (OpenAI)" },
  { value: "anthropic/claude-sonnet-4.5", label: "Claude 3.5 Sonnet (Anthropic)" },
  { value: "google/gemini-3-pro", label: "Gemini 3 Pro (Google)" },
  { value: "xai/grok-4-fast-reasoning", label: "Grok-4 (xAI)" },
]
