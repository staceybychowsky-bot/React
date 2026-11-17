import { useState, useEffect } from "react";

function PostsWithStatus() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchPosts() {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts?_limit=10",
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error(`Status ${response.status}`);
        }

        const data = await response.json();
        setPosts(data);
      } catch (err) {
        if (err.name === "AbortError") return;
        console.error(err);
        setError("Could not load posts.");
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchPosts();

    return () => controller.abort();
  }, []);

  if (loading) return <p className="status-message">Loading posts...</p>;
  if (error) return <p className="error-message">❌ {error}</p>;

  return (
    <div>
      <h2>Posts</h2>
      {posts.map((post) => (
        <article key={post.id} className="card">
          <h3>{post.title}</h3>
          <p>{post.body}</p>
          <small>Post #{post.id} by User {post.userId}</small>
        </article>
      ))}
    </div>
  );
}

export default PostsWithStatus;

