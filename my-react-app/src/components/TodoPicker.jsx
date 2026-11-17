import { useEffect, useState } from "react";

export default function TodoPicker() {
  const [selectedUserId, setSelectedUserId] = useState(1);
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchTodos() {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/todos?userId=${selectedUserId}`,
          { signal: controller.signal },
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch todos (status ${response.status})`);
        }

        const todoData = await response.json();
        if (!controller.signal.aborted) {
          setTodos(todoData);
        }
      } catch (error) {
        if (controller.signal.aborted) return;

        console.error(error);
        setError("Could not load todos. Please try again.");
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchTodos();

    return () => {
      controller.abort();
    };
  }, [selectedUserId, retryCount]);

  function handleUserSelect(userId) {
    if (userId === selectedUserId) return;

    setLoading(true);
    setError(null);
    setSelectedUserId(userId);
  }

  function handleRetry() {
    setLoading(true);
    setError(null);
    setRetryCount((count) => count + 1);
  }

  const completedCount = todos.filter((todo) => todo.completed).length;

  return (
    <section>
      <div>
        {[1, 2, 3, 4, 5].map((userId) => (
          <button
            key={userId}
            className={selectedUserId === userId ? "selected-user" : ""}
            aria-pressed={selectedUserId === userId}
            onClick={() => handleUserSelect(userId)}
          >
            User {userId}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="status-message">Loading User {selectedUserId}’s todos...</p>
      ) : error ? (
        <div className="error-message" role="alert">
          <p>❌ {error}</p>
          <button onClick={handleRetry}>Retry</button>
        </div>
      ) : (
        <>
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
        </>
      )}
    </section>
  );
}
