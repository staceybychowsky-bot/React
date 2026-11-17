import { useEffect, useState } from "react";

export default function TitleChanger() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  }, [count]);

  return (
  <div>
    <p>You clicked {count} times</p>
    <button onClick={() => setCount((currentCount) => currentCount + 1)}>Add</button>
  </div>
);
}
