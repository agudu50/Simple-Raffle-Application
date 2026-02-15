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
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="flex gap-2 sm:gap-3">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter participant name"
          className="flex-1 min-w-0 px-4 py-3 sm:py-3.5 rounded-xl border-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:text-white dark:placeholder-slate-400 transition-all text-sm sm:text-base"
        />
        <button
          type="submit"
          className="px-5 sm:px-7 py-3 sm:py-3.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold rounded-xl shadow-md shadow-indigo-500/20 transition-all duration-200 text-sm sm:text-base whitespace-nowrap transform hover:scale-105 active:scale-95"
        >
          + Add
        </button>
      </form>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setShowBulk(!showBulk)}
          className={`px-4 py-2.5 font-semibold rounded-xl transition-all duration-200 text-sm sm:text-base ${showBulk ? 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 ring-2 ring-indigo-500' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'}`}
        >
          📋 {showBulk ? "Hide Bulk" : "Bulk Add"}
        </button>
        <div className="flex items-center gap-2">
          <select
            value={randomCount}
            onChange={(e) => setRandomCount(Number(e.target.value))}
            className="w-16 px-2 py-2.5 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium rounded-xl border-2 border-violet-200 dark:border-slate-600 cursor-pointer text-sm sm:text-base focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
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
            className="px-4 py-2.5 bg-violet-500 hover:bg-violet-600 active:bg-violet-700 text-white font-semibold rounded-xl shadow-md shadow-violet-500/20 transition-all duration-200 text-sm sm:text-base whitespace-nowrap transform hover:scale-105 active:scale-95"
          >
            🎲 Random
          </button>
        </div>
      </div>

      {showBulk && (
        <div className="space-y-3 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600">
          <textarea
            value={bulkNames}
            onChange={(e) => setBulkNames(e.target.value)}
            placeholder="Enter names separated by commas or new lines..."
            rows={4}
            className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 resize-none focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:text-white dark:placeholder-slate-400 transition-all"
          />
          <button
            type="button"
            onClick={handleBulkAdd}
            disabled={!bulkNames.trim()}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold rounded-xl shadow-md shadow-indigo-500/20 disabled:opacity-50 disabled:shadow-none transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:transform-none"
          >
            ✓ Add All Names
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
