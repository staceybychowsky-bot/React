import { useState } from "react";
import Stopwatch from "./Stopwatch";

function StopwatchToggle() {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div>
      <h2>Show / Hide Demo</h2>
      <button onClick={() => setIsVisible((current) => !current)}>
        {isVisible ? "Hide" : "Show"} Stopwatch
      </button>
      {isVisible && <Stopwatch />}
    </div>
  );
}

export default StopwatchToggle;