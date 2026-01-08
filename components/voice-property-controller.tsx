"use client"

import { useCallback } from "react"
import type { Property } from "@/lib/types"
import type { VoiceCommand } from "@/lib/voice-commands"

interface VoicePropertyControllerProps {
  property: Property
  onImageNavigate: (direction: "next" | "prev") => void
  onTabChange: (tab: string) => void
  onToggleSave: () => void
  onToggleContact: () => void
  onVoiceOutput: (text: string) => void
}

export function VoicePropertyController({
  property,
  onImageNavigate,
  onTabChange,
  onToggleSave,
  onToggleContact,
  onVoiceOutput,
}: VoicePropertyControllerProps) {
  const executeCommand = useCallback(
    (command: VoiceCommand) => {
      switch (command.type) {
        case "navigate-gallery":
          onImageNavigate(command.parameter as "next" | "prev")
          onVoiceOutput(`Moving to ${command.parameter} image`)
          break

        case "save-property":
          onToggleSave()
          onVoiceOutput("Property saved to favorites")
          break

        case "contact-agent":
          onToggleContact()
          onVoiceOutput("Opening contact form for the agent")
          break

        case "switch-tab":
          onTabChange(command.parameter as string)
          onVoiceOutput(`Showing ${command.parameter} information`)
          break

        case "get-info":
          const info = getPropertyInfo(property, command.parameter as string)
          onVoiceOutput(info)
          break

        case "zoom-image":
          onVoiceOutput(`Zooming ${command.parameter}`)
          break

        default:
          break
      }
    },
    [property, onImageNavigate, onTabChange, onToggleSave, onToggleContact, onVoiceOutput],
  )

  return {
    executeCommand,
  }
}

function getPropertyInfo(property: Property, type: string): string {
  switch (type) {
    case "price":
      return `This property is priced at ${property.price} Naira`
    case "bedrooms":
      return `This property has ${property.bedrooms} bedrooms`
    case "bathrooms":
      return `This property has ${property.bathrooms} bathrooms`
    case "area":
      return `The total area is ${property.area} square meters`
    default:
      return `Property information: ${property.title}`
  }
}
