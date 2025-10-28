import React from 'react';
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Clock } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function RecentSessions({ sessions, isLoading }) {
  return (
    <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 shadow-xl">
      <CardHeader className="border-b border-gray-700 pb-4">
        <CardTitle className="text-white font-bold">Recent Activities</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {isLoading ? (
          <div className="space-y-4">
            {Array(5).fill(0).map((_, i) => (
              <Skeleton key={i} className="h-16 w-full bg-gray-700" />
            ))}
          </div>
        ) : sessions.length === 0 ? (
          <div className="text-center py-8">
            <Activity className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400">No activities yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {sessions.map((session) => (
              <div key={session.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-900 to-black rounded-lg hover:from-red-950 hover:to-black transition-all border border-gray-700 hover:border-red-900">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center shadow-lg shadow-red-900/50">
                    <Activity className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">{session.punch_count} punches</p>
                    <p className="text-sm text-gray-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {format(new Date(session.session_date), "MMM d, h:mm a")}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-red-500">{Math.floor(session.duration_seconds / 60)} min</p>
                  <p className="text-xs text-gray-500">{session.technique_score}/100</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}