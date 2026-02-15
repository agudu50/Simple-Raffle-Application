import { useState } from "react";

export default function RaffleSettings({ settings, onUpdate }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-slate-100 to-gray-100 dark:from-slate-700 dark:to-slate-800 rounded-xl hover:from-slate-200 hover:to-gray-200 dark:hover:from-slate-600 dark:hover:to-slate-700 transition-all duration-300"
      >
        <span className="text-lg">⚙️</span>
        <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Settings</span>
        <span className="text-xs text-slate-400 ml-1">{isOpen ? "▲" : "▼"}</span>
      </button>

      {isOpen && (
        <div className="mt-4 p-5 bg-gradient-to-br from-slate-50 to-gray-50 dark:from-slate-700/50 dark:to-slate-800/50 rounded-2xl border border-slate-200/70 dark:border-slate-600/50 space-y-5">
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
              <span>🏆</span> Number of Winners
            </label>
            <input
              type="number"
              min="1"
              max="100"
              value={settings.winnerCount}
              onChange={(e) =>
                onUpdate({ winnerCount: Math.max(1, parseInt(e.target.value) || 1) })
              }
              className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-600 bg-white/70 dark:bg-slate-800/70 focus:outline-none focus:border-violet-500 dark:focus:border-violet-400 focus:ring-4 focus:ring-violet-500/20 dark:text-white transition-all duration-300"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
              <span>⏱️</span> Animation Duration
            </label>
            <div className="relative">
              <input
                type="range"
                min="500"
                max="5000"
                step="500"
                value={settings.animationDuration}
                onChange={(e) =>
                  onUpdate({ animationDuration: parseInt(e.target.value) })
                }
                className="w-full h-2 bg-gradient-to-r from-violet-200 to-purple-200 dark:from-violet-900/50 dark:to-purple-900/50 rounded-lg appearance-none cursor-pointer accent-violet-600"
              />
              <span className="inline-flex items-center mt-2 px-3 py-1 bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 text-sm font-medium rounded-lg">
                {(settings.animationDuration / 1000).toFixed(1)}s
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-white/50 dark:bg-slate-800/50 rounded-xl">
            <input
              type="checkbox"
              id="removeWinners"
              checked={settings.removeWinnersFromPool}
              onChange={(e) =>
                onUpdate({ removeWinnersFromPool: e.target.checked })
              }
              className="w-5 h-5 accent-violet-600 rounded"
            />
            <label
              htmlFor="removeWinners"
              className="text-sm font-medium text-slate-700 dark:text-slate-200 cursor-pointer"
            >
              Remove winners from pool after draw
            </label>
          </div>
        </div>
      )}
    </div>
  );
}
