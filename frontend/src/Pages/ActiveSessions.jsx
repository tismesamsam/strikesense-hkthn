import React, { useState, useEffect, useRef } from "react";
import { base44 } from "@/api/base44Client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, Square, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";

import PunchCounter from "../components/session/PunchCounter";
import SessionTimer from "../components/session/SessionTimer";
import LiveMetrics from "../components/session/LiveMetrics";
import SessionComplete from "../components/session/SessionComplete";

export default function ActiveSession() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  const [isActive, setIsActive] = useState(false);
  const [punchCount, setPunchCount] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [currentSpeed, setCurrentSpeed] = useState(0);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [completedSession, setCompletedSession] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  const lastPunchTime = useRef(null);
  const speedHistory = useRef([]);

  useEffect(() => {
    let interval;
    if (isActive && startTime) {
      interval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        setElapsedSeconds(elapsed);
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isActive, startTime]);

  const startSession = () => {
    setIsActive(true);
    setStartTime(Date.now());
    setPunchCount(0);
    setElapsedSeconds(0);
    speedHistory.current = [];
  };

  const recordPunch = () => {
    if (!isActive) return;
    
    setPunchCount(prev => prev + 1);
    
    const now = Date.now();
    if (lastPunchTime.current) {
      const timeDiff = (now - lastPunchTime.current) / 1000;
      const instantSpeed = 60 / timeDiff;
      speedHistory.current.push(instantSpeed);
      setCurrentSpeed(Math.round(instantSpeed));
    }
    lastPunchTime.current = now;
  };

  const saveSessionMutation = useMutation({
    mutationFn: async (sessionData) => {
      const session = await base44.entities.TrainingSession.create(sessionData);
      return session;
    },
    onSuccess: (session) => {
      queryClient.invalidateQueries({ queryKey: ['sessions'] });
      setCompletedSession(session);
      setSessionComplete(true);
      setIsAnalyzing(false);
    },
  });

  const stopSession = async () => {
    if (!isActive) return;
    
    setIsActive(false);
    setIsAnalyzing(true);
    
    const avgSpeed = speedHistory.current.length > 0
      ? Math.round(speedHistory.current.reduce((a, b) => a + b, 0) / speedHistory.current.length)
      : 0;
    
    const maxSpeed = speedHistory.current.length > 0
      ? Math.round(Math.max(...speedHistory.current))
      : 0;

    const aiFeedback = await base44.integrations.Core.InvokeLLM({
      prompt: `You are a professional boxing coach analyzing a training session. 
      
      Session data:
      - Duration: ${Math.floor(elapsedSeconds / 60)} minutes ${elapsedSeconds % 60} seconds
      - Total punches: ${punchCount}
      - Average speed: ${avgSpeed} punches per minute
      - Max speed: ${maxSpeed} punches per minute
      
      Provide encouraging, specific feedback about:
      1. Overall performance (2-3 sentences)
      2. One strength to celebrate
      3. One area for improvement
      4. A specific tip for the next session
      
      Keep it motivating and actionable. Use a tone like a supportive coach.`,
    });

    const powerScore = Math.min(100, Math.round(40 + (punchCount / elapsedSeconds) * 30));
    const techniqueScore = Math.min(100, Math.round(50 + (avgSpeed / 2)));
    const enduranceScore = Math.min(100, Math.round(30 + (elapsedSeconds / 60) * 10));
    const caloriesBurned = Math.round((elapsedSeconds / 60) * 12 * (punchCount / 100));

    const sessionData = {
      duration_seconds: elapsedSeconds,
      punch_count: punchCount,
      average_speed: avgSpeed,
      max_speed: maxSpeed,
      power_score: powerScore,
      technique_score: techniqueScore,
      endurance_score: enduranceScore,
      calories_burned: caloriesBurned,
      ai_feedback: aiFeedback,
      session_date: new Date().toISOString(),
    };

    saveSessionMutation.mutate(sessionData);
  };

  if (sessionComplete && completedSession) {
    return <SessionComplete session={completedSession} onClose={() => navigate(createPageUrl("Dashboard"))} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="bg-gradient-to-r from-red-950 via-black to-red-950 border-b border-gray-800 px-4 md:px-8 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 bg-gradient-to-r from-white to-red-200 bg-clip-text text-transparent">
            {isActive ? "Training in Progress" : "Record Activity"}
          </h1>
          <p className="text-gray-400">
            {isActive ? "Tap the counter to track your punches" : "Start your session and track your performance"}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-6">
        <SessionTimer elapsedSeconds={elapsedSeconds} isActive={isActive} />

        <PunchCounter 
          punchCount={punchCount}
          onPunch={recordPunch}
          isActive={isActive}
        />

        <LiveMetrics 
          currentSpeed={currentSpeed}
          punchCount={punchCount}
          elapsedSeconds={elapsedSeconds}
        />

        <div className="flex gap-4 justify-center">
          {!isActive ? (
            <Button
              onClick={startSession}
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-12 py-8 text-xl font-bold shadow-2xl shadow-red-900/50"
              size="lg"
            >
              <Play className="w-6 h-6 mr-3" />
              Start Training
            </Button>
          ) : (
            <Button
              onClick={stopSession}
              disabled={isAnalyzing}
              className="bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white px-12 py-8 text-xl font-bold shadow-2xl border border-gray-700"
              size="lg"
            >
              {isAnalyzing ? (
                <>
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Square className="w-6 h-6 mr-3" />
                  Finish Activity
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}