"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Ensure this runs only on the client side (after hydration)
    if (typeof window !== "undefined") {
      const handleLoad = () => {
        setIsLoading(false);
      };

      if (document.readyState === "complete") {
        handleLoad();
      } else {
        window.addEventListener("load", handleLoad);
        return () => window.removeEventListener("load", handleLoad);
      }
    }
  }, []);

  // Don't render the loading screen if the page is loaded
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-white">
      <Image
        src="/loading.webp"
        width={200}
        height={200}
        alt="loading"
      />
    </div>
  );
}
