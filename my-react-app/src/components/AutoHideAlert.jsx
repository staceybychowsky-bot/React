import { useEffect, useState } from "react";

export default function AutoHideAlert() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  return <div role="alert">Changes saved!</div>;
}
