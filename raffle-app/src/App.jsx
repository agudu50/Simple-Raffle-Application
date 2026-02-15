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
      <div className="min-h-screen bg-slate-100 dark:bg-slate-900 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 mb-6 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
                  🎟️ Raffle Draw
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Pick your lucky winners!</p>
              </div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-3 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
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
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 border border-slate-200 dark:border-slate-700">
            <WinnerHistory history={history} onClear={clearHistory} />

            {history.length === 0 && (
              <div className="text-center py-8">
                <div className="text-4xl mb-3">📜</div>
                <p className="text-slate-400 dark:text-slate-500">
                  No draw history yet. Start your first raffle!
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <footer className="text-center mt-8 text-sm text-slate-500 dark:text-slate-400">
            <p className="flex items-center justify-center gap-2">
              <span>💾</span> Data is saved locally in your browser
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}
