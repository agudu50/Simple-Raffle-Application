export default function WinnerDisplay({ winners, isDrawing, prizes = [], compact = false, onClose }) {
  if (!winners || winners.length === 0) {
    if (isDrawing) {
      return (
        <div className={`${compact ? 'py-2.5 px-4' : 'mt-6 sm:mt-8 p-4 sm:p-8'} rounded-xl ${compact ? 'flex items-center justify-center gap-3' : 'text-center'} bg-amber-50 dark:bg-amber-900/20 border-2 border-dashed border-amber-400 dark:border-amber-600`}>
          <div className={`${compact ? 'text-xl' : 'text-3xl sm:text-4xl mb-3'} animate-bounce`}>🎰</div>
          <p className={`${compact ? 'text-sm' : 'text-base sm:text-lg'} font-semibold text-amber-700 dark:text-amber-300`}>
            Drawing winner...
          </p>
          <div className={`flex gap-1 ${compact ? '' : 'justify-center mt-2 sm:mt-3'}`}>
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }}
              ></div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  }

  // Compact version - small horizontal banner
  if (compact) {
    return (
      <div className="relative py-2.5 px-4 pr-10 rounded-xl bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-400 dark:border-amber-600 shadow-md">
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-1/2 -translate-y-1/2 right-2 w-6 h-6 flex items-center justify-center rounded-full bg-amber-200/80 dark:bg-amber-800/50 hover:bg-amber-300 dark:hover:bg-amber-700 text-amber-700 dark:text-amber-200 transition-colors text-xs"
            title="Close"
          >
            ✕
          </button>
        )}
        <div className="flex items-center justify-center gap-2 flex-wrap">
          <span className="text-lg">{winners.length > 1 ? "🏆" : "🎉"}</span>
          <span className="text-sm font-semibold text-amber-700 dark:text-amber-300">
            {winners.length > 1 ? "Winners:" : "Winner:"}
          </span>
          {winners.map((winner, idx) => (
            <div key={idx} className="flex items-center gap-1">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-500 rounded-full text-sm font-semibold text-white">
                👑 {winner}
              </span>
              {prizes[idx] && (
                <span className="inline-flex items-center gap-0.5 px-2 py-0.5 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 rounded-full text-xs font-medium">
                  🎁 {prizes[idx]}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Full version
  return (
    <div className="relative mt-6 sm:mt-8 p-4 sm:p-8 rounded-xl text-center bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-400 dark:border-amber-600">
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-2 right-2 sm:top-3 sm:right-3 w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-amber-200/80 dark:bg-amber-800/50 hover:bg-amber-300 dark:hover:bg-amber-700 text-amber-700 dark:text-amber-200 transition-colors text-sm sm:text-base"
          title="Close"
        >
          ✕
        </button>
      )}
      <div className="text-4xl sm:text-5xl mb-3">
        {winners.length > 1 ? "🏆" : "🎉"}
      </div>
      <p className="text-lg sm:text-xl mb-3 sm:mb-4 font-bold text-amber-700 dark:text-amber-300">
        {winners.length > 1 ? "Congratulations Winners!" : "We Have a Winner!"}
      </p>
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
        {winners.map((winner, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center gap-1"
          >
            <span className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 text-base sm:text-lg bg-amber-500 rounded-full font-semibold text-white">
              👑 {winner}
            </span>
            {prizes[idx] && (
              <span className="inline-flex items-center gap-1 px-2 sm:px-3 py-0.5 sm:py-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 rounded-full text-xs sm:text-sm font-medium">
                🎁 {prizes[idx]}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
