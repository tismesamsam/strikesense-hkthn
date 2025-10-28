const backendUrl = "http://127.0.0.1:8000";
const punchBtn = document.getElementById("punchBtn");
const punchCountEl = document.getElementById("punchCount");
const avgSpeedEl = document.getElementById("avgSpeed");

punchBtn.addEventListener("click", sendPunch);

async function sendPunch() {
  try {
    const response = await fetch(`${backendUrl}/punch`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({})
    });
    const data = await response.json();

    punchCountEl.textContent = data.punch_count;
    avgSpeedEl.textContent = data.avg_speed.toFixed(2);

    console.log("Solana TX:", data.solana_tx);
  } catch (err) {
    console.error(err);
    alert("Error sending punch to backend");
  }
}
