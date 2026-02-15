import { useState } from "react";

export default function RaffleSettings({ settings, onUpdate }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
      >
        ⚙️ <span className="text-sm">Settings</span>
        <span className="text-xs">{isOpen ? "▲" : "▼"}</span>
      </button>

      {isOpen && (
        <div className="mt-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Number of Winners
            </label>
            <input
              type="number"
              min="1"
              max="100"
              value={settings.winnerCount}
              onChange={(e) =>
                onUpdate({ winnerCount: Math.max(1, parseInt(e.target.value) || 1) })
              }
              className="w-full px-3 py-2 border rounded dark:bg-gray-600 dark:border-gray-500 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Animation Duration (ms)
            </label>
            <input
              type="range"
              min="500"
              max="5000"
              step="500"
              value={settings.animationDuration}
              onChange={(e) =>
                onUpdate({ animationDuration: parseInt(e.target.value) })
              }
              className="w-full"
            />
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {settings.animationDuration}ms
            </span>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="removeWinners"
              checked={settings.removeWinnersFromPool}
              onChange={(e) =>
                onUpdate({ removeWinnersFromPool: e.target.checked })
              }
              className="w-4 h-4"
            />
            <label
              htmlFor="removeWinners"
              className="text-sm text-gray-700 dark:text-gray-200"
            >
              Remove winners from pool after draw
            </label>
          </div>
        </div>
      )}
    </div>
  );
}
