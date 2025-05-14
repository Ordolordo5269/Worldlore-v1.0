"use client"

import { useState } from "react"
import { Search, Filter, Map, Clock, Newspaper, AlertTriangle } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInput,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Conflict } from "@/lib/conflict-data"
import ConflictTimeline from "@/components/conflict-timeline"
import ConflictNewsFeed from "@/components/conflict-news-feed"

interface ConflictSidebarProps {
  conflicts: Conflict[]
  selectedConflict: Conflict | null
  onSelectConflict: (conflict: Conflict) => void
}

export default function ConflictSidebar({ conflicts, selectedConflict, onSelectConflict }: ConflictSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("conflicts")

  const filteredConflicts = conflicts.filter(
    (conflict) =>
      conflict.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conflict.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <Sidebar className="border-r border-gray-800 w-[350px]">
      <SidebarHeader className="border-b border-gray-800">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-xl font-bold text-red-500">Conflict Tracker</h1>
          <SidebarTrigger />
        </div>
        <div className="px-4 pb-4">
          <div className="relative">
            <SidebarInput
              placeholder="Search conflicts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-gray-900 border-gray-700"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>
      </SidebarHeader>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full flex flex-col flex-1">
        <TabsList className="w-full bg-gray-900">
          <TabsTrigger value="conflicts" className="flex-1">
            <Map className="h-4 w-4 mr-2" />
            Conflicts
          </TabsTrigger>
          <TabsTrigger value="timeline" className="flex-1">
            <Clock className="h-4 w-4 mr-2" />
            Timeline
          </TabsTrigger>
          <TabsTrigger value="news" className="flex-1">
            <Newspaper className="h-4 w-4 mr-2" />
            News
          </TabsTrigger>
        </TabsList>

        <SidebarContent>
          <TabsContent value="conflicts" className="m-0 flex-1">
            <SidebarGroup>
              <SidebarGroupLabel className="flex justify-between items-center">
                Active Conflicts
                <Badge variant="outline" className="bg-red-900/30 text-red-400 border-red-800">
                  {filteredConflicts.length}
                </Badge>
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {filteredConflicts.map((conflict) => (
                    <SidebarMenuItem key={conflict.id}>
                      <SidebarMenuButton
                        isActive={selectedConflict?.id === conflict.id}
                        onClick={() => onSelectConflict(conflict)}
                        className="flex items-center justify-between"
                      >
                        <span>{conflict.name}</span>
                        <Badge
                          className={`
                            ${conflict.intensity === "Low" ? "bg-green-900/30 text-green-400 border-green-800" : ""}
                            ${conflict.intensity === "Medium" ? "bg-yellow-900/30 text-yellow-400 border-yellow-800" : ""}
                            ${conflict.intensity === "Severe" ? "bg-red-900/30 text-red-400 border-red-800" : ""}
                          `}
                        >
                          {conflict.intensity}
                        </Badge>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </TabsContent>

          <TabsContent value="timeline" className="m-0 p-4 flex-1">
            {selectedConflict ? (
              <ConflictTimeline conflict={selectedConflict} />
            ) : (
              <div className="text-center text-gray-400 py-8">
                <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-gray-500" />
                <p>Select a conflict to view its timeline</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="news" className="m-0 p-4 flex-1">
            {selectedConflict ? (
              <ConflictNewsFeed conflict={selectedConflict} />
            ) : (
              <div className="text-center text-gray-400 py-8">
                <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-gray-500" />
                <p>Select a conflict to view latest news</p>
              </div>
            )}
          </TabsContent>
        </SidebarContent>
      </Tabs>

      <SidebarFooter className="border-t border-gray-800 p-4">
        <Button variant="outline" className="w-full bg-gray-900 border-gray-700">
          <Filter className="h-4 w-4 mr-2" />
          Filter Options
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}
