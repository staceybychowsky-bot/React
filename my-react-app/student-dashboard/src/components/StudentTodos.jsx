import { useEffect, useRef, useState } from "react";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";

function StudentTodos({ student, onClose }) {
  const [status, setStatus] = useState("loading");
  const [result, setResult] = useState({ completed: 0, total: 0 });
  const [retryCount, setRetryCount] = useState(0);
  const panelRef = useRef(null);

  // Bring the panel into view when it opens (it's below the cards).
  // The parent gives this component a key per student, so this runs
  // each time a different student is selected.
  useEffect(() => {
    panelRef.current.scrollIntoView({ block: "nearest" });
  }, []);

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

        setResult({
          completed: todos.filter((todo) => todo.completed).length,
          total: todos.length,
        });
        setStatus("success");
      } catch (error) {
        if (controller.signal.aborted) return;

        console.error(`Failed to load todos for ${student.name}:`, error);
        setStatus("error");
      }
    }

    fetchTodos();

    return () => {
      controller.abort();
    };
  }, [student.id, student.name, retryCount]);

  function handleRetry() {
    setStatus("loading");
    setRetryCount((count) => count + 1);
  }

  function renderContent() {
    if (status === "loading") {
      return <Loader message={`Loading ${student.name}’s todos...`} />;
    }

    if (status === "error") {
      return (
        <ErrorMessage
          message="We couldn’t load this student’s todos."
          onRetry={handleRetry}
        />
      );
    }

    if (result.total === 0) {
      return <p>{student.name} has no todos yet.</p>;
    }

    return (
      <p>
        {result.completed} of {result.total} todos completed.
      </p>
    );
  }

  return (
    <aside
      ref={panelRef}
      className="student-todos-panel"
      aria-labelledby="student-todos-title"
    >
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

      {renderContent()}
    </aside>
  );
}

export default StudentTodos;
