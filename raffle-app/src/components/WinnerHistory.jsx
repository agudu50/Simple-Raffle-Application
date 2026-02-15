import { useState } from "react";

export default function WinnerHistory({ history, onClear }) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (history.length === 0) return null;

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString();
  };

  return (
    <div className="rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
      >
        <span className="flex items-center gap-2 font-semibold text-slate-700 dark:text-slate-200">
          📜 Draw History
          <span className="px-2 py-0.5 bg-indigo-600 text-white text-sm font-medium rounded-full">
            {history.length}
          </span>
        </span>
        <span className="text-slate-400">{isExpanded ? "▲" : "▼"}</span>
      </button>

      {isExpanded && (
        <div className="p-4 bg-white dark:bg-slate-800 max-h-72 overflow-y-auto">
          {history.map((entry) => (
            <div
              key={entry.id}
              className="mb-4 pb-4 border-b border-slate-200 dark:border-slate-700 last:border-b-0 last:mb-0 last:pb-0"
            >
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-slate-500 dark:text-slate-400">
                  📅 {formatDate(entry.timestamp)}
                </span>
                <span className="text-xs text-slate-400 dark:text-slate-500">
                  {entry.participantCount} participants
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {entry.winners.map((winner, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 rounded-full text-sm font-medium"
                  >
                    🏆 {winner}
                  </span>
                ))}
              </div>
            </div>
          ))}

          <button
            onClick={onClear}
            className="mt-3 px-4 py-2 text-sm font-medium text-red-600 hover:text-white hover:bg-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400 rounded-lg transition-colors"
          >
            🗑️ Clear History
          </button>
        </div>
      )}
    </div>
  );
}
