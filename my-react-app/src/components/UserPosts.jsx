import { useEffect, useState } from "react";

export default function UserPosts({ userId }) {
  const [retryCount, setRetryCount] = useState(0);
  const [request, setRequest] = useState(() => ({
    userId,
    status: "loading",
    posts: null,
    error: null,
  }));

  useEffect(() => {
    const controller = new AbortController();

    //setRequest({ userId, status: "loading", posts: null, error: null });

    async function fetchPosts() {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts?userId=${userId}`,
          { signal: controller.signal },
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch posts (status ${response.status})`);
        }

        const postData = await response.json();
        if (!controller.signal.aborted) {
          setRequest({ userId, status: "success", posts: postData, error: null });
        }
      } catch (error) {
        //if (error.name === "AbortError") return;
        //console.error(error);

        if (!controller.signal.aborted) {
          setRequest({
            userId,
            status: "error",
            posts: null,
            error: "Could not load posts. Please try again.",
          });
        }
      }
    }

    fetchPosts();

    return () => {
      controller.abort();
    };
  }, [userId, retryCount]);

  function handleRetry() {
    setRequest({ userId, status: "loading", posts: null, error: null });
    setRetryCount((count) => count + 1);
  }

  const currentRequest = request.userId === userId
    ? request
    : { status: "loading", posts: null, error: null };

  if (currentRequest.status === "loading") {
    return <p className="status-message">Loading posts...</p>;
  }

  if (currentRequest.status === "error") {
    return (
      <div className="error-message" role="alert">
        <p>❌ {currentRequest.error}</p>
        <button onClick={handleRetry}>Retry</button>
      </div>
    );
  }

  if (currentRequest.posts.length === 0) {
    return (
      <section>
        <h2>User {userId} has 0 posts.</h2>
        <p className="status-message">No posts found.</p>
      </section>
    );
  }

  return (
    <section>
      <h2>User {userId} has {currentRequest.posts.length} posts.</h2>
      <ol>
        {currentRequest.posts.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
