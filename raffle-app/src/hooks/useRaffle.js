import { useState } from "react";

export default function useRaffle() {
  const [participants, setParticipants] = useState([]);
  const [winner, setWinner] = useState(null);

  const addParticipant = (name) => {
    if (!name.trim()) return;
    setParticipants((prev) => [...prev, name]);
  };

  const removeParticipant = (index) => {
    setParticipants((prev) => prev.filter((_, i) => i !== index));
  };

  const drawWinner = () => {
    if (participants.length === 0) return;
    const randomIndex = Math.floor(Math.random() * participants.length);
    setWinner(participants[randomIndex]);
  };

  const resetRaffle = () => {
    setParticipants([]);
    setWinner(null);
  };

  return {
    participants,
    winner,
    addParticipant,
    removeParticipant,
    drawWinner,
    resetRaffle,
  };
}
