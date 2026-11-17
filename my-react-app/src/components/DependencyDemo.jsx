import { useState, useEffect } from "react";

function DependencyDemo() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  useEffect(() => {
    console.log("1️⃣ Runs after every render");
  });

  useEffect(() => {
    console.log("2️⃣ Runs on initial mount");
  }, []);

  useEffect(() => {
    console.log("3️⃣ Runs when count changes");
  }, [count]);

  return (
    <div className="card">
      <h2>Dependency Demo</h2>
      <button onClick={() => setCount((currentCount) => currentCount + 1)}>
        Count: {count}
      </button>
      <input
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Type here"
      />
    </div>
  );
}

export default DependencyDemo;
