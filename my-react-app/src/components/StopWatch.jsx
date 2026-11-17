import { useEffect, useState } from "react";

function Stopwatch() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (!isRunning) {
      return;
    }

    console.log("Stopwatch started");

    const intervalId = setInterval(() => {
      console.log("tick");
      setSeconds((currentSeconds) => currentSeconds + 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
      console.log("Stopwatch removed, interval cleared");
    };
  }, [isRunning]);

  return (
    <div className="card">
      <p>⏱️ {seconds} seconds</p>
      <button onClick={() => setIsRunning((currentIsRunning) => !currentIsRunning)}>
        {isRunning ? "Pause" : "Resume"}
      </button>
      <button onClick={() => setSeconds(0)}>Reset</button>
    </div>
  );
}

export default Stopwatch;
