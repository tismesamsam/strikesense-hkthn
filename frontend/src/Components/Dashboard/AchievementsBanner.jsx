// src/Components/Dashboard/AchievementsBanner.jsx
import React, { useEffect, useState } from "react";
import "./achievements.css";

const milestones = [
  { punches: 100, reward: 0.001 },
  { punches: 500, reward: 0.005 },
  { punches: 1000, reward: 0.01 },
  { punches: 2000, reward: 0.02 },
  { punches: 5000, reward: 0.05 },
];

const AchievementsBanner = ({ punchCount }) => {
  const [achieved, setAchieved] = useState([]);
  const [animatingIds, setAnimatingIds] = useState([]);

  useEffect(() => {
    const newAchievements = milestones.filter(
      m => punchCount >= m.punches && !achieved.some(a => a.punches === m.punches)
    );
    
    if (newAchievements.length > 0) {
      setAchieved(prev => [...prev, ...newAchievements]);
      
      // Add animation class to new achievements
      const newIds = newAchievements.map(m => m.punches);
      setAnimatingIds(newIds);
      
      // Remove animation class after animation completes
      setTimeout(() => {
        setAnimatingIds([]);
      }, 1000);
    }
  }, [punchCount]);

  if (achieved.length === 0) return null;

  return (
    <div className="achievements-banner">
      {achieved.map((m) => (
        <div 
          key={m.punches} 
          className={`achievement-card ${animatingIds.includes(m.punches) ? 'animate-in' : ''}`}
        >
          <div className="achievement-glow"></div>
          <div className="achievement-content">
            <div className="achievement-icon">🏆</div>
            <div className="achievement-text">
              <div className="achievement-title">{m.punches} Punches!</div>
              <div className="achievement-reward">+{m.reward} SOL</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AchievementsBanner;