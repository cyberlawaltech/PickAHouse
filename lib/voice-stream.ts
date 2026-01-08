"use client"

interface VoiceStreamConfig {
  onTranscript: (text: string) => void
  onError: (error: string) => void
  onStateChange: (state: "listening" | "processing" | "idle") => void
}

export class VoiceStream {
  private mediaStream: MediaStream | null = null
  private audioContext: AudioContext | null = null
  private processor: ScriptProcessorNode | null = null
  private isListening = false
  private config: VoiceStreamConfig
  private transcriptionBuffer = ""
  private silenceTimeout: NodeJS.Timeout | null = null

  constructor(config: VoiceStreamConfig) {
    this.config = config
  }

  async initialize(): Promise<void> {
    try {
      this.mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true })
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const source = this.audioContext.createMediaStreamSource(this.mediaStream)

      this.processor = this.audioContext.createScriptProcessor(4096, 1, 1)
      source.connect(this.processor)
      this.processor.connect(this.audioContext.destination)

      this.processor.onaudioprocess = (e) => this.processAudio(e)
    } catch (error) {
      this.config.onError(`Microphone access denied: ${error}`)
    }
  }

  private async processAudio(event: AudioProcessingEvent): Promise<void> {
    const inputData = event.inputBuffer.getChannelData(0)
    const pcmData = this.floatTo16BitPCM(inputData)

    // Send audio chunk to Groq for transcription
    await this.sendAudioChunk(pcmData)
  }

  private floatTo16BitPCM(float32Array: Float32Array): Int16Array {
    const int16Array = new Int16Array(float32Array.length)
    for (let i = 0; i < float32Array.length; i++) {
      int16Array[i] = Math.max(-1, Math.min(1, float32Array[i])) * 0x7fff
    }
    return int16Array
  }

  private async sendAudioChunk(pcmData: Int16Array): Promise<void> {
    try {
      const response = await fetch("/api/voice/transcribe", {
        method: "POST",
        headers: { "Content-Type": "application/octet-stream" },
        body: pcmData.buffer,
      })

      if (!response.ok) throw new Error("Transcription failed")

      const data = await response.json()
      if (data.transcript) {
        this.transcriptionBuffer = data.transcript
        this.config.onStateChange("processing")

        // Reset silence timeout
        if (this.silenceTimeout) clearTimeout(this.silenceTimeout)
        this.silenceTimeout = setTimeout(() => {
          if (this.transcriptionBuffer) {
            this.config.onTranscript(this.transcriptionBuffer)
            this.transcriptionBuffer = ""
          }
        }, 1000)
      }
    } catch (error) {
      this.config.onError(`Audio processing error: ${error}`)
    }
  }

  start(): void {
    if (!this.isListening && this.mediaStream) {
      this.isListening = true
      this.config.onStateChange("listening")
    }
  }

  stop(): void {
    this.isListening = false
    if (this.silenceTimeout) clearTimeout(this.silenceTimeout)
    this.config.onStateChange("idle")
  }

  destroy(): void {
    this.stop()
    if (this.processor) this.processor.disconnect()
    if (this.audioContext) this.audioContext.close()
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach((track) => track.stop())
    }
  }
}
