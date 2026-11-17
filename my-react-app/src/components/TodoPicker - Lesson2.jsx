import { useEffect, useState } from "react";

export default function TodoPicker() {
  const [selectedUserId, setSelectedUserId] = useState(1);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    setTodos([]);
    const controller = new AbortController();

    async function fetchTodos() {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/todos?userId=${selectedUserId}`,
          { signal: controller.signal },
        );
        if (!response.ok) {
          throw new Error("Failed to fetch todos");
        }

        const todoData = await response.json();
        setTodos(todoData);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error(error);
        }
      }
    }

    fetchTodos();

    return () => {
      controller.abort();
    };
  }, [selectedUserId]);

  const completedCount = todos.filter((todo) => todo.completed).length;

  return (
    <section>
      <div>
        {[1, 2, 3, 4, 5].map((userId) => (
          <button
            key={userId}
            className={selectedUserId === userId ? "selected-user" : ""}
            onClick={() => setSelectedUserId(userId)}
          >
            User {userId}
          </button>
        ))}
      </div>

      <h2>
        User {selectedUserId}: {completedCount} of {todos.length} completed.
      </h2>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.completed ? "✅" : "⏳"} {todo.title}
          </li>
        ))}
      </ul>
    </section>
  );
}


