import { useState, useEffect } from "react";

export default function useBreakpoint() {
  const [width, setWidth] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    handleResize(); // initial set

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (width === null) return "desktop";

  if (width < 640) return "mobile";
  if (width < 1024) return "tablet";
  return "desktop";
}
