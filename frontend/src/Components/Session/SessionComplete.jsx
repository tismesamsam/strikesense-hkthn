
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, TrendingUp, Award, Zap, Target } from "lucide-react";
import { motion } from "framer-motion";

export default function SessionComplete({ session, onClose }) {
  const minutes = Math.floor(session.duration_seconds / 60);
  const seconds = session.duration_seconds % 60;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-4 md:p-8 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl w-full"
      >
        <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 p-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              <CheckCircle className="w-20 h-20 text-white mx-auto mb-4 drop-shadow-2xl" />
            </motion.div>
            <h2 className="text-3xl font-bold text-white mb-2">Activity Complete! 🎉</h2>
            <p className="text-white/90">Great work! Here's your performance summary</p>
          </div>

          <CardContent className="p-8 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-gray-900 to-black p-4 rounded-lg border border-gray-700 text-center">
                <Zap className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                <p className="text-sm text-gray-400 font-medium">Total Punches</p>
                <p className="text-3xl font-bold text-white">{session.punch_count}</p>
              </div>
              <div className="bg-gradient-to-br from-gray-900 to-black p-4 rounded-lg border border-gray-700 text-center">
                <Target className="w-6 h-6 text-red-400 mx-auto mb-2" />
                <p className="text-sm text-gray-400 font-medium">Duration</p>
                <p className="text-3xl font-bold text-white">{minutes}:{String(seconds).padStart(2, '0')}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-300 font-medium">Power Score</span>
                <span className="text-white font-bold">{session.power_score}/100</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-red-600 to-red-700 h-2 rounded-full transition-all shadow-lg shadow-red-900/50" style={{ width: `${session.power_score}%` }} />
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-300 font-medium">Technique Score</span>
                <span className="text-white font-bold">{session.technique_score}/100</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-green-600 to-green-700 h-2 rounded-full transition-all shadow-lg shadow-green-900/50" style={{ width: `${session.technique_score}%` }} />
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-300 font-medium">Endurance Score</span>
                <span className="text-white font-bold">{session.endurance_score}/100</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 h-2 rounded-full transition-all shadow-lg shadow-blue-900/50" style={{ width: `${session.endurance_score}%` }} />
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-black p-4 rounded-lg border border-gray-700">
              <div className="flex items-center gap-2 mb-3">
                <Award className="w-5 h-5 text-red-500" />
                <h3 className="font-bold text-white">Coach Analysis</h3>
              </div>
              <p className="text-gray-300 leading-relaxed whitespace-pre-line">{session.ai_feedback}</p>
            </div>

            <Button
              onClick={onClose}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-6 text-lg shadow-2xl shadow-red-900/50"
            >
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
