import type { Conflict } from "@/lib/conflict-data"

export default function ConflictTimeline({ conflict }: { conflict: Conflict }) {
  return (
    <div className="relative pl-6 border-l border-red-800">
      {conflict.timeline.map((event, index) => (
        <div key={index} className="mb-6 relative">
          <div className="absolute w-4 h-4 bg-red-500 rounded-full -left-8 mt-1" />
          <div className="font-bold text-red-400">{event.year}</div>
          <div className="text-white font-medium">{event.title}</div>
          <div className="text-gray-400 text-sm">{event.description}</div>
        </div>
      ))}
    </div>
  )
}
