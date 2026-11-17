import { useState, useEffect } from "react";

function WelcomeBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    console.log("WelcomeBanner mounted, starting 2-second timer");

    const timerId = setTimeout(() => {
      setShowBanner(true);
    }, 2000);

    return () => {
      clearTimeout(timerId);
      console.log("Timer cancelled");
    };
  }, []);

  return (
    <div className="card">
      <h2>Home</h2>
      {showBanner && <p className="banner">🎉 Welcome back! Thanks for visiting.</p>}
    </div>
  );
}

export default WelcomeBanner;