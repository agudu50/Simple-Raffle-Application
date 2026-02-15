export default function WinnerDisplay({ winner }) {
  if (!winner) return null;

  return (
    <div className="mt-6 p-4 border rounded text-center">
      🎉 Winner: <strong>{winner}</strong>
    </div>
  );
}
