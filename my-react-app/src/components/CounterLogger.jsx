import { useState, useEffect } from "react";

function CounterLogger() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");

  useEffect(() => {
    console.log(`Count changed to ${count}`);
  }, [count]);

  return (
    <div className="card">
      <h2>Counter Logger</h2>

      <p>Count: {count}</p>
      <button onClick={() => setCount((currentCount) => currentCount + 1)}>
        Increase
      </button>

      <p>
        Your name:{" "}
        <input value={name} onChange={(event) => setName(event.target.value)} />
      </p>
      <p>Hello, {name || "stranger"}!</p>
    </div>
  );
}

export default CounterLogger;
