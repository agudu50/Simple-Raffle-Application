export default function RaffleControls({ onDraw, onReset, disabled }) {
  return (
    <div className="flex gap-3 mt-4">
      <button
        onClick={onDraw}
        disabled={disabled}
        className="bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        Draw Winner
      </button>

      <button
        onClick={onReset}
        className="bg-gray-500 text-white px-4 py-2 rounded"
      >
        Reset
      </button>
    </div>
  );
}
