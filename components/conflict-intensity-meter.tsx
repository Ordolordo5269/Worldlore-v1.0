export default function ConflictIntensityMeter({ intensity }: { intensity: string }) {
  const getIntensityValue = () => {
    switch (intensity) {
      case "Low":
        return 20
      case "Medium":
        return 50
      case "Severe":
        return 80
      default:
        return 0
    }
  }

  return (
    <div className="w-full">
      <div className="flex justify-between text-sm mb-1">
        <span>Low</span>
        <span>Medium</span>
        <span>Severe</span>
      </div>
      <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${
            intensity === "Low"
              ? "bg-gradient-to-r from-green-500 to-green-400"
              : intensity === "Medium"
                ? "bg-gradient-to-r from-yellow-500 to-yellow-400"
                : "bg-gradient-to-r from-red-600 to-red-500"
          }`}
          style={{ width: `${getIntensityValue()}%` }}
        />
      </div>
      <div className="relative h-4 w-full">
        <div
          className="absolute top-0 w-4 h-4 bg-white rounded-full -mt-3 transform -translate-x-1/2"
          style={{ left: `${getIntensityValue()}%` }}
        />
      </div>
    </div>
  )
}
