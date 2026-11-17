import { useState, useEffect } from "react";

function UsersWithLoading() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      const response = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await response.json();
      setUsers(data);
      setLoading(false);
    }

    fetchUsers();
  }, []);

  if (loading) {
    return <div className="loading-spinner" role="status" aria-label="Loading users" />;
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

export default UsersWithLoading;


