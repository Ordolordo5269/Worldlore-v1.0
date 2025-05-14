"use client"

import { useEffect, useRef } from "react"
import type { Conflict } from "@/lib/conflict-data"

interface ConflictMapProps {
  conflicts: Conflict[]
  selectedConflict: Conflict | null
  onSelectConflict: (conflict: Conflict) => void
}

export default function ConflictMap({ conflicts, selectedConflict, onSelectConflict }: ConflictMapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // This is a simplified map implementation
  // In a real application, you would use a mapping library like Mapbox or Leaflet
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions to match parent
    const resizeCanvas = () => {
      const parent = canvas.parentElement
      if (parent) {
        canvas.width = parent.clientWidth
        canvas.height = parent.clientHeight
      }
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Draw a simple world map background
    ctx.fillStyle = "#111"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw conflict hotspots
    conflicts.forEach((conflict, index) => {
      // Generate pseudo-random positions for demo purposes
      const x = ((index * 150 + 100) % (canvas.width - 100)) + 50
      const y = ((index * 120 + 200) % (canvas.height - 200)) + 100

      // Draw hotspot
      ctx.beginPath()
      ctx.arc(x, y, selectedConflict?.id === conflict.id ? 15 : 10, 0, Math.PI * 2)

      // Color based on intensity
      if (conflict.intensity === "Low") {
        ctx.fillStyle = "rgba(34, 197, 94, 0.7)"
      } else if (conflict.intensity === "Medium") {
        ctx.fillStyle = "rgba(234, 179, 8, 0.7)"
      } else {
        ctx.fillStyle = "rgba(239, 68, 68, 0.7)"
      }

      ctx.fill()

      // Store conflict data for click detection
      conflict.mapPosition = { x, y, radius: 15 }
    })

    // Handle click events
    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      // Check if click is on a conflict hotspot
      for (const conflict of conflicts) {
        if (conflict.mapPosition) {
          const dx = conflict.mapPosition.x - x
          const dy = conflict.mapPosition.y - y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance <= conflict.mapPosition.radius) {
            onSelectConflict(conflict)
            break
          }
        }
      }
    }

    canvas.addEventListener("click", handleClick)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      canvas.removeEventListener("click", handleClick)
    }
  }, [conflicts, selectedConflict, onSelectConflict])

  return (
    <div className="w-full h-full bg-gray-900">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}
