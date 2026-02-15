export default function WinnerDisplay({ winners, isDrawing, prizes = [], compact = false, onClose }) {
  if (!winners || winners.length === 0) {
    if (isDrawing) {
      return (
        <div className={`${compact ? 'mt-0 p-4' : 'mt-6 sm:mt-8 p-4 sm:p-8'} rounded-xl text-center bg-amber-50 dark:bg-amber-900/20 border-2 border-dashed border-amber-400 dark:border-amber-600`}>
          <div className={`${compact ? 'text-3xl mb-2' : 'text-3xl sm:text-4xl mb-3'} animate-bounce`}>🎰</div>
          <p className={`${compact ? 'text-base' : 'text-base sm:text-lg'} font-semibold text-amber-700 dark:text-amber-300`}>
            Drawing winner...
          </p>
          <div className="flex justify-center gap-1 mt-2 sm:mt-3">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-amber-500 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }}
              ></div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  }

  return (
    <div className={`relative ${compact ? 'mt-0 p-4' : 'mt-6 sm:mt-8 p-4 sm:p-8'} rounded-xl text-center bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-400 dark:border-amber-600 ${compact ? 'shadow-lg' : ''}`}>
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-2 right-2 sm:top-3 sm:right-3 w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-amber-200/80 dark:bg-amber-800/50 hover:bg-amber-300 dark:hover:bg-amber-700 text-amber-700 dark:text-amber-200 transition-colors text-sm sm:text-base"
          title="Close"
        >
          ✕
        </button>
      )}
      <div className={`${compact ? 'text-3xl mb-2' : 'text-4xl sm:text-5xl mb-3'}`}>
        {winners.length > 1 ? "🏆" : "🎉"}
      </div>
      <p className={`${compact ? 'text-lg mb-2' : 'text-lg sm:text-xl mb-3 sm:mb-4'} font-bold text-amber-700 dark:text-amber-300`}>
        {winners.length > 1 ? "Congratulations Winners!" : "We Have a Winner!"}
      </p>
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
        {winners.map((winner, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center gap-1"
          >
            <span className={`inline-flex items-center gap-1.5 sm:gap-2 ${compact ? 'px-3 py-1.5 text-base' : 'px-3 sm:px-5 py-2 sm:py-2.5 text-base sm:text-lg'} bg-amber-500 rounded-full font-semibold text-white`}>
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
