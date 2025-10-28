import React, { useState } from "react";

export default function PunchTracker() {
  const [stats, setStats] = useState({ punch_count: 0, avg_speed: 0 });
  const [running, setRunning] = useState(false);

  const startSession = async () => {
    await fetch("http://localhost:8000/sessions/start", { method: "POST" });
    setRunning(true);
    setStats({ punch_count: 0, avg_speed: 0 });
  };

  const stopSession = async () => {
    const res = await fetch("http://localhost:8000/sessions/stop", { method: "POST" });
    const data = await res.json();
    setStats(data.stats);
    setRunning(false);
  };

  return (
    <div className="p-4 bg-gray-200 rounded-md">
      <h2 className="text-xl font-bold mb-2">Punch Tracker</h2>
      <p>Punch Count: {stats.punch_count}</p>
      <p>Average Speed: {stats.avg_speed.toFixed(2)}</p>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        onClick={startSession}
        disabled={running}
      >
        Start
      </button>
      <button
        className="bg-red-500 text-white px-4 py-2 rounded"
        onClick={stopSession}
        disabled={!running}
      >
        Stop
      </button>
    </div>
  );
}
