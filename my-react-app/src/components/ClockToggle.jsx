import { useState } from "react";
import Clock from "./Clock";

export default function ClockToggle() {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div>
      <button onClick={() => setIsVisible((visible) => !visible)}>
        {isVisible ? "Hide" : "Show"} Clock
      </button>
      {isVisible && <Clock />}
    </div>
  );
}
