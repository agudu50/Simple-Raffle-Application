import { useState, useEffect, useCallback } from "react";
import confetti from "canvas-confetti";

const STORAGE_KEY = "raffle-app-data";
const HISTORY_CACHE_DURATION =  3 * 60 * 1000; 

// Common first names for random generation
const RANDOM_NAMES = [
  "Emma", "Liam", "Olivia", "Noah", "Ava", "Ethan", "Sophia", "Mason",
  "Isabella", "William", "Mia", "James", "Charlotte", "Oliver", "Amelia",
  "Benjamin", "Harper", "Elijah", "Evelyn", "Lucas", "Abigail", "Henry",
  "Emily", "Alexander", "Elizabeth", "Michael", "Sofia", "Daniel", "Avery",
  "Matthew", "Ella", "Aiden", "Scarlett", "Joseph", "Grace", "Samuel",
  "Chloe", "David", "Victoria", "Jackson", "Riley", "Sebastian", "Aria",
  "Jack", "Lily", "Owen", "Aurora", "Gabriel", "Zoey", "Carter", "Penelope",
  "Jayden", "Layla", "John", "Nora", "Luke", "Camila", "Anthony", "Hannah",
  "Isaac", "Lillian", "Dylan", "Addison", "Leo", "Eleanor", "Lincoln", "Natalie",
  "Ryan", "Luna", "Nathan", "Savannah", "Aaron", "Brooklyn", "Thomas", "Leah"
];

export default function useRaffle() {
  const [participants, setParticipants] = useState([]);
  const [winners, setWinners] = useState([]);
  const [history, setHistory] = useState([]);
  const [historyCachedAt, setHistoryCachedAt] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [prizes, setPrizes] = useState([]);
  const [settings, setSettings] = useState({
    winnerCount: 1,
    allowDuplicates: false,
    removeWinnersFromPool: false,
    animationDuration: 2000,
  });
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.participants) setParticipants(data.participants);
        if (data.winners) setWinners(data.winners);
        if (data.prizes) setPrizes(data.prizes);
        if (data.settings) setSettings((prev) => ({ ...prev, ...data.settings }));
        
        // Check if history cache is still valid (within 5 minutes)
        if (data.history && data.historyCachedAt) {
          const cacheAge = Date.now() - data.historyCachedAt;
          if (cacheAge < HISTORY_CACHE_DURATION) {
            setHistory(data.history);
            setHistoryCachedAt(data.historyCachedAt);
          } else {
            // Cache expired, clear history
            console.log("History cache expired after 5 minutes");
          }
        }
      } catch (e) {
        console.error("Failed to load saved data:", e);
      }
    }
    setIsInitialized(true);
  }, []);

  // Save to localStorage on changes (only after initial load)
  useEffect(() => {
    if (!isInitialized) return;
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ 
        participants, 
        winners, 
        history, 
        historyCachedAt,
        prizes, 
        settings 
      })
    );
  }, [participants, winners, history, historyCachedAt, prizes, settings, isInitialized]);

  const triggerConfetti = useCallback(() => {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff"],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff"],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  const addParticipant = useCallback((name) => {
    const trimmed = name.trim();
    if (!trimmed) return { success: false, error: "Name cannot be empty" };
    
    setParticipants((prev) => {
      const isDuplicate = prev.some(
        (p) => p.toLowerCase() === trimmed.toLowerCase()
      );
      if (isDuplicate) {
        return prev; // Return unchanged if duplicate
      }
      return [...prev, trimmed];
    });
    
    return { success: true };
  }, []);

  const addMultipleParticipants = useCallback((names) => {
    const nameList = names
      .split(/[,\n]/)
      .map((n) => n.trim())
      .filter((n) => n.length > 0);
    
    let added = 0;
    let duplicates = 0;
    
    setParticipants((prev) => {
      const existing = new Set(prev.map((p) => p.toLowerCase()));
      const newNames = [];
      
      nameList.forEach((name) => {
        if (!existing.has(name.toLowerCase())) {
          existing.add(name.toLowerCase());
          newNames.push(name);
          added++;
        } else {
          duplicates++;
        }
      });
      
      return [...prev, ...newNames];
    });
    
    return { added, duplicates };
  }, []);

  const removeParticipant = useCallback((index) => {
    setParticipants((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const clearParticipants = useCallback(() => {
    setParticipants([]);
  }, []);

  const shuffleParticipants = useCallback(() => {
    setParticipants((prev) => {
      const shuffled = [...prev];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    });
  }, []);

  const drawWinners = useCallback(() => {
    if (participants.length === 0 || isDrawing) return;

    setIsDrawing(true);
    setWinners([]);

    // Animation effect - show random names rapidly before settling
    const animationEnd = Date.now() + settings.animationDuration;
    let pool = [...participants];
    const selectedWinners = [];

    const animate = () => {
      if (Date.now() < animationEnd) {
        // Show random preview
        const previewIndex = Math.floor(Math.random() * pool.length);
        setWinners([pool[previewIndex]]);
        setTimeout(animate, 50);
      } else {
        // Finalize selection
        const count = Math.min(settings.winnerCount, pool.length);
        
        for (let i = 0; i < count; i++) {
          const randomIndex = Math.floor(Math.random() * pool.length);
          selectedWinners.push(pool[randomIndex]);
          pool = pool.filter((_, idx) => idx !== randomIndex);
        }

        setWinners(selectedWinners);
        setIsDrawing(false);
        triggerConfetti();

        // Add to history with prizes
        const winnersWithPrizes = selectedWinners.map((winner, index) => ({
          name: winner,
          prize: prizes[index] || null,
        }));
        const historyEntry = {
          id: Date.now(),
          winners: winnersWithPrizes,
          timestamp: new Date().toISOString(),
          participantCount: participants.length,
        };
        setHistory((prev) => [historyEntry, ...prev].slice(0, 50)); // Keep last 50 draws
        setHistoryCachedAt(Date.now()); // Update cache timestamp for 5-minute expiration

        // Remove winners from pool if setting enabled
        if (settings.removeWinnersFromPool) {
          setParticipants((prev) =>
            prev.filter((p) => !selectedWinners.includes(p))
          );
        }
      }
    };

    animate();
  }, [participants, settings, prizes, isDrawing, triggerConfetti]);

  const resetRaffle = useCallback(() => {
    setParticipants([]);
    setWinners([]);
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
    setHistoryCachedAt(null);
  }, []);

  const updateSettings = useCallback((newSettings) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  }, []);

  // Random name generator
  const generateRandomNames = useCallback((count = 5) => {
    const shuffled = [...RANDOM_NAMES].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, Math.min(count, RANDOM_NAMES.length));
    return addMultipleParticipants(selected.join(","));
  }, [addMultipleParticipants]);

  // Prize management
  const addPrize = useCallback((prizeName) => {
    const trimmed = prizeName.trim();
    if (!trimmed) return { success: false, error: "Prize name cannot be empty" };
    setPrizes((prev) => [...prev, trimmed]);
    return { success: true };
  }, []);

  const removePrize = useCallback((index) => {
    setPrizes((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const clearPrizes = useCallback(() => {
    setPrizes([]);
  }, []);

  const reorderPrizes = useCallback((fromIndex, toIndex) => {
    setPrizes((prev) => {
      const newPrizes = [...prev];
      const [moved] = newPrizes.splice(fromIndex, 1);
      newPrizes.splice(toIndex, 0, moved);
      return newPrizes;
    });
  }, []);

  return {
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
    reorderPrizes,
  };
}
