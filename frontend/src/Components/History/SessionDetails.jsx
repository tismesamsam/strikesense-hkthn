
import React from 'react';
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Activity, Clock, Zap, Award } from "lucide-react";
import { motion } from "framer-motion";

export default function SessionCard({ session, onClick, isSelected }) {
  const minutes = Math.floor(session.duration_seconds / 60);
  const seconds = session.duration_seconds % 60;

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      <Card
        onClick={onClick}
        className={`cursor-pointer transition-all ${
          isSelected
            ? 'bg-gradient-to-br from-red-950 to-red-900 border-red-700 shadow-2xl shadow-red-900/50'
            : 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 hover:border-red-900 shadow-xl hover:shadow-2xl'
        }`}
      >
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-2xl font-bold text-white mb-1">
                {session.punch_count} punches
              </p>
              <p className="text-sm text-gray-400">
                {format(new Date(session.session_date), "EEEE, MMMM d, yyyy 'at' h:mm a")}
              </p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-red-500">{minutes}:{String(seconds).padStart(2, '0')}</p>
              <p className="text-xs text-gray-500">duration</p>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3">
            <div className="text-center bg-gradient-to-br from-gray-900 to-black rounded-lg p-2 border border-gray-700">
              <Zap className="w-5 h-5 text-yellow-400 mx-auto mb-1" />
              <p className="text-xs text-gray-400">Speed</p>
              <p className="text-sm font-bold text-white">{session.average_speed}</p>
            </div>
            <div className="text-center bg-gradient-to-br from-gray-900 to-black rounded-lg p-2 border border-gray-700">
              <Activity className="w-5 h-5 text-red-400 mx-auto mb-1" />
              <p className="text-xs text-gray-400">Power</p>
              <p className="text-sm font-bold text-white">{session.power_score}</p>
            </div>
            <div className="text-center bg-gradient-to-br from-gray-900 to-black rounded-lg p-2 border border-gray-700">
              <Award className="w-5 h-5 text-green-400 mx-auto mb-1" />
              <p className="text-xs text-gray-400">Tech</p>
              <p className="text-sm font-bold text-white">{session.technique_score}</p>
            </div>
            <div className="text-center bg-gradient-to-br from-gray-900 to-black rounded-lg p-2 border border-gray-700">
              <Clock className="w-5 h-5 text-blue-400 mx-auto mb-1" />
              <p className="text-xs text-gray-400">Endure</p>
              <p className="text-sm font-bold text-white">{session.endurance_score}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
