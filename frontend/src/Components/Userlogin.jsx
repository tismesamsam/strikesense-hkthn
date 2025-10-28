import React, { useState } from "react";

export default function UserLogin({ onSelectUser, backendUrl }) {
  const [username, setUsername] = useState("");

  const createUser = () => {
    if (!username) return;
    console.log("Creating user:", username);
    onSelectUser(1); // stub user ID
  };

  return (
    <div>
      <h2>Select or Create User</h2>
      <input
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={createUser}>Create User</button>
    </div>
  );
}
