import { useState, useEffect } from "react";

function Comments() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/comments")
      .then((response) => response.json())
      .then((data) => {
        setComments(data.slice(0, 10));
      });
  }, []);

  return (
    <div>
      <h2>Comments</h2>

      {comments.map((comment) => (
        <div key={comment.id} className="card">
          <h3>{comment.name}</h3>
          <p><strong>Email:</strong> {comment.email}</p>
          <p>{comment.body}</p>
        </div>
      ))}
    </div>
  );
}

export default Comments;