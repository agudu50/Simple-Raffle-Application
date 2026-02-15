import { useState, useEffect, useLayoutEffect } from "react";
import useRaffle from "./hooks/useRaffle";
import ParticipantForm from "./components/ParticipantForm";
import ParticipantList from "./components/ParticipantList";
import WinnerDisplay from "./components/WinnerDisplay";
import RaffleControls from "./components/RaffleControls";
import WinnerHistory from "./components/WinnerHistory";
import RaffleSettings from "./components/RaffleSettings";
import PrizeManager from "./components/PrizeManager";
import LandingPage from "./components/LandingPage";

export default function App() {
  const {
    participants,
    winners,
    history,
    isDrawing,
    settings,
    prizes,
    addParticipant,
    addMultipleParticipants,
    removeParticipant,
    clearParticipants,
    shuffleParticipants,
    drawWinners,
    resetRaffle,
    clearHistory,
    updateSettings,
    generateRandomNames,
    addPrize,
    removePrize,
    clearPrizes,
  } = useRaffle();

  const [showLanding, setShowLanding] = useState(() => {
    if (typeof window === 'undefined') return true;
    const hasVisited = localStorage.getItem("raffle-visited");
    return !hasVisited;
  });

  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window === 'undefined') return false;
    const saved = localStorage.getItem("raffle-dark-mode");
    if (saved !== null) {
      return JSON.parse(saved);
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const [showWinnerBanner, setShowWinnerBanner] = useState(false);

  const handleEnterApp = () => {
    setShowLanding(false);
    localStorage.setItem("raffle-visited", "true");
  };

  // Show winner banner when winners are drawn, auto-hide after 10 seconds
  useEffect(() => {
    if (winners.length > 0 && !isDrawing) {
      setShowWinnerBanner(true);
      const timer = setTimeout(() => {
        setShowWinnerBanner(false);
      }, 10000); // Auto-close after 10 seconds
      return () => clearTimeout(timer);
    }
  }, [winners, isDrawing]);

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

  // Check if there's an active winner to show at top
  const hasActiveWinner = winners.length > 0 && !isDrawing && showWinnerBanner;
  const showTopBanner = hasActiveWinner || isDrawing;

  // Show landing page for first-time visitors
  if (showLanding) {
    return <LandingPage onEnter={handleEnterApp} />;
  }

  return (
    <div className="min-h-screen transition-colors duration-300">
      <div className="min-h-screen bg-slate-100 dark:bg-slate-900 py-4 sm:py-8 px-3 sm:px-4">
        <div className="max-w-2xl mx-auto">
          {/* Drawing/Winner Display - Sticky at top */}
          {showTopBanner && (
            <div className="sticky top-0 z-50 -mx-3 sm:-mx-4 px-3 sm:px-4 pb-2 sm:pb-3 pt-1 bg-slate-100 dark:bg-slate-900">
              <WinnerDisplay 
                winners={winners} 
                isDrawing={isDrawing} 
                prizes={prizes} 
                compact={true}
                onClose={() => setShowWinnerBanner(false)}
              />
            </div>
          )}

          {/* Header */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-4 sm:p-8 mb-4 sm:mb-6 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white">
                  🎟️ Raffle Draw
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">Pick your lucky winners!</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowLanding(true)}
                  className="p-3 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 hover:from-indigo-100 hover:to-indigo-200 dark:hover:from-indigo-900/50 dark:hover:to-indigo-800/50 border-2 border-slate-200 dark:border-slate-600 hover:border-indigo-300 dark:hover:border-indigo-700 shadow-sm transition-all duration-200 transform hover:scale-105"
                  title="Back to home"
                >
                  <span className="text-xl">🏠</span>
                </button>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-3 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 hover:from-amber-100 hover:to-amber-200 dark:hover:from-amber-900/50 dark:hover:to-amber-800/50 border-2 border-slate-200 dark:border-slate-600 hover:border-amber-300 dark:hover:border-amber-700 shadow-sm transition-all duration-200 transform hover:scale-105"
                  title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                >
                  <span className="text-xl">{darkMode ? "☀️" : "🌙"}</span>
                </button>
              </div>
            </div>

            <RaffleSettings settings={settings} onUpdate={updateSettings} />

            <ParticipantForm
              onAdd={addParticipant}
              onBulkAdd={addMultipleParticipants}
              onGenerateRandom={generateRandomNames}
            />

            <PrizeManager
              prizes={prizes}
              onAdd={addPrize}
              onRemove={removePrize}
              onClear={clearPrizes}
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

          </div>

          {/* History Section */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-4 sm:p-6 border border-slate-200 dark:border-slate-700">
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
