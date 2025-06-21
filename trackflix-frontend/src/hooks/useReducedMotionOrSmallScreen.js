// src/hooks/useReducedMotionOrSmallScreen.js
import { useEffect, useState } from "react";

export default function useReducedMotionOrSmallScreen() {
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce), (max-width: 640px)"
    );

    const handler = () => setShouldReduceMotion(mediaQuery.matches);

    handler();
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return shouldReduceMotion;
}
