export default function WinnerDisplay({ winners, isDrawing }) {
  if (!winners || winners.length === 0) {
    if (isDrawing) {
      return (
        <div className="mt-8 p-8 rounded-xl text-center bg-amber-50 dark:bg-amber-900/20 border-2 border-dashed border-amber-400 dark:border-amber-600">
          <div className="text-4xl mb-3 animate-bounce">🎰</div>
          <p className="text-lg font-semibold text-amber-700 dark:text-amber-300">
            Drawing winner...
          </p>
          <div className="flex justify-center gap-1 mt-3">
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
    <div className="mt-8 p-8 rounded-xl text-center bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-400 dark:border-amber-600">
      <div className="text-5xl mb-3">
        {winners.length > 1 ? "🏆" : "🎉"}
      </div>
      <p className="text-xl font-bold text-amber-700 dark:text-amber-300 mb-4">
        {winners.length > 1 ? "Congratulations Winners!" : "We Have a Winner!"}
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        {winners.map((winner, idx) => (
          <span
            key={idx}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500 rounded-full text-lg font-semibold text-white"
          >
            👑 {winner}
          </span>
        ))}
      </div>
    </div>
  );
}
