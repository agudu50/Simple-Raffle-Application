export default function WinnerDisplay({ winners, isDrawing }) {
  if (!winners || winners.length === 0) {
    if (isDrawing) {
      return (
        <div className="mt-6 p-6 border-2 border-dashed border-yellow-400 rounded-lg text-center animate-pulse bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-600">
          <div className="text-2xl mb-2">🎰</div>
          <p className="text-lg font-medium text-yellow-600 dark:text-yellow-400">
            Drawing winner...
          </p>
        </div>
      );
    }
    return null;
  }

  return (
    <div className="mt-6 p-6 bg-gradient-to-r from-yellow-100 to-amber-100 dark:from-yellow-900/40 dark:to-amber-900/40 border-2 border-yellow-400 dark:border-yellow-600 rounded-lg text-center">
      <div className="text-4xl mb-3">
        {winners.length > 1 ? "🏆" : "🎉"}
      </div>
      <p className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-3">
        {winners.length > 1 ? "Winners!" : "Winner!"}
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        {winners.map((winner, idx) => (
          <span
            key={idx}
            className="inline-block px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-md text-lg font-bold text-yellow-600 dark:text-yellow-400 animate-bounce"
            style={{ animationDelay: `${idx * 0.1}s` }}
          >
            {winner}
          </span>
        ))}
      </div>
    </div>
  );
}
