import { useEffect, useState } from "react";

const postUrl = "https://jsonplaceholder.typicode.com/posts/1";
const commentsUrl = "https://jsonplaceholder.typicode.com/posts/1/comments";

async function fetchJson(url, signal) {
  const response = await fetch(url, { signal });
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}: ${url}`);
  }
  return response.json();
}

export default function PostDetails() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function loadPostDetails() {
      try {
        const [post, comments] = await Promise.all([
          fetchJson(postUrl, controller.signal),
          fetchJson(commentsUrl, controller.signal),
        ]);

        if (!controller.signal.aborted) {
          setData({ post, comments });
        }
      } catch (err) {
        if (controller.signal.aborted) return;

        console.error("Failed to load post details:", err);
        setError("Could not load the post and comments. Please try again.");
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadPostDetails();

    return () => {
      controller.abort();
    };
  }, [retryCount]);

  function handleRetry() {
    setLoading(true);
    setError(null);
    setRetryCount((count) => count + 1);
  }

  if (loading) {
    return <p className="status-message">Loading post and comments...</p>;
  }

  if (error) {
    return (
      <div className="error-message" role="alert">
        <p>❌ {error}</p>
        <button onClick={handleRetry}>Retry</button>
      </div>
    );
  }

  return (
    <article>
      <h2>{data.post.title}</h2>
      <p>{data.post.body}</p>

      <h3>Comments ({data.comments.length})</h3>
      {data.comments.map((comment) => (
        <section className="card" key={comment.id}>
          <h4>{comment.name}</h4>
          <p>{comment.email}</p>
          <p>{comment.body}</p>
        </section>
      ))}
    </article>
  );
}
