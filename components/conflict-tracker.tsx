"use client"

import { useState } from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import ConflictSidebar from "@/components/conflict-sidebar"
import ConflictMap from "@/components/conflict-map"
import ConflictDetail from "@/components/conflict-detail"
import { type Conflict, conflictData } from "@/lib/conflict-data"

export default function ConflictTracker() {
  const [selectedConflict, setSelectedConflict] = useState<Conflict | null>(conflictData[0])
  const [showDetail, setShowDetail] = useState(false)

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen bg-black text-white overflow-hidden">
        <ConflictSidebar
          conflicts={conflictData}
          selectedConflict={selectedConflict}
          onSelectConflict={(conflict) => {
            setSelectedConflict(conflict)
            setShowDetail(true)
          }}
        />
        <div className="flex-1 relative">
          <ConflictMap
            conflicts={conflictData}
            selectedConflict={selectedConflict}
            onSelectConflict={(conflict) => {
              setSelectedConflict(conflict)
              setShowDetail(true)
            }}
          />
          {showDetail && selectedConflict && (
            <ConflictDetail conflict={selectedConflict} onClose={() => setShowDetail(false)} />
          )}
        </div>
      </div>
    </SidebarProvider>
  )
}
