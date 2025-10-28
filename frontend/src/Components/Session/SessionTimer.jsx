import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Clock } from "lucide-react";

export default function SessionTimer({ elapsedSeconds, isActive }) {
  const minutes = Math.floor(elapsedSeconds / 60);
  const seconds = elapsedSeconds % 60;

  return (
    <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 shadow-xl">
      <CardContent className="p-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-3">
          <Clock className={`w-6 h-6 ${isActive ? 'text-red-500' : 'text-gray-500'}`} />
          <p className="text-gray-300 text-lg font-semibold">Time</p>
        </div>
        <p className="text-6xl font-black text-white tracking-tight">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </p>
      </CardContent>
    </Card>
  );
}