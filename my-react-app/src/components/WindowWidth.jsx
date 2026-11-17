import { useEffect, useState } from "react";

export default function WindowWidth() {
  const [width, setWidth] = useState(() => window.innerWidth);

  useEffect(() => {
    function updateWidth() {
      setWidth(window.innerWidth);
    }

    window.addEventListener("resize", updateWidth);

    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  return (
    <div>
      <p>Window width: {width}px</p>
      <p>{width < 768 ? "📱 Mobile" : "🖥️ Desktop"}</p>
    </div>
  );
}
