export default function WinnerDisplay({ winners, isDrawing }) {
  if (!winners || winners.length === 0) {
    if (isDrawing) {
      return (
        <div className="mt-8 p-8 rounded-2xl text-center relative overflow-hidden">
          {/* Animated border */}
          <div className="absolute inset-0 bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 rounded-2xl animate-pulse"></div>
          <div className="absolute inset-[2px] bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-slate-800 dark:to-slate-900 rounded-2xl"></div>
          
          <div className="relative">
            <div className="text-5xl mb-4 animate-bounce">🎰</div>
            <p className="text-xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-400 bg-clip-text text-transparent">
              Spinning the wheel...
            </p>
            <div className="flex justify-center gap-1 mt-4">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-3 h-3 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full animate-bounce"
                  style={{ animationDelay: `${i * 0.15}s` }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      );
    }
    return null;
  }

  return (
    <div className="mt-8 p-8 rounded-2xl text-center relative overflow-hidden">
      {/* Celebratory gradient border */}
      <div className="absolute inset-0 bg-gradient-to-r from-amber-400 via-yellow-300 to-orange-400 rounded-2xl"></div>
      <div className="absolute inset-[3px] bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 dark:from-slate-800 dark:via-slate-850 dark:to-slate-900 rounded-2xl"></div>
      
      {/* Sparkle decorations */}
      <div className="absolute top-4 left-4 text-2xl animate-pulse">✨</div>
      <div className="absolute top-4 right-4 text-2xl animate-pulse" style={{ animationDelay: '0.5s' }}>✨</div>
      <div className="absolute bottom-4 left-8 text-xl animate-pulse" style={{ animationDelay: '0.3s' }}>⭐</div>
      <div className="absolute bottom-4 right-8 text-xl animate-pulse" style={{ animationDelay: '0.7s' }}>⭐</div>
      
      <div className="relative">
        <div className="text-6xl mb-4">
          {winners.length > 1 ? "🏆" : "🎉"}
        </div>
        <p className="text-2xl font-extrabold bg-gradient-to-r from-amber-600 via-yellow-500 to-orange-600 dark:from-amber-400 dark:via-yellow-300 dark:to-orange-400 bg-clip-text text-transparent mb-6">
          {winners.length > 1 ? "Congratulations Winners!" : "We Have a Winner!"}
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {winners.map((winner, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full shadow-lg shadow-amber-500/30 text-xl font-bold text-white animate-bounce"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <span>👑</span>
              {winner}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
