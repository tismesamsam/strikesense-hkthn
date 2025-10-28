import { useState, useEffect, useRef } from "react";
import axios from "axios";

// Main Component
export default function StrikesenseApp() {
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState("");
  const [userList, setUserList] = useState([]);
  const [punches, setPunches] = useState(0);
  const [avgSpeed, setAvgSpeed] = useState(0);
  const videoRef = useRef(null);

  // Fetch existing users
  useEffect(() => {
    axios.get("/users/").then(res => setUserList(res.data));
  }, []);

  // Login / User selection
  const handleLogin = async () => {
    let user = userList.find(u => u.username === username);
    if (!user) {
      const res = await axios.post("/users/", { username, wallet_pubkey: "mock" });
      user = res.data;
    }
    setUserId(user.id);
  };

  // Start MediaPipe / OpenCV punch detection
  useEffect(() => {
    if (!userId) return;

    const video = videoRef.current;
    // TODO: Initialize MediaPipe and OpenCV video processing here
    // Example pseudocode:
    // startDetection(video, ({ newPunch, speed }) => {
    //     if (newPunch) setPunches(prev => prev + 1);
    //     setAvgSpeed(speed);
    // });

  }, [userId]);

  // End session and record data
  const endSession = async () => {
    if (!userId) return;

    await axios.post("/sessions/", {
      user_id: userId,
      punch_count: punches,
      avg_speed: avgSpeed
    });

    // Reset for next session
    setPunches(0);
    setAvgSpeed(0);
    setUserId(null);
    setUsername("");
  };

  // Render
  if (!userId) {
    // Login UI
    return (
      <div className="login-container">
        <h2>Login / Select User</h2>
        <input
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Enter username"
        />
        <button onClick={handleLogin}>Start Session</button>
        <div>
          <h4>Existing Users:</h4>
          <ul>
            {userList.map(u => (
              <li key={u.id}>{u.username}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  // Punch Counter UI
  return (
    <div className="punch-counter-container">
      <h2>Punches: {punches}</h2>
      <h3>Average Speed: {avgSpeed.toFixed(2)}</h3>
      <video ref={videoRef} autoPlay muted style={{ width: "640px", height: "480px" }} />
      <button onClick={endSession}>End Session</button>
    </div>
  );
}
