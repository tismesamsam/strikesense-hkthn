import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-4xl font-bold mb-10 text-red-500">StrikeSense Dashboard</h1>
      <div className="flex gap-4">
        <Link
          to="/punch"
          className="bg-red-600 px-6 py-3 rounded-lg text-xl hover:bg-red-700 transition"
        >
          Start Training
        </Link>
        <Link
          to="/history"
          className="bg-zinc-800 px-6 py-3 rounded-lg text-xl hover:bg-zinc-700 transition"
        >
          View History
        </Link>
        <Link
          to="/progress"
          className="bg-zinc-800 px-6 py-3 rounded-lg text-xl hover:bg-zinc-700 transition"
        >
          Progress
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
