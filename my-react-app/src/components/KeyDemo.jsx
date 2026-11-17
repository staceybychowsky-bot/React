import { useState } from "react";

function KeyDemo() {
  const [state, setState] = useState({
    items: [
      { id: 1, name: "Apple" },
      { id: 2, name: "Banana" },
    ],
    nextId: 3,
  });

  function addToTop() {
    setState((currentState) => {
      const newItem = {
        id: currentState.nextId,
        name: `Fruit ${currentState.nextId}`,
      };

      return {
        items: [newItem, ...currentState.items],
        nextId: currentState.nextId + 1,
      };
    });
  }

  return (
    <div className="card">
      <h2>Key Demo</h2>
      <button onClick={addToTop}>Add to top</button>
      <div>
        <h3>key = id</h3>
        {state.items.map((item) => (
          <div key={item.id}>
            {item.name}: <input placeholder="type a note" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default KeyDemo;
