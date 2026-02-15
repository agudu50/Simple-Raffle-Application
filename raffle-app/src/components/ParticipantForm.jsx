import { useState } from "react";

export default function ParticipantForm({ onAdd, onBulkAdd, onGenerateRandom }) {
  const [name, setName] = useState("");
  const [showBulk, setShowBulk] = useState(false);
  const [bulkNames, setBulkNames] = useState("");
  const [message, setMessage] = useState(null);
  const [randomCount, setRandomCount] = useState(5);

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = onAdd(name);
    if (result?.success === false) {
      setMessage({ type: "error", text: result.error || "Duplicate name" });
    } else {
      setName("");
      setMessage(null);
    }
  };

  const handleBulkAdd = () => {
    const result = onBulkAdd(bulkNames);
    setMessage({
      type: "success",
      text: `Added ${result.added} participants${result.duplicates > 0 ? ` (${result.duplicates} duplicates skipped)` : ""}`,
    });
    setBulkNames("");
    setTimeout(() => setMessage(null), 3000);
  };

  const handleGenerateRandom = () => {
    const result = onGenerateRandom(randomCount);
    setMessage({
      type: "success",
      text: `Generated ${result.added} random names${result.duplicates > 0 ? ` (${result.duplicates} duplicates skipped)` : ""}`,
    });
    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <div className="space-y-3 sm:space-y-4">
      <form onSubmit={handleSubmit} className="flex gap-2 sm:gap-3">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter participant name"
          className="flex-1 min-w-0 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:text-white dark:placeholder-slate-400 transition-colors text-sm sm:text-base"
        />
        <button
          type="submit"
          className="px-4 sm:px-6 py-2.5 sm:py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors text-sm sm:text-base whitespace-nowrap"
        >
          Add
        </button>
      </form>

      <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setShowBulk(!showBulk)}
          className="px-3 sm:px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors text-sm sm:text-base"
        >
          📋 {showBulk ? "Hide" : "Bulk"}
        </button>
        <div className="flex items-center gap-1 sm:gap-2">
          <select
            value={randomCount}
            onChange={(e) => setRandomCount(Number(e.target.value))}
            className="w-14 px-2 py-2 bg-violet-100 dark:bg-slate-700 text-violet-700 dark:text-violet-300 font-medium rounded-lg border border-violet-200 dark:border-slate-600 cursor-pointer text-sm sm:text-base"
          >
            {[3, 5, 10, 15, 20].map((n) => (
              <option key={n} value={n} className="bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200">
                {n}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={handleGenerateRandom}
            className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 font-medium rounded-lg hover:bg-violet-200 dark:hover:bg-violet-800/40 transition-colors text-sm sm:text-base whitespace-nowrap"
          >
            🎲 <span className="hidden xs:inline">Random</span>
          </button>
        </div>
      </div>

      {showBulk && (
        <div className="space-y-3 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg border border-slate-200 dark:border-slate-600">
          <textarea
            value={bulkNames}
            onChange={(e) => setBulkNames(e.target.value)}
            placeholder="Enter names separated by commas or new lines..."
            rows={4}
            className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 resize-none focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:text-white dark:placeholder-slate-400 transition-colors"
          />
          <button
            type="button"
            onClick={handleBulkAdd}
            disabled={!bulkNames.trim()}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg disabled:opacity-50 transition-colors"
          >
            Add All Names
          </button>
        </div>
      )}

      {message && (
        <div
          className={`flex items-center gap-2 p-4 rounded-lg font-medium ${
            message.type === "error"
              ? "bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300"
              : "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300"
          }`}
        >
          <span>{message.type === "error" ? "❌" : "✅"}</span>
          {message.text}
        </div>
      )}
    </div>
  );
}
