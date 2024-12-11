import React, { useState, useRef } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0); // Counter display value
  const [customValue, setCustomValue] = useState(1); // Custom increment value
  const [countDownValue, setCountDownValue] = useState(""); // Count Down input value
  const timerRef = useRef(null); // Ref to manage timers

  // Clear any active timer
  const clearActiveTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  // Handle custom increment change
  const handleCustomChange = (e) => {
    setCustomValue(Number(e.target.value) || 1);
  };

  // Handle count down input change
  const handleCountDownChange = (e) => {
    setCountDownValue(Number(e.target.value) || "");
  };

  // Count Seconds
  const handleCountSeconds = () => {
    clearActiveTimer(); // Stop any existing timer
    setCount(0); // Reset counter
    timerRef.current = setInterval(() => {
      setCount((prev) => prev + 1);
    }, 1000);
  };

  // Count Down
  const handleCountDown = () => {
    clearActiveTimer(); // Stop any existing timer
    let targetValue = Number(countDownValue);
    if (isNaN(targetValue) || targetValue <= 0) {
      alert("Please enter a valid positive number!");
      return;
    }
    setCount(targetValue); // Start from entered number
    timerRef.current = setInterval(() => {
      setCount((prev) => {
        if (prev > 0) {
          return prev - 1;
        } else {
          clearActiveTimer(); // Stop timer when count reaches 0
          return 0;
        }
      });
    }, 1000);
  };

  // Reset Button
  const handleReset = () => {
    clearActiveTimer(); // Stop all timers
    setCount(0); // Reset count
  };

  return (
    <div className="app">
      <div className="container">
        <div className="counter-display">{count}</div>

        <div className="buttons">
          <button onClick={() => setCount((prev) => prev - 1)}>Decrease</button>
          <button onClick={handleReset}>Reset</button>
          <button onClick={() => setCount((prev) => prev + 1)}>Increase</button>
        </div>

        <div className="buttons">
          <button onClick={() => setCount((prev) => prev + customValue)}>
            Custom Increase
          </button>
          <input
            type="number"
            value={customValue}
            onChange={handleCustomChange}
            placeholder="Value"
            className="input-box"
          />
        </div>

        <div className="buttons">
          <button onClick={handleCountSeconds}>Count Seconds</button>
          <input
            type="number"
            value={countDownValue}
            onChange={handleCountDownChange}
            placeholder="Count Down"
            className="input-box"
          />
          <button onClick={handleCountDown}>Count Down</button>
          <button
            onClick={() => setCount(Math.floor(Math.random() * 100))}
          >
            Random Number
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
