import { useState, useEffect } from "react";

export default function RaffleSettings({ settings, onUpdate }) {
  const [isOpen, setIsOpen] = useState(false);
  const [winnerInput, setWinnerInput] = useState(String(settings.winnerCount));

  // Sync local input with settings when settings change externally
  useEffect(() => {
    setWinnerInput(String(settings.winnerCount));
  }, [settings.winnerCount]);

  const handleWinnerCountChange = (e) => {
    const val = e.target.value;
    setWinnerInput(val); // Allow any value in the input field
    
    const num = parseInt(val, 10);
    if (!isNaN(num) && num >= 1 && num <= 100) {
      onUpdate({ winnerCount: num });
    }
  };

  const handleWinnerCountBlur = () => {
    // On blur, reset to valid value if empty or invalid
    const num = parseInt(winnerInput, 10);
    if (isNaN(num) || num < 1 || num > 100) {
      setWinnerInput(String(settings.winnerCount));
    }
  };

  return (
    <div className="mb-4 sm:mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-slate-100 dark:bg-slate-700 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
      >
        <span>⚙️</span>
        <span className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200">Settings</span>
        <span className="text-xs text-slate-400 ml-1">{isOpen ? "▲" : "▼"}</span>
      </button>

      {isOpen && (
        <div className="mt-3 sm:mt-4 p-4 sm:p-5 bg-slate-50 dark:bg-slate-700/50 rounded-lg border border-slate-200 dark:border-slate-600 space-y-4 sm:space-y-5">
          <div>
            <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">
              🏆 Number of Winners
            </label>
            <input
              type="number"
              min="1"
              max="100"
              value={winnerInput}
              onChange={handleWinnerCountChange}
              onBlur={handleWinnerCountBlur}
              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:text-white transition-colors text-sm sm:text-base"
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">
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
            <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              {(settings.animationDuration / 1000).toFixed(1)}s
            </span>
          </div>

          <div className="flex items-start sm:items-center gap-3">
            <input
              type="checkbox"
              id="removeWinners"
              checked={settings.removeWinnersFromPool}
              onChange={(e) =>
                onUpdate({ removeWinnersFromPool: e.target.checked })
              }
              className="mt-0.5 sm:mt-0 w-4 h-4 accent-indigo-600 rounded"
            />
            <label
              htmlFor="removeWinners"
              className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 cursor-pointer"
            >
              Remove winners from pool after draw
            </label>
          </div>
        </div>
      )}
    </div>
  );
}
