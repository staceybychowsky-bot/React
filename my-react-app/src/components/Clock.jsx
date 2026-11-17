import { useEffect, useState } from "react";

export default function Clock() {
  const [time, setTime] = useState(() => new Date().toLocaleTimeString());

  useEffect(() => {
    console.log("Clock mounted");

    const intervalId = setInterval(() => {
      console.log("Clock tick");
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => {
      clearInterval(intervalId);
      console.log("Clock unmounted");
    };
  }, []);

  return <p>Current time: {time}</p>;
}
