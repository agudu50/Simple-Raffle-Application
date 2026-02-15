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
        className="w-full py-4 sm:py-5 bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white text-lg sm:text-xl font-bold rounded-xl shadow-lg shadow-emerald-500/30 disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
      >
        {isDrawing ? (
          <span className="flex items-center justify-center gap-3">
            <svg
              className="animate-spin h-6 w-6"
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
          <span className="flex items-center justify-center gap-2">
            <span className="text-2xl">🎰</span>
            Draw {winnerCount > 1 ? `${winnerCount} Winners` : "Winner"}
          </span>
        )}
      </button>

      <button
        onClick={onReset}
        className="w-full py-3 bg-slate-200 dark:bg-slate-700 hover:bg-red-100 dark:hover:bg-red-900/30 text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 font-semibold rounded-xl border-2 border-transparent hover:border-red-200 dark:hover:border-red-800/50 transition-all duration-200"
      >
        🔄 Reset All
      </button>

      {participantCount > 0 && (
        <div className="flex items-center justify-center gap-2 py-2">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
            {participantCount} participant{participantCount !== 1 ? "s" : ""} ready
          </p>
        </div>
      )}
    </div>
  );
}
