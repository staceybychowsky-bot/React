import { useState, useEffect } from "react";

function UserPostsPicker() {
  const [userId, setUserId] = useState(1);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let ignore = false;

    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
      .then((response) => response.json())
      .then((data) => {
        if (!ignore) {
          setPosts(data);
        }
      });

    return () => {
      ignore = true;
    };
  }, [userId]);

  return (
    <div>
      <h2>Posts by User {userId}</h2>
      {[1, 2, 3, 4, 5].map((id) => (
        <button key={id} onClick={() => setUserId(id)}>
          User {id}
        </button>
      ))}
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default UserPostsPicker;