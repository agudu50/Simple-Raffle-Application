import { useState, useEffect, useLayoutEffect } from "react";
import useRaffle from "./hooks/useRaffle";
import ParticipantForm from "./components/ParticipantForm";
import ParticipantList from "./components/ParticipantList";
import WinnerDisplay from "./components/WinnerDisplay";
import RaffleControls from "./components/RaffleControls";
import WinnerHistory from "./components/WinnerHistory";
import RaffleSettings from "./components/RaffleSettings";

export default function App() {
  const {
    participants,
    winners,
    history,
    isDrawing,
    settings,
    addParticipant,
    addMultipleParticipants,
    removeParticipant,
    clearParticipants,
    shuffleParticipants,
    drawWinners,
    resetRaffle,
    clearHistory,
    updateSettings,
    exportParticipants,
    importParticipants,
  } = useRaffle();

  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window === 'undefined') return false;
    const saved = localStorage.getItem("raffle-dark-mode");
    if (saved !== null) {
      return JSON.parse(saved);
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // Apply dark mode class synchronously before paint
  useLayoutEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Persist preference to localStorage
  useEffect(() => {
    localStorage.setItem("raffle-dark-mode", JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <div className="min-h-screen transition-colors duration-300">
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 dark:from-slate-950 dark:via-purple-950 dark:to-slate-900 py-8 px-4">
        {/* Decorative background elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 dark:bg-purple-900/30 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-300 dark:bg-pink-900/30 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-300 dark:bg-indigo-900/20 rounded-full blur-3xl opacity-30"></div>
        </div>

        <div className="max-w-2xl mx-auto relative z-10">
          {/* Header */}
          <div className="backdrop-blur-xl bg-white/70 dark:bg-slate-800/70 rounded-3xl shadow-2xl shadow-purple-500/10 dark:shadow-purple-500/5 p-8 mb-6 border border-white/50 dark:border-slate-700/50">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-4xl font-extrabold bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 dark:from-violet-400 dark:via-purple-400 dark:to-fuchsia-400 bg-clip-text text-transparent">
                  🎟️ Raffle Draw
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Pick your lucky winners!</p>
              </div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-3 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-slate-700 dark:to-slate-800 hover:from-gray-200 hover:to-gray-300 dark:hover:from-slate-600 dark:hover:to-slate-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
                title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                <span className="text-xl">{darkMode ? "☀️" : "🌙"}</span>
              </button>
            </div>

            <RaffleSettings settings={settings} onUpdate={updateSettings} />

            <ParticipantForm
              onAdd={addParticipant}
              onBulkAdd={addMultipleParticipants}
              onExport={exportParticipants}
              onImport={importParticipants}
              participantCount={participants.length}
            />

            <ParticipantList
              participants={participants}
              onRemove={removeParticipant}
              onClear={clearParticipants}
              onShuffle={shuffleParticipants}
            />

            <RaffleControls
              onDraw={drawWinners}
              onReset={resetRaffle}
              disabled={participants.length === 0}
              isDrawing={isDrawing}
              winnerCount={settings.winnerCount}
              participantCount={participants.length}
            />

            <WinnerDisplay winners={winners} isDrawing={isDrawing} />
          </div>

          {/* History Section */}
          <div className="backdrop-blur-xl bg-white/70 dark:bg-slate-800/70 rounded-3xl shadow-2xl shadow-purple-500/10 dark:shadow-purple-500/5 p-6 border border-white/50 dark:border-slate-700/50">
            <WinnerHistory history={history} onClear={clearHistory} />

            {history.length === 0 && (
              <div className="text-center py-8">
                <div className="text-4xl mb-3">📜</div>
                <p className="text-gray-400 dark:text-gray-500">
                  No draw history yet. Start your first raffle!
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <footer className="text-center mt-8 text-sm text-gray-500 dark:text-gray-400">
            <p className="flex items-center justify-center gap-2">
              <span>💾</span> Data is saved locally in your browser
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}
