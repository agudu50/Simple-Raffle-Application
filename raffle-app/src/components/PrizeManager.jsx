import { useState } from "react";

export default function PrizeManager({ prizes, onAdd, onRemove, onClear }) {
  const [prizeName, setPrizeName] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = onAdd(prizeName);
    if (result?.success) {
      setPrizeName("");
    }
  };

  return (
    <div className="mt-6 border border-slate-200 dark:border-slate-600 rounded-xl overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="text-lg">🎁</span>
          <span className="font-medium text-slate-700 dark:text-slate-200">
            Prize Management
          </span>
          {prizes.length > 0 && (
            <span className="px-2 py-0.5 text-xs font-medium bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-300 rounded-full">
              {prizes.length}
            </span>
          )}
        </div>
        <span className={`text-slate-400 transition-transform ${isExpanded ? "rotate-180" : ""}`}>
          ▼
        </span>
      </button>

      {isExpanded && (
        <div className="p-3 sm:p-4 space-y-3 sm:space-y-4 bg-white dark:bg-slate-800/50">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
            <input
              value={prizeName}
              onChange={(e) => setPrizeName(e.target.value)}
              placeholder="Prize name (e.g., Gift Card)"
              className="flex-1 px-3 py-2.5 sm:py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 dark:text-white dark:placeholder-slate-400 text-sm transition-colors"
            />
            <button
              type="submit"
              disabled={!prizeName.trim()}
              className="px-4 py-2.5 sm:py-2 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg disabled:opacity-50 transition-colors text-sm whitespace-nowrap"
            >
              Add Prize
            </button>
          </form>

          {prizes.length > 0 ? (
            <>
              <div className="space-y-2">
                {prizes.map((prize, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between px-3 py-2 bg-slate-50 dark:bg-slate-700/50 rounded-lg group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 flex items-center justify-center text-xs font-bold bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-300 rounded-full">
                        {index + 1}
                      </span>
                      <span className="text-slate-700 dark:text-slate-200">{prize}</span>
                    </div>
                    <button
                      onClick={() => onRemove(index)}
                      className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all"
                      title="Remove prize"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 pt-2 border-t border-slate-200 dark:border-slate-600">
                <p className="text-xs text-slate-500 dark:text-slate-400 text-center sm:text-left">
                  1st prize → 1st winner, etc.
                </p>
                <button
                  onClick={onClear}
                  className="px-3 py-1.5 text-xs text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                >
                  Clear All
                </button>
              </div>
            </>
          ) : (
            <p className="text-center text-slate-500 dark:text-slate-400 py-4 text-sm">
              No prizes added yet. Add prizes to assign them to winners!
            </p>
          )}
        </div>
      )}
    </div>
  );
}
