
import React from 'react';
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp } from "lucide-react";

export default function PerformanceChart({ sessions, isLoading }) {
  const chartData = sessions
    .slice(0, 10)
    .reverse()
    .map(session => ({
      date: format(new Date(session.session_date), "MMM d"),
      punches: session.punch_count,
      technique: session.technique_score,
    }));

  return (
    <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 shadow-xl">
      <CardHeader className="border-b border-gray-700 pb-4">
        <CardTitle className="text-white font-bold flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-red-500" />
          Performance Progress
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {isLoading ? (
          <Skeleton className="h-64 w-full bg-gray-700" />
        ) : chartData.length === 0 ? (
          <div className="h-64 flex items-center justify-center text-gray-400">
            No data to display yet
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="date" stroke="#9CA3AF" style={{ fontSize: '12px' }} />
              <YAxis stroke="#9CA3AF" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }}
              />
              <Line type="monotone" dataKey="punches" stroke="#DC2626" strokeWidth={3} dot={{ fill: '#DC2626', r: 4 }} />
              <Line type="monotone" dataKey="technique" stroke="#EF4444" strokeWidth={2} dot={{ fill: '#EF4444', r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
