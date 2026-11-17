import { useState, useEffect } from "react";

function UsersWithError() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");

        if (!response.ok) {
          throw new Error(`Server responded with status ${response.status}`);
        }

        const data = await response.json();
        setUsers(data);
      } catch (err) {
        console.error(err);
        setError("We couldn’t load the users. Please check your connection.");
      }
    }

    fetchUsers();
  }, []);

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div>
      <h2>Users</h2>
      {users.map((user) => (
        <div key={user.id} className="card">
          <h3>{user.name}</h3>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  );
}

export default UsersWithError;
