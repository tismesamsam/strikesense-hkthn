// frontend/src/components/PunchSession.jsx
import React, { useState, useEffect } from "react";

export default function PunchSession({ userId }) {
  const [punchCount, setPunchCount] = useState(0);
  const [recording, setRecording] = useState(false);

  useEffect(() => {
    let ws;
    if (recording) {
      ws = new WebSocket(`ws://localhost:8000/ws/punches/${userId}`);
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setPunchCount(data.punch_count);
      };
    }
    return () => ws && ws.close();
  }, [recording]);

  const startSession = () => setRecording(true);
  const endSession = async () => {
    setRecording(false);
    // Send final punch count to backend
    await fetch("/api/record_session/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userId, punch_count: punchCount, avg_speed: 2.5 }),
    });
    setPunchCount(0);
  };

  return (
    <div className="p-4 border rounded shadow">
      <h2 className="text-xl mb-2">Punch Session</h2>
      {!recording ? (
        <button onClick={startSession} className="bg-blue-500 text-white px-4 py-2 rounded">
          Start Session
        </button>
      ) : (
        <button onClick={endSession} className="bg-red-500 text-white px-4 py-2 rounded">
          End Session
        </button>
      )}
      <p className="mt-2">Punches counted: {punchCount}</p>
    </div>
  );
}
