import { useState, useEffect } from "react";

function Lifecycle() {
  const [count, setCount] = useState(0);

  // Effect 1: mount and unmount
  useEffect(() => {
    console.log("🟢 Lifecycle component MOUNTED");

    return () => {
      console.log("🔴 Lifecycle component UNMOUNTED");
    };
  }, []);

  // Effect 2: runs when count changes
  useEffect(() => {
    console.log(`🔵 Count is now ${count}`);
  }, [count]);

  return (
    <div className="card">
      <h2>Lifecycle Demo</h2>
      <p>Count: {count}</p>
      <button onClick={() => setCount((currentCount) => currentCount + 1)}>
        Increase
      </button>
    </div>
  );
}

export default Lifecycle;