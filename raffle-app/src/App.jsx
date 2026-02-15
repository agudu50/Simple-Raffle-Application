import useRaffle from "./hooks/useRaffle";
import ParticipantForm from "./components/ParticipantForm";
import ParticipantList from "./components/ParticipantList";
import WinnerDisplay from "./components/WinnerDisplay";
import RaffleControls from "./components/RaffleControls";

export default function App() {
  const {
    participants,
    winner,
    addParticipant,
    removeParticipant,
    drawWinner,
    resetRaffle,
  } = useRaffle();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">
          Raffle Draw
        </h1>

        <ParticipantForm onAdd={addParticipant} />
        <ParticipantList
          participants={participants}
          onRemove={removeParticipant}
        />
        <RaffleControls
          onDraw={drawWinner}
          onReset={resetRaffle}
          disabled={participants.length === 0}
        />
        <WinnerDisplay winner={winner} />
      </div>
    </div>
  );
}
