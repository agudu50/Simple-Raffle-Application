export default function RaffleControls({
  onDraw,
  onReset,
  disabled,
  isDrawing,
  winnerCount,
  participantCount,
}) {
  return (
    <div className="mt-6 space-y-4">
      <button
        onClick={onDraw}
        disabled={disabled || isDrawing}
        className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-lg font-bold rounded-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] transition-all"
      >
        {isDrawing ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="animate-spin h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Drawing...
          </span>
        ) : (
          <>
            🎲 Draw {winnerCount > 1 ? `${winnerCount} Winners` : "Winner"}
          </>
        )}
      </button>

      <div className="flex gap-3">
        <button
          onClick={onReset}
          className="flex-1 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded transition-colors"
        >
          Reset All
        </button>
      </div>

      {participantCount > 0 && (
        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
          {participantCount} participant{participantCount !== 1 ? "s" : ""} in the pool
        </p>
      )}
    </div>
  );
}
