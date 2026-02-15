import { useState } from "react";

export default function ParticipantForm({ onAdd, onBulkAdd, onExport, onImport, participantCount }) {
  const [name, setName] = useState("");
  const [showBulk, setShowBulk] = useState(false);
  const [bulkNames, setBulkNames] = useState("");
  const [message, setMessage] = useState(null);

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

  const handleExport = () => {
    const data = onExport();
    const blob = new Blob([data], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "raffle-participants.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result;
      if (typeof text === "string") {
        const result = onImport(text);
        setMessage({
          type: "success",
          text: `Imported ${result.added} participants${result.duplicates > 0 ? ` (${result.duplicates} duplicates skipped)` : ""}`,
        });
        setTimeout(() => setMessage(null), 3000);
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="flex gap-3">
        <div className="flex-1 relative">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter participant name"
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-slate-600 bg-white/50 dark:bg-slate-700/50 backdrop-blur-sm focus:outline-none focus:border-violet-500 dark:focus:border-violet-400 focus:ring-4 focus:ring-violet-500/20 dark:text-white dark:placeholder-slate-400 transition-all duration-300"
          />
        </div>
        <button
          type="submit"
          className="px-6 py-3 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg shadow-violet-500/30 hover:shadow-xl hover:shadow-violet-500/40 transform hover:scale-105 active:scale-95 transition-all duration-300"
        >
          ➕ Add
        </button>
      </form>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => setShowBulk(!showBulk)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-900/40 text-blue-700 dark:text-blue-300 font-medium rounded-lg hover:from-blue-200 hover:to-indigo-200 dark:hover:from-blue-800/40 dark:hover:to-indigo-800/40 transition-all duration-300"
        >
          📋 {showBulk ? "Hide Bulk" : "Bulk Add"}
        </button>
        <button
          type="button"
          onClick={handleExport}
          disabled={participantCount === 0}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-900/40 dark:to-teal-900/40 text-emerald-700 dark:text-emerald-300 font-medium rounded-lg hover:from-emerald-200 hover:to-teal-200 dark:hover:from-emerald-800/40 dark:hover:to-teal-800/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
        >
          📤 Export
        </button>
        <label className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-fuchsia-100 to-pink-100 dark:from-fuchsia-900/40 dark:to-pink-900/40 text-fuchsia-700 dark:text-fuchsia-300 font-medium rounded-lg hover:from-fuchsia-200 hover:to-pink-200 dark:hover:from-fuchsia-800/40 dark:hover:to-pink-800/40 cursor-pointer transition-all duration-300">
          📥 Import
          <input
            type="file"
            accept=".txt,.csv"
            onChange={handleImport}
            className="hidden"
          />
        </label>
      </div>

      {showBulk && (
        <div className="space-y-3 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-700/50 dark:to-slate-800/50 rounded-xl border border-blue-200/50 dark:border-slate-600/50">
          <textarea
            value={bulkNames}
            onChange={(e) => setBulkNames(e.target.value)}
            placeholder="Enter names separated by commas or new lines..."
            rows={4}
            className="w-full px-4 py-3 rounded-xl border-2 border-blue-200 dark:border-slate-600 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm resize-none focus:outline-none focus:border-violet-500 dark:focus:border-violet-400 focus:ring-4 focus:ring-violet-500/20 dark:text-white dark:placeholder-slate-400 transition-all duration-300"
          />
          <button
            type="button"
            onClick={handleBulkAdd}
            disabled={!bulkNames.trim()}
            className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 transition-all duration-300"
          >
            Add All Names
          </button>
        </div>
      )}

      {message && (
        <div
          className={`flex items-center gap-2 p-4 rounded-xl font-medium ${
            message.type === "error"
              ? "bg-gradient-to-r from-red-100 to-rose-100 dark:from-red-900/40 dark:to-rose-900/40 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800"
              : "bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-900/40 dark:to-teal-900/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
          }`}
        >
          <span>{message.type === "error" ? "❌" : "✅"}</span>
          {message.text}
        </div>
      )}
    </div>
  );
}
