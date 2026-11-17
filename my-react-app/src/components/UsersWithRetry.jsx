import { useState, useEffect } from "react";

function UsersWithRetry() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let ignore = false;

    async function fetchUsers() {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");

        if (!response.ok) {
          throw new Error(`Status ${response.status}`);
        }

        // 🧪 TESTING ONLY: fail half the time so we can see Retry work.
        // Delete these two lines in real code!
        if (Math.random() < 0.5) {
          throw new Error("Random test failure");
        }

        const data = await response.json();

        if (!ignore) {
          setUsers(data);
        }
      } catch (err) {
        console.error(err);
        if (!ignore) {
          setError("Something went wrong!");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    fetchUsers();

    return () => {
      ignore = true;
    };
  }, [retryCount]);

  function handleRetry() {
    setLoading(true);
    setError(null);
    setRetryCount((count) => count + 1);
  }

  if (loading) return <p className="status-message">Loading...</p>;

  if (error) {
    return (
      <div className="error-message">
        <p>❌ {error}</p>
        {retryCount >= 2 ? (
          <p>Please try again later.</p>
        ) : (
          <div>
            <span>Attempt #{retryCount + 2}</span>{" "}
            <button onClick={handleRetry}>Try Again</button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <h2>Users</h2>
      {users.map((user) => (
        <div key={user.id} className="card">
          <h3>{user.name}</h3>
        </div>
      ))}
    </div>
  );
}

export default UsersWithRetry;
