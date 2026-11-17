import { useState, useEffect } from "react";

function UsersWithStatus() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;

    async function fetchUsers() {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");

        if (!response.ok) {
          throw new Error(`Status ${response.status}`);
        }

        const data = await response.json();

        if (!ignore) {
          setUsers(data);
         // setUsers([])
        }
      } catch (err) {
        console.error("Failed to load users:", err);
        if (!ignore) {
          setError("Something went wrong!");
        }
      } finally {
       //  await new Promise((resolve) => setTimeout(resolve, 8000));
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    fetchUsers();

    return () => {
      ignore = true;
    };
  }, []);

  if (loading) {
    return <p className="status-message">Loading...</p>;
  }

  if (error) {
    return <p className="error-message">❌ {error}</p>;
  }

  if (users.length === 0) {
    return <p className="status-message">No users found.</p>;
  }

  return (
    <div>
      <h2>Users ({users.length})</h2>
      <div className="card-grid">
        {users.map((user) => (
          <div key={user.id} className="card">
            <h3>{user.name}</h3>
            <p>📧 {user.email}</p>
            <p>📍 {user.address.city}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UsersWithStatus;

