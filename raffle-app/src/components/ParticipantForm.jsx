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
    <div className="space-y-3">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter participant name"
          className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
        >
          Add
        </button>
      </form>

      <div className="flex flex-wrap gap-2 text-sm">
        <button
          type="button"
          onClick={() => setShowBulk(!showBulk)}
          className="text-blue-500 hover:text-blue-700 dark:text-blue-400"
        >
          {showBulk ? "Hide" : "Bulk Add"}
        </button>
        <button
          type="button"
          onClick={handleExport}
          disabled={participantCount === 0}
          className="text-green-500 hover:text-green-700 disabled:opacity-50 dark:text-green-400"
        >
          Export List
        </button>
        <label className="text-purple-500 hover:text-purple-700 cursor-pointer dark:text-purple-400">
          Import List
          <input
            type="file"
            accept=".txt,.csv"
            onChange={handleImport}
            className="hidden"
          />
        </label>
      </div>

      {showBulk && (
        <div className="space-y-2">
          <textarea
            value={bulkNames}
            onChange={(e) => setBulkNames(e.target.value)}
            placeholder="Enter names separated by commas or new lines"
            rows={4}
            className="w-full border rounded px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
          />
          <button
            type="button"
            onClick={handleBulkAdd}
            disabled={!bulkNames.trim()}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm disabled:opacity-50 transition-colors"
          >
            Add All Names
          </button>
        </div>
      )}

      {message && (
        <div
          className={`text-sm p-2 rounded ${
            message.type === "error"
              ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200"
              : "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200"
          }`}
        >
          {message.text}
        </div>
      )}
    </div>
  );
}
