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
    <div className="mt-6 border-2 border-amber-200 dark:border-amber-800/50 rounded-2xl overflow-hidden shadow-sm">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-5 py-4 bg-amber-50 dark:bg-amber-900/20 hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-all"
      >
        <div className="flex items-center gap-3">
          <span className="text-xl">🎁</span>
          <span className="font-semibold text-slate-700 dark:text-slate-200">
            Prize Management
          </span>
          {prizes.length > 0 && (
            <span className="px-2.5 py-1 text-xs font-bold bg-amber-500 text-white rounded-full shadow-sm">
              {prizes.length}
            </span>
          )}
        </div>
        <span className={`text-amber-500 dark:text-amber-400 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}>
          ▼
        </span>
      </button>

      {isExpanded && (
        <div className="p-4 sm:p-5 space-y-4 bg-white dark:bg-slate-800/50">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
            <input
              value={prizeName}
              onChange={(e) => setPrizeName(e.target.value)}
              placeholder="Prize name (e.g., Gift Card)"
              className="flex-1 px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 dark:text-white dark:placeholder-slate-400 text-sm transition-all"
            />
            <button
              type="submit"
              disabled={!prizeName.trim()}
              className="px-5 py-3 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white font-semibold rounded-xl shadow-md shadow-amber-500/20 disabled:opacity-50 disabled:shadow-none transition-all duration-200 text-sm whitespace-nowrap transform hover:scale-105 active:scale-95 disabled:transform-none"
            >
              + Add Prize
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
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 pt-3 border-t-2 border-slate-100 dark:border-slate-700">
                <p className="text-xs text-slate-500 dark:text-slate-400 text-center sm:text-left">
                  1st prize → 1st winner, etc.
                </p>
                <button
                  onClick={onClear}
                  className="px-4 py-2 text-xs font-semibold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 rounded-lg transition-all duration-200"
                >
                  🗑️ Clear All
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
