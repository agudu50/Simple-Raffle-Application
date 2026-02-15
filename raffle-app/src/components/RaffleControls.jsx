export default function RaffleControls({
  onDraw,
  onReset,
  disabled,
  isDrawing,
  winnerCount,
  participantCount,
}) {
  return (
    <div className="mt-6 sm:mt-8 space-y-3 sm:space-y-4">
      <button
        onClick={onDraw}
        disabled={disabled || isDrawing}
        className="w-full py-3.5 sm:py-4 bg-indigo-600 hover:bg-indigo-700 text-white text-base sm:text-lg font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
          <>🎲 Draw {winnerCount > 1 ? `${winnerCount} Winners` : "Winner"}</>
        )}
      </button>

      <button
        onClick={onReset}
        className="w-full py-2.5 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-medium rounded-lg transition-colors"
      >
        🔄 Reset All
      </button>

      {participantCount > 0 && (
        <p className="text-center text-sm text-slate-500 dark:text-slate-400">
          {participantCount} participant{participantCount !== 1 ? "s" : ""} in the pool
        </p>
      )}
    </div>
  );
}
