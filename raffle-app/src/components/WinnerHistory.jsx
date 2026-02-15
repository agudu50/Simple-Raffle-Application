import { useState } from "react";

export default function WinnerHistory({ history, onClear }) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (history.length === 0) return null;

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString();
  };

  return (
    <div className="mt-6 border rounded-lg overflow-hidden dark:border-gray-600">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
      >
        <span className="font-semibold text-gray-700 dark:text-gray-200">
          📜 Draw History ({history.length})
        </span>
        <span className="text-xl">{isExpanded ? "▲" : "▼"}</span>
      </button>

      {isExpanded && (
        <div className="p-4 bg-white dark:bg-gray-800 max-h-64 overflow-y-auto">
          {history.map((entry) => (
            <div
              key={entry.id}
              className="mb-3 pb-3 border-b last:border-b-0 dark:border-gray-600"
            >
              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-1">
                <span>{formatDate(entry.timestamp)}</span>
                <span>{entry.participantCount} participants</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {entry.winners.map((winner, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 rounded text-sm font-medium"
                  >
                    🏆 {winner}
                  </span>
                ))}
              </div>
            </div>
          ))}

          <button
            onClick={onClear}
            className="mt-3 text-sm text-red-500 hover:text-red-700 dark:text-red-400"
          >
            Clear History
          </button>
        </div>
      )}
    </div>
  );
}
