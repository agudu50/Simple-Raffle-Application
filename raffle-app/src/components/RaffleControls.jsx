export default function RaffleControls({
  onDraw,
  onReset,
  disabled,
  isDrawing,
  winnerCount,
  participantCount,
}) {
  return (
    <div className="mt-8 space-y-4">
      {/* Main Draw Button */}
      <button
        onClick={onDraw}
        disabled={disabled || isDrawing}
        className="group relative w-full py-5 overflow-hidden rounded-2xl text-white text-xl font-bold shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
      >
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 group-hover:from-violet-500 group-hover:via-purple-500 group-hover:to-fuchsia-500 transition-all duration-300"></div>
        
        {/* Shimmer effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        </div>
        
        {/* Button content */}
        <span className="relative flex items-center justify-center gap-3">
          {isDrawing ? (
            <>
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
              <span>Drawing...</span>
            </>
          ) : (
            <>
              <span className="text-2xl group-hover:animate-bounce">🎲</span>
              <span>Draw {winnerCount > 1 ? `${winnerCount} Winners` : "Winner"}</span>
            </>
          )}
        </span>
      </button>

      {/* Secondary Actions */}
      <div className="flex gap-3">
        <button
          onClick={onReset}
          className="flex-1 py-3 px-4 bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 hover:from-slate-300 hover:to-slate-400 dark:hover:from-slate-600 dark:hover:to-slate-700 text-slate-700 dark:text-slate-200 font-medium rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
        >
          🔄 Reset All
        </button>
      </div>

      {/* Participant count badge */}
      {participantCount > 0 && (
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/40 dark:to-purple-900/40 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-medium">
            <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span>
            {participantCount} participant{participantCount !== 1 ? "s" : ""} ready
          </span>
        </div>
      )}
    </div>
  );
}
