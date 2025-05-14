"use client"

import { useEffect, useRef, useState } from "react"
import type { Conflict, KeyLocation } from "@/lib/conflict-data"
import { MapPin, AlertTriangle, Building, Users, Home } from "lucide-react"

interface ConflictDetailMapProps {
  conflict: Conflict
}

export default function ConflictDetailMap({ conflict }: ConflictDetailMapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [selectedLocation, setSelectedLocation] = useState<KeyLocation | null>(null)

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

    // Draw grid lines for map reference
    ctx.strokeStyle = "#222"
    ctx.lineWidth = 1

    // Draw horizontal grid lines
    for (let i = 0; i < canvas.height; i += 50) {
      ctx.beginPath()
      ctx.moveTo(0, i)
      ctx.lineTo(canvas.width, i)
      ctx.stroke()
    }

    // Draw vertical grid lines
    for (let i = 0; i < canvas.width; i += 50) {
      ctx.beginPath()
      ctx.moveTo(i, 0)
      ctx.lineTo(i, canvas.height)
      ctx.stroke()
    }

    // Draw conflict zone (simplified representation)
    ctx.fillStyle = "rgba(239, 68, 68, 0.1)"
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    ctx.beginPath()
    ctx.ellipse(centerX, centerY, canvas.width / 3, canvas.height / 3, 0, 0, Math.PI * 2)
    ctx.fill()

    // Draw border of conflict zone
    ctx.strokeStyle = "rgba(239, 68, 68, 0.5)"
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.ellipse(centerX, centerY, canvas.width / 3, canvas.height / 3, 0, 0, Math.PI * 2)
    ctx.stroke()

    // Draw key locations
    conflict.keyLocations.forEach((location, index) => {
      // Generate positions based on relative lat/lng
      // This is a simplified approach - in a real app you'd use proper map projection
      const x = (location.lng - conflict.mapCenter.lng) * 50 + centerX
      const y = (conflict.mapCenter.lat - location.lat) * 50 + centerY

      // Store location position for click detection
      location.mapPosition = { x, y, radius: 15 }

      // Draw location marker
      ctx.beginPath()
      ctx.arc(x, y, 8, 0, Math.PI * 2)

      // Color based on location type
      if (location.type === "city") {
        ctx.fillStyle = "rgba(59, 130, 246, 0.7)"
      } else if (location.type === "incident") {
        ctx.fillStyle = "rgba(234, 179, 8, 0.7)"
      } else if (location.type === "headquarters") {
        ctx.fillStyle = "rgba(168, 85, 247, 0.7)"
      } else if (location.type === "refugee") {
        ctx.fillStyle = "rgba(34, 197, 94, 0.7)"
      } else {
        ctx.fillStyle = "rgba(239, 68, 68, 0.7)"
      }

      ctx.fill()

      // Draw border
      ctx.strokeStyle = "#fff"
      ctx.lineWidth = 1.5
      ctx.stroke()

      // Draw label
      ctx.font = "12px sans-serif"
      ctx.fillStyle = "#fff"
      ctx.textAlign = "center"
      ctx.fillText(location.name, x, y + 25)
    })

    // Handle click events
    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      // Check if click is on a location marker
      for (const location of conflict.keyLocations) {
        if (location.mapPosition) {
          const dx = location.mapPosition.x - x
          const dy = location.mapPosition.y - y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance <= 15) {
            setSelectedLocation(location)
            break
          } else {
            setSelectedLocation(null)
          }
        }
      }
    }

    canvas.addEventListener("click", handleClick)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      canvas.removeEventListener("click", handleClick)
    }
  }, [conflict])

  return (
    <div className="relative w-full h-full bg-gray-900">
      <canvas ref={canvasRef} className="w-full h-full" />

      {selectedLocation && (
        <div className="absolute bottom-4 left-4 right-4 bg-gray-900/90 backdrop-blur-sm p-4 rounded-lg border border-gray-800">
          <div className="flex items-start">
            <div className="mr-3 mt-1">
              {selectedLocation.type === "city" && <Building className="h-5 w-5 text-blue-400" />}
              {selectedLocation.type === "incident" && <AlertTriangle className="h-5 w-5 text-yellow-400" />}
              {selectedLocation.type === "headquarters" && <Users className="h-5 w-5 text-purple-400" />}
              {selectedLocation.type === "refugee" && <Home className="h-5 w-5 text-green-400" />}
              {selectedLocation.type === "base" && <MapPin className="h-5 w-5 text-red-400" />}
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">{selectedLocation.name}</h3>
              <p className="text-gray-300">{selectedLocation.description}</p>
              <div className="text-sm text-gray-400 mt-1">
                Coordinates: {selectedLocation.lat.toFixed(3)}, {selectedLocation.lng.toFixed(3)}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="absolute top-4 right-4 bg-gray-900/80 backdrop-blur-sm p-2 rounded-lg border border-gray-800">
        <div className="flex flex-col gap-2">
          <div className="flex items-center text-xs">
            <div className="w-3 h-3 rounded-full bg-blue-400 mr-2"></div>
            <span>City</span>
          </div>
          <div className="flex items-center text-xs">
            <div className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></div>
            <span>Incident</span>
          </div>
          <div className="flex items-center text-xs">
            <div className="w-3 h-3 rounded-full bg-purple-400 mr-2"></div>
            <span>Headquarters</span>
          </div>
          <div className="flex items-center text-xs">
            <div className="w-3 h-3 rounded-full bg-green-400 mr-2"></div>
            <span>Refugee Camp</span>
          </div>
          <div className="flex items-center text-xs">
            <div className="w-3 h-3 rounded-full bg-red-400 mr-2"></div>
            <span>Military Base</span>
          </div>
        </div>
      </div>
    </div>
  )
}
