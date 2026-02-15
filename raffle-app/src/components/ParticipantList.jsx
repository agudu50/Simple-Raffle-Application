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
      <div className="mt-6 p-8 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-2xl text-center bg-gradient-to-br from-slate-50 to-gray-50 dark:from-slate-800/50 dark:to-slate-900/50">
        <div className="text-5xl mb-4">👥</div>
        <p className="text-lg font-medium text-slate-600 dark:text-slate-300 mb-1">No participants yet</p>
        <p className="text-sm text-slate-400 dark:text-slate-500">Add some names to get started!</p>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="flex items-center gap-2 font-bold text-lg text-slate-700 dark:text-slate-200">
          <span>👥</span>
          <span>Participants</span>
          <span className="px-2.5 py-1 bg-gradient-to-r from-violet-500 to-purple-600 text-white text-sm font-bold rounded-full">
            {participants.length}
          </span>
        </h3>
        <div className="flex gap-2">
          <button
            onClick={onShuffle}
            className="px-3 py-1.5 text-sm font-medium bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-900/40 text-blue-700 dark:text-blue-300 rounded-lg hover:from-blue-200 hover:to-indigo-200 dark:hover:from-blue-800/40 dark:hover:to-indigo-800/40 transition-all duration-300"
            title="Shuffle list"
          >
            🔀 Shuffle
          </button>
          <button
            onClick={onClear}
            className="px-3 py-1.5 text-sm font-medium bg-gradient-to-r from-red-100 to-rose-100 dark:from-red-900/40 dark:to-rose-900/40 text-red-700 dark:text-red-300 rounded-lg hover:from-red-200 hover:to-rose-200 dark:hover:from-red-800/40 dark:hover:to-rose-800/40 transition-all duration-300"
          >
            🗑️ Clear
          </button>
        </div>
      </div>

      {participants.length > 5 && (
        <div className="relative mb-4">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search participants..."
            className="w-full pl-11 pr-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-600 bg-white/50 dark:bg-slate-700/50 backdrop-blur-sm focus:outline-none focus:border-violet-500 dark:focus:border-violet-400 focus:ring-4 focus:ring-violet-500/20 dark:text-white dark:placeholder-slate-400 transition-all duration-300"
          />
        </div>
      )}

      <ul className="space-y-2 max-h-72 overflow-y-auto pr-1">
        {displayedParticipants.map((name, index) => {
          const originalIndex = participants.indexOf(name);
          return (
            <li
              key={`${name}-${originalIndex}`}
              className="group flex justify-between items-center p-3 rounded-xl bg-gradient-to-r from-white to-slate-50 dark:from-slate-700/50 dark:to-slate-800/50 border border-slate-200/70 dark:border-slate-600/50 hover:border-violet-300 dark:hover:border-violet-600 hover:shadow-md hover:shadow-violet-500/10 transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-violet-500 to-purple-600 text-white text-xs font-bold rounded-full shadow-lg shadow-violet-500/30">
                  {originalIndex + 1}
                </span>
                <span className="font-medium text-slate-700 dark:text-slate-200">{name}</span>
              </div>
              <button
                onClick={() => onRemove(originalIndex)}
                className="opacity-0 group-hover:opacity-100 px-3 py-1.5 text-red-500 hover:text-white hover:bg-red-500 rounded-lg text-sm font-medium transition-all duration-300"
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
          className="w-full mt-4 py-2.5 text-sm font-medium text-violet-600 dark:text-violet-400 bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 rounded-xl hover:from-violet-100 hover:to-purple-100 dark:hover:from-violet-900/40 dark:hover:to-purple-900/40 transition-all duration-300"
        >
          ⬇️ Show {filteredParticipants.length - displayLimit} more participants
        </button>
      )}

      {showAll && hasMore && (
        <button
          onClick={() => setShowAll(false)}
          className="w-full mt-4 py-2.5 text-sm font-medium text-violet-600 dark:text-violet-400 bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 rounded-xl hover:from-violet-100 hover:to-purple-100 dark:hover:from-violet-900/40 dark:hover:to-purple-900/40 transition-all duration-300"
        >
          ⬆️ Show less
        </button>
      )}
    </div>
  );
}
