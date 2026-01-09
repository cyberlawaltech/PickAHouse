"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { defaultLLMConfig, modelOptions } from "@/lib/llm-config"
import { AlertCircle, CheckCircle2, Settings, Zap } from "lucide-react"

export default function LLMSettingsPage() {
  const [config, setConfig] = useState(defaultLLMConfig)
  const [saved, setSaved] = useState(false)
  const [testing, setTesting] = useState(false)
  const [testResult, setTestResult] = useState<string | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem("llm-config")
    if (stored) {
      setConfig(JSON.parse(stored))
    }
  }, [])

  const handleSave = () => {
    localStorage.setItem("llm-config", JSON.stringify(config))
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const handleTest = async () => {
    setTesting(true)
    try {
      const response = await fetch("/api/agents/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ config }),
      })
      const data = await response.json()
      setTestResult(data.success ? "Connection successful!" : "Connection failed")
    } catch (error) {
      setTestResult("Error testing connection")
    } finally {
      setTesting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">LLM Configuration</h1>
        <p className="text-muted-foreground">Configure language model settings for all AI agents</p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General Settings</TabsTrigger>
          <TabsTrigger value="advanced">Advanced Settings</TabsTrigger>
          <TabsTrigger value="agents">Agent Defaults</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Model Configuration</CardTitle>
              <CardDescription>Choose your default language model</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Provider</label>
                <select
                  value={config.provider}
                  onChange={(e) => setConfig({ ...config, provider: e.target.value as any })}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                >
                  <option value="openai">OpenAI</option>
                  <option value="anthropic">Anthropic</option>
                  <option value="google">Google</option>
                  <option value="xai">xAI</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Model</label>
                <select
                  value={config.defaultModel}
                  onChange={(e) => setConfig({ ...config, defaultModel: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                >
                  {modelOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">API Key</label>
                <input
                  type="password"
                  value={config.apiKey}
                  onChange={(e) => setConfig({ ...config, apiKey: e.target.value })}
                  placeholder="Enter your API key"
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={handleSave} className="flex-1">
                  {saved ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Saved
                    </>
                  ) : (
                    <>
                      <Settings className="w-4 h-4 mr-2" />
                      Save Settings
                    </>
                  )}
                </Button>
                <Button variant="outline" onClick={handleTest} disabled={testing}>
                  {testing ? (
                    <>
                      <Zap className="w-4 h-4 mr-2 animate-spin" />
                      Testing
                    </>
                  ) : (
                    "Test Connection"
                  )}
                </Button>
              </div>

              {testResult && (
                <div
                  className={`p-3 rounded-lg flex items-center gap-2 ${
                    testResult.includes("successful") ? "bg-green-100 text-green-900" : "bg-red-100 text-red-900"
                  }`}
                >
                  {testResult.includes("successful") ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <AlertCircle className="w-4 h-4" />
                  )}
                  {testResult}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Parameters</CardTitle>
              <CardDescription>Fine-tune model behavior</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium">Temperature: {config.temperature.toFixed(2)}</label>
                <input
                  type="range"
                  min="0"
                  max="2"
                  step="0.1"
                  value={config.temperature}
                  onChange={(e) => setConfig({ ...config, temperature: Number.parseFloat(e.target.value) })}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground">
                  Controls randomness. Lower = more focused, Higher = more creative
                </p>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">Max Tokens: {config.maxTokens}</label>
                <input
                  type="range"
                  min="100"
                  max="4000"
                  step="100"
                  value={config.maxTokens}
                  onChange={(e) => setConfig({ ...config, maxTokens: Number.parseInt(e.target.value) })}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">Top P: {config.topP.toFixed(2)}</label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={config.topP}
                  onChange={(e) => setConfig({ ...config, topP: Number.parseFloat(e.target.value) })}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Frequency Penalty: {config.frequencyPenalty.toFixed(2)}
                </label>
                <input
                  type="range"
                  min="0"
                  max="2"
                  step="0.1"
                  value={config.frequencyPenalty}
                  onChange={(e) => setConfig({ ...config, frequencyPenalty: Number.parseFloat(e.target.value) })}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Presence Penalty: {config.presencePenalty.toFixed(2)}
                </label>
                <input
                  type="range"
                  min="0"
                  max="2"
                  step="0.1"
                  value={config.presencePenalty}
                  onChange={(e) => setConfig({ ...config, presencePenalty: Number.parseFloat(e.target.value) })}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Request Timeout (ms)</label>
                <input
                  type="number"
                  value={config.requestTimeout}
                  onChange={(e) => setConfig({ ...config, requestTimeout: Number.parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                />
              </div>

              <Button onClick={handleSave} className="w-full">
                Save Advanced Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="agents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Agent Configuration</CardTitle>
              <CardDescription>Default settings applied to all agents</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">System Prompt Template</label>
                <textarea
                  value={config.systemPromptTemplate}
                  onChange={(e) => setConfig({ ...config, systemPromptTemplate: e.target.value })}
                  rows={6}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background font-mono text-sm"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="streaming"
                  checked={config.enableStreaming}
                  onChange={(e) => setConfig({ ...config, enableStreaming: e.target.checked })}
                  className="rounded border border-border"
                />
                <label htmlFor="streaming" className="text-sm font-medium">
                  Enable Streaming Responses
                </label>
              </div>

              <Button onClick={handleSave} className="w-full">
                Save Agent Defaults
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
