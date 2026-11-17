import { useEffect, useState } from "react";
import Loader from "./Loader";

function StudentTodos({ student, onClose }) {
  const [status, setStatus] = useState("loading");
  const [completedCount, setCompletedCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchTodos() {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/todos?userId=${student.id}`,
          { signal: controller.signal },
        );

        if (!response.ok) {
          throw new Error(`Status ${response.status}`);
        }

        const todos = await response.json();
        if (controller.signal.aborted) return;

        setCompletedCount(todos.filter((todo) => todo.completed).length);
        setTotalCount(todos.length);
        setStatus("success");
      } catch (error) {
        if (controller.signal.aborted) return;

        console.error(`Failed to load todos for ${student.name}:`, error);
        setStatus("error");
      }
    }

    setStatus("loading");
    fetchTodos();

    return () => {
      controller.abort();
    };
  }, [student.id, student.name, retryCount]);

  function handleRetry() {
    setStatus("loading");
    setRetryCount((count) => count + 1);
  }

  return (
    <aside className="student-todos-panel" aria-labelledby="student-todos-title">
      <div className="student-todos-heading">
        <h3 id="student-todos-title">{student.name}’s Todos</h3>
        <button
          type="button"
          className="button button-secondary"
          onClick={onClose}
          aria-label={`Close ${student.name}'s todo details`}
        >
          Close
        </button>
      </div>

      {status === "loading" ? (
        <Loader message={`Loading ${student.name}’s todos...`} />
      ) : status === "error" ? (
        <div className="error-box" role="alert">
          <p>We couldn’t load this student’s todos.</p>
          <button type="button" className="button" onClick={handleRetry}>
            Retry
          </button>
        </div>
      ) : (
        <p>
          {completedCount} of {totalCount} todos completed.
        </p>
      )}
    </aside>
  );
}

export default StudentTodos;

