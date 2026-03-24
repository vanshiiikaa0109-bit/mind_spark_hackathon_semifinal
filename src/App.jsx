 import { useState } from "react";
import "./App.css";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

export default function App() {
  const [risk, setRisk] = useState(40);
  const [transaction, setTransaction] = useState("");
  const [alertMsg, setAlertMsg] = useState("");

  // 📊 Status Logic
  const getStatus = () => {
    if (risk < 50) return { text: "SAFE ✅", color: "green" };
    if (risk < 75) return { text: "WARNING ⚠️", color: "orange" };
    return { text: "BLOCK 🚫", color: "red" };
  };

  const status = getStatus();

  // 💳 Transaction Check
  const checkTransaction = () => {
    if (transaction.toLowerCase().includes("otp")) {
      setRisk(85);
      setAlertMsg("🚨 Scam Detected!");
    } else {
      setRisk(30);
      setAlertMsg("✅ Safe Transaction");
    }
  };

  // 🎤 Voice Input
  const startVoice = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.start();

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      setTransaction(text);

      if (text.toLowerCase().includes("otp")) {
        setRisk(85);
        setAlertMsg("🚨 Scam Detected via Voice!");
      } else {
        setRisk(30);
        setAlertMsg("✅ Safe Voice Input");
      }
    };
  };

  return (
    <div className="container">
      <h1>TrustAI Dashboard</h1>

      {/* Alert */}
      {alertMsg && <div className="alert">{alertMsg}</div>}

      {/* Risk Slider */}
      <div className="card">
        <h2>Risk: {risk}%</h2>
        <input
          type="range"
          min="0"
          max="100"
          value={risk}
          onChange={(e) => setRisk(e.target.value)}
        />
        <p style={{ color: status.color }}>{status.text}</p>
      </div>

      {/* Chart */}
      <div className="card">
        <h2>AI Risk Analysis</h2>
        <Bar
          data={{
            labels: ["Text", "Voice", "Behavior", "Threat"],
            datasets: [
              {
                label: "Risk Scores",
                data: [risk - 10, risk - 5, risk, risk + 5],
              },
            ],
          }}
        />
      </div>

      {/* Transaction Checker */}
      <div className="card">
        <h2>Transaction Checker</h2>
        <input
          type="text"
          placeholder="Enter message..."
          value={transaction}
          onChange={(e) => setTransaction(e.target.value)}
        />
        <br /><br />
        <button onClick={checkTransaction}>Check</button>
        <button onClick={startVoice}>🎤 Speak</button>
      </div>

      {/* Actions */}
      <div className="card">
        <h2>Actions</h2>
        <button className="approve">Approve</button>
        <button className="block">Block</button>
        <button className="report">Report</button>
      </div>
    </div>
  );
}