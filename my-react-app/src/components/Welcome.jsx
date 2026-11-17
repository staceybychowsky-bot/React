import { useEffect } from "react";

function Welcome() {
  useEffect(() => {
    console.log("The Welcome component has loaded!");
  }, []);

  return (
    <div>
      <h2>Welcome to Module 4!</h2>
      <p>Open the browser console to see the message.</p>
    </div>
  );
}

export default Welcome;
