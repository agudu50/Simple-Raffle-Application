import { useState, useEffect } from "react";
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
    const saved = localStorage.getItem("raffle-dark-mode");
    return saved ? JSON.parse(saved) : window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    localStorage.setItem("raffle-dark-mode", JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "dark" : ""}`}>
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                🎟️ Raffle Draw
              </h1>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {darkMode ? "☀️" : "🌙"}
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
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
            <WinnerHistory history={history} onClear={clearHistory} />

            {history.length === 0 && (
              <p className="text-center text-gray-400 dark:text-gray-500 py-4">
                No draw history yet. Start your first raffle!
              </p>
            )}
          </div>

          {/* Footer */}
          <footer className="text-center mt-6 text-sm text-gray-500 dark:text-gray-400">
            <p>Data is saved locally in your browser</p>
          </footer>
        </div>
      </div>
    </div>
  );
}
