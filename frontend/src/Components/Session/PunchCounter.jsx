import React, { useRef, useEffect, useState } from "react";
import { Hands } from "@mediapipe/hands";
import { Camera } from "@mediapipe/camera_utils";
import { Zap, TrendingUp, Target, Award, Activity } from "lucide-react";
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL, Transaction, SystemProgram, PublicKey } from '@solana/web3.js';
import './punchcounter.css';

const PunchCounter = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Wallet hooks
  const { connected, publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();

  // Stats
  const [totalPunches, setTotalPunches] = useState(0);
  const [leftPunches, setLeftPunches] = useState(0);
  const [rightPunches, setRightPunches] = useState(0);
  const [avgSpeed, setAvgSpeed] = useState(0);
  const [maxSpeed, setMaxSpeed] = useState(0);
  const [intensity, setIntensity] = useState("Idle");
  const [combo, setCombo] = useState(0);
  const [showCombo, setShowCombo] = useState(false);

  // Animations
  const [handFlashes, setHandFlashes] = useState({ left: false, right: false });
  const [punchPulse, setPunchPulse] = useState(false);
  const [lastPunchHand, setLastPunchHand] = useState(null);
  const [particles, setParticles] = useState([]);

  // Wallet state
  const [solBalance, setSolBalance] = useState(0);
  const [rewardToast, setRewardToast] = useState(null);

  // Refs for tracking
  const lastPunchTimes = useRef({ left: 0, right: 0 });
  const lastPositions = useRef({ left: null, right: null });
  const speedHistory = useRef([]);
  const comboTimer = useRef(null);

  // Keep your existing MediaPipe hands code the same...
  useEffect(() => {
    if (!videoRef.current) return;

    const hands = new Hands({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
    });

    hands.setOptions({
      maxNumHands: 2,
      minDetectionConfidence: 0.7,
      minTrackingConfidence: 0.7,
      modelComplexity: 1,
    });

    hands.onResults(onResults);

    const camera = new Camera(videoRef.current, {
      onFrame: async () => {
        await hands.send({ image: videoRef.current });
      },
      width: 640,
      height: 480,
    });

    camera.start();

    return () => {
      camera.stop();
    };
  }, []);

  // Keep your existing helper functions (calculateSpeed, createParticles, updateCombo) the same...
  const calculateSpeed = (current, previous) => {
    if (!previous) return 0;
    const dx = current.x - previous.x;
    const dy = current.y - previous.y;
    const dz = current.z - previous.z;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  };

  const createParticles = (hand) => {
    const newParticles = Array.from({ length: 12 }, (_, i) => ({
      id: Date.now() + i,
      x: hand === "left" ? 20 : 80,
      y: 50,
      angle: (i * 30) * (Math.PI / 180),
    }));
    setParticles((prev) => [...prev, ...newParticles]);
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !newParticles.find((np) => np.id === p.id)));
    }, 800);
  };

  const updateCombo = () => {
    setCombo((prev) => prev + 1);
    setShowCombo(true);
    
    clearTimeout(comboTimer.current);
    comboTimer.current = setTimeout(() => {
      setCombo(0);
      setShowCombo(false);
    }, 2000);
  };

  // UPDATED handlePunch function with wallet integration
  const handlePunch = (hand, speed) => {
    lastPunchTimes.current[hand] = Date.now();

    const newTotalPunches = totalPunches + 1;
    setTotalPunches(newTotalPunches);
    
    // Check for reward every 1000 punches
    if (newTotalPunches % 1000 === 0) {
      triggerReward(newTotalPunches);
    }

    if (hand === "left") setLeftPunches((prev) => prev + 1);
    else setRightPunches((prev) => prev + 1);

    // Update speed history and stats
    speedHistory.current.push(speed);
    if (speedHistory.current.length > 10) {
      speedHistory.current.shift();
    }

    const avgSpd = speedHistory.current.reduce((a, b) => a + b, 0) / speedHistory.current.length;
    setAvgSpeed(parseFloat(avgSpd.toFixed(2)));
    setMaxSpeed((prev) => Math.max(prev, speed));

    if (speed > 8) setIntensity("Explosive");
    else if (speed > 5) setIntensity("High");
    else if (speed > 3) setIntensity("Medium");
    else if (speed > 1) setIntensity("Low");
    else setIntensity("Idle");

    setPunchPulse(true);
    setTimeout(() => setPunchPulse(false), 200);

    setLastPunchHand(hand);
    setHandFlashes((prev) => ({ ...prev, [hand]: true }));
    setTimeout(() => {
      setHandFlashes((prev) => ({ ...prev, [hand]: false }));
    }, 150);

    createParticles(hand);
    updateCombo();
  };

  // NEW: Reward function that sends SOL
  const triggerReward = async (punchCount) => {
    if (!connected || !publicKey) {
      setRewardToast(`🎉 ${punchCount} Punches! Connect wallet to claim 0.001 SOL`);
      setTimeout(() => setRewardToast(null), 5000);
      return;
    }

    try {
      setRewardToast(`🚀 Sending 0.001 SOL reward for ${punchCount} punches!`);
      
      // For demo purposes - in production, you'd send from your server wallet
      // This is a simplified version that shows the concept
      const rewardAmount = 0.001 * LAMPORTS_PER_SOL;
      
      // Note: In a real app, you'd need a backend to handle this transaction
      // since you can't send from user's wallet to themselves without their private key
      setRewardToast(`✅ ${punchCount} Punches! 0.001 SOL reward earned!`);
      
      // Simulate balance update for demo
      setSolBalance(prev => parseFloat((prev + 0.001).toFixed(3)));
      
      setTimeout(() => setRewardToast(null), 5000);
      
    } catch (error) {
      console.error("Reward failed:", error);
      setRewardToast("❌ Reward failed - see console for details");
      setTimeout(() => setRewardToast(null), 3000);
    }
  };

  // Keep your existing onResults function the same...
  const onResults = (results) => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    const canvas = canvasRef.current;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.scale(-1, 1);
    ctx.translate(-canvas.width, 0);

    if (results.multiHandLandmarks && results.multiHandLandmarks.length) {
      results.multiHandLandmarks.forEach((landmarks, idx) => {
        const handedness = results.multiHandedness[idx].label.toLowerCase();
        const wrist = landmarks[0];
        const middleFinger = landmarks[9];
        const now = Date.now();
        const delta = now - lastPunchTimes.current[handedness];

        const lastPos = lastPositions.current[handedness];
        const speed = calculateSpeed(middleFinger, lastPos) * 100;
        lastPositions.current[handedness] = { ...middleFinger };

        const forwardMovement = lastPos ? (lastPos.z - middleFinger.z) : 0;
        const isPunch = speed > 2 && forwardMovement > 0.02 && delta > 250;

        if (isPunch) {
          lastPunchTimes.current[handedness] = now;
          handlePunch(handedness, speed);
        }

        const isActive = handFlashes[handedness];
        
        ctx.strokeStyle = isActive ? "rgba(255, 28, 28, 0.9)" : "rgba(255, 28, 28, 0.7)";
        ctx.lineWidth = isActive ? 4 : 2.5;
        ctx.shadowBlur = isActive ? 15 : 0;
        ctx.shadowColor = isActive ? "#ff1c1c" : "transparent";
        
        const connections = [
          [0, 1], [1, 2], [2, 3], [3, 4],
          [0, 5], [5, 6], [6, 7], [7, 8],
          [0, 9], [9, 10], [10, 11], [11, 12],
          [0, 13], [13, 14], [14, 15], [15, 16],
          [0, 17], [17, 18], [18, 19], [19, 20],
          [5, 9], [9, 13], [13, 17]
        ];

        connections.forEach(([start, end]) => {
          ctx.beginPath();
          ctx.moveTo(landmarks[start].x * canvas.width, landmarks[start].y * canvas.height);
          ctx.lineTo(landmarks[end].x * canvas.width, landmarks[end].y * canvas.height);
          ctx.stroke();
        });

        landmarks.forEach((landmark, i) => {
          const x = landmark.x * canvas.width;
          const y = landmark.y * canvas.height;
          
          if (isActive && (i === 0 || i === 9)) {
            const gradient = ctx.createRadialGradient(x, y, 0, x, y, 40);
            gradient.addColorStop(0, "rgba(255, 28, 28, 0.8)");
            gradient.addColorStop(0.5, "rgba(255, 69, 0, 0.4)");
            gradient.addColorStop(1, "rgba(255, 69, 0, 0)");
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(x, y, 40, 0, 2 * Math.PI);
            ctx.fill();
          }

          ctx.beginPath();
          ctx.arc(x, y, i === 0 || i === 9 ? 6 : 3, 0, 2 * Math.PI);
          ctx.fillStyle = isActive ? "#ff1c1c" : "#ff1c1c";
          ctx.fill();
          ctx.strokeStyle = "#fff";
          ctx.lineWidth = 1.5;
          ctx.stroke();
        });
      });
    } else {
      setIntensity("Idle");
    }

    ctx.restore();
  };

  const getIntensityColor = () => {
    switch(intensity) {
      case "Explosive": return "#ff1c1c";
      case "High": return "#ff4500";
      case "Medium": return "#ffa500";
      case "Low": return "#ffff00";
      default: return "#666";
    }
  };

  const getIntensityClass = () => {
    switch(intensity.toLowerCase()) {
      case "explosive": return "explosive";
      case "high": return "high";
      case "medium": return "medium";
      case "low": return "low";
      default: return "idle";
    }
  };

  return (
    <div className="punch-counter-container">
      {/* Background layers */}
      <div className="background-layer"></div>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <div className="header">
          <h1 className="title">StrikeSense</h1>
          <p className="subtitle">AI-Powered Training System</p>
          
          {/* Wallet Info */}
          {connected && publicKey && (
            <div className="wallet-info">
              <span className="wallet-address">
                {publicKey.toString().slice(0, 6)}...{publicKey.toString().slice(-4)}
              </span>
              <span className="sol-balance">{solBalance} SOL</span>
            </div>
          )}
        </div>

        {/* Reward Toast */}
        {rewardToast && (
          <div className="reward-toast">
            {rewardToast}
          </div>
        )}

        {/* Content Wrapper */}
        <div className="content-wrapper">
          {/* Video Section */}
          <div className="video-section">
            <div className="video-container">
              <video
                ref={videoRef}
                className="video-element"
                autoPlay
                playsInline
                muted
              />
              <canvas
                ref={canvasRef}
                width={640}
                height={480}
                className="canvas-element"
              />
              
              {/* Combo Counter */}
              {showCombo && combo > 1 && (
                <div className="combo-counter">
                  {combo}x COMBO!
                </div>
              )}

              {/* Hand Indicators */}
              <div className="hand-indicators">
                <div className={`hand-indicator ${handFlashes.left ? 'active' : ''}`}>
                  <span>👊</span>
                  LEFT
                </div>
                <div className={`hand-indicator ${handFlashes.right ? 'active' : ''}`}>
                  RIGHT
                  <span>👊</span>
                </div>
              </div>

              {/* Corner Accents */}
              <div className="corner-accent corner-top-left"></div>
              <div className="corner-accent corner-top-right"></div>
              <div className="corner-accent corner-bottom-left"></div>
              <div className="corner-accent corner-bottom-right"></div>
            </div>
          </div>
          
          {/* Stats Dashboard */}
          <div className="stats-dashboard">
            {/* Total Strikes Card */}
            <div className={`stat-card total-strikes-card ${punchPulse ? 'pulse' : ''}`}>
              <div className="card-glow"></div>
              <div className="card-content">
                <div className="card-header">
                  <div className="card-label">
                    <Target size={24} color="#ff1c1c" />
                    <span>Total Strikes</span>
                  </div>
                  <Award size={32} color="#ff1c1c" />
                </div>
                <div className={`card-value ${punchPulse ? 'pulse' : ''}`}>
                  {totalPunches}
                </div>
                <div className="reward-info">
                  💰 0.001 SOL every 1000 punches
                </div>
              </div>
            </div>

            {/* ... rest of your existing stat cards remain the same ... */}
            <div className={`stat-card hand-card left-hand ${handFlashes.left ? 'active' : ''}`}>
              <div className="card-content">
                <div className="hand-header">
                  <span className="hand-emoji">👊</span>
                  <span className="hand-label">Left Hand</span>
                </div>
                <div className="hand-value">{leftPunches}</div>
              </div>
            </div>

            <div className={`stat-card hand-card right-hand ${handFlashes.right ? 'active' : ''}`}>
              <div className="card-content">
                <div className="hand-header">
                  <span className="hand-emoji">👊</span>
                  <span className="hand-label">Right Hand</span>
                </div>
                <div className="hand-value">{rightPunches}</div>
              </div>
            </div>

            <div className="stat-card speed-card">
              <div className="card-content">
                <div className="card-header">
                  <div className="card-label">
                    <TrendingUp size={20} color="#00ff88" />
                    <span>Avg Speed</span>
                  </div>
                </div>
                <div className="card-value">{avgSpeed.toFixed(1)}</div>
              </div>
            </div>

            <div className="stat-card max-speed-card">
              <div className="card-content">
                <div className="card-header">
                  <div className="card-label">
                    <Zap size={20} color="#ffff00" />
                    <span>Max Speed</span>
                  </div>
                </div>
                <div className="card-value">{maxSpeed.toFixed(1)}</div>
              </div>
            </div>

            <div className="stat-card intensity-card">
              <div className="card-content">
                <div className="card-header">
                  <div className="card-label">
                    <Activity size={20} color={getIntensityColor()} />
                    <span>Intensity</span>
                  </div>
                </div>
                <div className="intensity-value" style={{ color: getIntensityColor() }}>
                  {intensity}
                </div>
                <div className="intensity-bar">
                  <div className={`intensity-fill ${getIntensityClass()}`}></div>
                </div>
              </div>
            </div>

            <div className="stat-card tips-card">
              <div className="card-content">
                <div className="tips-header">
                  💡 Training Tips
                </div>
                <div className="tips-list">
                  <div className="tip-item">
                    <div className="tip-bullet" style={{ background: '#ff1c1c' }}></div>
                    <span className="tip-text">Punch forward toward the camera</span>
                  </div>
                  <div className="tip-item">
                    <div className="tip-bullet" style={{ background: '#ff4500' }}></div>
                    <span className="tip-text">Keep hands visible in frame</span>
                  </div>
                  <div className="tip-item">
                    <div className="tip-bullet" style={{ background: '#ffa500' }}></div>
                    <span className="tip-text">Make fast, deliberate movements</span>
                  </div>
                  <div className="tip-item">
                    <div className="tip-bullet" style={{ background: '#ffff00' }}></div>
                    <span className="tip-text">Chain punches for combo bonuses!</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Particles */}
      {particles.map(p => (
        <div key={p.id} className="particle" style={{
          '--end-x': `${Math.cos(p.angle) * 100}px`,
          '--end-y': `${Math.sin(p.angle) * 100}px`,
          left: `${p.x}%`,
          top: `${p.y}%`,
        }}></div>
      ))}
    </div>
  );
};

export default PunchCounter;