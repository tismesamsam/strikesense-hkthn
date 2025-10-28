import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Zap, Activity, Flame } from "lucide-react";

export default function LiveMetrics({ currentSpeed, punchCount, elapsedSeconds }) {
  const avgPunchesPerMinute = elapsedSeconds > 0 ? Math.round((punchCount / elapsedSeconds) * 60) : 0;
  const estimatedCalories = Math.round((elapsedSeconds / 60) * 12);

  const metrics = [
    { label: "Speed", value: `${currentSpeed} p/m`, icon: Zap, gradient: "from-yellow-600 to-yellow-700", iconBg: "bg-yellow-600/20" },
    { label: "Avg Speed", value: `${avgPunchesPerMinute} p/m`, icon: Activity, gradient: "from-red-600 to-red-700", iconBg: "bg-red-600/20" },
    { label: "Calories", value: estimatedCalories, icon: Flame, gradient: "from-orange-600 to-orange-700", iconBg: "bg-orange-600/20" },
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {metrics.map((metric, index) => (
        <Card key={index} className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 shadow-xl">
          <CardContent className="p-4 text-center">
            <div className={`w-10 h-10 ${metric.iconBg} rounded-full flex items-center justify-center mx-auto mb-2`}>
              <metric.icon className="w-5 h-5 text-white" />
            </div>
            <p className="text-xs font-medium text-gray-400 mb-1">{metric.label}</p>
            <p className="text-xl font-bold text-white">{metric.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}