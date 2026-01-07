"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion } from "framer-motion"
import { Brain, Save } from "lucide-react"
import { Slider } from "@/components/ui/slider"

export default function AIConfigPage() {
  const [config, setConfig] = useState({
    voiceGender: "female",
    voicePitch: 1,
    voiceRate: 0.9,
    voiceVolume: 1,
    enableAutoplay: true,
    language: "en-US",
  })

  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)
  }

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Brain className="w-6 h-6 text-primary" />
            <h1 className="text-3xl font-bold">AI Assistant Configuration</h1>
          </div>
          <p className="text-muted-foreground">Configure the AI voice assistant for property introductions</p>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card>
          <CardHeader>
            <CardTitle>Voice Settings</CardTitle>
            <CardDescription>Customize the AI voice for property introductions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="voiceGender">Voice Gender</Label>
                <Select
                  value={config.voiceGender}
                  onValueChange={(value) => setConfig({ ...config, voiceGender: value })}
                >
                  <SelectTrigger id="voiceGender">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="neutral">Neutral</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select value={config.language} onValueChange={(value) => setConfig({ ...config, language: value })}>
                  <SelectTrigger id="language">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en-US">English (US)</SelectItem>
                    <SelectItem value="en-GB">English (UK)</SelectItem>
                    <SelectItem value="en-IN">English (India)</SelectItem>
                    <SelectItem value="yo-NG">Yoruba (Nigeria)</SelectItem>
                    <SelectItem value="ha-NG">Hausa (Nigeria)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Pitch: {config.voicePitch.toFixed(1)}</Label>
              <Slider
                value={[config.voicePitch]}
                onValueChange={(value) => setConfig({ ...config, voicePitch: value[0] })}
                min={0.5}
                max={2}
                step={0.1}
              />
            </div>

            <div className="space-y-2">
              <Label>Rate (Speed): {config.voiceRate.toFixed(1)}</Label>
              <Slider
                value={[config.voiceRate]}
                onValueChange={(value) => setConfig({ ...config, voiceRate: value[0] })}
                min={0.5}
                max={2}
                step={0.1}
              />
            </div>

            <div className="space-y-2">
              <Label>Volume: {Math.round(config.voiceVolume * 100)}%</Label>
              <Slider
                value={[config.voiceVolume]}
                onValueChange={(value) => setConfig({ ...config, voiceVolume: value[0] })}
                min={0}
                max={1}
                step={0.1}
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
              <div>
                <p className="font-medium">Auto-play Introduction</p>
                <p className="text-sm text-muted-foreground">
                  Automatically play AI introduction when property page loads
                </p>
              </div>
              <input
                type="checkbox"
                checked={config.enableAutoplay}
                onChange={(e) => setConfig({ ...config, enableAutoplay: e.target.checked })}
                className="w-5 h-5"
              />
            </div>

            <Button onClick={handleSave} disabled={isSaving} className="w-full gap-2">
              <Save className="w-4 h-4" />
              {isSaving ? "Saving..." : "Save Configuration"}
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
