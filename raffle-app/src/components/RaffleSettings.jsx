import { useState } from "react";

export default function RaffleSettings({ settings, onUpdate }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
      >
        <span>⚙️</span>
        <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Settings</span>
        <span className="text-xs text-slate-400 ml-1">{isOpen ? "▲" : "▼"}</span>
      </button>

      {isOpen && (
        <div className="mt-4 p-5 bg-slate-50 dark:bg-slate-700/50 rounded-lg border border-slate-200 dark:border-slate-600 space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">
              🏆 Number of Winners
            </label>
            <input
              type="number"
              min="1"
              max="100"
              value={settings.winnerCount}
              onChange={(e) =>
                onUpdate({ winnerCount: Math.max(1, parseInt(e.target.value) || 1) })
              }
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:text-white transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">
              ⏱️ Animation Duration
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
              className="w-full h-2 bg-slate-200 dark:bg-slate-600 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <span className="text-sm text-slate-500 dark:text-slate-400">
              {(settings.animationDuration / 1000).toFixed(1)}s
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
              className="w-4 h-4 accent-indigo-600 rounded"
            />
            <label
              htmlFor="removeWinners"
              className="text-sm text-slate-700 dark:text-slate-200 cursor-pointer"
            >
              Remove winners from pool after draw
            </label>
          </div>
        </div>
      )}
    </div>
  );
}
