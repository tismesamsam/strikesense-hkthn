import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Activity, Clock, Target, Award } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function StatsOverview({ totalPunches, totalSessions, totalMinutes, avgTechniqueScore, isLoading }) {
  const stats = [
    {
      title: "Total Punches",
      value: totalPunches.toLocaleString(),
      icon: Activity,
      gradient: "from-red-600 to-red-700",
      iconBg: "bg-red-600/20"
    },
    {
      title: "Activities",
      value: totalSessions,
      icon: Target,
      gradient: "from-red-500 to-red-600",
      iconBg: "bg-red-500/20"
    },
    {
      title: "Training Time",
      value: `${totalMinutes} min`,
      icon: Clock,
      gradient: "from-gray-700 to-gray-800",
      iconBg: "bg-gray-700/20"
    },
    {
      title: "Avg Technique",
      value: `${avgTechniqueScore}/100`,
      icon: Award,
      gradient: "from-red-700 to-red-800",
      iconBg: "bg-red-700/20"
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 shadow-xl hover:shadow-2xl hover:shadow-red-900/20 transition-all">
          <CardContent className="p-6">
            {isLoading ? (
              <div className="space-y-3">
                <Skeleton className="h-4 w-24 bg-gray-700" />
                <Skeleton className="h-8 w-32 bg-gray-700" />
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-400">{stat.title}</p>
                  <div className={`p-2 rounded-lg ${stat.iconBg}`}>
                    <stat.icon className="w-4 h-4 text-red-400" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-white">{stat.value}</p>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}