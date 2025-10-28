import React from "react";

export default function History({ sessions }) {
  // Placeholder sessions if none provided
  const history = sessions || Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    date: new Date().toLocaleDateString(),
    totalPunches: Math.floor(Math.random() * 100),
    punchTypes: { jab: 10, hook: 5, uppercut: 8 },
    duration: "00:15:00",
  }));

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">History</h1>
      <div className="space-y-4">
        {history.map((session) => (
          <div
            key={session.id}
            className="p-4 bg-white shadow rounded flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">Session {session.id}</p>
              <p className="text-sm text-gray-500">{session.date}</p>
            </div>
            <div className="flex gap-4 text-center">
              <div>
                <p className="font-bold">{session.totalPunches}</p>
                <p className="text-sm">Total</p>
              </div>
              <div>
                <p className="font-bold">{session.punchTypes.jab}</p>
                <p className="text-sm">Jabs</p>
              </div>
              <div>
                <p className="font-bold">{session.punchTypes.hook}</p>
                <p className="text-sm">Hooks</p>
              </div>
              <div>
                <p className="font-bold">{session.punchTypes.uppercut}</p>
                <p className="text-sm">Uppercuts</p>
              </div>
              <div>
                <p className="font-bold">{session.duration}</p>
                <p className="text-sm">Duration</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
