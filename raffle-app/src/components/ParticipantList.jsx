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
      <div className="mt-4 p-6 border-2 border-dashed rounded-lg text-center text-gray-400 dark:border-gray-600">
        <p className="text-lg mb-1">No participants yet</p>
        <p className="text-sm">Add some names to get started!</p>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-700 dark:text-gray-200">
          Participants ({participants.length})
        </h3>
        <div className="flex gap-2">
          <button
            onClick={onShuffle}
            className="text-sm text-blue-500 hover:text-blue-700 dark:text-blue-400"
            title="Shuffle list"
          >
            🔀 Shuffle
          </button>
          <button
            onClick={onClear}
            className="text-sm text-red-500 hover:text-red-700 dark:text-red-400"
          >
            Clear All
          </button>
        </div>
      </div>

      {participants.length > 5 && (
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search participants..."
          className="w-full mb-3 px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
        />
      )}

      <ul className="space-y-2 max-h-64 overflow-y-auto">
        {displayedParticipants.map((name, index) => {
          const originalIndex = participants.indexOf(name);
          return (
            <li
              key={`${name}-${originalIndex}`}
              className="flex justify-between items-center border p-3 rounded hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-400 font-mono w-6">
                  {originalIndex + 1}
                </span>
                <span className="dark:text-white">{name}</span>
              </div>
              <button
                onClick={() => onRemove(originalIndex)}
                className="text-red-500 hover:text-red-700 text-sm px-2 py-1 hover:bg-red-50 rounded dark:hover:bg-red-900/30"
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
          className="w-full mt-2 text-sm text-blue-500 hover:text-blue-700 dark:text-blue-400"
        >
          Show {filteredParticipants.length - displayLimit} more...
        </button>
      )}

      {showAll && hasMore && (
        <button
          onClick={() => setShowAll(false)}
          className="w-full mt-2 text-sm text-blue-500 hover:text-blue-700 dark:text-blue-400"
        >
          Show less
        </button>
      )}
    </div>
  );
}
