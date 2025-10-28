import React from "react";
import PunchCounter from "../Components/Session/PunchCounter.jsx";

export default function SessionPage({ userId, backendUrl }) {
  return (
    <div>
      <PunchCounter userId={userId} backendUrl={backendUrl} />
    </div>
  );
}
