import { useEffect, useState } from "react";

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchUser() {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
        if (!response.ok) {
          throw new Error("Failed to fetch user");
        }

        const userData = await response.json();
        if (isMounted) {
          setUser(userData);
        }
      } catch (error) {
        console.error(error);
      }
      // inside catch:
        } catch (err) {
        if (isMounted) {
            setError(err.message);
        }
        }       
    }

    fetchUser();

    return () => {
      isMounted = false;
    };
  }, []);

  if (!user) {
    return <p>Loading user...</p>;
  }
  // before the loading check:
    if (error) {
    return <p>Error: {error}</p>;
    }
    if (!user) {
    return <p>Loading user...</p>;
    }

  return (
    <section>
      <h2>{user.name}</h2>
      <p>Username: {user.username}</p>
      <p>Phone: {user.phone}</p>
      <p>Website: {user.website}</p>
      <p>Company: {user.company.name}</p>
    </section>
  );
}
