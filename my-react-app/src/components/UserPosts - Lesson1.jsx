import { useEffect, useState } from "react";

export default function UserPosts() {
  const [posts, setPosts] = useState([]);
  const userId = 2;

  useEffect(() => {
    let isMounted = true;

    async function fetchPosts() {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }

        const postData = await response.json();
        if (isMounted) {
          setPosts(postData);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchPosts();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section>
      <h2>User {userId} has {posts.length} posts.</h2>
      <ol>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ol>
    </section>
  );
}
