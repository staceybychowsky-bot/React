import { useState, useEffect } from "react";

function Todos() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((data) => {
        setTodos(data.slice(0, 10));
      });
  }, []);

  return (
    <div>
      <h2>Todo List</h2>

      {todos.map((todo) => (
        <div key={todo.id} className="card">
          <h3>{todo.title}</h3>
          <p className={todo.completed ? "completed" : "pending"}>
            {todo.completed ? "✅ Completed" : "⏳ Pending"}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Todos;