import React, { useState } from "react";
import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Timer from "./Timer";
import pomodoro from "./images/pomodoro.png";

function App() {
  const [time, setTime] = useState(25);
  const [autoStart, setAutoStart] = useState(false);
  const toggleStartAuto = () => setAutoStart(!autoStart);
  return (
    <div className="App">
      <h1>Pomodoro Timer</h1>
      <div className="pomodoro">
        <img src={pomodoro} alt="" />
      </div>
      <div className="Select-Time-Buttons">
        <button onClick={() => setTime(25.0)}>
          Pomodoro <span>25 min</span>
        </button>
        <button onClick={() => setTime(5.0)}>
          Short break <span>5 min</span>
        </button>
        <button onClick={() => setTime(30.0)}>
          Long break <span>30 min</span>
        </button>
        <div>
          <input
            type="checkbox"
            id="start-auto"
            onChange={toggleStartAuto}
            onClick={toggleStartAuto}
            checked={autoStart}
          />
          <label htmlFor="start-auto"> Auto-start when reset or change</label>
        </div>
        <Timer timeLeftInMinute={time} autoStart={autoStart} />
      </div>
    </div>
  );
}

export default App;
