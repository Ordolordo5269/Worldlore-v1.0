import type { Conflict } from "@/lib/conflict-data"

export default function ConflictNewsFeed({ conflict }: { conflict: Conflict }) {
  return (
    <div className="space-y-4">
      {conflict.latestNews.map((news, index) => (
        <div key={index} className="border border-gray-800 rounded-md p-4 bg-gray-900/50">
          <div className="text-gray-400 text-sm mb-1">{news.date}</div>
          <h3 className="text-white font-medium mb-2">{news.title}</h3>
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-xs">Source: {news.source}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
