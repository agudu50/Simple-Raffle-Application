import { useState } from "react";

export default function ParticipantList({
  participants,
  onRemove,
  onClear,
  onShuffle,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAll, setShowAll] = useState(false);

  const filteredParticipants = participants.filter((name) =>
    name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayLimit = 10;
  const displayedParticipants = showAll
    ? filteredParticipants
    : filteredParticipants.slice(0, displayLimit);
  const hasMore = filteredParticipants.length > displayLimit;

  if (participants.length === 0) {
    return (
      <div className="mt-6 p-8 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl text-center bg-slate-50 dark:bg-slate-800/50">
        <div className="text-4xl mb-3">👥</div>
        <p className="text-lg font-medium text-slate-600 dark:text-slate-300 mb-1">No participants yet</p>
        <p className="text-sm text-slate-400 dark:text-slate-500">Add some names to get started!</p>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="flex items-center gap-2 font-semibold text-slate-700 dark:text-slate-200">
          👥 Participants
          <span className="px-2 py-0.5 bg-indigo-600 text-white text-sm font-medium rounded-full">
            {participants.length}
          </span>
        </h3>
        <div className="flex gap-2">
          <button
            onClick={onShuffle}
            className="px-3 py-1.5 text-sm font-medium bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
            title="Shuffle list"
          >
            🔀 Shuffle
          </button>
          <button
            onClick={onClear}
            className="px-3 py-1.5 text-sm font-medium bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 rounded-lg hover:bg-red-200 dark:hover:bg-red-800/40 transition-colors"
          >
            🗑️ Clear
          </button>
        </div>
      </div>

      {participants.length > 5 && (
        <div className="relative mb-4">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search participants..."
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:text-white dark:placeholder-slate-400 transition-colors"
          />
        </div>
      )}

      <ul className="space-y-2 max-h-72 overflow-y-auto">
        {displayedParticipants.map((name, index) => {
          const originalIndex = participants.indexOf(name);
          return (
            <li
              key={`${name}-${originalIndex}`}
              className="group flex justify-between items-center p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-7 h-7 bg-indigo-600 text-white text-xs font-medium rounded-full">
                  {originalIndex + 1}
                </span>
                <span className="font-medium text-slate-700 dark:text-slate-200">{name}</span>
              </div>
              <button
                onClick={() => onRemove(originalIndex)}
                className="opacity-0 group-hover:opacity-100 px-2 py-1 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/40 rounded text-sm transition-all"
              >
                ✕
              </button>
            </li>
          );
        })}
      </ul>

      {hasMore && !showAll && (
        <button
          onClick={() => setShowAll(true)}
          className="w-full mt-3 py-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition-colors"
        >
          Show {filteredParticipants.length - displayLimit} more
        </button>
      )}

      {showAll && hasMore && (
        <button
          onClick={() => setShowAll(false)}
          className="w-full mt-3 py-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition-colors"
        >
          ⬆️ Show less
        </button>
      )}
    </div>
  );
}
