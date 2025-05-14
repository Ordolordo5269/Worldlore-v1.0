"use client"

import { useState } from "react"
import { X, MapPin, BookOpen, BarChart3, Globe, Users, AlertTriangle, Building, FileText } from "lucide-react"
import type { Conflict } from "@/lib/conflict-data"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import ConflictIntensityMeter from "@/components/conflict-intensity-meter"
import ConflictTimeline from "@/components/conflict-timeline"
import ConflictNewsFeed from "@/components/conflict-news-feed"
import ConflictDetailMap from "@/components/conflict-detail-map"

interface ConflictDetailProps {
  conflict: Conflict
  onClose: () => void
}

export default function ConflictDetail({ conflict, onClose }: ConflictDetailProps) {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="absolute inset-0 bg-black/95 backdrop-blur-sm overflow-auto">
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6 sticky top-0 bg-black/90 backdrop-blur-sm z-10 py-4">
          <div>
            <h1 className="text-3xl font-bold text-red-500">{conflict.name}</h1>
            <p className="text-gray-400">{conflict.description}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
            <X className="h-6 w-6" />
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="sticky top-16 bg-black/90 backdrop-blur-sm z-10 pb-2">
            <TabsList className="w-full bg-gray-900 p-1">
              <TabsTrigger value="overview" className="flex items-center">
                <Globe className="h-4 w-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="map" className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                Map
              </TabsTrigger>
              <TabsTrigger value="analysis" className="flex items-center">
                <BarChart3 className="h-4 w-4 mr-2" />
                Analysis
              </TabsTrigger>
              <TabsTrigger value="timeline" className="flex items-center">
                <FileText className="h-4 w-4 mr-2" />
                Timeline
              </TabsTrigger>
              <TabsTrigger value="sources" className="flex items-center">
                <BookOpen className="h-4 w-4 mr-2" />
                Sources
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">Started</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-red-400">{conflict.startYear}</div>
                  <CardDescription>Year conflict began</CardDescription>
                </CardContent>
              </Card>
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">Casualties</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-red-400">{conflict.casualties.toLocaleString()}</div>
                  <CardDescription>Estimated deaths</CardDescription>
                </CardContent>
              </Card>
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">Affected</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-red-400">{conflict.peopleAffected.toLocaleString()}</div>
                  <CardDescription>People impacted</CardDescription>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertTriangle className="h-5 w-5 mr-2 text-red-400" />
                    Root Causes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">{conflict.rootCauses}</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Building className="h-5 w-5 mr-2 text-red-400" />
                    Economic Impact
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">{conflict.economicImpact}</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 mr-2 text-red-400" />
                    Key Actors
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {conflict.keyActors.map((actor, index) => (
                      <Badge key={index} variant="outline" className="bg-gray-800/50 text-gray-200 border-gray-700">
                        {actor}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Globe className="h-5 w-5 mr-2 text-red-400" />
                    Affected Countries
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {conflict.affectedCountries.map((country, index) => (
                      <Badge key={index} variant="outline" className="bg-gray-800/50 text-gray-200 border-gray-700">
                        {country}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gray-900 border-gray-800 mb-8">
              <CardHeader>
                <CardTitle>Conflict Intensity</CardTitle>
              </CardHeader>
              <CardContent>
                <ConflictIntensityMeter intensity={conflict.intensity} />
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle>Humanitarian Situation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">{conflict.humanitarianSituation}</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle>International Response</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">{conflict.internationalResponse}</p>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gray-900 border-gray-800 mb-8">
              <CardHeader>
                <CardTitle>Latest Developments</CardTitle>
              </CardHeader>
              <CardContent>
                <ConflictNewsFeed conflict={conflict} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="map" className="mt-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle>Conflict Zone Map</CardTitle>
                <CardDescription>Interactive map showing key locations in the conflict</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[600px] w-full rounded-md overflow-hidden">
                  <ConflictDetailMap conflict={conflict} />
                </div>
              </CardContent>
            </Card>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {conflict.keyLocations.map((location, index) => (
                <Card key={index} className="bg-gray-900 border-gray-800">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{location.name}</CardTitle>
                      <Badge
                        variant="outline"
                        className={`
                          ${location.type === "city" ? "bg-blue-900/30 text-blue-400 border-blue-800" : ""}
                          ${location.type === "incident" ? "bg-yellow-900/30 text-yellow-400 border-yellow-800" : ""}
                          ${location.type === "headquarters" ? "bg-purple-900/30 text-purple-400 border-purple-800" : ""}
                          ${location.type === "refugee" ? "bg-green-900/30 text-green-400 border-green-800" : ""}
                          ${location.type === "base" ? "bg-red-900/30 text-red-400 border-red-800" : ""}
                        `}
                      >
                        {location.type}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-400">{location.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analysis" className="mt-6">
            <Card className="bg-gray-900 border-gray-800 mb-6">
              <CardHeader>
                <CardTitle>Parties' Objectives & Strategies</CardTitle>
                <CardDescription>Analysis of key actors' goals and approaches</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {conflict.partiesAnalysis.map((party, index) => (
                  <div key={index} className="border-l-4 border-red-500 pl-4 py-2">
                    <h3 className="text-xl font-bold text-white mb-2">{party.actor}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-red-400 mb-1">Objectives</h4>
                        <p className="text-sm text-gray-300">{party.objectives}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-red-400 mb-1">Strategy</h4>
                        <p className="text-sm text-gray-300">{party.strategy}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-red-400 mb-1">Resources</h4>
                        <p className="text-sm text-gray-300">{party.resources}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle>Displacement Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-400">Displaced Persons:</span>
                    <span className="text-2xl font-bold text-red-400">{conflict.displaced.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-4 mb-1">
                    <div
                      className="bg-red-500 h-4 rounded-full"
                      style={{ width: `${Math.min(100, (conflict.displaced / conflict.peopleAffected) * 100)}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 text-right">
                    {Math.round((conflict.displaced / conflict.peopleAffected) * 100)}% of affected population
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle>Conflict Duration</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-400">Years Active:</span>
                    <span className="text-2xl font-bold text-red-400">{2025 - conflict.startYear}</span>
                  </div>
                  <div className="relative pt-6">
                    <div className="w-full h-1 bg-gray-800"></div>
                    <div className="absolute left-0 -top-1 h-3 w-3 rounded-full bg-red-500"></div>
                    <div className="absolute right-0 -top-1 h-3 w-3 rounded-full bg-gray-500"></div>
                    <div className="absolute text-xs text-gray-500 -top-6 left-0">Started: {conflict.startYear}</div>
                    <div className="absolute text-xs text-gray-500 -top-6 right-0">Present: 2025</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="timeline" className="mt-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle>Timeline of Key Events</CardTitle>
                <CardDescription>Chronological history of significant developments</CardDescription>
              </CardHeader>
              <CardContent>
                <ConflictTimeline conflict={conflict} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sources" className="mt-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle>Credible Sources for Further Reading</CardTitle>
                <CardDescription>Curated list of reliable information sources</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {conflict.sources.map((source, index) => (
                    <div key={index} className="border border-gray-800 rounded-lg p-4 bg-gray-900/50">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-medium text-white">{source.title}</h3>
                          <p className="text-sm text-gray-400 mt-1">{source.description}</p>
                        </div>
                        <Badge
                          variant="outline"
                          className={`
                            ${source.type === "news" ? "bg-blue-900/30 text-blue-400 border-blue-800" : ""}
                            ${source.type === "academic" ? "bg-purple-900/30 text-purple-400 border-purple-800" : ""}
                            ${source.type === "government" ? "bg-green-900/30 text-green-400 border-green-800" : ""}
                            ${source.type === "ngo" ? "bg-yellow-900/30 text-yellow-400 border-yellow-800" : ""}
                            ${source.type === "analysis" ? "bg-red-900/30 text-red-400 border-red-800" : ""}
                          `}
                        >
                          {source.type}
                        </Badge>
                      </div>
                      <div className="mt-4">
                        <Button variant="outline" size="sm" className="bg-gray-800 border-gray-700 text-gray-200">
                          <a href={source.url} target="_blank" rel="noopener noreferrer" className="flex items-center">
                            <BookOpen className="h-4 w-4 mr-2" />
                            Visit Source
                          </a>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
