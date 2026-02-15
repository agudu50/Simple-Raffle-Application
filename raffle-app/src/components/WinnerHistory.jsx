import { useState } from "react";

export default function WinnerHistory({ history, onClear }) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (history.length === 0) return null;

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString();
  };

  return (
    <div className="rounded-2xl overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/40 dark:to-purple-900/40 hover:from-indigo-200 hover:to-purple-200 dark:hover:from-indigo-800/40 dark:hover:to-purple-800/40 transition-all duration-300"
      >
        <span className="flex items-center gap-2 font-bold text-indigo-700 dark:text-indigo-300">
          <span className="text-xl">📜</span>
          Draw History
          <span className="px-2 py-0.5 bg-indigo-500 text-white text-sm font-bold rounded-full">
            {history.length}
          </span>
        </span>
        <span className="text-indigo-500 dark:text-indigo-400">{isExpanded ? "▲" : "▼"}</span>
      </button>

      {isExpanded && (
        <div className="p-5 bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 max-h-72 overflow-y-auto">
          {history.map((entry, historyIdx) => (
            <div
              key={entry.id}
              className="mb-4 pb-4 border-b border-slate-200 dark:border-slate-700 last:border-b-0 last:mb-0 last:pb-0"
            >
              <div className="flex items-center justify-between text-sm mb-3">
                <span className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                  <span>📅</span>
                  {formatDate(entry.timestamp)}
                </span>
                <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-medium rounded-lg">
                  {entry.participantCount} participants
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {entry.winners.map((winner, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-amber-100 to-yellow-100 dark:from-amber-900/40 dark:to-yellow-900/40 text-amber-700 dark:text-amber-300 rounded-full text-sm font-semibold"
                  >
                    <span>🏆</span>
                    {winner}
                  </span>
                ))}
              </div>
            </div>
          ))}

          <button
            onClick={onClear}
            className="mt-4 px-4 py-2 text-sm font-medium text-red-500 hover:text-white bg-red-50 hover:bg-red-500 dark:bg-red-900/30 dark:hover:bg-red-600 rounded-xl transition-all duration-300"
          >
            🗑️ Clear History
          </button>
        </div>
      )}
    </div>
  );
}
