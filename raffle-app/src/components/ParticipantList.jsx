export default function ParticipantList({ participants, onRemove }) {
  return (
    <ul className="mt-4 space-y-2">
      {participants.map((name, index) => (
        <li
          key={index}
          className="flex justify-between items-center border p-2 rounded"
        >
          <span>{name}</span>
          <button
            onClick={() => onRemove(index)}
            className="text-red-500"
          >
            Remove
          </button>
        </li>
      ))}
    </ul>
  );
}
