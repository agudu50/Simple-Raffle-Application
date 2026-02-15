import { useState, useEffect, useCallback } from "react";
import confetti from "canvas-confetti";

const STORAGE_KEY = "raffle-app-data";

export default function useRaffle() {
  const [participants, setParticipants] = useState([]);
  const [winners, setWinners] = useState([]);
  const [history, setHistory] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [settings, setSettings] = useState({
    winnerCount: 1,
    allowDuplicates: false,
    removeWinnersFromPool: false,
    animationDuration: 2000,
  });

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.participants) setParticipants(data.participants);
        if (data.history) setHistory(data.history);
        if (data.settings) setSettings((prev) => ({ ...prev, ...data.settings }));
      } catch (e) {
        console.error("Failed to load saved data:", e);
      }
    }
  }, []);

  // Save to localStorage on changes
  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ participants, history, settings })
    );
  }, [participants, history, settings]);

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

        // Add to history
        const historyEntry = {
          id: Date.now(),
          winners: selectedWinners,
          timestamp: new Date().toISOString(),
          participantCount: participants.length,
        };
        setHistory((prev) => [historyEntry, ...prev].slice(0, 50)); // Keep last 50 draws

        // Remove winners from pool if setting enabled
        if (settings.removeWinnersFromPool) {
          setParticipants((prev) =>
            prev.filter((p) => !selectedWinners.includes(p))
          );
        }
      }
    };

    animate();
  }, [participants, settings, isDrawing, triggerConfetti]);

  const resetRaffle = useCallback(() => {
    setParticipants([]);
    setWinners([]);
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  const updateSettings = useCallback((newSettings) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  }, []);

  const exportParticipants = useCallback(() => {
    return participants.join("\n");
  }, [participants]);

  const importParticipants = useCallback((text) => {
    return addMultipleParticipants(text);
  }, [addMultipleParticipants]);

  return {
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
  };
}
